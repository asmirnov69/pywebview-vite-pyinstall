import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [message, setMessage] = useState('Waiting for server message...');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8765');
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send('Hello from React!');
    };
    ws.onmessage = (event) => {
      console.log('Received:', event.data);
      setMessage(event.data);
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  const sayHello = () => {
    socket?.send('Hello button clicked!');
  };

  return (
    <div>
      <h1>React + WebSocket Demo</h1>
      <p>{message}</p>
      <button onClick={sayHello}>Say Hello</button>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
