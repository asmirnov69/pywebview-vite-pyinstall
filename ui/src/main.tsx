import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [message, setMessage] = useState('Waiting for server message...');
  const [counter, setCounter] = useState(0);
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

  useEffect(() => {
    (window as any).updateCounter = (value: number) => {
      setCounter(value);
    };
  }, []);

  const sayHelloSocket = () => {
    socket?.send('Hello button clicked!');
  };

  const sayHelloPython = async () => {
    if ('pywebview' in window) {
      const response = await (window as any).pywebview.api.say_hello();
      alert(`Python says: ${response}`);
    } else {
      alert('pywebview API is not available');
    }
  };

  return (
    <div>
      <h1>React + WebSocket + Counter Demo</h1>
      <p>{message}</p>
      <p>Counter: {counter}</p>
      <button onClick={sayHelloSocket}>Say Hello via WebSocket</button>
      <button onClick={sayHelloPython}>Say Hello via Python</button>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
