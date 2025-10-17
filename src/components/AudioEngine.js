import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

/**
 * Componente Audio Engine usando Tone.js
 * Gerencia síntese de áudio e playback da tablatura
 * @param {Object} tab - Dados da tablatura
 * @param {boolean} isPlaying - Estado de reprodução
 * @param {Function} onPlaybackEnd - Callback quando termina reprodução
 */
const AudioEngine = ({ tab, isPlaying, onPlaybackEnd }) => {
  const synthRef = useRef(null);
  const partRef = useRef(null);
  const initializedRef = useRef(false);

  /**
   * Inicializa o sintetizador
   */
  /**
   * Inicializa o sintetizador
   */
  useEffect(() => {
    if (!initializedRef.current) {
      try {
        // Cria um sintetizador polifônico com timbre de guitarra
        // Nota: No Tone.js 13.x, não passamos argumentos no construtor do PolySynth
        synthRef.current = new Tone.PolySynth();
        
        // Configura o synth base
        synthRef.current.set({
          oscillator: {
            type: 'triangle'
          },
          envelope: {
            attack: 0.005,
            decay: 0.3,
            sustain: 0.4,
            release: 1.2
          },
          volume: -8
        });
        
        synthRef.current.toDestination();

        initializedRef.current = true;
      } catch (error) {
        console.error('Erro ao inicializar AudioEngine:', error);
      }
    }

    // Cleanup ao desmontar
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      if (partRef.current) {
        partRef.current.dispose();
        partRef.current = null;
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
      initializedRef.current = false;
    };
  }, []);

  /**
   * Controla playback baseado no estado isPlaying
   */
  useEffect(() => {
    if (isPlaying) {
      playTab();
    } else {
      stopPlayback();
    }
  }, [isPlaying, tab]);

  /**
   * Converte número MIDI para nota Tone.js
   */
  const midiToNote = (midiNumber) => {
    return Tone.Frequency(midiNumber, 'midi').toNote();
  };

  /**
   * Obtém número MIDI baseado na afinação da corda e traste
   */
  const getStringMidi = (tuning) => {
    const noteToMidi = {
      'C': 48, 'C#': 49, 'Db': 49,
      'D': 50, 'D#': 51, 'Eb': 51,
      'E': 52,
      'F': 53, 'F#': 54, 'Gb': 54,
      'G': 55, 'G#': 56, 'Ab': 56,
      'A': 57, 'A#': 58, 'Bb': 58,
      'B': 59
    };

    return tuning.map(note => {
      // Afinação padrão de guitarra: E2, A2, D3, G3, B3, E4
      const baseMidi = noteToMidi[note] || 52;
      const octaveOffset = tuning.indexOf(note) < 3 ? -12 : 0;
      return baseMidi + octaveOffset;
    });
  };

  /**
   * Converte tablatura para eventos de áudio
   */
  const convertTabToEvents = (tab) => {
    const events = [];
    const track = tab.tracks[0];
    
    if (!track || !track.measures) {
      return events;
    }

    const tuning = track.tuning || ['E', 'A', 'D', 'G', 'B', 'E'];
    const stringMidi = getStringMidi(tuning);
    
    let currentTime = 0;

    track.measures.forEach((measure) => {
      if (!measure.notes || measure.notes.length === 0) return;

      measure.notes.forEach((note) => {
        const midiNote = stringMidi[note.string] + note.fret;
        const noteName = midiToNote(midiNote);
        const duration = note.duration || '8n';
        const velocity = note.velocity || 0.8;

        events.push({
          time: currentTime,
          note: noteName,
          duration: duration,
          velocity: velocity
        });

        // Avança o tempo baseado na duração
        currentTime += Tone.Time(duration).toSeconds();
      });
    });

    return events;
  };

  /**
   * Inicia reprodução da tablatura
   */
  /**
   * Inicia reprodução da tablatura
   */
  const playTab = async () => {
    try {
      // Inicia contexto de áudio (necessário após interação do usuário)
      await Tone.start();
      
      // Para qualquer reprodução anterior
      stopPlayback();

      // Configura BPM
      Tone.Transport.bpm.value = tab.tempo || 120;

      // Converte tablatura para eventos
      const events = convertTabToEvents(tab);

      if (events.length === 0) {
        console.warn('Nenhuma nota para reproduzir');
        onPlaybackEnd && onPlaybackEnd();
        return;
      }

      // Cria Part (sequência de eventos)
      partRef.current = new Tone.Part((time, event) => {
        synthRef.current.triggerAttackRelease(
          event.note,
          event.duration,
          time,
          event.velocity
        );
      }, events);

      // Configura loop (opcional)
      partRef.current.loop = false;

      // Inicia reprodução
      partRef.current.start(0);
      Tone.Transport.start();

      // Calcula duração total e agenda fim do playback
      const totalDuration = events[events.length - 1].time + Tone.Time(events[events.length - 1].duration).toSeconds();
      setTimeout(() => {
        onPlaybackEnd && onPlaybackEnd();
      }, (totalDuration + 0.5) * 1000); // +0.5s de margem para release

    } catch (error) {
      console.error('Erro ao reproduzir:', error);
      onPlaybackEnd && onPlaybackEnd();
    }
  };

  /**
   * Para a reprodução
   */
  const stopPlayback = () => {
    if (partRef.current) {
      partRef.current.stop();
      partRef.current.dispose();
      partRef.current = null;
    }
    
    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.Transport.position = 0;
  };

  // Componente sem UI - apenas lógica de áudio
  return null;
};

export default AudioEngine;
