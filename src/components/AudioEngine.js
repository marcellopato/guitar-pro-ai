import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

/**
 * Componente Audio Engine usando Howler.js
 * Gerencia síntese de áudio e playback da tablatura
 */
const AudioEngine = ({ tab, isPlaying, onPlaybackEnd }) => {
  const playbackTimeoutRef = useRef(null);
  const currentSoundsRef = useRef([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      try {
        // FORÇA inicialização do Howler AudioContext
        const dummySound = new Howl({
          src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
          volume: 0
        });
        dummySound.play();
        dummySound.unload();
        
        initializedRef.current = true;
      } catch (error) {
        console.error('❌ ERRO ao inicializar AudioEngine:', error);
      }
    }

    return () => {
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      playTab();
    } else {
      stopPlayback();
    }
  }, [isPlaying, tab]);

  const midiToFrequency = (midiNumber) => {
    return 440 * Math.pow(2, (midiNumber - 69) / 12);
  };

  const getStringMidi = (tuning) => {
    const noteToMidi = {
      'E': 52, 'A': 57, 'D': 50, 'G': 55, 'B': 59, 'C': 48, 'F': 53
    };
    return tuning.map((note, index) => {
      const baseMidi = noteToMidi[note] || 52;
      const octaveOffset = index < 3 ? -12 : 0;
      return baseMidi + octaveOffset;
    });
  };

  const createNoteSound = (frequency, duration = 0.5) => {
    let audioContext = Howler.ctx;
    
    // Se AudioContext não existe, tenta inicializar
    if (!audioContext) {
      console.warn('⚠️ AudioContext NULL, tentando inicializar...');
      try {
        // Força criação do AudioContext
        const tempSound = new Howl({
          src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='],
          volume: 0
        });
        tempSound.play();
        tempSound.unload();
        audioContext = Howler.ctx;
      } catch (e) {
        console.error('❌ Erro ao criar AudioContext:', e);
      }
    }
    
    if (!audioContext) {
      console.error('❌ AudioContext ainda não disponível após tentativa');
      return;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // VOLUME AUMENTADO: 0.5 (era 0.3)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.2, audioContext.currentTime + duration * 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  };

  const playTab = () => {
    try {
      stopPlayback();

      const track = tab.tracks[0];
      if (!track || !track.measures) {
        onPlaybackEnd && onPlaybackEnd();
        return;
      }

      const tuning = track.tuning || ['E', 'A', 'D', 'G', 'B', 'E'];
      const stringMidi = getStringMidi(tuning);
      const beatDuration = 60 / (tab.tempo || 120);

      let currentTime = 0;
      track.measures.forEach((measure) => {
        if (!measure.notes) return;
        measure.notes.forEach((note) => {
          const midiNote = stringMidi[note.string] + note.fret;
          const frequency = midiToFrequency(midiNote);
          // DURAÇÃO AUMENTADA: beatDuration inteiro (era /2)
          const duration = beatDuration;

          setTimeout(() => {
            createNoteSound(frequency, duration);
          }, currentTime * 1000);

          currentTime += duration;
        });
      });

      playbackTimeoutRef.current = setTimeout(() => {
        onPlaybackEnd && onPlaybackEnd();
      }, (currentTime + 0.5) * 1000);

    } catch (error) {
      console.error('❌ Erro ao reproduzir:', error);
      onPlaybackEnd && onPlaybackEnd();
    }
  };

  const stopPlayback = () => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
  };

  return null;
};

export default AudioEngine;
