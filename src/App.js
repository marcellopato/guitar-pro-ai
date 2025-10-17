import React from 'react';

function App() {
  console.log('🎸 App component renderizando...');
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#00ff00',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: '30px',
      fontFamily: 'Arial'
    }}>
      <h1>🎸 SUCESSO! App está renderizando!</h1>
      <p>Se você está vendo isso, o React + Electron estão funcionando!</p>
      <p>Próximo passo: adicionar os componentes reais...</p>
    </div>
  );
}

export default App;
