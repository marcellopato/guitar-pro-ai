import React, { useState } from 'react';
import './components/App.css';
import Toolbar from './components/Toolbar';
import TabEditor from './components/TabEditor';
import AudioEngine from './components/AudioEngine';

console.log('📝 App.js sendo carregado no módulo...');

const sampleTab = {
  title: 'Minha Música',
  tempo: 120,
  tracks: [
    {
      id: 1,
      instrument: 'guitar',
      tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
      measures: [
        {
          id: 1,
          notes: [
            { id: 1, string: 2, fret: 0, duration: '4n' },
            { id: 2, string: 2, fret: 2, duration: '4n' },
            { id: 3, string: 3, fret: 2, duration: '4n' },
            { id: 4, string: 1, fret: 0, duration: '4n' }
          ]
        }
      ]
    }
  ]
};

console.log('📊 sampleTab criado:', sampleTab);

function App() {
  console.log('🎸 App function EXECUTOU!');
  
  try {
  const [currentTab, setCurrentTab] = useState(sampleTab);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleTempoChange = (newTempo) => {
    setCurrentTab({ ...currentTab, tempo: newTempo });
    setHasUnsavedChanges(true);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlaybackEnd = () => {
    setIsPlaying(false);
  };

  const handleNew = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('Você tem alterações não salvas. Deseja continuar?')) {
        return;
      }
    }
    setCurrentTab({
      title: 'Nova Música',
      tempo: 120,
      tracks: [{
        id: 1,
        instrument: 'guitar',
        tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
        measures: [{ id: 1, notes: [] }]
      }]
    });
    setHasUnsavedChanges(false);
  };

  const handleOpen = () => {
    alert('Funcionalidade de abrir arquivo será implementada na próxima fase!');
  };

  const handleSave = () => {
    console.log('Salvando projeto:', currentTab);
    alert('Projeto salvo! (simulação)');
    setHasUnsavedChanges(false);
  };

  const handleNoteAdd = (newNote) => {
    const newTab = { ...currentTab };
    newTab.tracks[0].measures[0].notes.push(newNote);
    setCurrentTab(newTab);
    setHasUnsavedChanges(true);
  };

  const handleNoteRemove = (noteId) => {
    const newTab = { ...currentTab };
    newTab.tracks[0].measures[0].notes = newTab.tracks[0].measures[0].notes.filter(
      note => note.id !== noteId
    );
    setCurrentTab(newTab);
    setSelectedNote(null);
    setHasUnsavedChanges(true);
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  console.log('🎨 App está prestes a renderizar JSX...');

  return (
    <div className="App">
      <Toolbar
        tempo={currentTab.tempo}
        onTempoChange={handleTempoChange}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        onNew={handleNew}
        onOpen={handleOpen}
        onSave={handleSave}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <div className="main-content">
        <div className="editor-area">
          <TabEditor
            tab={currentTab}
            onNoteAdd={handleNoteAdd}
            onNoteRemove={handleNoteRemove}
            selectedNote={selectedNote}
            onNoteSelect={handleNoteSelect}
          />
        </div>
      </div>

      <AudioEngine
        tab={currentTab}
        isPlaying={isPlaying}
        onPlaybackEnd={handlePlaybackEnd}
      />
    </div>
  );
  
  } catch (error) {
    console.error('❌ ERRO CRÍTICO no App:', error);
    console.error('Stack:', error.stack);
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#ff0000', 
        color: 'white',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap'
      }}>
        <h1>❌ ERRO CRÍTICO</h1>
        <p>{error.toString()}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}

export default App;
