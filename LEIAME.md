# Sistema de Consulta Legislativa

Uma aplicação web responsiva para consulta de Propostas de Emenda Constitucional (PEC) e Projetos de Lei (PL) da Câmara dos Deputados brasileira.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Consulta de Proposições**: Visualize PECs e PLs com informações detalhadas
- **Filtros Avançados**: Filtre por tipo (PEC/PL), status, autor, data e estado
- **Busca Inteligente**: Busque por título, resumo, número ou autor das proposições  
- **Visualização de Votos**: Veja como cada deputado votou em cada proposição
- **Informações dos Deputados**: Consulte dados dos deputados por partido e estado
- **Dark Mode**: Interface adaptável para modo claro e escuro
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### 📊 Dashboard
- Estatísticas em tempo real das proposições
- Contadores de votos por categoria (Favorável, Contrário, Abstenção, Ausente)
- Interface com abas para navegação entre proposições e deputados

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Estado**: React Hooks + TanStack Query
- **Roteamento**: React Router DOM
- **Tema**: next-themes (suporte a dark mode)
- **Cross-Platform**: Capacitor (para iOS e Android)

## 🎨 Design System

A aplicação utiliza um design system completo com:
- Cores semânticas (primary, secondary, success, warning, destructive)
- Modo escuro nativo com transições suaves
- Componentes reutilizáveis e acessíveis
- Tipografia hierárquica e legível

## 📱 Desenvolvimento Mobile

Esta aplicação está preparada para ser executada como app nativo usando Capacitor.

### Para compilar para mobile:

1. **Instale as dependências do Capacitor:**
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

2. **Inicialize o Capacitor:**
```bash
npx cap init
```

3. **Adicione as plataformas:**
```bash
npx cap add ios
npx cap add android
```

4. **Compile o projeto:**
```bash
npm run build
```

5. **Sincronize com as plataformas nativas:**
```bash
npx cap sync
```

6. **Execute no dispositivo:**
```bash
# Para iOS (requer macOS + Xcode)
npx cap run ios

# Para Android (requer Android Studio)
npx cap run android
```

## 🔧 Desenvolvimento

### Executar localmente:
```bash
npm install
npm run dev
```

### Estrutura do projeto:
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do shadcn/ui
│   ├── Header.tsx      # Cabeçalho com navegação
│   ├── SearchFilters.tsx # Sistema de filtros e busca
│   ├── ProposalCard.tsx # Card de proposição
│   ├── DeputyCard.tsx  # Card de deputado
│   └── VoteModal.tsx   # Modal de visualização de votos
├── hooks/              # Hooks customizados
│   └── usePoliticalData.ts # Hook para dados políticos
├── types/              # Definições de tipos TypeScript
│   └── political.ts    # Tipos das entidades políticas
└── pages/              # Páginas da aplicação
    └── Index.tsx       # Página principal
```

## 🌐 API Integration

Atualmente a aplicação usa dados mock para demonstração. Para integração com API real:

1. **Substitua o hook `usePoliticalData`** com chamadas reais à API
2. **Configure variáveis de ambiente** para URLs da API
3. **Implemente cache e paginação** conforme necessário
4. **Adicione tratamento de erros** e estados de loading

### Endpoints sugeridos:
- `GET /proposicoes` - Lista proposições com filtros
- `GET /deputados` - Lista deputados com filtros  
- `GET /votacoes/{proposicaoId}` - Votos de uma proposição
- `GET /deputados/{deputadoId}/votos` - Histórico de votos de um deputado

## 🚀 Deploy

### Para web:
```bash
npm run build
```

### Para mobile:
Siga os passos da seção "Desenvolvimento Mobile" acima.

## 📄 Licença

Este é um projeto de demonstração para consulta legislativa.