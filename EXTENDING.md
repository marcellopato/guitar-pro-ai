# 🔧 Guia de Extensão - Como Adicionar Features

## Exemplos Práticos de Extensão do Guitar AI Pro

Este guia mostra como adicionar novas funcionalidades ao projeto, passo a passo.

---

## 1. 🎨 Adicionar Novo Instrumento (Baixo)

### Passo 1: Atualizar AudioEngine.js

```javascript
// src/components/AudioEngine.js

// Adicione no início do arquivo, após os imports:
const INSTRUMENTS_CONFIG = {
  guitar: {
    synth: () => new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.005, decay: 0.3, sustain: 0.4, release: 1 }
    }),
    tuning: [64, 59, 55, 50, 45, 40] // E A D G B E
  },
  bass: {
    synth: () => new Tone.MonoSynth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.5, release: 0.8 },
      filter: { Q: 2, type: 'lowpass', rolloff: -24 }
    }),
    tuning: [43, 38, 33, 28] // E A D G (baixo 4 cordas)
  }
};

// No useEffect, modifique para:
const instrumentType = tab.tracks[0]?.instrument || 'guitar';
const config = INSTRUMENTS_CONFIG[instrumentType];
synthRef.current = config.synth().toDestination();
```

### Passo 2: Atualizar App.js

```javascript
// src/App.js

// No estado inicial, adicione opção de instrumento:
const [currentInstrument, setCurrentInstrument] = useState('guitar');

// Adicione função para trocar instrumento:
const changeInstrument = (instrument) => {
  setCurrentInstrument(instrument);
  setCurrentTab(prev => ({
    ...prev,
    tracks: prev.tracks.map(track => ({
      ...track,
      instrument,
      tuning: instrument === 'bass' 
        ? ['E', 'A', 'D', 'G'] 
        : ['E', 'A', 'D', 'G', 'B', 'E']
    }))
  }));
};
```

### Passo 3: Adicionar selector na Toolbar

```javascript
// src/components/Toolbar.js

// Adicione no JSX:
<div className="toolbar-section instrument-selector">
  <label>
    Instrumento:
    <select 
      value={currentInstrument} 
      onChange={(e) => onInstrumentChange(e.target.value)}
    >
      <option value="guitar">🎸 Guitarra</option>
      <option value="bass">🎸 Baixo</option>
    </select>
  </label>
</div>
```

---

## 2. 📊 Adicionar Contador de Compassos

### Criar novo componente MeasureCounter.js

```javascript
// src/components/MeasureCounter.js

import React from 'react';
import './MeasureCounter.css';

const MeasureCounter = ({ currentMeasure, totalMeasures, onMeasureClick }) => {
  return (
    <div className="measure-counter">
      <button 
        onClick={() => onMeasureClick(Math.max(1, currentMeasure - 1))}
        disabled={currentMeasure === 1}
      >
        ◀
      </button>
      
      <div className="measure-display">
        <span className="current">{currentMeasure}</span>
        <span className="separator">/</span>
        <span className="total">{totalMeasures}</span>
      </div>
      
      <button 
        onClick={() => onMeasureClick(Math.min(totalMeasures, currentMeasure + 1))}
        disabled={currentMeasure === totalMeasures}
      >
        ▶
      </button>
    </div>
  );
};

export default MeasureCounter;
```

### CSS do componente

```css
/* src/components/MeasureCounter.css */

.measure-counter {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.measure-counter button {
  width: 35px;
  height: 35px;
  border: none;
  background: #667eea;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.measure-counter button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.measure-display {
  font-size: 24px;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
}

.measure-display .current {
  color: #667eea;
}

.measure-display .separator {
  color: #ccc;
  margin: 0 5px;
}

.measure-display .total {
  color: #7f8c8d;
}
```

### Integrar no App.js

