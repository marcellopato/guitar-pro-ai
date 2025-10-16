import React, { useRef, useEffect, useState } from 'react';
import './TabEditor.css';

/**
 * Componente de edição de tablatura usando Canvas HTML5
 * Permite adicionar, editar e remover notas visualmente
 */
const TabEditor = ({ tab, onNoteAdd, onNoteRemove, selectedNote, onNoteSelect }) => {
  const canvasRef = useRef(null);
  const [hoveredString, setHoveredString] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Constantes de layout
  const LINE_SPACING = 25;
  const START_X = 80;
  const START_Y = 100;
  const NOTE_RADIUS = 14;
  const NOTE_SPACING = 50;
  const MEASURE_WIDTH = 250;

  useEffect(() => {
    drawTab();
  }, [tab, selectedNote, hoveredString]);

  /**
   * Desenha a tablatura completa no canvas
   */
  const drawTab = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Limpa o canvas
    ctx.clearRect(0, 0, width, height);

    // Fundo
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, width, height);

    // Desenha título
    ctx.fillStyle = '#333';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(tab.title || 'Sem Título', START_X, 40);

    // Desenha info (BPM, etc)
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText(`♩ = ${tab.tempo} BPM`, START_X, 65);

    // Desenha afinação
    const tuning = tab.tracks[0]?.tuning || ['E', 'A', 'D', 'G', 'B', 'E'];
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'right';
    tuning.forEach((note, i) => {
      ctx.fillStyle = hoveredString === i ? '#667eea' : '#333';
      ctx.fillText(note, START_X - 15, START_Y + i * LINE_SPACING + 5);
    });

    // Desenha as 6 cordas
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(START_X, START_Y + i * LINE_SPACING);
      ctx.lineTo(width - 50, START_Y + i * LINE_SPACING);
      ctx.strokeStyle = hoveredString === i ? '#667eea' : '#ccc';
      ctx.lineWidth = hoveredString === i ? 2 : 1;
      ctx.stroke();
    }

    // Desenha barras de compasso
    const track = tab.tracks[0];
    if (track && track.measures) {
      track.measures.forEach((measure, measureIndex) => {
        const measureX = START_X + measureIndex * MEASURE_WIDTH;
        
        // Barra de compasso
        ctx.beginPath();
        ctx.moveTo(measureX, START_Y - 10);
        ctx.lineTo(measureX, START_Y + 5 * LINE_SPACING + 10);
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Número do compasso
        ctx.fillStyle = '#999';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${measureIndex + 1}`, measureX, START_Y - 20);
      });
    }

    // Desenha notas
    if (track && track.measures) {
      track.measures.forEach((measure, measureIndex) => {
        if (measure.notes && measure.notes.length > 0) {
          const measureX = START_X + measureIndex * MEASURE_WIDTH;
          
          measure.notes.forEach((note, noteIndex) => {
            const noteX = measureX + 30 + noteIndex * NOTE_SPACING;
            const noteY = START_Y + note.string * LINE_SPACING;

            const isSelected = selectedNote?.id === note.id;

            // Círculo da nota
            ctx.beginPath();
            ctx.arc(noteX, noteY, NOTE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = isSelected ? '#667eea' : '#fff';
            ctx.fill();
            ctx.strokeStyle = isSelected ? '#667eea' : '#333';
            ctx.lineWidth = isSelected ? 3 : 2;
            ctx.stroke();

            // Número do traste
            ctx.fillStyle = isSelected ? '#fff' : '#000';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(note.fret.toString(), noteX, noteY);

            // Indicador de duração (opcional)
            if (note.duration) {
              ctx.fillStyle = '#999';
              ctx.font = '10px Arial';
              ctx.fillText(getDurationSymbol(note.duration), noteX, noteY + NOTE_RADIUS + 12);
            }
          });
        }
      });
    }

    // Desenha preview da nota sendo adicionada
    if (hoveredString !== null && mousePosition.x > START_X) {
      ctx.beginPath();
      ctx.arc(mousePosition.x, START_Y + hoveredString * LINE_SPACING, NOTE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#667eea';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  /**
   * Converte duração Tone.js para símbolo musical
   */
  const getDurationSymbol = (duration) => {
    const symbols = {
      '1n': '𝅝',
      '2n': '𝅗𝅥',
      '4n': '♩',
      '8n': '♪',
      '16n': '𝅘𝅥𝅯'
    };
    return symbols[duration] || '♩';
  };

  /**
   * Detecta string clicada baseado na posição Y
   */
  const getStringFromY = (y) => {
    const relativeY = y - START_Y;
    const string = Math.round(relativeY / LINE_SPACING);
    return string >= 0 && string < 6 ? string : null;
  };

  /**
   * Detecta se clicou em uma nota existente
   */
  const getNoteAtPosition = (x, y) => {
    const track = tab.tracks[0];
    if (!track || !track.measures) return null;

    for (const measure of track.measures) {
      if (!measure.notes) continue;
      
      for (const note of measure.notes) {
        const measureIndex = tab.tracks[0].measures.indexOf(measure);
        const noteIndex = measure.notes.indexOf(note);
        const noteX = START_X + measureIndex * MEASURE_WIDTH + 30 + noteIndex * NOTE_SPACING;
        const noteY = START_Y + note.string * LINE_SPACING;

        const distance = Math.sqrt((x - noteX) ** 2 + (y - noteY) ** 2);
        if (distance <= NOTE_RADIUS) {
          return note;
        }
      }
    }
    return null;
  };

  /**
   * Handler de clique no canvas
   */
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Verifica se clicou em uma nota existente
    const clickedNote = getNoteAtPosition(x, y);
    if (clickedNote) {
      onNoteSelect && onNoteSelect(clickedNote);
      return;
    }

    // Adiciona nova nota
    const string = getStringFromY(y);
    if (string !== null && x > START_X) {
      const fret = prompt('Número do traste (0-24):', '0');
      
      if (fret !== null && !isNaN(fret)) {
        const fretNum = parseInt(fret);
        if (fretNum >= 0 && fretNum <= 24) {
          const newNote = {
            id: Date.now(),
            string,
            fret: fretNum,
            duration: '8n',
            velocity: 0.8
          };
          onNoteAdd && onNoteAdd(newNote);
        } else {
          alert('Traste deve estar entre 0 e 24');
        }
      }
    }
  };

  /**
   * Handler de movimento do mouse
   */
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });

    const string = getStringFromY(y);
    setHoveredString(string);
  };

  /**
   * Handler de saída do mouse
   */
  const handleMouseLeave = () => {
    setHoveredString(null);
  };

  /**
   * Handler de tecla (Delete para remover nota)
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedNote) {
        onNoteRemove && onNoteRemove(selectedNote.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNote, onNoteRemove]);

  return (
    <div className="tab-editor">
      <canvas
        ref={canvasRef}
        width={1200}
        height={500}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: hoveredString !== null ? 'crosshair' : 'default' }}
      />
      <div className="tab-editor-help">
        <p>💡 <strong>Dica:</strong> Clique em qualquer corda para adicionar uma nota. Pressione <kbd>Delete</kbd> para remover a nota selecionada.</p>
      </div>
    </div>
  );
};

export default TabEditor;
