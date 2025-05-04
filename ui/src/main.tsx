import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [message, setMessage] = useState('press buttons below...');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    (window as any).updateCounter = (value: number) => {
      setCounter(value);
    };
  }, []);

  const sayHelloPython = async () => {
    if ('pywebview' in window) {
      const response = await (window as any).pywebview.api.say_hello();
      setMessage(`Python says: ${response}`);
    } else {
      alert('pywebview API is not available');
    }
  };

  const sayALERT = async () => {
    alert('ALERT');
  };

  return (
    <div>
      <h1>React/TS in pywebview app</h1>
      <p>{message}</p>
      <p>Counter: {counter}</p>
      <button onClick={sayHelloPython}>Say Hello via Python</button>
      <button onClick={sayALERT}>ALERT</button>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
