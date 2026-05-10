import { useNavigate } from "react-router-dom";

import tramites from "../data/tramites";

import Card from "../components/card";

import SectionTitle from "../components/sectiontitle";

function Tramites() {

  const navigate = useNavigate();

  const handleSolicitar = (tramite) => {

    const mensaje =
      `Necesito solicitar: ${tramite.nombre}.`;

    navigate(

      "/chat",

      {
        state: {

          pendingMessage: mensaje,

          createNewChat: true

        }
      }

    );

  };

  return (

    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 min-h-screen">

      <SectionTitle
        title="Trámites"
        subtitle="Consulta y solicita trámites escolares"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {tramites.map((tramite) => (

          <Card
            key={tramite.id}
            title={tramite.nombre}
            description={tramite.descripcion}
          >

            <div className="flex items-center justify-between">

              {/* Estado con color dorado */}
              <span className="text-sm text-[#C9A227] font-medium">

                {tramite.estado}

              </span>

              {/* Botón Solicitar dorado */}
              <button
                onClick={() => handleSolicitar(tramite)}
                className="
                  bg-[#C9A227] hover:bg-[#B8921D]
                  text-gray-900 font-medium
                  px-4 py-2
                  rounded-xl
                  transition-all
                  duration-300
                  shadow-md
                  hover:shadow-lg
                "
              >

                Solicitar

              </button>

            </div>

          </Card>

        ))}

      </div>

    </div>

  );

}

export default Tramites;