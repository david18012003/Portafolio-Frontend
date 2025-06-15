import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const MyInfoContext = createContext();

export function MyInfoProvider({ children }) {
  const [myInfo, setMyInfo] = useState("Cargando información...");
  useEffect(() => {
  const fetchMyInfo = async () => {
    try {
      const mensaje = `Redacta un texto como si César, un desarrollador de software, estuviera contando su experiencia real en primera persona para mostrarla en su portafolio. Debe sonar profesional, humano y confiado. Describe lo que ha hecho, las herramientas que domina, los proyectos que ha desarrollado y lo que ha aprendido. No uses frases genéricas como "soy apasionado por la tecnología" ni introducciones innecesarias. Su experiencia incluye desarrollo backend con Node.js y Express, manejo de bases de datos MySQL, desarrollo frontend con React, testing QA manual y automatizado, así como proyectos con IA usando Cohere. Estudió un tecnólogo en ADSO y está cursando Ingeniería de Software.`; // etc.
      const baseURL = "portafolio-backend-5evd.onrender.com/api/chatbot/chatbot";
      const response = await axios.post(baseURL, { Mensaje: mensaje });

      console.log("Respuesta del servidor:", response.data);

      const texto = response.data.response || response.data[0]?.about || "No se encontró la información";
      setMyInfo(texto);

    } catch (error) {
      console.error('Error al cargar la información:', error);
      setMyInfo("No se pudo cargar la información.");
    }
  };
  fetchMyInfo();
}, []);


  return (
    <MyInfoContext.Provider value={{ myInfo, setMyInfo }}>
      {children}
    </MyInfoContext.Provider>
  );
}

export function useMyInfo() {
  return useContext(MyInfoContext);
}
