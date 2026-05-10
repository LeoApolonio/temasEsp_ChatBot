import historial from "../data/historial";

import SectionTitle from "../components/sectiontitle";

function Historial() {

  return (

    <div className="p-8">

      <SectionTitle
        title="Historial"
        subtitle="Registro de solicitudes realizadas"
      />

      <div className="bg-gray-800 rounded-2xl overflow-hidden">

        {historial.map((item) => (

          <div
            key={item.id}
            className="flex items-center justify-between p-5 border-b border-gray-700"
          >

            <div>

              <h2 className="font-semibold">
                {item.tramite}
              </h2>

              <p className="text-gray-400 text-sm">
                {item.fecha}
              </p>

            </div>

            <span className="text-blue-400">
              {item.estado}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Historial;