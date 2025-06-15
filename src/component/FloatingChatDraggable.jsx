import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Styles/FloatingChatDraggable.css';
import ReactMarkdown from 'react-markdown';
import { IP } from './ipConfig';

export default function FloatingChatDraggable() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 1850, y: 800 });
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([
    { id: 0, texto: 'Hola, ¿en qué puedo ayudarte?', tipo: 'bot' }
  ]);

  useEffect(() => {
    // Inicializa posición en esquina inferior derecha
    const initialX = window.innerWidth - 80; // ancho icono + margen
    const initialY = window.innerHeight - 80;
    setPosition({ x: initialX, y: initialY });
  }, []);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const chatBoxWidth = 350;
  const chatBoxHeight = 320; // Ajusta según el contenido
  const iconSize = 60; // Tamaño aproximado del icono (ajusta si es necesario)
  const margin = 10;

  const handleMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (dragging.current) {
      let newX = e.clientX - offset.current.x;
      let newY = e.clientY - offset.current.y;

      // Limitar que el icono no salga de la pantalla (viewport)
      const maxX = window.innerWidth - iconSize - margin;
      const maxY = window.innerHeight - iconSize - margin;
      const minX = margin;
      const minY = margin;

      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;
      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;

      // Evitar que el icono quede dentro del cuadro de chat cuando esté abierto
      if (open) {
        // Suponemos que el chat aparece a la derecha y abajo del icono,
        // así que si el icono está dentro del área del chat, se ajusta

        // Área del chat según posición actual del icono:
        const chatLeft = newX + iconSize + margin;
        const chatTop = newY + iconSize + margin;

        // Si el icono está demasiado cerca del chat abierto, movemos el icono para que no se superponga
        if (
          (newX + iconSize > chatLeft && newX < chatLeft + chatBoxWidth) &&
          (newY + iconSize > chatTop && newY < chatTop + chatBoxHeight)
        ) {
          // Mover icono hacia la izquierda para que no se meta dentro del chat
          newX = chatLeft - iconSize - margin;
          if (newX < minX) newX = minX; // No salirse por la izquierda
        }
      }

      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Funciones touch para dispositivos móviles (igual que mouse)
  const handleTouchStart = (e) => {
    dragging.current = true;
    document.body.style.overflow = 'hidden';
    const touch = e.touches[0];
    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    };
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    if (dragging.current) {
      e.preventDefault();
      const touch = e.touches[0];
      let newX = touch.clientX - offset.current.x;
      let newY = touch.clientY - offset.current.y;

      const maxX = window.innerWidth - iconSize - margin;
      const maxY = window.innerHeight - iconSize - margin;
      const minX = margin;
      const minY = margin;

      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;
      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;

      if (open) {
        const chatLeft = newX + iconSize + margin;
        const chatTop = newY + iconSize + margin;

        if (
          (newX + iconSize > chatLeft && newX < chatLeft + chatBoxWidth) &&
          (newY + iconSize > chatTop && newY < chatTop + chatBoxHeight)
        ) {
          newX = chatLeft - iconSize - margin;
          if (newX < minX) newX = minX;
        }
      }

      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    document.body.style.overflow = '';
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    const nuevoMensaje = { id: Date.now(), texto: mensaje, tipo: 'user' };
    setMensajes(prev => [...prev, nuevoMensaje]);
    setMensaje('');

    try {
      const res = await axios.post(`https://portafolio-backend-5evd.onrender.com/api/chatbot/chatbot`, { Mensaje: mensaje });
      const respuestaBot = res.data.response;

      setMensajes(prev => [
        ...prev,
        { id: Date.now() + 1, texto: respuestaBot, tipo: 'bot' }
      ]);
    } catch (err) {
      setMensajes(prev => [
        ...prev,
        { id: Date.now() + 1, texto: 'Error al obtener respuesta 😢', tipo: 'bot' }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') enviarMensaje();
  };

  const getChatBoxPosition = () => {
    // Calcula posición del chat basado en icono
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let left = position.x + iconSize + margin; // aparece a la derecha del icono
    let top = position.y + iconSize + margin;  // aparece abajo del icono

    // Evitar que el chat se salga de pantalla por derecha o abajo
    if (left + chatBoxWidth > screenWidth) {
      left = screenWidth - chatBoxWidth - margin;
    }
    if (top + chatBoxHeight > screenHeight) {
      top = position.y - chatBoxHeight - margin;
      if (top < margin) top = margin;
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${chatBoxWidth}px`,
      height: `${chatBoxHeight}px`,
      position: 'fixed',
      zIndex: 9999,
    };
  };

  return (
    <>
      <div
        className="chat-bubble"
        onClick={() => setOpen(!open)}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ left: `${position.x}px`, top: `${position.y}px`, position: 'fixed', zIndex: 10000, width: iconSize, height: iconSize, cursor: 'grab' }}
      >
        <img src="/bot.png" alt="Chat" className="chat-icon" style={{ width: '100%', height: '100%' }} />
      </div>

      {open && (
        <div
          className="chat-box"
          style={getChatBoxPosition()}
          id="chatBox"
        >
          <div className="chat-header">Asistente</div>
          <div className="chat-body">
            {mensajes.map(msg => (
              <div key={msg.id} className={`mensaje ${msg.tipo}`}>
                {msg.tipo === 'bot' ? (
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      )
                    }}
                  >
                    {msg.texto}
                  </ReactMarkdown>
                ) : (
                  msg.texto
                )}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={enviarMensaje}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
}
