import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";

import Dashboard from "./pages/dashboard";
import Chat from "./pages/chat";
import Tramites from "./pages/tramites";
import Historial from "./pages/historial";
import Perfil from "./pages/perfil";
import Calendario from "./pages/calendario";

function App() {

  return (

    <BrowserRouter>

      <div className="flex h-screen bg-gray-950 text-white">

        <Sidebar />

        <div className="flex-1 overflow-auto">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/chat" element={<Chat />} />

            <Route path="/tramites" element={<Tramites />} />

            <Route path="/historial" element={<Historial />} />

            <Route path="/perfil" element={<Perfil />} />

            <Route path="/calendario" element={<Calendario />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );
}

export default App;