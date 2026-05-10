// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import usuario from "../data/usuario";
import SectionTitle from "../components/sectiontitle";
import {
  Clock,
  TrendingUp,
  Award,
  Bell,
  BookOpen
} from "lucide-react";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Buenos días");
    } else if (hour < 18) {
      setGreeting("Buenas tardes");
    } else {
      setGreeting("Buenas noches");
    }

    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  // Calcular el progreso real de créditos
  const calcularProgresoCreditos = () => {
    const [cursados, totales] = usuario.creditos.split('/').map(Number);
    return (cursados / totales) * 100;
  };

  // Crear stats actualizados con los datos correctos
  const statsActualizados = [
    {
      label: "Promedio general",
      value: "9.2",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      progress: "92%"
    },
    {
      label: "Créditos cursados",
      value: usuario.creditos, // Usa "240/328" del objeto usuario
      icon: Award,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      progress: `${calcularProgresoCreditos()}%` // Calcula "73.17%"
    }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <SectionTitle
              title={`${greeting}, ${usuario.nombre}`}
              subtitle="Panel principal del sistema escolar inteligente"
            />
          </div>

          {/* FECHA Y HORA */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Fecha y hora
                </p>
                <p className="text-sm font-medium text-white">
                  {formatDate()}
                </p>
                <p className="text-xs text-gray-400">
                  {formatTime()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {statsActualizados.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-gray-800/70 rounded-2xl p-5 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <p className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </p>
                <div
                  className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center`}
                >
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">
                {stat.value}
              </p>
              <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${stat.color.replace("text", "bg")}`}
                  style={{ width: stat.progress }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* INFORMACIÓN ADICIONAL DEL USUARIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-800/70 rounded-2xl p-5 border border-gray-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Información Académica
          </h3>
          <div className="space-y-2">
            <p className="text-gray-300 text-sm">
              <span className="text-gray-500">Carrera:</span> {usuario.carrera}
            </p>
            <p className="text-gray-300 text-sm">
              <span className="text-gray-500">Semestre:</span> {usuario.semestre}
            </p>
            <p className="text-gray-300 text-sm">
              <span className="text-gray-500">Período actual:</span> {usuario.periodoActual}
            </p>
            <p className="text-gray-300 text-sm">
              <span className="text-gray-500">Estado:</span> 
              <span className="ml-2 text-green-400">{usuario.estado}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;