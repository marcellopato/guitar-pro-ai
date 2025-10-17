import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

console.log('🚀 React index.js carregado!');
console.log('📦 Importando App...');

import App from './App';

console.log('✅ App importado com sucesso!', typeof App);

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
    console.error('🔥 ErrorBoundary capturou erro:', error);
    console.error('Info:', errorInfo);
    console.error('ComponentStack:', errorInfo.componentStack);
  }

  render() {
    console.log('🛡️ ErrorBoundary render() CHAMADO, hasError:', this.state.hasError);
    
    if (this.state.hasError) {
      console.error('🛡️ Mostrando tela de erro!');
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

    console.log('🛡️ ErrorBoundary renderizando children...');
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
console.log('�� Root element:', rootElement);

if (!rootElement) {
  console.error('❌ ERRO: Elemento root não encontrado!');
} else {
  try {
    const root = createRoot(rootElement);
    console.log('✅ React root criado, iniciando render...');
    
    console.log('🧪 Renderizando DIRETAMENTE App (sem ErrorBoundary)...');
    root.render(<App />);
    
    console.log('✅ React render chamado!');
  } catch (error) {
    console.error('❌ ERRO ao renderizar App:', error);
    console.error('Stack:', error.stack);
  }
}
