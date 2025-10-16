# 🚀 Guia de Instalação Completo - Guitar AI Pro

## Para Desenvolvedores PHP migrando para JavaScript/Electron

Este guia é especialmente para você que já programa em PHP e quer começar neste projeto!

## 📋 Pré-requisitos

### 1. Instalar Node.js

**Windows:**
- Baixe de https://nodejs.org (versão LTS - 18.x ou superior)
- Execute o instalador
- Aceite todas as opções padrão

**Mac:**
```bash
# Usando Homebrew
brew install node

# Ou baixe de https://nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verifique a instalação:
```bash
node --version  # Deve mostrar v18.x.x ou superior
npm --version   # Deve mostrar 9.x.x ou superior
```

### 2. Editor de Código (Opcional mas Recomendado)

**Visual Studio Code** (grátis e excelente para JavaScript):
- Download: https://code.visualstudio.com
- Extensões recomendadas:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets
  - JavaScript (ES6) code snippets

## 🏗️ Setup do Projeto

### Passo 1: Criar estrutura de pastas

```bash
mkdir guitar-ai-pro
cd guitar-ai-pro

# Criar subpastas
mkdir electron
mkdir src
mkdir src/components
mkdir assets
```

### Passo 2: Inicializar projeto Node.js

```bash
npm init -y
```

### Passo 3: Copiar arquivos do artifact

Copie os arquivos dos artifacts na seguinte ordem:

1. **package.json** → raiz do projeto
2. **electron/main.js** → pasta electron/
3. **electron/preload.js** → pasta electron/
4. **src/App.js** → pasta src/
5. **src/App.css** → pasta src/
6. **src/components/TabEditor.js** → pasta src/components/
7. **src/components/TabEditor.css** → pasta src/components/
8. **src/components/AudioEngine.js** → pasta src/components/
9. **src/components/AIAssistant.js** → pasta src/components/
10. **src/components/AIAssistant.css** → pasta src/components/
11. **src/components/Toolbar.js** → pasta src/components/
12. **src/components/Toolbar.css** → pasta src/components/

### Passo 4: Criar arquivos faltantes

**src/index.js**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**src/index.css**
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

**public/index.html**
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Editor de tablatura com IA" />
    <title>Guitar AI Pro</title>
  </head>
  <body>
    <noscript>Você precisa habilitar JavaScript para usar este app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

**.gitignore**
```
# Dependências
node_modules/
/.pnp
.pnp.js

# Testes
/coverage

# Produção
/build
/dist

# Diversos
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Electron
out/
```

### Passo 5: Instalar dependências

```bash
npm install
```

⏳ Este processo pode demorar 5-10 minutos dependendo da sua conexão.

### Passo 6: Configurar variável de ambiente

**Windows (PowerShell):**
```powershell
$env:ELECTRON_START_URL="http://localhost:3000"
```

**Mac/Linux:**
```bash
export ELECTRON_START_URL=http://localhost:3000
```

Ou adicione no **package.json** na seção scripts:

```json
"scripts": {
  "start": "ELECTRON_START_URL=http://localhost:3000 concurrently \"npm run start:react\" \"wait-on http://localhost:3000 && npm run start:electron\"",
  ...
}
```

### Passo 7: Executar o projeto

```bash
npm start
```

🎉 O app deve abrir automaticamente!

## 🐛 Troubleshooting

### Erro: "Module not found"

**Solução:**
```bash
# Limpe cache e reinstale
rm -rf node_modules
rm package-lock.json
npm install
```

### Erro: "Port 3000 already in use"

**Solução:**

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill
```

### Erro: "Electron failed to install"

**Solução:**
```bash
npm install electron --force
```

### Erro: Canvas não renderiza

**Solução Linux:**
```bash
sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
```

### Modelo de IA não carrega

- Verifique sua conexão com internet
- O primeiro carregamento pode demorar 1-2 minutos
- Verifique o console (F12) para erros

## 📊 Estrutura Final do Projeto

```
guitar-ai-pro/
├── node_modules/          (gerado após npm install)
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AIAssistant.js
│   │   ├── AIAssistant.css
│   │   ├── AudioEngine.js
│   │   ├── TabEditor.js
│   │   ├── TabEditor.css
│   │   ├── Toolbar.js
│   │   └── Toolbar.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── electron/
│   ├── main.js
│   └── preload.js
├── assets/
│   └── icon.png (opcional)
├── .gitignore
├── package.json
├── package-lock.json      (gerado após npm install)
└── README.md
```

## 🎯 Próximos Passos

1. **Explore o código**: Abra cada arquivo e leia os comentários
2. **Modifique algo simples**: Tente mudar cores, textos
3. **Adicione uma feature**: Comece pequeno
4. **Leia a documentação**: React, Electron, Tone.js
5. **Entre na comunidade**: Discord, GitHub Discussions

## 📚 Recursos Úteis para PHP Devs

### Conceitos diferentes do PHP

| PHP                 | JavaScript/React                      |
| ------------------- | ------------------------------------- |
| `echo`              | `console.log()`                       |
| `$variavel`         | `let variavel`                        |
| Arrays associativos | Objetos `{}`                          |
| `foreach`           | `.map()`, `.forEach()`                |
| Classes             | Classes ES6 ou Componentes funcionais |
| `require`           | `import/export`                       |
| MySQL               | JSON/LocalStorage/API                 |

### Tutoriais Rápidos

- **JavaScript para PHP devs**: https://www.codecademy.com/learn/introduction-to-javascript
- **React em 30 minutos**: https://react.dev/learn
- **Electron Quickstart**: https://www.electronjs.org/docs/latest/tutorial/quick-start

## 💡 Dicas de Desenvolvimento

1. **Use o console**: `console.log()` é seu melhor amigo
2. **DevTools**: Aperte F12 para debug
3. **Hot Reload**: Salvou o arquivo? Atualiza automaticamente!
4. **Componentes**: Pense em blocos reutilizáveis
5. **Estado**: Use `useState` para dados que mudam

## ✅ Checklist de Instalação

- [ ] Node.js instalado (v18+)
- [ ] Projeto clonado/criado
- [ ] Todos os arquivos copiados
- [ ] `npm install` executado sem erros
- [ ] `npm start` inicia o app
- [ ] Canvas da tablatura renderiza
- [ ] Botão play funciona
- [ ] IA carrega (pode demorar)

## 🆘 Precisa de Ajuda?

- **GitHub Issues**: Reporte bugs
- **Discord**: Perguntas rápidas
- **Email**: suporte@guitaraipro.com

---

**Boa sorte com o desenvolvimento! 🚀🎸**