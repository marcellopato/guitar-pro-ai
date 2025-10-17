# 🧪 Teste do Executável Windows - Guitar AI Pro

## 📋 Instruções de Teste

### 1️⃣ **Copiar Arquivos**
- Copie a pasta completa `dist/win-unpacked/` para o Desktop do Windows
- **Importante:** Copie a pasta INTEIRA, não só o .exe

### 2️⃣ **Executar**
- Entre na pasta `win-unpacked/`
- Execute `Guitar AI Pro.exe`
- Uma janela deve abrir

### 3️⃣ **Verificar Logs**
Quando o executável abrir, verifique:

#### No Console do Windows (se houver):
- Deve aparecer:
  ```
  PRODUCTION MODE
  __dirname: C:\Users\...\resources\app\electron
  indexPath: C:\Users\...\resources\app\build\index.html
  Loading URL: file:///C:/Users/.../resources/app/build/index.html
  Page loaded successfully!
  ```

#### Na janela do Electron:
- **DevTools está aberto** (console do navegador visível à direita)
- Verifique a aba **Console** do DevTools

### 4️⃣ **Cenários de Teste**

| # | Teste | Esperado | Status |
|---|-------|----------|--------|
| 1 | Janela abre | ✅ Janela 1200x800 visível | ⬜ |
| 2 | Interface carrega | ✅ Toolbar roxa, canvas, sem erros | ⬜ |
| 3 | Menu padrão | ✅ Sem menu File/Edit/View no topo | ⬜ |
| 4 | Console sem erros | ✅ Sem erros vermelhos no console | ⬜ |
| 5 | Canvas renderiza | ✅ 6 linhas de tablatura visíveis | ⬜ |
| 6 | Adicionar nota | ✅ Clique no canvas abre prompt de traste | ⬜ |
| 7 | Botão Play | ✅ Clique no Play toca som | ⬜ |

---

## 🐛 Se a janela ainda estiver vazia:

### **Verificar no Console do DevTools:**

1. **Erros de CSS/JS não carregando:**
   - Se houver `ERR_FILE_NOT_FOUND` ou `net::ERR_FILE_NOT_FOUND`
   - **Anote exatamente qual arquivo não foi encontrado**
   - Exemplo: `Failed to load resource: main.1e576f57.js`

2. **Erros de CSP (Content Security Policy):**
   - Se houver `Refused to load... because it violates the following Content Security Policy directive`
   - **Copie a mensagem completa**

3. **Outros erros:**
   - Qualquer texto vermelho no console
   - **Copie tudo**

### **Verificar estrutura de arquivos:**

Dentro de `win-unpacked/resources/`, deve existir:
```
resources/
├── app.asar              (arquivo compactado com o código)
└── app-update.yml
```

Extraia o `app.asar` (se possível) e verifique se dentro existe:
```
build/
├── index.html
├── static/
    ├── css/
    │   └── main.0d99877b.css
    └── js/
        └── main.1e576f57.js
```

---

## 📸 Screenshots Solicitados

Por favor tire prints de:

1. **Janela do app inteira** (com DevTools aberto)
2. **Aba Console do DevTools** (com todos os logs visíveis)
3. **Aba Network do DevTools** (se houver erros de carregamento)
4. **Estrutura da pasta** `win-unpacked/resources/` (Windows Explorer)

---

## 🔍 Informações Adicionais para Debug

**Me envie:**
- Versão do Windows (Win 10/11)
- Onde colocou a pasta (Desktop, Downloads, etc.)
- Prints conforme solicitado acima
- **CÓPIA EXATA** de qualquer erro vermelho no console

---

## ✅ Se funcionar corretamente:

**Você deve ver:**
- ✅ Interface roxa com toolbar no topo
- ✅ Canvas com 6 linhas (tablatura de guitarra)
- ✅ Botões: New, Open, Save, Play, Pause, Tempo -/+
- ✅ Sem menu File/Edit/View
- ✅ Ao clicar no canvas, popup pedindo número do traste
- ✅ Ao clicar Play, som de guitarra toca

**Nesse caso:**
- Tire um print da interface funcionando
- Confirme que todos os 7 testes passaram
- Podemos fechar o DevTools e fazer PR!

---

**Obrigado pelo teste!** 🎸✨