```javascript
// src/App.js

import MeasureCounter from './components/MeasureCounter';

// Adicione estado:
const [currentMeasure, setCurrentMeasure] = useState(1);

// Adicione no JSX, dentro de .editor-area:
<MeasureCounter 
  currentMeasure={currentMeasure}
  totalMeasures={currentTab.tracks[0]?.measures.length || 1}
  onMeasureClick={setCurrentMeasure}
/>
```

---

## 3. 🎼 Adicionar Biblioteca de Acordes

### Criar componente ChordLibrary.js

```javascript
// src/components/ChordLibrary.js

import React, { useState } from 'react';
import './ChordLibrary.css';

const CHORD_DATABASE = {
  'C': { frets: [3, 3, 2, 0, 1, 0], fingers: [3, 4, 2, 0, 1, 0] },
  'D': { frets: [2, 3, 2, 0, -1, -1], fingers: [1, 3, 2, 0, 0, 0] },
  'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  'G': { frets: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] },
  'A': { frets: [0, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  'Am': { frets: [0, 1, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0] },
  'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  'Dm': { frets: [1, 3, 2, 0, -1, -1], fingers: [1, 3, 2, 0, 0, 0] },
};

const ChordLibrary = ({ onChordSelect }) => {
  const [selectedChord, setSelectedChord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChords = Object.keys(CHORD_DATABASE).filter(chord =>
    chord.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChordClick = (chordName) => {
    setSelectedChord(chordName);
    const chord = CHORD_DATABASE[chordName];
    onChordSelect(chord);
  };

  return (
    <div className="chord-library">
      <h3>📚 Biblioteca de Acordes</h3>
      
      <input 
        type="text"
        placeholder="Buscar acorde..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="chord-search"
      />

      <div className="chord-grid">
        {filteredChords.map(chord => (
          <button
            key={chord}
            className={`chord-button ${selectedChord === chord ? 'selected' : ''}`}
            onClick={() => handleChordClick(chord)}
          >
            {chord}
          </button>
        ))}
      </div>

      {selectedChord && (
        <div className="chord-diagram">
          <h4>{selectedChord}</h4>
          <ChordDiagram chord={CHORD_DATABASE[selectedChord]} />
        </div>
      )}
    </div>
  );
};

const ChordDiagram = ({ chord }) => {
  return (
    <div className="diagram">
      {chord.frets.map((fret, index) => (
        <div key={index} className="string">
          <span className="string-num">{6 - index}</span>
          <span className="fret-num">
            {fret === -1 ? 'X' : fret === 0 ? 'O' : fret}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChordLibrary;
```

---

## 4. 💾 Adicionar Histórico (Undo/Redo)

### Implementar no App.js

```javascript
// src/App.js

// Adicione estado para histórico:
const [history, setHistory] = useState([currentTab]);
const [historyIndex, setHistoryIndex] = useState(0);

// Função para adicionar ao histórico:
const addToHistory = (newTab) => {
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push(newTab);
  setHistory(newHistory);
  setHistoryIndex(newHistory.length - 1);
  setCurrentTab(newTab);
};

// Undo:
const undo = () => {
  if (historyIndex > 0) {
    setHistoryIndex(historyIndex - 1);
    setCurrentTab(history[historyIndex - 1]);
  }
};

// Redo:
const redo = () => {
  if (historyIndex < history.length - 1) {
    setHistoryIndex(historyIndex + 1);
    setCurrentTab(history[historyIndex + 1]);
  }
};

// Adicione atalhos de teclado:
useEffect(() => {
  const handleKeyPress = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
      e.preventDefault();
      redo();
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [historyIndex, history]);
```

---

## 5. 🎵 Adicionar Metrônomo

### Criar componente Metronome.js

