import './index.css'
import Header from './component/Header.jsx'
import About from './component/About.jsx'
import Experience from './component/Experience.jsx'
import Projects from './component/Projects.jsx'
import Contact from './component/Contact.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FloatingChatDraggable from './component/FloatingChatDraggable.jsx'

function App() {
  const [dataUser, setDataUser] = useState(null)
  const [dataProjects, setDataProjects] = useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/listar')
        const user = response.data[0]
        setDataUser(user)
      } catch (error) {
        console.error('Error al cargar el usuario:', error)
      }
    }
  
    fetchUser()
  }, []) // ✅ Este solo carga al usuario
  
  useEffect(() => {
    const fetchProjects = async () => {
      if (!dataUser?.id) return // Asegura que dataUser esté definido
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/listar/${dataUser.id}`)
        const projects = response.data
        console.log("Proyectos del usuario:", projects)
        setDataProjects(projects)
        // Aquí puedes guardar los proyectos si quieres
      } catch (error) {
        console.error('Error al cargar los proyectos:', error)
      }
    }
  
    fetchProjects()
  }, [dataUser]) // ✅ Este se ejecuta cuando dataUser cambia
  // No olvides el array de dependencias

  return (
    <div>
      <Header name={dataUser?.name || 'Cargando ...'} />
      <About />
      <Experience />
      <Projects data={dataProjects} />
      <Contact phone={dataUser?.phone || 'Cargando ...'} email={dataUser?.email || 'Cargando ...'} linkedin={dataUser?.linkedin ||'Cargando ...'} />
      <FloatingChatDraggable />
    </div>
  )
  
}

export default App
