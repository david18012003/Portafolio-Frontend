import { useEffect, useState } from "react";
import axios from "axios";
import { useMyInfo } from "../context/MyInfo";

export default function Experience() {
  return (
    <section>
      <h2>Experiencia</h2>

      <article>
        <h3>QA Tester (2+ años)</h3>
        <ul>
          <li>Pruebas funcionales, de regresión, manuales y automatizadas.</li>
          <li>Uso de herramientas como Appium, Postman, SQL, Jira y Bitbucket.</li>
          <li>Automatización con Appium utilizando un framework interno en Kotlin.</li>
          <li>Validación de APIs con Postman.</li>
          <li>Metodologías ágiles (Scrum).</li>
        </ul>
      </article>

      <article>
        <h3>Desarrollador Backend</h3>
        <ul>
          <li>Desarrollo de APIs REST con Node.js y Express.js.</li>
          <li>Gestión de bases de datos relacionales con MySQL.</li>
          <li>Validaciones de datos con Express Validator.</li>
          <li>Enfoque en arquitectura limpia y organizada.</li>
        </ul>
      </article>

      <article>
        <h3>Desarrollador Frontend</h3>
        <ul>
          <li>Desarrollo de interfaces modernas con React.</li>
          <li>Uso de React Hooks y React Navigation.</li>
          <li>Creación de componentes personalizados reutilizables.</li>
          <li>Énfasis en la usabilidad y experiencia del usuario.</li>
        </ul>
      </article>
    </section>
  );
}
