Design a modern, high-converting, professional SaaS web application called "Currículo Express - AI Resume Builder & ATS Career Suite" for Desktop (1440px) and Mobile responsive.

### 🎨 DESIGN SYSTEM & VISUAL IDENTITY:
- Primary Color: #155491 (Deep Professional Blue - headers, brand buttons, structural accents)
- Accent Color: #f79633 (Vibrant Action Orange - AI sparkles, primary CTAs, highlight badges)
- Secondary Tint: #fcc284 (Soft Amber/Orange - borders, subtle badge backgrounds)
- Background: #F8FAFC (Clean Slate) with crisp #FFFFFF elevated cards (border-radius: 12px, soft box-shadow: 0 4px 14px rgba(0,0,0,0.05))
- Typography: Inter or Plus Jakarta Sans. Clean hierarchy, high legibility, professional line heights.

---

### 🖥️ CORE APP LAYOUT (2-COLUMN SPLIT DESKTOP):
1. HEADER BAR:
   - Left: Logo "Currículo Express" with an AI sparkle icon and subtitle "Gerador Inteligente & Otimizador ATS".
   - Center/Right Action Pills:
     • [📥 Importar Currículo/LinkedIn]
     • [🌡️ Termômetro ATS]
     • [🌐 Traduzir (EN/ES)]
     • [✉️ Carta de Apresentação]
     • [✨ Gemini IA: Ativo (Green indicator dot)]

2. STRATEGIC RESUME HEALTH BANNER (Top Full-width Widget):
   - Circular progress score badge (e.g. 85% "Estrutura Sólida para ATS").
   - Expandable alert pills: (🔴 1 Crítico, 🟡 2 Avisos, 🟢 5 Otimizados).
   - "Ver Recomendações" toggle with quick action links to form fields.

3. LEFT COLUMN (Form Builder with Structured Cards):
   - Card 1: Dados Pessoais (Nome, Foto/Avatar opcional, Idade, Estado Civil, Contatos com DDD, Cidade/UF sanitizados).
   - Card 2: Objetivo & Síntese Profissional (Input de Cargo com botão "Sugerir com IA", Textarea de Síntese com botão de destaque "✨ Gerar 3 Opções de Síntese com IA").
   - Card 3: Formação Acadêmica (Cards repetíveis de Grau, Curso, Instituição, Ano e Turno com botões [+ Adicionar Formação] e [Remover]).
   - Card 4: Experiências Profissionais (Cards repetíveis com Cargo, Empresa, Período e Descrição de Atividades com botão contextual "⚡ Melhorar com IA (STAR: Situação, Tarefa, Ação, Resultado)").
   - Card 5 & 6: Habilidades Dinâmicas (Nuvem de tags interativas de Hard & Soft Skills sugeridas em tempo real baseadas no cargo digitado, checkboxes com chips selecionáveis e input de outras skills).
   - Card 7: Informações Complementares (Idiomas, Certificações, Links GitHub/Portfólio).
   - Floating Action Dock: [🚀 Gerar Currículo] [✨ Revisar Ortografia & Tom] [📄 Exportar Word] [💾 Salvar].

4. RIGHT COLUMN (Sticky Live A4 Document Preview):
   - Realistic A4 sheet preview with realtime typed changes.
   - Clean typographic layout (Header com Nome grande, divisores elegantes em azul #155491, seções estruturadas).
   - Top preview toolbar: [🖨️ Imprimir / Salvar PDF] [📄 Baixar Word .docx] [🌐 Alternar Idioma (PT | EN | ES)] [✉️ Criar Carta de Apresentação].

---

### 🪄 THE 4 AI INTERACTIVE MODALS & OVERLAYS:

1. MODAL: "Gerador Inteligente de Síntese de Qualificações"
   - Header with sparkle emoji.
   - 3 distinct selection cards generated from user profile:
     a) 👔 Executivo / Foco em Resultados (Metrics, leadership, business impact).
     b) 💻 Técnico / Especialista (Tools, methodologies, technical execution).
     c) 🚀 Dinâmico / Criativo (Innovation, agility, culture fit).
   - Each card has a direct "✓ Aplicar esta Síntese" button.

2. MODAL: "Aprimoramento de Experiências (Metodologia STAR)"
   - Side-by-side comparison:
     • Left: Texto Original do Usuário.
     • Right: Versão Otimizada com IA (Verbos de ação no passado, estrutura Situação-Tarefa-Ação-Resultado).
   - Metrics highlight chips (ex: "+35% de produtividade", "redução de custos").
   - Button: "✓ Substituir no Currículo".

3. MODAL: "Revisão Ortográfica, Gramatical e de Tom"
   - Interactive checklist of suggestions categorized into: Gramática, Tom Corporativo e Clareza.
   - Diff highlight view showing before/after text corrections.
   - Button: "✓ Aplicar Todas as Correções".

4. MODAL: "Termômetro de Vaga & Otimizador ATS (Applicant Tracking System)"
   - Input Box: "Cole aqui a descrição ou requisitos da vaga anunciada".
   - Score Gauge: Large radial score ring (0-100%) with compatibility diagnosis tag ("Alta Compatibilidade", "Média", "Baixa").
   - Banner: "🎯 Cargo Recomendado para o ATS" with 1-click button [🎯 Aplicar Cargo ao Currículo].
   - 2-Column Keywords Matcher:
     • Left (Verde): Palavras-chave Encontradas no Currículo (chips com checkmark ✓).
     • Right (Laranja/Vermelho): Palavras-chave Ausentes na vaga (com botões [+ Adicionar às Skills] em 1 clique).
   - Step-by-step Action Plan Grid: 4 practical cards (Objetivo, Resumo, Experiências STAR, Cursos) with guidance on how to beat recruiting bots.

5. MODAL: "Exportação Avançada (Tradução em 1 Clique & Carta de Apresentação)"
   - Tab 1: Tradução em 1 Clique (Seletores de bandeira 🇺🇸 English / 🇪🇸 Español, preservação de jargões técnicos, botões [Aplicar no Form] e [Exportar PDF Traduzido]).
   - Tab 2: Gerador de Carta de Apresentação (Cover Letter) (Seletores de Tom [👔 Executivo, 🚀 Moderno, 💻 Técnico], Editor rico com carta gerada, botões [📋 Copiar Texto], [📄 Baixar Word .docx] e [🖨️ Imprimir]).

---

### 📱 UI STATES & MICRO-INTERACTIONS:
- Shimmer loading skeletons with pulsing AI gradient (#155491 to #f79633) when generating text.
- Toast notification pills ("✓ Habilidade adicionada com sucesso!", "✓ Tradução aplicada!").
- High-contrast accessible text, clean input borders with subtle orange active focus ring.