```javascript
// src/components/Metronome.js

import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import './Metronome.css';

const Metronome = ({ tempo, isPlaying }) => {
  const [enabled, setEnabled] = useState(false);
  const clickRef = useRef(null);
  const loopRef = useRef(null);

  useEffect(() => {
    // Som do clique
    clickRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: { attack: 0.0006, decay: 0.5, sustain: 0 }
    }).toDestination();

    return () => {
      if (clickRef.current) clickRef.current.dispose();
      if (loopRef.current) loopRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (enabled && isPlaying) {
      Tone.Transport.bpm.value = tempo;
      
      loopRef.current = new Tone.Loop((time) => {
        clickRef.current.triggerAttackRelease('C2', '8n', time);
      }, '4n');

      loopRef.current.start(0);
      Tone.Transport.start();
    } else {
      if (loopRef.current) {
        loopRef.current.stop();
      }
    }

    return () => {
      if (loopRef.current) loopRef.current.stop();
    };
  }, [enabled, isPlaying, tempo]);

  return (
    <button 
      className={`metronome-button ${enabled ? 'active' : ''}`}
      onClick={() => setEnabled(!enabled)}
      title="Metrônomo"
    >
      {enabled ? '🔊' : '🔇'} Metrônomo
    </button>
  );
};

export default Metronome;
```

---

## 6. 📤 Exportar para MIDI

### Adicionar função no App.js

```javascript
// src/App.js

// Adicione a função:
const exportToMIDI = () => {
  // Cria arquivo MIDI
  const midi = new Tone.Midi();
  const track = midi.addTrack();

  const currentTrack = currentTab.tracks[0];
  const stringMidi = [64, 59, 55, 50, 45, 40];

  let time = 0;
  currentTrack.measures.forEach(measure => {
    measure.notes.forEach(note => {
      const midiNote = stringMidi[note.string] + note.fret;
      track.addNote({
        midi: midiNote,
        time: time,
        duration: 0.5,
        velocity: 0.8
      });
      time += 0.5;
    });
  });

  // Download
  const blob = new Blob([midi.toArray()], { type: 'audio/midi' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentTab.title || 'musica'}.mid`;
  a.click();
  URL.revokeObjectURL(url);
};

// Adicione no menu do Electron (electron/main.js):
{
  label: 'Exportar MIDI',
  click: () => {
    mainWindow.webContents.send('export-midi');
  }
}

// No App.js, adicione listener:
window.electronAPI.onExportMIDI(() => {
  exportToMIDI();
});
```

---

## 7. 🎨 Adicionar Temas (Dark Mode)

### Criar sistema de temas

```javascript
// src/App.js

const [theme, setTheme] = useState('light');

useEffect(() => {
  document.body.className = theme;
}, [theme]);

const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};
```

### CSS para temas

```css
/* src/App.css */

/* Light Theme (padrão) */
body.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --accent: #667eea;
  --border: #ddd;
}

/* Dark Theme */
body.dark {
  --bg-primary: #1e1e1e;
  --bg-secondary: #252526;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --accent: #667eea;
  --border: #3e3e3e;
}

