import { useState } from "react";
import SectionTitle from "../components/sectiontitle";
import {
  FileText,
  Download,
  AlertCircle
} from "lucide-react";
import calendarioPDF from "../pdfs/calendariofesa.pdf";

function Calendario() {
  const [pdfError, setPdfError] = useState(null);

  // Función para descargar el PDF
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = calendarioPDF;
    link.setAttribute('download', 'calendario-escolar-2026-II.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 min-h-screen">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <SectionTitle
          title="Calendario Escolar 2026-II"
          subtitle="Calendario oficial de la FES Aragón"
        />
      </div>

      {/* VISOR DE PDF */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
        <div className="bg-gray-800/70 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C9A227]" />
            Calendario Oficial 2026-II
          </h3>
          {/* Botón descargar dorado */}
          <button
            onClick={downloadPDF}
            className="text-sm bg-[#C9A227] hover:bg-[#B8921D] text-gray-900 font-medium flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Download className="w-3 h-3" />
            Descargar
          </button>
        </div>
        
        <div className="w-full bg-gray-900" style={{ height: '80vh', minHeight: '600px' }}>
          {pdfError && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <AlertCircle className="w-12 h-12 text-[#C9A227]" />
              <p className="text-[#C9A227]">Error al cargar el calendario</p>
              <p className="text-gray-400 text-sm">{pdfError}</p>
            </div>
          )}
          
          <iframe
            src={calendarioPDF}
            className="w-full h-full border-0"
            title="Calendario Escolar 2026-II"
            onError={() => setPdfError("No se pudo cargar el archivo PDF")}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendario;