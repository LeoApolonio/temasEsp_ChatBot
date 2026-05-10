import {
  TrendingUp,
  Award,
  Bell
} from "lucide-react";

const usuario = {

  nombre: "Manuel Arturo Coronado Preciado",

  matricula: "322450120",

  carrera: "Ingeniería en Computación",

  semestre: "6to Semestre",

  correo: "juanperez@aragon.unam.mx",

  vigencia: "Julio 2026",

  estado: "Activo",

  periodoActual: "2026-II",
  
  fechaExpedicion: "Enero 2026",

  creditos: "240/328",

  progresoCreditos: "75%",

  stats: [

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
      value: "187/348",
      icon: Award,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      progress: "58%"
    }

  ],

  reminder: {

    title:
      "¡No olvides revisar tu correo institucional!",

    description:
      "Hay comunicados importantes sobre el proceso de reinscripción",

    buttonText:
      "Ver comunicados",

    icon: Bell

  }

};

export default usuario;