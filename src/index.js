import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Error Boundary para capturar erros
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#ff0000',
          color: 'white',
          padding: '50px',
          fontSize: '20px',
          fontFamily: 'monospace',
          overflow: 'auto'
        }}>
          <h1>❌ Erro no App</h1>
          <p>{this.state.error?.toString()}</p>
          <pre style={{whiteSpace: 'pre-wrap'}}>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element não encontrado');
} else {
  const root = createRoot(rootElement);
  root.render(<App />);
}
