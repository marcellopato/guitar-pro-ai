import React, { useState } from 'react';
import './components/App.css';
import AIAssistant from './components/AIAssistant';

const sampleTab = {
  title: 'Demo',
  tempo: 120,
  tracks: [
    {
      id: 1,
      instrument: 'guitar',
      tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
      measures: [
        {
          id: 1,
          notes: []
        }
      ]
    }
  ]
};

function App() {
  const [currentTab, setCurrentTab] = useState(sampleTab);

  const handleSuggestion = (suggestion) => {
    // Aplicar sugestão (exemplo: adicionar na primeira medida)
    const newTab = { ...currentTab };
    newTab.tracks = newTab.tracks.map(track => ({ ...track }));
    newTab.tracks[0].measures[0].notes = [
      ...(newTab.tracks[0].measures[0].notes || []),
      ...suggestion
    ];
    setCurrentTab(newTab);
  };

  return (
    <div className="App">
      <div className="main-content">
        <div className="editor-area">
          <h2>Guitar AI Pro (Demo)</h2>
          <p>Editor de tablatura — área de demonstração.</p>
        </div>

        <div className="ai-panel">
          <AIAssistant currentTab={currentTab} onSuggestion={handleSuggestion} />
        </div>
      </div>

      <div className="status-bar">
        <span>{currentTab.title}</span>
        <span>BPM: {currentTab.tempo}</span>
      </div>
    </div>
  );
}

export default App;
