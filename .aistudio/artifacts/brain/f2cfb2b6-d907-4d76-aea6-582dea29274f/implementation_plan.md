# Padronização e Automatização Inteligente de Relatórios (SIGEP)

Este plano detalha a implementação de um sistema centralizado e inteligente para a geração de relatórios e balanços institucionais no SIGEP, integrando IA para análise automática de dados e seleção de formatos visuais (gráficos, tabelas, indicadores).

## User Review & Critical Decisions

> [!IMPORTANT]
> A implementação utilizará uma abordagem baseada em IA para transformar dados brutos em documentos prontos para assinatura e arquivo.

- **Processamento**: Análise server-side (API Route) via Gemini 3.8 Flash para garantir segurança e consistência.
- **Visualização**: Implementação de `Recharts` para gráficos interativos e dinâmicos.
- **Automação**: O sistema decidirá automaticamente (IA) o formato ideal para cada secção:
    - Tendências Temporais -> Gráficos de Linha.
    - Comparações/Distribuições -> Gráficos de Barras/Circulares.
    - Dados Numéricos brutos -> Tabelas.
    - Indicadores Chave -> Cartões KPI.

## 1. Overview & Core Concept

- **O que faz**: Transforma dados brutos do Firestore em relatórios institucionais completos, profissionais e coerentes com a identidade visual da instituição.
- **Público-alvo**: Gestores, Diretores e Técnicos.
- **Valor Principal**: Conversão automática de dados em conhecimento estratégico, reduzindo o tempo de elaboração de relatórios de horas para segundos.

## 2. User Experience & Visual Design

- **Identidade Visual**: Continua a seguir o padrão normativo (cabeçalho, rodapé, fontes institucionais) definido anteriormente, agora expandido para suportar componentes visuais complexos.
- **Componentes**: 
    - `ReportAIProcessor`: Serviço Node.js/Express que consome os dados e estrutura o documento JSON com as recomendações da IA.
    - `ReportVisualizer`: Componente React que renderiza a estrutura JSON (tabelas, gráficos, texto).
    - `Recharts` + `DynamicReportTable`: Motores de renderização gráfica e tabular.

## 3. Key Product Decisions & Trade-Offs

- **IA (Gemini) na Seleção de Formato**:
    - *Porquê*: Automatiza a tomada de decisão sobre "como melhor apresentar este dado".
    - *Alternativa*: Lógica hardcoded. *Decisão*: IA escolhida pela flexibilidade e capacidade de lidar com dados heterogêneos.
- **Server-Side Rendering de Estrutura**:
    - *Porquê*: Centralização da lógica de negócio e segurança dos dados.

## 4. Technical Architecture & Data Strategy

```text
[Firestore] --> [API Route: /api/report/analyze]
                           │
                           ▼
                  [Gemini 3.8 Flash]
                  (Analisa dados e decide:
                   Texto / Tabela / Gráfico)
                           │
                           ▼
[ReportVisualizer (React)] <── [JSON Schema: {sectionTitle, elementType, data}]
```

- **Data Model**: O Firestore mantém a "verdade" (recursos humanos, execuções, orçamento). A API de relatórios consulta esses dados, passa pelo Gemini para obter o "layout" e retorna o documento formatado.
- **State Management**: A visualização do relatório é construída a partir da estrutura JSON retornada pela API, garantindo preenchimento total e ausência de campos vazios.
