# 🎸 Guitar AI Pro

<div align="center">

![Guitar AI Pro Logo](https://img.shields.io/badge/Guitar_AI_Pro-v0.1.0-667eea?style=for-the-badge&logo=music)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Electron](https://img.shields.io/badge/Electron-27.0.0-47848F?style=flat-square&logo=electron)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)

**Editor de Tablatura Musical com IA Integrada**

Uma alternativa open-source e moderna ao Guitar Pro, com geração musical assistida por Inteligência Artificial.

[🚀 Início Rápido](#-início-rápido) • [📖 Documentação](#-uso) • [🤝 Contribuir](CONTRIBUTING.md)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Início Rápido](#-início-rápido)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

Guitar AI Pro é um editor de tablatura musical desktop que combina as funcionalidades tradicionais de editores como Guitar Pro com o poder da Inteligência Artificial para auxiliar na composição musical.

### Por que Guitar AI Pro?

- ✅ **100% Gratuito e Open Source** - Sem limitações ou pagamentos
- 🤖 **IA Musical Integrada** - Gere melodias e harmonias automaticamente
- 🎵 **Playback em Tempo Real** - Ouça suas composições instantaneamente
- 💻 **Multiplataforma** - Windows, macOS e Linux
- 🎨 **Interface Moderna** - UI intuitiva e responsiva
- 📁 **Compatível** - Importa e exporta formatos populares

---

## ✨ Funcionalidades

### Já Implementadas ✅

- [x] Editor visual de tablatura com canvas HTML5
- [x] Sistema de playback com Tone.js
- [x] Geração de melodias com Magenta.js
- [x] Controle de tempo (BPM) e duração de notas
- [x] Interface responsiva com sidebar
- [x] Suporte a múltiplas afinações

### Em Desenvolvimento 🚧

- [ ] Sistema de salvar/carregar projetos
- [ ] Undo/Redo completo
- [ ] Metrônomo visual e audível
- [ ] Biblioteca de acordes
- [ ] Exportação MIDI
- [ ] Múltiplas tracks/instrumentos

### Futuro 🔮

- [ ] Exportação para PDF
- [ ] Importação de arquivos Guitar Pro (.gp5, .gpx)
- [ ] Efeitos de áudio (distorção, reverb, delay)
- [ ] Colaboração em tempo real
- [ ] Detecção de áudio para transcrição automática

---

## �️ Tecnologias

### Core Stack

- **Electron** - Framework desktop multiplataforma
- **React** - Biblioteca de UI
- **Tone.js** - Engine de áudio e síntese
- **Magenta.js** - Modelos de IA musical (TensorFlow.js)

### Dependências Principais

```json
{
  "electron": "^27.0.0",
  "react": "^18.2.0",
  "tone": "^14.7.77",
  "@magenta/music": "^1.23.1"
}
```

---

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js** >= 16.x
- **npm** >= 8.x
- **Git**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/guitar-ai-pro.git

# Entre na pasta do projeto
cd guitar-ai-pro

# Instale as dependências
npm install

# Inicie o aplicativo
npm start
```

O aplicativo será aberto automaticamente em uma janela Electron.

### Build para Produção

```bash
# Build para o seu sistema operacional
npm run build

# Build específico
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

Os executáveis estarão na pasta `dist/`.

---

---

## � Uso

### Interface Básica

```
┌─────────────────────────────────────────────────────────┐
│  [📄] [📁] [💾]  [▶️] [BPM: 120]  [⚙️]                  │  ← Toolbar
├─────────────────────────────────────────┬───────────────┤
│                                         │               │
│   Canvas de Tablatura                   │   Painel IA   │
│   (Clique para adicionar notas)         │               │
│                                         │   [Gerar]     │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │   [Config]    │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │               │
│                                         │               │
└─────────────────────────────────────────┴───────────────┘
```

### Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl+N` | Novo projeto |
| `Ctrl+O` | Abrir projeto |
| `Ctrl+S` | Salvar projeto |
| `Ctrl+Z` | Desfazer |
| `Ctrl+Y` | Refazer |
| `Space` | Play/Pause |
| `Delete` | Remover nota selecionada |

### Adicionando Notas

1. Clique na corda desejada no canvas
2. Digite o número do traste (0-24)
3. A nota será adicionada automaticamente

### Usando a IA

1. Abra o painel lateral direito
2. Ajuste a "Temperature" (criatividade) e "Steps" (comprimento)
3. Clique em "Generate Melody"
4. A IA gerará uma continuação baseada nas suas notas

---

## 📁 Estrutura do Projeto

```
guitar-ai-pro/
├── electron/
│   ├── main.js          # Processo principal do Electron
│   └── preload.js       # Bridge segura Node.js ↔ Renderer
├── public/
│   └── index.html       # HTML base
├── src/
│   ├── components/
│   │   ├── AIAssistant.js    # Painel de IA
│   │   ├── AudioEngine.js    # Engine de áudio (Tone.js)
│   │   ├── TabEditor.js      # Canvas de edição
│   │   └── Toolbar.js        # Barra de ferramentas
│   ├── App.js           # Componente raiz
│   ├── App.css          # Estilos globais
│   └── index.js         # Entry point React
├── package.json
└── README.md
```

---

## 🔧 Desenvolvimento

### Arquitetura

```
┌──────────────────────────────────────┐
│         Electron Main Process        │
│  (File System, Menu, IPC Handlers)   │
└────────────┬─────────────────────────┘
             │ IPC Communication
┌────────────▼─────────────────────────┐
│       Electron Renderer Process      │
│              (React App)             │
├──────────────────────────────────────┤
│  ┌─────────┐  ┌──────────────────┐  │
│  │ Toolbar │  │   TabEditor      │  │
│  └─────────┘  │   (Canvas API)   │  │
│               └──────────────────┘  │
│  ┌──────────────┐  ┌─────────────┐  │
│  │ AudioEngine  │  │ AIAssistant │  │
│  │  (Tone.js)   │  │ (Magenta.js)│  │
│  └──────────────┘  └─────────────┘  │
└──────────────────────────────────────┘
```

---

## 🗺️ Roadmap

### v0.2.0 (Q1 2026)
- [ ] Sistema completo de save/load
- [ ] Undo/Redo ilimitado
- [ ] Metrônomo visual
- [ ] Biblioteca de 100+ acordes

### v0.3.0 (Q2 2026)
- [ ] Múltiplas tracks
- [ ] Exportação MIDI
- [ ] Importação Guitar Pro básica
- [ ] Efeitos de áudio (3-4 básicos)

### v0.4.0 (Q3 2026)
- [ ] Exportação PDF
- [ ] Plugin system
- [ ] Temas customizáveis
- [ ] Modo colaborativo (beta)

### v1.0.0 (Q4 2026)
- [ ] Versão estável completa
- [ ] Todas as features principais
- [ ] Documentação completa

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## � Agradecimentos

- [Tone.js](https://tonejs.github.io/) - Audio synthesis
- [Magenta.js](https://magenta.tensorflow.org/) - Machine learning models
- [Electron](https://www.electronjs.org/) - Desktop framework
- [React](https://reactjs.org/) - UI library
- Comunidade open-source 💜

---

<div align="center">

**Feito com ❤️ pela comunidade open-source**

[⬆ Voltar ao topo](#-guitar-ai-pro)

</div>

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