/* Aplique as variáveis */
.App {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.editor-area {
  background: var(--bg-primary);
}

canvas {
  border-color: var(--border);
  background: var(--bg-primary);
}

/* Adicione botão de tema na Toolbar */
```

```javascript
// src/components/Toolbar.js

<button 
  className="btn-tool"
  onClick={onToggleTheme}
  title="Alternar Tema"
>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

---

## 8. 🎬 Adicionar Loop de Seção

### Implementar no AudioEngine.js

```javascript
// src/components/AudioEngine.js

const AudioEngine = ({ tab, isPlaying, onPlaybackEnd, loopStart, loopEnd, loopEnabled }) => {
  // ... código existente ...

  const playTab = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = tab.tempo;

    const events = convertTabToEvents(tab);

    // Filtrar eventos se loop estiver ativo
    let filteredEvents = events;
    if (loopEnabled && loopStart !== null && loopEnd !== null) {
      filteredEvents = events.filter(event => {
        return event.measureIndex >= loopStart && event.measureIndex <= loopEnd;
      });
    }

    if (partRef.current) {
      partRef.current.dispose();
    }

    partRef.current = new Tone.Part((time, note) => {
      synthRef.current.triggerAttackRelease(
        note.note,
        note.duration,
        time,
        note.velocity
      );
    }, filteredEvents);

    partRef.current.start(0);
    
    // Configurar loop
    if (loopEnabled) {
      partRef.current.loop = true;
      partRef.current.loopEnd = calculateLoopDuration(filteredEvents);
    } else {
      partRef.current.loop = false;
    }

    Tone.Transport.start();
  };

  const calculateLoopDuration = (events) => {
    if (events.length === 0) return '1m';
    const lastEvent = events[events.length - 1];
    return lastEvent.time + Tone.Time(lastEvent.duration).toSeconds();
  };

  // ... resto do código ...
};
```

### Adicionar controles de loop na Toolbar

```javascript
// src/components/Toolbar.js

const Toolbar = ({ 
  tempo, 
  onTempoChange, 
  isPlaying, 
  onPlayToggle,
  loopEnabled,
  onToggleLoop,
  loopStart,
  loopEnd,
  onSetLoopPoints
}) => {
  return (
    <div className="toolbar">
      {/* ... código existente ... */}
      
      <div className="toolbar-section loop-controls">
        <button 
          className={`btn-tool ${loopEnabled ? 'active' : ''}`}
          onClick={onToggleLoop}
          title="Loop"
        >
          🔁 Loop
        </button>
        
        {loopEnabled && (
          <div className="loop-range">
            <label>
              Início:
              <input 
                type="number" 
                value={loopStart || 1}
                onChange={(e) => onSetLoopPoints(parseInt(e.target.value), loopEnd)}
                min="1"
              />
            </label>
            <label>
              Fim:
              <input 
                type="number" 
                value={loopEnd || 1}
                onChange={(e) => onSetLoopPoints(loopStart, parseInt(e.target.value))}
                min="1"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 9. 📝 Adicionar Anotações/Comentários

### Criar componente Annotation.js

```javascript
// src/components/Annotation.js

import React, { useState } from 'react';
import './Annotation.css';

const Annotation = ({ measureId, annotations, onAddAnnotation, onDeleteAnnotation }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAddAnnotation(measureId, text);
      setText('');
      setIsAdding(false);
    }
  };

  return (
    <div className="annotation-container">
      <div className="annotations-list">
        {annotations.map((note, index) => (
          <div key={index} className="annotation-item">
            <span className="annotation-text">{note}</span>
            <button 
              onClick={() => onDeleteAnnotation(measureId, index)}
              className="delete-btn"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="annotation-form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Adicionar nota..."
            autoFocus
          />
          <button onClick={handleAdd}>✓</button>
          <button onClick={() => setIsAdding(false)}>✗</button>
        </div>
      ) : (
        <button 
          className="add-annotation-btn"
          onClick={() => setIsAdding(true)}
        >
          + Adicionar nota
        </button>
      )}
    </div>
  );
};

export default Annotation;
```

### Atualizar estrutura de dados no App.js

```javascript
// src/App.js

// Adicione annotations ao estado:
const [currentTab, setCurrentTab] = useState({
  title: 'Nova Música',
  tempo: 120,
  timeSignature: '4/4',
  tracks: [{
    id: 1,
    instrument: 'guitar',
    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
    measures: [{
      id: 1,
      notes: [],
      annotations: [] // NOVO
    }]
  }]
});

// Funções para gerenciar anotações:
const addAnnotation = (measureId, text) => {
  setCurrentTab(prev => ({
    ...prev,
    tracks: prev.tracks.map(track => ({
      ...track,
      measures: track.measures.map(measure => {
        if (measure.id === measureId) {
          return {
            ...measure,
            annotations: [...(measure.annotations || []), text]
          };
        }
        return measure;
      })
    }))
  }));
};

