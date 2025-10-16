# 🎸 Guitar AI Pro

Editor de tablatura open-source com Inteligência Artificial integrada - Uma alternativa moderna ao Guitar Pro.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/Electron-28.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue.svg)

## ✨ Features

### Já Implementado (MVP)
- ✅ Editor de tablatura interativo com canvas
- ✅ Sistema de playback MIDI com Tone.js
- ✅ Assistente de IA musical usando Magenta.js
- ✅ Sugestão de próximas notas
- ✅ Geração de melodias do zero
- ✅ Interface moderna e intuitiva
- ✅ Salvar/Carregar projetos (.gap format)
- ✅ Controles de tempo e BPM

### Em Desenvolvimento
- 🚧 Múltiplas tracks/instrumentos
- 🚧 Efeitos de guitarra (distorção, reverb, delay)
- 🚧 Exportar para MIDI/PDF/MusicXML
- 🚧 Harmonização automática
- 🚧 Geração de solos por estilo
- 🚧 Importar arquivos Guitar Pro (.gp5, .gpx)
- 🚧 Colaboração em tempo real

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/guitar-ai-pro.git
cd guitar-ai-pro

# 2. Instale as dependências
npm install

# 3. Inicie o modo desenvolvimento
npm start

# O app irá abrir automaticamente!
```

### Build para produção

```bash
# Build da aplicação React
npm run build

# Build do executável Electron (Mac/Windows/Linux)
npm run build:electron
```

Os executáveis estarão em `dist/`.

## 📁 Estrutura do Projeto

```
guitar-ai-pro/
├── electron/
│   ├── main.js          # Processo principal do Electron
│   └── preload.js       # Bridge segura
├── src/
│   ├── components/
│   │   ├── TabEditor.js       # Editor de tablatura
│   │   ├── AudioEngine.js     # Motor de áudio
│   │   ├── AIAssistant.js     # Assistente IA
│   │   └── Toolbar.js         # Barra de ferramentas
│   ├── App.js           # Componente principal
│   └── App.css          # Estilos globais
├── package.json
└── README.md
```

## 🎯 Como Usar

### Adicionar Notas
1. Clique em qualquer posição na tablatura
2. Digite o número do traste (0-24)
3. A nota será adicionada

### Reproduzir
1. Clique no botão ▶️ na toolbar
2. Ajuste o BPM conforme necessário
3. Use ⏸️ para pausar

### Usar IA
1. Clique no botão 🤖 IA na toolbar
2. Ajuste a criatividade (temperature)
3. Escolha quantas notas gerar
4. Clique em "Continuar Melodia" ou "Gerar do Zero"
5. Aplique a sugestão se gostar!

### Salvar/Abrir Projetos
- **Ctrl/Cmd + N**: Novo arquivo
- **Ctrl/Cmd + O**: Abrir arquivo
- **Ctrl/Cmd + S**: Salvar
- **Ctrl/Cmd + Shift + S**: Salvar como

## 🤖 Sobre a IA

O Guitar AI Pro usa o **Magenta.js** do Google para gerar música:

- **MusicRNN**: Rede neural recorrente treinada em milhões de melodias
- **Temperature**: Controla criatividade (0.5 = conservador, 2.0 = experimental)
- **Context-aware**: A IA considera as notas já escritas

### Como funciona
1. Suas notas são convertidas para formato MIDI
2. O modelo RNN analisa o padrão
3. Gera continuações musicalmente coerentes
4. Converte de volta para tablatura

## 🛠️ Stack Tecnológica

- **Electron 28**: Framework desktop multiplataforma
- **React 18**: Interface de usuário
- **Tone.js**: Síntese e reprodução de áudio
- **Magenta.js**: IA musical (Google)
- **TensorFlow.js**: Machine learning no browser
- **Canvas API**: Renderização da tablatura

## 🎨 Customização

### Adicionar novos instrumentos

Edite `src/components/AudioEngine.js`:

```javascript
const instruments = {
  guitar: new Tone.PolySynth(Tone.Synth),
  bass: new Tone.MonoSynth({
    oscillator: { type: 'sawtooth' }
  }),
  piano: new Tone.Sampler({
    urls: { C4: 'C4.mp3' },
    baseUrl: 'https://tonejs.github.io/audio/salamander/'
  })
};
```

### Adicionar efeitos de áudio

```javascript
const distortion = new Tone.Distortion(0.8).toDestination();
const reverb = new Tone.Reverb(2).toDestination();

synth.connect(distortion);
synth.connect(reverb);
```

### Customizar aparência da tablatura

Edite `src/components/TabEditor.js` nas constantes:

```javascript
const lineSpacing = 25;      // Espaçamento entre cordas
const measureWidth = 200;    // Largura do compasso
const startY = 100;          // Posição inicial Y
```

## 🤝 Contribuindo

Contribuições são muito bem-vindas! 

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Áreas que precisam de ajuda
- [ ] Importador de arquivos Guitar Pro (.gp5, .gpx)
- [ ] Exportador para PDF
- [ ] Mais modelos de IA (diferentes estilos musicais)
- [ ] Suporte a mais instrumentos
- [ ] Testes unitários
- [ ] Documentação

## 📝 Formato de Arquivo (.gap)

O Guitar AI Pro usa um formato JSON simples:

```json
{
  "title": "Minha Música",
  "tempo": 120,
  "timeSignature": "4/4",
  "tracks": [
    {
      "id": 1,
      "instrument": "guitar",
      "tuning": ["E", "A", "D", "G", "B", "E"],
      "measures": [
        {
          "id": 1,
          "notes": [
            {
              "id": 1234567890,
              "string": 0,
              "fret": 5,
              "duration": "4n"
            }
          ]
        }
      ]
    }
  ]
}
```

## 🐛 Problemas Conhecidos

- **Latência no playback**: Em alguns sistemas pode haver delay. Ajuste o buffer no Tone.js
- **Modelo IA lento na primeira execução**: Normal - o modelo está carregando
- **Canvas não renderiza no Linux**: Instale dependências do Cairo

## 📚 Recursos de Aprendizado

### Para JavaScript/React
- [React Docs](https://react.dev)
- [Modern JavaScript Tutorial](https://javascript.info)

### Para Electron
- [Electron Documentation](https://electronjs.org/docs)
- [Building Electron Apps](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites)

### Para Áudio Web
- [Tone.js Documentation](https://tonejs.github.io/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

### Para IA Musical
- [Magenta.js Guide](https://magenta.tensorflow.org/get-started)
- [TensorFlow.js Music](https://www.tensorflow.org/js/tutorials)

## 🎓 Roadmap Futuro

### Versão 0.2 (Próximos 2 meses)
- [ ] Múltiplas tracks com mixer
- [ ] Efeitos de áudio básicos
- [ ] Exportar MIDI
- [ ] Melhorar UI/UX

### Versão 0.3 (3-4 meses)
- [ ] Importar Guitar Pro files
- [ ] Exportar PDF profissional
- [ ] IA por estilo musical (rock, jazz, blues)
- [ ] Biblioteca de acordes

### Versão 1.0 (6 meses)
- [ ] Colaboração online
- [ ] Cloud sync
- [ ] Marketplace de plugins
- [ ] Mobile app (React Native)

## 🏆 Créditos

Este projeto usa:
- **Magenta** - Google Brain Team
- **Tone.js** - Yotam Mann
- **VexFlow** - OpenSheetMusicDisplay
- **Electron** - GitHub

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 💬 Comunidade

- **Discord**: [Em breve]
- **Twitter**: [@guitaraipro]
- **Email**: contato@guitaraipro.com

## ⭐ Star History

Se este projeto te ajudou, considere dar uma estrela! ⭐

---

**Desenvolvido com ❤️ por músicos, para músicos**

🎸 Happy coding and jamming!
 
## 🐳 Usando Docker (desenvolvimento e build)

Adicionamos suporte para desenvolvimento com Docker. O fluxo recomendado é usar `docker-compose` para executar o web dev server (React) dentro de um container enquanto você executa o Electron localmente.

1) Build e start do ambiente de desenvolvimento (leva vantagem do volume para hot-reload):

```bash
docker-compose up --build
```

Isso irá:
- construir a imagem de desenvolvimento (`Dockerfile.dev`)
- expor a porta 3000 do React (acessível em http://localhost:3000)

2) Executando o Electron junto com o container

O padrão mais simples é executar o Electron na sua máquina host e apontá-lo para `http://localhost:3000`. O `electron/main.js` já carrega a URL que o dev server fornece.

3) Build para produção (opcional)

Para gerar os artefatos de produção (React build + pacotes electron), use a imagem de build:

```bash
# build da aplicação e executáveis (ex.: usado em CI)
docker build -t guitar-ai-pro:prod .
```

Notas:
- Se estiver usando WSL sem WSLg, a janela do Electron pode não abrir dentro do WSL; execute o Electron no host Windows ou habilite WSLg.
- O `docker-compose.yml` inclui um serviço `electron-builder` de exemplo para CI/empacotamento. Em desenvolvimento, normalmente executamos o Electron localmente.
