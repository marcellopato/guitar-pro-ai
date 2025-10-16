# 🤝 Guia de Contribuição - Guitar AI Pro

Obrigado por considerar contribuir com o Guitar AI Pro! Este documento fornece diretrizes para tornar o processo de contribuição eficiente e agradável para todos.

## 📋 Índice

- [Código de Conduta](#-código-de-conduta)
- [Como Posso Contribuir?](#-como-posso-contribuir)
- [Configuração do Ambiente](#️-configuração-do-ambiente)
- [Processo de Desenvolvimento](#-processo-de-desenvolvimento)
- [Padrões de Código](#-padrões-de-código)
- [Testes](#-testes)
- [Pull Request Process](#-pull-request-process)

## 📜 Código de Conduta

### Nosso Compromisso

Nós, como membros, contribuidores e líderes, nos comprometemos a tornar a participação em nossa comunidade uma experiência livre de assédio para todos.

### Comportamentos Esperados

✅ Use linguagem acolhedora e inclusiva  
✅ Respeite diferentes pontos de vista  
✅ Aceite críticas construtivas  
✅ Foque no que é melhor para a comunidade  
✅ Mostre empatia com outros membros  

### Comportamentos Inaceitáveis

❌ Linguagem ou imagens sexualizadas  
❌ Comentários insultuosos/depreciativos  
❌ Assédio público ou privado  
❌ Publicar informações privadas de outros  
❌ Outras condutas antiéticas ou não profissionais  

## 🎯 Como Posso Contribuir?

### 1. Reportando Bugs

Antes de criar um bug report:
- Verifique se já não existe um issue similar
- Colete informações sobre o problema
- Tente reproduzir o bug de forma consistente

**Template de Bug Report:**

```markdown
**Descrição do Bug**
Descrição clara do problema.

**Como Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que você esperava que acontecesse.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - SO: [e.g. Windows 11]
 - Versão: [e.g. 0.1.0]
 - Electron: [e.g. 27.0.0]

**Contexto Adicional**
Qualquer outra informação relevante.
```

### 2. Sugerindo Funcionalidades

**Template de Feature Request:**

```markdown
**Sua feature resolve um problema?**
Descrição clara do problema.

**Descreva a solução**
Como você imagina que a feature funcionaria.

**Alternativas consideradas**
Outras soluções que você pensou.

**Contexto adicional**
Screenshots, mockups, etc.
```

### 3. Contribuindo com Código

#### Tipos de Contribuições

- 🐛 **Bug Fixes**: Correções de bugs
- ✨ **Features**: Novas funcionalidades
- 📝 **Docs**: Melhorias na documentação
- 🎨 **UI/UX**: Melhorias visuais
- ⚡ **Performance**: Otimizações
- ♻️ **Refactoring**: Refatoração de código

## 🛠️ Configuração do Ambiente

### Pré-requisitos

```bash
node --version  # >= 16.x
npm --version   # >= 8.x
git --version   # >= 2.x
```

### Fork e Clone

```bash
# 1. Fork no GitHub (clique no botão Fork)

# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/guitar-ai-pro.git
cd guitar-ai-pro

# 3. Adicione upstream
git remote add upstream https://github.com/ORIGINAL/guitar-ai-pro.git

# 4. Instale dependências
npm install

# 5. Crie branch de desenvolvimento
git checkout -b feature/minha-feature
```

### Verificação da Instalação

```bash
# Teste se tudo está funcionando
npm start

# Execute os testes
npm test

# Verifique linting
npm run lint
```

## 🔄 Processo de Desenvolvimento

### 1. Workflow Git

```bash
# Sempre comece do main atualizado
git checkout main
git pull upstream main

# Crie uma branch descritiva
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug

# Faça suas alterações
# ...

# Adicione e commite
git add .
git commit -m "feat: adiciona funcionalidade X"

# Push para seu fork
git push origin feature/nome-da-feature
```

### 2. Convenção de Branches

```
main              → Branch principal (sempre estável)
develop           → Branch de desenvolvimento
feature/xxx       → Nova funcionalidade
fix/xxx           → Correção de bug
docs/xxx          → Documentação
refactor/xxx      → Refatoração
test/xxx          → Adição de testes
chore/xxx         → Tarefas de manutenção
```

### 3. Convenção de Commits

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Tarefas de build/CI

**Exemplos:**

```bash
# Bom
git commit -m "feat(tabeditor): adiciona suporte a palm mute"
git commit -m "fix(audio): corrige latência no playback"
git commit -m "docs(readme): atualiza instruções de instalação"

# Ruim
git commit -m "alterações"
git commit -m "fix stuff"
git commit -m "WIP"
```

## 📝 Padrões de Código

### JavaScript/React

```javascript
// ✅ BOM: Componentes funcionais com hooks
import React, { useState, useEffect } from 'react';

const MeuComponente = ({ prop1, prop2 }) => {
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  return <div>{estado}</div>;
};

export default MeuComponente;

// ❌ RUIM: Componentes de classe
class MeuComponente extends React.Component {
  // ...
}
```

```javascript
// ✅ BOM: Naming conventions
const handleClick = () => {};
const isVisible = true;
const userList = [];

// ❌ RUIM
const click = () => {};
const visible = true;
const users = [];
```

```javascript
// ✅ BOM: Destructuring
const { name, age } = user;
const [first, second] = array;

// ❌ RUIM
const name = user.name;
const age = user.age;
```

### CSS

```css
/* ✅ BOM: BEM naming */
.tab-editor {}
.tab-editor__canvas {}
.tab-editor__canvas--active {}

/* ❌ RUIM */
.editor {}
.canvas {}
.active {}
```

## 🧪 Testes

### Estrutura de Testes

```javascript
// ComponentName.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<ComponentName />);
    });

    it('should display correct title', () => {
      render(<ComponentName title="Test" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const mockClick = jest.fn();
      render(<ComponentName onClick={mockClick} />);
      
      fireEvent.click(screen.getByRole('button'));
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

### Cobertura de Testes

Mantenha cobertura mínima de:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

```bash
# Verificar cobertura
npm run test:coverage
```

## 📤 Pull Request Process

### 1. Antes de Abrir

```bash
# Atualize com main
git checkout main
git pull upstream main
git checkout sua-branch
git rebase main

# Garanta que tudo funciona
npm test
npm run lint
npm run build
```

### 2. Template de PR

```markdown
## Descrição
Breve descrição das mudanças.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Passo 3

## Checklist
- [ ] Testes passando
- [ ] Código lintado
- [ ] Documentação atualizada
- [ ] Screenshots (se aplicável)

## Issues Relacionadas
Fixes #123
Closes #456
```

### 3. Processo de Revisão

1. **Automated Checks**: CI roda testes automaticamente
2. **Code Review**: Mantenedor revisa o código
3. **Requested Changes**: Faça as alterações solicitadas
4. **Approval**: PR aprovado
5. **Merge**: Mantenedor faz merge

## 🎓 Recursos

### Aprendizado

- [React Docs](https://react.dev/)
- [Electron Docs](https://www.electronjs.org/docs)
- [Tone.js Guide](https://tonejs.github.io/)
- [Magenta.js Demos](https://magenta.tensorflow.org/demos)

### Ferramentas

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

**Obrigado por contribuir! 🎸🎵**
