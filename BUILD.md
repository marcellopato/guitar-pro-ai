# 🔨 Guia de Build - Guitar AI Pro

## 📦 Build para Produção

### Windows (.exe)

```bash
npm run build:win
```

O instalador será gerado em `dist/Guitar AI Pro Setup 0.1.0.exe`

**Requisitos:**
- Node.js 16+
- Windows 10/11 ou WSL2

**Resultado:**
- ✅ Instalador NSIS (.exe)
- ✅ Permite escolher diretório de instalação
- ✅ Cria atalhos no Desktop e Menu Iniciar
- ✅ Arquivo portátil (~150-200 MB)

---

### macOS (.dmg)

```bash
npm run build:mac
```

O instalador será gerado em `dist/Guitar AI Pro-0.1.0.dmg`

**Requisitos:**
- macOS 10.13+
- Xcode Command Line Tools

---

### Linux (.AppImage)

```bash
npm run build:linux
```

O instalador será gerado em `dist/Guitar AI Pro-0.1.0.AppImage`

**Requisitos:**
- Ubuntu 18.04+ / Debian 10+ ou equivalente
- GLIBC 2.27+

---

## 🚀 Processo de Build Completo

1. **Instale dependências** (se necessário):
   ```bash
   npm install
   ```

2. **Build do React**:
   ```bash
   npm run build
   ```
   Cria a pasta `build/` com os assets otimizados

3. **Build do Electron**:
   ```bash
   npm run build:electron
   ```
   Empacota para todas as plataformas configuradas

4. **Build específico por plataforma**:
   ```bash
   npm run build:win    # Windows
   npm run build:mac    # macOS
   npm run build:linux  # Linux
   ```

---

## 📁 Estrutura de Build

```
dist/
├── Guitar AI Pro Setup 0.1.0.exe        # Windows installer
├── Guitar AI Pro-0.1.0.dmg              # macOS installer
├── Guitar AI Pro-0.1.0.AppImage         # Linux portable
├── win-unpacked/                        # Windows unpacked
├── mac/                                 # macOS unpacked
└── linux-unpacked/                      # Linux unpacked
```

---

## 🔍 Testando o Build

### Windows
1. Execute o instalador `Guitar AI Pro Setup 0.1.0.exe`
2. Siga o assistente de instalação
3. Abra o app pelo atalho criado

### Modo Portátil (sem instalação)
Você pode usar as pastas `*-unpacked` para executar sem instalar:
- Windows: `win-unpacked/Guitar AI Pro.exe`
- macOS: `mac/Guitar AI Pro.app`
- Linux: `linux-unpacked/guitar-ai-pro`

---

## ⚙️ Configuração Avançada

### Alterar Ícone da Aplicação

1. Substitua o arquivo `public/favicon.ico` (Windows)
2. Para macOS/Linux, adicione:
   - `assets/icon.icns` (macOS - 512x512)
   - `assets/icon.png` (Linux - 512x512)

### Configurar Assinatura de Código

Para distribuição profissional:

**Windows:**
```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "password"
}
```

**macOS:**
```json
"mac": {
  "identity": "Developer ID Application: Your Name (TEAM_ID)"
}
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'electron'"
```bash
npm install --save-dev electron
```

### Build muito grande (>300MB)
- Adicione `.npmignore` excluindo arquivos desnecessários
- Use `asar: true` na configuração do electron-builder

### Windows Defender bloqueia o executável
- Normal para apps não assinados
- Clique em "Mais informações" → "Executar assim mesmo"
- Para produção, adquira certificado de code signing

---

## 📊 Tamanho Estimado dos Builds

| Plataforma | Tamanho Instalador | Tamanho Instalado |
|------------|-------------------|-------------------|
| Windows    | ~80-100 MB        | ~200-250 MB       |
| macOS      | ~100-120 MB       | ~250-300 MB       |
| Linux      | ~90-110 MB        | ~220-270 MB       |

---

## 🔐 Checklist Antes de Distribuir

- [ ] Atualizar versão no `package.json`
- [ ] Testar todas as funcionalidades no build
- [ ] Verificar se não há logs de debug no console
- [ ] Testar instalação em máquina limpa
- [ ] Verificar tamanho dos arquivos
- [ ] Documentar requisitos de sistema no README
- [ ] (Opcional) Assinar código digitalmente
- [ ] Criar release notes

---

## 📝 Notas de Desenvolvimento

- **Hot Reload**: Apenas no `npm start`, não no build
- **DevTools**: Desabilitado automaticamente em produção
- **Source Maps**: Incluídos por padrão (pode desabilitar no webpack)
- **Electron versão**: 28.0.0 (Chromium 120)

---

## 🎯 Próximos Passos

1. **Configurar CI/CD** (GitHub Actions, CircleCI)
2. **Auto-update** com `electron-updater`
3. **Crash reporting** (Sentry, Bugsnag)
4. **Analytics** (opcional para métricas de uso)
5. **Publicar na Microsoft Store / Mac App Store**

---

**Pronto!** 🎉 Agora você pode distribuir o Guitar AI Pro para usuários Windows, macOS e Linux!
