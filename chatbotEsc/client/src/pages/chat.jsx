// src/pages/Chat.jsx

import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Send,
  Bot,
  User,
  Plus,
  Trash2,
  FileText
} from "lucide-react";

const loadChats = () => {
  const savedChats =
    localStorage.getItem("schoolChats");

  if (savedChats) {
    return JSON.parse(savedChats);
  }

  return [];
};

const createChatObject = () => {
  const now = new Date();

  return {
    id: Date.now(),

    title: now.toLocaleString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),

    messages: [
      {
        type: "bot",

        text:
          "Hola, soy el asistente virtual escolar. Estoy aquí para ayudarte con trámites, fechas, reinscripciones y procesos académicos."
      }
    ]
  };
};

function Chat() {

  const location = useLocation();

  const navigate = useNavigate();

  const pendingProcessedRef =
    useRef(false);

  const pendingMessageRef =
    useRef(null);

  const initialChats = loadChats();

  const initialChat =
    initialChats.length > 0
      ? initialChats[0]
      : createChatObject();

  const [conversations, setConversations] =
    useState(() => {

      if (initialChats.length > 0) {
        return initialChats;
      }

      return [initialChat];

    });

  const [activeChatId, setActiveChatId] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "activeChatId"
        );

      if (saved) {
        return Number(saved);
      }

      return initialChat.id;

    });

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // GUARDAR CHATS

  useEffect(() => {

    localStorage.setItem(
      "schoolChats",
      JSON.stringify(conversations)
    );

  }, [conversations]);

  // GUARDAR CHAT ACTIVO

  useEffect(() => {

    localStorage.setItem(
      "activeChatId",
      activeChatId
    );

  }, [activeChatId]);

  // CHAT ACTIVO

  const activeChat =
    conversations.find(
      (conv) =>
        conv.id === activeChatId
    );

  const chat =
    activeChat?.messages || [];

  // ENVIAR MENSAJE

  const sendMessage = async (
    customMessage = null,
    chatId = activeChatId
  ) => {

    const finalMessage =
      customMessage || message;

    if (!finalMessage.trim()) return;

    const targetChat =
      conversations.find(
        (conv) => conv.id === chatId
      );

    if (!targetChat) return;

    const updatedMessages = [

      ...targetChat.messages,

      {
        type: "user",
        text: finalMessage
      }

    ];

    setConversations((prev) =>
      prev.map((conv) =>

        conv.id === chatId
          ? {
              ...conv,
              messages: updatedMessages
            }
          : conv

      )
    );

    setMessage("");

    setLoading(true);

    try {

      const response =
        await axios.post(
          "http://localhost:3000/chat",
          {
            message: finalMessage
          }
        );

      setConversations((prev) =>
        prev.map((conv) => {

          if (conv.id !== chatId)
            return conv;

          return {
            ...conv,

            messages: [

              ...updatedMessages,

              {
                type: "bot",
                text:
                  response.data.reply
              }

            ]
          };

        })
      );

    } catch (error) {

      setConversations((prev) =>
        prev.map((conv) => {

          if (conv.id !== chatId)
            return conv;

          return {
            ...conv,

            messages: [

              ...updatedMessages,

              {
                type: "bot",

                text:
                  "Ocurrió un error al conectar con el servidor."
              }

            ]
          };

        })
      );

    }

    setLoading(false);

  };

  // PROCESAR MENSAJE PENDIENTE

  useEffect(() => {

    if (pendingProcessedRef.current)
      return;

    const pendingMessage =
      location.state?.pendingMessage;

    const createNewChat =
      location.state?.createNewChat;

    if (
      pendingMessage &&
      createNewChat
    ) {

      pendingProcessedRef.current =
        true;

      const newChat =
        createChatObject();

      pendingMessageRef.current = {
        message: pendingMessage,
        chatId: newChat.id
      };

      setConversations((prev) => [
        newChat,
        ...prev
      ]);

      setActiveChatId(newChat.id);

      window.history.replaceState(
        {},
        document.title
      );

    }

  }, [location.state]);

  // ENVIAR MENSAJE CUANDO EL CHAT EXISTA

  useEffect(() => {

    if (!pendingMessageRef.current)
      return;

    const { message, chatId } =
      pendingMessageRef.current;

    const exists =
      conversations.find(
        (conv) =>
          conv.id === chatId
      );

    if (exists) {

      sendMessage(message, chatId);

      pendingMessageRef.current =
        null;

    }

  }, [conversations]);

  // NUEVO CHAT

  const handleNewChat = () => {

    const newChat =
      createChatObject();

    setConversations((prev) => [
      newChat,
      ...prev
    ]);

    setActiveChatId(newChat.id);

  };

  // ELIMINAR CHAT

  const handleDeleteChat = (
    chatId
  ) => {

    const updated =
      conversations.filter(
        (conv) => conv.id !== chatId
      );

    if (updated.length === 0) {

      const newChat =
        createChatObject();

      setConversations([newChat]);

      setActiveChatId(newChat.id);

      return;

    }

    setConversations(updated);

    if (chatId === activeChatId) {

      setActiveChatId(
        updated[0].id
      );

    }

  };

  // MOSTRAR BOTÓN SOLO AL INICIO

  const showTramitesButton =
    chat.length === 1;

  return (

    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white flex overflow-hidden">

      {/* SIDEBAR */}

      <div className="w-80 bg-gray-900 border-r border-gray-800 hidden lg:flex flex-col">

        <div className="p-6 border-b border-gray-800">

          <div className="flex items-center gap-3 mb-5">

            {/* Logo dorado */}
            <div className="bg-[#C9A227]/20 p-3 rounded-2xl">

              <Bot className="w-6 h-6 text-[#C9A227]" />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-white">
                Asistente IA
              </h1>

              <p className="text-sm text-gray-400">
                Sistema escolar inteligente
              </p>

            </div>

          </div>

          {/* Botón dorado */}
          <button
            onClick={handleNewChat}
            className="
              w-full
              flex items-center justify-center gap-2
              bg-[#C9A227] hover:bg-[#B8921D]
              rounded-2xl
              py-3
              transition-all
              duration-300
              font-medium
            "
          >

            <Plus className="w-5 h-5" />

            Nuevo chat

          </button>

        </div>

        {/* CONVERSACIONES */}

        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {conversations.map((conv) => (

            <div
              key={conv.id}
              className={`
                group
                flex items-center
                rounded-2xl
                border
                ${
                  conv.id === activeChatId
                    ? "bg-gray-800 border-[#C9A227]"
                    : "bg-gray-900 border-gray-800 hover:bg-gray-800"
                }
              `}
            >

              <button
                onClick={() =>
                  setActiveChatId(conv.id)
                }
                className="
                  flex-1
                  text-left
                  p-4
                "
              >

                <p className="text-sm font-medium truncate text-white">

                  {conv.title}

                </p>

                <p className="text-xs text-gray-400 mt-1">

                  {conv.messages.length - 1} mensajes

                </p>

              </button>

              <button
                onClick={() =>
                  handleDeleteChat(conv.id)
                }
                className="
                  mr-3
                  p-2
                  rounded-xl
                  text-gray-400
                  hover:text-red-400
                  hover:bg-gray-700
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              >

                <Trash2 className="w-4 h-4" />

              </button>

            </div>

          ))}

        </div>

      </div>

      {/* CHAT */}

      <div className="flex-1 flex flex-col">

        {/* MENSAJES */}

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {chat.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.type === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`
                  max-w-[85%]
                  rounded-3xl
                  px-5
                  py-4
                  flex gap-3
                  ${
                    msg.type === "user"
                      ? "bg-[#C9A227]/80 text-gray-900" // Dorado opaco para legibilidad
                      : "bg-gray-800 border border-gray-700"
                  }
                `}
              >

                <div className="mt-1">

                  {msg.type === "user"
                    ? <User className="w-5 h-5 text-gray-900" />
                    : <Bot className="w-5 h-5 text-[#C9A227]" />
                  }

                </div>

                <div className={`text-sm leading-relaxed ${msg.type === "user" ? "text-gray-900" : "text-white"}`}>

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                  >

                    {msg.text}

                  </ReactMarkdown>

                </div>

              </div>

            </div>

          ))}

          {loading && (

            <div className="text-gray-400 text-sm">

              Escribiendo...

            </div>

          )}

        </div>

        {/* BOTÓN DE TRÁMITES - Dorado */}

        {showTramitesButton && (

          <div className="px-5 pb-4">

            <button
              onClick={() =>
                navigate("/tramites")
              }
              className="
                w-full
                flex items-center justify-center gap-3
                bg-[#C9A227] hover:bg-[#B8921D]
                border border-[#C9A227]/30
                rounded-2xl
                py-4
                transition-all duration-300
                text-gray-900 font-medium
              "
            >

              <FileText className="w-5 h-5 text-gray-900" />

              <span className="font-medium">
                Consultar trámites disponibles
              </span>

            </button>

          </div>

        )}

        {/* INPUT */}

        <div className="border-t border-gray-800 p-5 bg-gray-900">

          <div className="flex gap-3">

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  sendMessage();
                }

              }}
              placeholder="Escribe tu mensaje..."
              className="
                flex-1
                bg-gray-800
                border border-gray-700
                rounded-2xl
                px-5 py-4
                outline-none
                text-white
                placeholder:text-gray-400
              "
            />

            {/* Botón enviar dorado */}
            <button
              onClick={() =>
                sendMessage()
              }
              className="
                bg-[#C9A227] hover:bg-[#B8921D]
                px-6
                rounded-2xl
                flex items-center justify-center
                transition-all
                duration-300
              "
            >

              <Send className="w-5 h-5 text-gray-900" />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Chat;