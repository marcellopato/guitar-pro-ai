import React from 'react';
import './Toolbar.css';

/**
 * Barra de ferramentas principal com controles de arquivo e playback
 * @param {number} tempo - BPM atual
 * @param {Function} onTempoChange - Callback para mudar BPM
 * @param {boolean} isPlaying - Estado de reprodução
 * @param {Function} onPlayToggle - Callback play/pause
 * @param {Function} onNew - Callback novo arquivo
 * @param {Function} onOpen - Callback abrir arquivo
 * @param {Function} onSave - Callback salvar arquivo
 * @param {boolean} hasUnsavedChanges - Indica se há mudanças não salvas
 */
const Toolbar = ({ 
  tempo, 
  onTempoChange, 
  isPlaying, 
  onPlayToggle,
  onNew,
  onOpen,
  onSave,
  hasUnsavedChanges = false,
  disabled = false
}) => {

  const handleTempoChange = (e) => {
    const newTempo = parseInt(e.target.value);
    if (!isNaN(newTempo) && newTempo >= 40 && newTempo <= 300) {
      onTempoChange(newTempo);
    }
  };

  const handleTempoIncrement = (increment) => {
    const newTempo = tempo + increment;
    if (newTempo >= 40 && newTempo <= 300) {
      onTempoChange(newTempo);
    }
  };

  return (
    <div className="toolbar">
      {/* Seção: Arquivo */}
      <div className="toolbar-section file-actions">
        <button 
          className="btn-tool" 
          onClick={onNew} 
          title="Novo projeto (Ctrl+N)"
          disabled={disabled}
        >
          <span className="icon">📄</span>
          <span className="label">Novo</span>
        </button>
        
        <button 
          className="btn-tool" 
          onClick={onOpen} 
          title="Abrir projeto (Ctrl+O)"
          disabled={disabled}
        >
          <span className="icon">📁</span>
          <span className="label">Abrir</span>
        </button>
        
        <button 
          className="btn-tool save-button" 
          onClick={onSave} 
          title="Salvar projeto (Ctrl+S)"
          disabled={disabled}
        >
          <span className="icon">💾</span>
          <span className="label">Salvar</span>
          {hasUnsavedChanges && <span className="unsaved-indicator">●</span>}
        </button>
      </div>

      <div className="toolbar-divider"></div>

      {/* Seção: Playback */}
      <div className="toolbar-section playback-controls">
        <button 
          className={`btn-play ${isPlaying ? 'playing' : ''}`}
          onClick={onPlayToggle}
          title={isPlaying ? 'Pausar (Space)' : 'Reproduzir (Space)'}
          disabled={disabled}
        >
          <span className="play-icon">
            {isPlaying ? '⏸️' : '▶️'}
          </span>
        </button>

        <div className="tempo-control">
          <label className="tempo-label">
            <span className="tempo-icon">♩ =</span>
          </label>
          
          <div className="tempo-input-group">
            <button 
              className="tempo-btn tempo-decrease"
              onClick={() => handleTempoIncrement(-5)}
              title="Diminuir BPM (-5)"
              disabled={disabled || tempo <= 40}
            >
              −
            </button>
            
            <input
              type="number"
              className="tempo-input"
              value={tempo}
              onChange={handleTempoChange}
              min="40"
              max="300"
              step="1"
              disabled={disabled}
            />
            
            <button 
              className="tempo-btn tempo-increase"
              onClick={() => handleTempoIncrement(5)}
              title="Aumentar BPM (+5)"
              disabled={disabled || tempo >= 300}
            >
              +
            </button>
          </div>

          <span className="tempo-unit">BPM</span>
        </div>
      </div>

      <div className="toolbar-divider"></div>

      {/* Seção: Ferramentas */}
      <div className="toolbar-section tools">
        <button 
          className="btn-tool" 
          title="Desfazer (Ctrl+Z)"
          disabled={disabled}
        >
          <span className="icon">↶</span>
          <span className="label">Desfazer</span>
        </button>
        
        <button 
          className="btn-tool" 
          title="Refazer (Ctrl+Y)"
          disabled={disabled}
        >
          <span className="icon">↷</span>
          <span className="label">Refazer</span>
        </button>
      </div>

      <div className="toolbar-divider"></div>

      {/* Seção: Exportar */}
      <div className="toolbar-section export">
        <button 
          className="btn-tool" 
          title="Exportar MIDI"
          disabled={disabled}
        >
          <span className="icon">🎹</span>
          <span className="label">MIDI</span>
        </button>
      </div>

      {/* Spacer */}
      <div className="toolbar-spacer"></div>

      {/* Status */}
      <div className="toolbar-section status">
        <div className="status-info">
          {hasUnsavedChanges && (
            <span className="status-badge unsaved">
              Não salvo
            </span>
          )}
          <span className="status-text">
            {isPlaying ? '▶ Reproduzindo' : '⏸ Pausado'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
