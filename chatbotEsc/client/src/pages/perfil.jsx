import usuario from "../data/usuario";
import SectionTitle from "../components/sectiontitle";
import { useState, useRef } from "react";

import unamLogo from "../imgs/UNAMLogo.png";

function Perfil() {
  const [showQR, setShowQR] = useState(false);
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Formatear número de cuenta con guión largo
  const formatMatricula = (matricula) => {
    const lastDigit = matricula.slice(-1);
    const rest = matricula.slice(0, -1);
    return `${rest}—${lastDigit}`;
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 min-h-screen">
      <SectionTitle
        title="Perfil de usuario"
        subtitle="Identificación oficial del alumno"
      />

      <div className="flex justify-center items-center">
        <div
          ref={cardRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
        >
          {/* Sombra */}
          <div
            className="absolute -bottom-6 left-4 right-4 h-10 bg-black/40 rounded-full blur-xl transition-all duration-200"
            style={{
              transform: `translateX(${rotation.y * 2}px) translateY(${rotation.x * 2}px)`,
              opacity: 0.5
            }}
          />

          {/* Credencial */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-[800px] max-w-[90vw] overflow-hidden border border-[#003366] transition-all duration-200 ease-out"
            style={{
              aspectRatio: "16 / 9",
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(10px)`,
              transformStyle: "preserve-3d",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Brillo */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,198,41,0.15), transparent 70%)`
              }}
            />

            {/* Header Azul */}
            <div className="bg-gradient-to-r from-[#003366] to-[#002244] px-6 py-4">
              <div className="flex items-center gap-4">
                {/* Espacio para el logo de la UNAM */}
                <div className="flex-shrink-0">
                  <img 
                    src={unamLogo} 
                    alt="UNAM Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Textos del header */}
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-white tracking-wide">UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO</h1>
                  <p className="text-[#FFC629] italic text-sm mt-1">"Por mi raza hablará el espíritu"</p>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 flex items-center justify-center px-8 py-6">
              <div className="w-full">
                <div className="flex flex-row gap-10 items-center justify-between">
                  {/* Logo/Escudo */}
                  <div className="flex justify-center items-center flex-shrink-0">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#FFC629] to-[#E6B422] rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-[#003366]">
                        <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center mb-1">
                          <span className="text-3xl font-bold text-[#FFC629]">U</span>
                        </div>
                        <span className="text-[#003366] text-xs font-bold text-center px-2">UNAM</span>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#003366] text-white text-xs px-2 py-0.5 rounded-full border border-[#FFC629] whitespace-nowrap">
                        {usuario.estado}
                      </div>
                    </div>
                  </div>

                  {/* Primera columna de datos */}
                  <div className="flex-1 space-y-5">
                    <div>
                      <p className="text-[#003366] text-xs uppercase tracking-wide font-semibold mb-1">Nombre</p>
                      <p className="text-[#003366] font-bold text-lg">{usuario.nombre}</p>
                    </div>

                    <div>
                      <p className="text-[#003366] text-xs uppercase tracking-wide font-semibold mb-1">No. De Cuenta</p>
                      <p className="text-[#003366] font-bold text-lg">{formatMatricula(usuario.matricula)}</p>
                    </div>

                    <div>
                      <p className="text-[#003366] text-xs uppercase tracking-wide font-semibold mb-1">Semestre</p>
                      <p className="text-[#003366] font-bold text-lg">{usuario.semestre}</p>
                    </div>
                  </div>

                  {/* Segunda columna de datos */}
                  <div className="flex-1 space-y-5">
                    <div>
                      <p className="text-[#003366] text-xs uppercase tracking-wide font-semibold mb-1">Periodo</p>
                      <p className="text-[#003366] font-bold text-lg">{usuario.periodoActual}</p>
                    </div>

                    <div>
                      <p className="text-[#003366] text-xs uppercase tracking-wide font-semibold mb-1">Créditos</p>
                      <div className="flex items-center gap-3">
                        <p className="text-[#003366] font-bold text-lg">{usuario.creditos}</p>
                        <div className="flex-1 h-2 bg-[#003366]/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FFC629] rounded-full"
                            style={{ width: usuario.progresoCreditos }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Dorado */}
            <div className="bg-gradient-to-r from-[#FFC629] to-[#E6B422] px-6 py-3 mt-auto">
              <div className="text-center">
                <p className="text-[#003366] text-sm font-bold tracking-wide">
                  FACULTAD DE ESTUDIOS SUPERIORES ARAGÓN
                </p>
                <p className="text-[#003366] text-base font-black uppercase mt-1">
                  {usuario.carrera}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lema */}
      <div className="mt-6 max-w-[800px] mx-auto text-center">
        <p className="text-gray-400 text-sm italic">"Por mi raza hablará el espíritu"</p>
      </div>
    </div>
  );
}

export default Perfil;