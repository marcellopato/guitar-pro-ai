import React, { useState, useEffect } from 'react';
import * as mm from '@magenta/music';
import './AIAssistant.css';

const AIAssistant = ({ currentTab, onSuggestion }) => {
	const [model, setModel] = useState(null);
	const [loading, setLoading] = useState(false);
	const [suggestion, setSuggestion] = useState(null);
	const [temperature, setTemperature] = useState(1.0);
	const [stepsToGenerate, setStepsToGenerate] = useState(4);

	useEffect(() => {
		loadModel();
	}, []);

const loadModel = async () => {
	setLoading(true);
	try {
		// Carrega modelo MusicRNN do Magenta
		const rnn = new mm.MusicRNN(
			'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn'
		);
		await rnn.initialize();
		setModel(rnn);
	} catch (error) {
		console.error('Erro ao carregar modelo:', error);
		alert('Erro ao carregar modelo de IA. Verifique a conexão.');
	} finally {
		setLoading(false);
	}
};	const generateSuggestion = async () => {
		if (!model) {
			alert('Modelo ainda não carregado. Aguarde...');
			return;
		}

		setLoading(true);
		try {
			// Converte tablatura atual para NoteSequence
			const currentSequence = convertTabToSequence(currentTab);

			// Gera continuação
			const result = await model.continueSequence(
				currentSequence,
				stepsToGenerate,
				temperature
			);

			// Converte de volta para formato de tablatura
			const tabSuggestion = convertSequenceToTab(result);

			setSuggestion(tabSuggestion);
			onSuggestion(tabSuggestion);
		} catch (error) {
			console.error('Erro ao gerar sugestão:', error);
			alert('Erro ao gerar sugestão. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	const generateMelody = async () => {
		if (!model) return;

		setLoading(true);
		try {
			// Cria sequência vazia
			const seed = {
				notes: [],
				totalTime: 0,
				quantizationInfo: { stepsPerQuarter: 4 }
			};

			// Gera melodia do zero
			const result = await model.continueSequence(
				seed,
				32, // 32 steps = 8 compassos
				temperature
			);

			const tabSuggestion = convertSequenceToTab(result);
			setSuggestion(tabSuggestion);
			onSuggestion(tabSuggestion);
		} catch (error) {
			console.error('Erro ao gerar melodia:', error);
		} finally {
			setLoading(false);
		}
	};

	const convertTabToSequence = (tab) => {
		const notes = [];
		const track = tab.tracks[0];

		// Afinação padrão
		const stringMidi = [64, 59, 55, 50, 45, 40]; // E B G D A E

		let currentTime = 0;

		track.measures.forEach(measure => {
			measure.notes.forEach(note => {
				const midiPitch = stringMidi[note.string] + note.fret;

				notes.push({
					pitch: midiPitch,
					startTime: currentTime,
					endTime: currentTime + 0.5,
					velocity: 80
				});

				currentTime += 0.5;
			});
		});

		return {
			notes: notes,
			totalTime: currentTime,
			quantizationInfo: { stepsPerQuarter: 4 }
		};
	};

	const convertSequenceToTab = (sequence) => {
		const suggestions = [];
		const stringMidi = [64, 59, 55, 50, 45, 40];

		sequence.notes.forEach(note => {
			// Encontra melhor corda para essa nota
			let bestString = 0;
			let bestFret = 24;

			stringMidi.forEach((baseMidi, stringIndex) => {
				const fret = note.pitch - baseMidi;
				if (fret >= 0 && fret <= 24 && fret < bestFret) {
					bestString = stringIndex;
					bestFret = fret;
				}
			});

			suggestions.push({
				string: bestString,
				fret: bestFret,
				duration: '8n'
			});
		});

		return suggestions;
	};

	return (
		<div className="ai-assistant">
			<h3>🤖 Assistente IA Musical</h3>

			{loading && (
				<div className="loading">
					<div className="spinner"></div>
					<p>Processando...</p>
				</div>
			)}

			<div className="ai-controls">
				<div className="control-group">
					<label>
						Criatividade (Temperature)
						<input
							type="range"
							min="0.1"
							max="2"
							step="0.1"
							value={temperature}
							onChange={(e) => setTemperature(parseFloat(e.target.value))}
						/>
						<span>{temperature.toFixed(1)}</span>
					</label>
				</div>

				<div className="control-group">
					<label>
						Notas a gerar
						<input
							type="range"
							min="2"
							max="16"
							step="1"
							value={stepsToGenerate}
							onChange={(e) => setStepsToGenerate(parseInt(e.target.value))}
						/>
						<span>{stepsToGenerate}</span>
					</label>
				</div>

				<div className="button-group">
					<button
						onClick={generateSuggestion}
						disabled={loading || !model}
						className="btn-primary"
					>
						🎵 Continuar Melodia
					</button>

					<button
						onClick={generateMelody}
						disabled={loading || !model}
						className="btn-secondary"
					>
						✨ Gerar do Zero
					</button>
				</div>
			</div>

			{suggestion && (
				<div className="suggestion-preview">
					<h4>Sugestão da IA:</h4>
					<div className="notes-list">
						{suggestion.map((note, i) => (
							<span key={i} className="note-badge">
								Corda {note.string + 1} - Traste {note.fret}
							</span>
						))}
					</div>
					<button
						onClick={() => onSuggestion(suggestion)}
						className="btn-apply"
					>
						✓ Aplicar Sugestão
					</button>
				</div>
			)}

			<div className="ai-info">
				<p>💡 <strong>Dicas:</strong></p>
				<ul>
					<li>Temperature baixo (0.5): mais conservador</li>
					<li>Temperature alto (1.5): mais criativo</li>
					<li>Mais notas = frases mais longas</li>
				</ul>
			</div>
		</div>
	);
};

export default AIAssistant;