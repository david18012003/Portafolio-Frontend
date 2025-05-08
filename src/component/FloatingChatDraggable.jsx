import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Styles/FloatingChatDraggable.css';
import ReactMarkdown from 'react-markdown';

export default function FloatingChatDraggable() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 40, y: 40 });
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([
    { id: 0, texto: 'Hola, ¿en qué puedo ayudarte?', tipo: 'bot' }
  ]);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

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
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      });
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    const nuevoMensaje = { id: Date.now(), texto: mensaje, tipo: 'user' };
    setMensajes(prev => [...prev, nuevoMensaje]);
    setMensaje('');

    try {
      const res = await axios.post('http://localhost:3000/api/chatbot/chatbot', { Mensaje: mensaje }); // Ajusta tu URL
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

  return (
    <>
      <div
        className="chat-bubble"
        onClick={() => setOpen(!open)}
        onMouseDown={handleMouseDown}
        style={{ left: `${position.x}px`, top: `${position.y}px`, position: 'fixed' }}
      >
        <img src="/bot.png" alt="Chat" className="chat-icon" />
      </div>

      {open && (
        <div
          className="chat-box"
          style={{ left: `${position.x}px`, top: `${position.y + 70}px`, position: 'fixed' }}
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
