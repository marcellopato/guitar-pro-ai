# 🔄 Como Criar o Pull Request

## ✅ Você Pode Fazer o PR Agora!

A branch `bugfix/electron-production-blank-window` já está no GitHub com as correções.

---

## 📝 Passos para Criar o PR:

### **Opção 1: Via Link Direto**
Clique aqui:
👉 **https://github.com/marcellopato/guitar-pro-ai/pull/new/bugfix/electron-production-blank-window**

### **Opção 2: Via GitHub Web**
1. Acesse: https://github.com/marcellopato/guitar-pro-ai
2. Você verá um banner amarelo: **"bugfix/electron-production-blank-window had recent pushes"**
3. Clique no botão verde **"Compare & pull request"**

### **Opção 3: Via Aba Pull Requests**
1. Vá em https://github.com/marcellopato/guitar-pro-ai/pulls
2. Clique em **"New pull request"**
3. Em **"compare"**, selecione `bugfix/electron-production-blank-window`
4. Clique em **"Create pull request"**

---

## 📋 Informações para o PR:

### **Título:**
```
fix: Corrige janela vazia no Electron em produção
```

### **Descrição (copie e cole):**
```markdown
## 🐛 Problema
O executável `Guitar AI Pro.exe` abria uma janela em branco com menu padrão do Electron.

## 🔧 Correções Implementadas
- ✅ Remove menu padrão (`autoHideMenuBar` + `Menu.setApplicationMenu(null)`)
- ✅ Adiciona logs detalhados de debug para diagnóstico
- ✅ Corrige Content-Security-Policy no `index.html` para Electron
- ✅ Adiciona listener de `console-message` para capturar erros do renderer
- ✅ Abre DevTools temporariamente em produção para facilitar debug

## 🧪 Como Testar
1. Faça build: `npm run build:win`
2. Copie `dist/win-unpacked/` para Windows
3. Execute `Guitar AI Pro.exe`
4. Siga checklist em `TESTE-WINDOWS.md`

## 📸 Evidências
_Aguardando teste no Windows para confirmar correção_

## ✅ Checklist
- [x] Código commitado e testado localmente
- [x] Branch criada: `bugfix/electron-production-blank-window`
- [x] Documentação de teste criada (`TESTE-WINDOWS.md`)
- [ ] Testado no Windows (aguardando confirmação)
- [ ] Screenshots anexados

## 🔗 Issue Relacionada
Corrige problema de janela vazia ao executar build Windows do Electron.

---

**Notas:**
- DevTools está temporariamente habilitado em produção para debug
- Após confirmação de funcionamento, podemos removê-lo em novo commit
- Build atual: `dist/win-unpacked/Guitar AI Pro.exe` (169MB)
```

---

## 🎯 Depois de Criar o PR:

### **Se o teste no Windows FUNCIONAR:**
1. Comente no PR: "✅ Testado no Windows, funcionando perfeitamente!"
2. Anexe screenshots da interface funcionando
3. Faça merge do PR para `main`

### **Se ainda houver problemas:**
1. Siga o guia `TESTE-WINDOWS.md`
2. Comente no PR com prints e erros
3. Farei mais commits na mesma branch para corrigir
4. Não precisa criar novo PR, os commits aparecerão automaticamente

---

## 🚀 Após o Merge:

```bash
# Voltar para main e atualizar
git checkout main
git pull origin main

# Deletar branch local (opcional)
git branch -d bugfix/electron-production-blank-window

# Deletar branch remota (opcional, após merge)
git push origin --delete bugfix/electron-production-blank-window
```

---

**Pronto!** 🎉 Agora você pode criar o PR!