const deleteAnnotation = (measureId, annotationIndex) => {
  setCurrentTab(prev => ({
    ...prev,
    tracks: prev.tracks.map(track => ({
      ...track,
      measures: track.measures.map(measure => {
        if (measure.id === measureId) {
          return {
            ...measure,
            annotations: measure.annotations.filter((_, i) => i !== annotationIndex)
          };
        }
        return measure;
      })
    }))
  }));
};
```

---

## 10. 🎯 Adicionar Indicador de Progresso na Reprodução

### Criar componente ProgressBar.js

```javascript
// src/components/ProgressBar.js

import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import './ProgressBar.css';

const ProgressBar = ({ isPlaying, duration, onSeek }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationId;

    const updateProgress = () => {
      if (isPlaying) {
        const currentTime = Tone.Transport.seconds;
        const percentage = (currentTime / duration) * 100;
        setProgress(Math.min(percentage, 100));
        animationId = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(updateProgress);
    } else {
      setProgress(0);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPlaying, duration]);

  const handleClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newTime = (percentage / 100) * duration;
    
    setProgress(percentage);
    onSeek(newTime);
    Tone.Transport.seconds = newTime;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="progress-bar-container">
      <span className="time-display">{formatTime((progress / 100) * duration)}</span>
      
      <div 
        className="progress-bar" 
        onClick={handleClick}
      >
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="progress-handle"
          style={{ left: `${progress}%` }}
        />
      </div>
      
      <span className="time-display">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
```

### CSS do ProgressBar

```css
/* src/components/ProgressBar.css */

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
}

.time-display {
  font-size: 12px;
  font-weight: 600;
  color: white;
  min-width: 40px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.2);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  transition: height 0.2s;
}

.progress-bar:hover {
  height: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.1s linear;
}

.progress-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  pointer-events: none;
  transition: left 0.1s linear;
}
```

---

## 💡 Dicas Gerais para Adicionar Features

### 1. Sempre Teste Incrementalmente
```javascript
// Comece simples:
console.log('Teste 1: Componente renderizou');

// Depois adicione lógica:
console.log('Teste 2: Dados recebidos:', props);

// Por fim, integre completamente
```

### 2. Use PropTypes ou TypeScript
```javascript
import PropTypes from 'prop-types';

Component.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};
```

### 3. Mantenha Componentes Pequenos
- Um componente = uma responsabilidade
- Se passou de 200 linhas, considere dividir
- Extraia lógica complexa para hooks customizados

### 4. Performance
```javascript
// Use React.memo para componentes pesados:
export default React.memo(TabEditor);

// Use useCallback para funções:
const handleClick = useCallback(() => {
  // sua lógica
}, [dependencies]);

// Use useMemo para cálculos custosos:
const processedData = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

### 5. Debugging
```javascript
// Console.log estratégico:
console.log('🔵 Componente montou');
console.log('🟢 Props:', props);
console.log('🟡 Estado:', state);
console.log('🔴 Erro:', error);

// Use React DevTools (extensão do Chrome/Firefox)
```

---

## 📚 Recursos Adicionais

### Bibliotecas Úteis

```bash
# Drag and drop
npm install react-beautiful-dnd

# Notificações
npm install react-toastify

# Modais
npm install react-modal

# Ícones
npm install react-icons

# Formulários
npm install react-hook-form

# State management avançado
npm install zustand
```

### Hooks Customizados Úteis

```javascript
// useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
```

---

## 🎓 Próximos Desafios

1. **Nível Iniciante**: Adicionar mais acordes à biblioteca
2. **Nível Intermediário**: Implementar múltiplas tracks simultâneas
3. **Nível Avançado**: Criar sistema de plugins
4. **Nível Expert**: Implementar colaboração em tempo real com WebRTC

---

**Continue experimentando e construindo! 🚀**