import{r as l,J as e}from"./vendor-CKDP3h5W.js";import{P as C,S as j}from"./index-BcpVniBo.js";import{a as I}from"./vendor-docs--0J9jijb.js";import{$ as D,j as S,p as A,aj as T,a4 as G,F as z,a3 as y,ag as p,l as q}from"./vendor-ui-libs-ofQMEQuw.js";import"./vendor-firebase-DdavSEpz.js";const R=()=>[{id:"capa",title:"1. Capa",content:"Título do projeto: Desenvolvimento do Sistema Integrado de Gestão de Processos (SIGEP). Autor: Franzissi Tripalonga Vicente (Slaiter Tripas). Instituição: Instituto Superior Politécnico de Songo (ISPS). Curso: Engenharia Informática / Informática Aplicada. Local: Songo, Moçambique. Data: Setembro, 2026."},{id:"folha-rosto",title:"Folha de Rosto",content:"Título do projeto: Desenvolvimento e Fundamentação Teórica do SIGEP. Autor: Franzissi Tripalonga Vicente (Slaiter Tripas). Orientador: Corpo Docente & Comissão de Avaliação. Instituição: Instituto Superior Politécnico de Songo (ISPS)."},{id:"indice",title:"Índice",content:"Estrutura detalhada de todas as seções e subseções do projeto com suas respectivas paginações."},{id:"resumo",title:"Resumo",content:`Este projeto detalha o desenvolvimento e a implementação do Sistema Integrado de Gestão de Processos (SIGEP) em uma instituição de ensino superior. O SIGEP é uma plataforma tecnológica de última geração, concebida para mitigar as ineficiências decorrentes de processos de gestão manual e descentralizados.

A metodologia baseia-se numa arquitetura cloud-native, utilizando a infraestrutura robusta do Firebase/Firestore para assegurar alta disponibilidade, escalabilidade multi‑tenant e segurança rigorosa dos dados. O sistema automatiza fluxos de trabalho complexos, integra módulos de gestão de pessoal, ativos e planeamento orçamental, e incorpora algoritmos avançados de Inteligência Artificial para suporte à tomada de decisão estratégica e analítica.

Além disso, o SIGEP estrutura o processo de planificação institucional, permitindo a definição de metas, indicadores e cronogramas; implementa mecanismos de monitoria contínua, com dashboards dinâmicos e cores de alerta para avaliar o desempenho em tempo real; e disponibiliza ferramentas de geração automática de relatórios, que consolidam dados estatísticos e diagnósticos inteligentes para apoiar auditorias e decisões estratégicas.

Os resultados esperados incluem uma redução significativa no tempo de tramitação administrativa, eliminação de redundâncias, aumento da transparência institucional através de trilhas de auditoria imutáveis e a criação de uma base sólida para a transformação digital contínua, promovendo a excelência na administração acadêmica e científica.`},{id:"abstract",title:"Abstract",content:`This project details the development and implementation of the Integrated Process Management System (SIGEP) in a higher education institution. SIGEP is a next‑generation technological platform designed to mitigate inefficiencies arising from manual and decentralized management processes.

The methodology is based on a cloud‑native architecture, leveraging the robust infrastructure of Firebase/Firestore to ensure high availability, multi‑tenant scalability, and strict data security. The system automates complex workflows, integrates modules for personnel management, asset control, and budget planning, and incorporates advanced Artificial Intelligence algorithms to support strategic and analytical decision‑making.

In addition, SIGEP structures the institutional planning process, enabling the definition of goals, indicators, and timelines; implements mechanisms for continuous monitoring, with dynamic dashboards and alert signals to evaluate performance in real time; and provides tools for automatic report generation, consolidating statistical data and intelligent diagnostics to support audits and strategic decisions.

The expected results include a significant reduction in administrative processing time, elimination of redundancies, increased institutional transparency through immutable audit trails, and the creation of a solid foundation for continuous digital transformation, thereby promoting excellence in academic and scientific administration.`},{id:"introducao",title:"2. Introdução",content:`O avanço das tecnologias digitais tem transformado profundamente os processos administrativos e científicos, exigindo soluções que conciliem eficiência operacional, segurança da informação e transparência institucional. Em Moçambique, como em diversos países em desenvolvimento, a gestão documental enfrenta desafios históricos: morosidade na tramitação, duplicidade de registros, ausência de mecanismos confiáveis de autenticação e dificuldade de integração entre diferentes órgãos e instituições.

Nesse contexto, a Lei n.º 8/2024, de 7 de junho, aprovada pela Assembleia da República e publicada no Boletim da República, estabelece o regime jurídico da tramitação eletrónica de processos jurisdicionais e cria o Centro de Gestão de Tecnologias do Sector da Justiça (CGTSJ). Esta lei representa um marco histórico, pois garante:

• Celeridade processual e redução de custos administrativos;
• Interoperabilidade entre sistemas institucionais;
• Disponibilidade, integridade, confidencialidade e autenticidade da informação digital;
• Legitimidade jurídica para plataformas como o SIGEP, que se alinham às políticas nacionais de modernização e digitalização.

O SIGEP – Sistema Integrado de Gestão de Processos surge, portanto, como uma proposta inovadora e científica, concebida para responder às necessidades contemporâneas de gestão integrada e digitalização documental. O sistema adota uma arquitetura multi‑tenant, permitindo que múltiplas instituições utilizem a mesma plataforma de forma simultânea, mantendo isolamento e confidencialidade dos dados.

Além da arquitetura, o SIGEP incorpora Inteligência Artificial aplicada em módulos estratégicos e disponibiliza um conjunto de menus funcionais que ampliam sua aplicabilidade:

• Gestão Acadêmica: geração automática de horários em todos os períodos com apenas um clique;
• Planificação: definição de metas, indicadores e cronogramas;
• Monitoria: acompanhamento contínuo com dashboards dinâmicos e alertas;
• Relatórios: geração automática de relatórios estatísticos e diagnósticos inteligentes;
• Gestão de Expedientes: tramitação digital com trilhas de auditoria imutáveis;
• Comunicação Intersetorial: chat integrado para colaboração;
• Segurança Criptográfica: autenticação de relatórios via QR Codes e hash;
• Gestão Hierárquica de Perfis: controle granular de acessos.

A relevância científica deste projeto reside na demonstração prática de como tecnologias emergentes podem ser aplicadas em ambientes administrativos e acadêmicos, promovendo compliance digital, redução de custos operacionais e maior confiança institucional. O SIGEP não se limita a ser uma ferramenta tecnológica; ele representa um modelo replicável de inovação científica, capaz de ser adaptado a universidades, ministérios, empresas privadas e organizações internacionais.

Do ponto de vista acadêmico, o estudo do SIGEP contribui de forma abrangente para a modernização da gestão institucional. Entre os principais módulos e funcionalidades destacam‑se:

• Gestão de Horários: geração automática de horários em todos os períodos com apenas um clique, otimizando a organização acadêmica e reduzindo erros manuais;
• Planificação: definição de metas, indicadores e cronogramas, permitindo que instituições alinhem seus objetivos estratégicos com a execução prática;
• Monitoria: acompanhamento contínuo do desempenho institucional por meio de dashboards dinâmicos, alertas visuais e relatórios comparativos em tempo real;
• Geração de Relatórios: produção automática de relatórios estatísticos, balanços mensais e anuais, e diagnósticos inteligentes para auditorias e tomada de decisão;
• Gestão Documental: digitalização e organização de expedientes internos, com trilhas de auditoria imutáveis que asseguram transparência e rastreabilidade;
• Emissão e Recepção de Expedientes: tramitação eletrónica de documentos oficiais, garantindo celeridade e conformidade com a Lei n.º 8/2024, que regula a digitalização e tramitação eletrónica em Moçambique;
• Chat Interno: comunicação intersetorial integrada, promovendo colaboração entre departamentos e reduzindo falhas de informação;
• Integração Digital: interoperabilidade entre diferentes órgãos e instituições, assegurando isolamento e confidencialidade dos dados em arquitetura multi‑tenant.

Este conjunto de funcionalidades permite discutir não apenas os ganhos práticos da digitalização — como eficiência, redução de custos e maior transparência — mas também os limites e desafios da sua implementação em contextos institucionais complexos.`},{id:"justificativa",title:"3. Justificativa",content:`A implementação do SIGEP – Sistema Integrado de Gestão de Processos justifica‑se pela necessidade urgente de modernizar os processos de planificação, gestão documental e institucional em Moçambique, especialmente nas Instituições de Ensino Superior (IES), alinhando‑os às exigências contemporâneas de eficiência, segurança e transparência.

Historicamente, a tramitação de documentos em ambientes administrativos tem sido marcada por morosidade, duplicidade de registros e fragilidade na autenticação, fatores que comprometem a confiabilidade das informações e dificultam a integração entre diferentes órgãos. Esse cenário gera custos elevados, baixa produtividade e reduz a credibilidade institucional perante a sociedade.

O marco legal que sustenta esta transformação é a Lei n.º 8/2024, de 7 de junho, que aprova a tramitação eletrónica de processos jurisdicionais e estabelece princípios de celeridade, interoperabilidade e autenticidade digital. Esta legislação legitima plataformas como o SIGEP, garantindo que a digitalização documental esteja em conformidade com os padrões jurídicos nacionais.

O SIGEP propõe uma solução inovadora ao combinar:

• Arquitetura multi‑tenant, que garante isolamento e confidencialidade dos dados entre instituições, permitindo interoperabilidade segura;
• Inteligência Artificial aplicada, com algoritmos para remoção de fundo em assinaturas digitais e autenticação criptográfica de relatórios;
• Gestão hierárquica de perfis, assegurando controle granular de acessos e responsabilidades;
• Menus funcionais integrados, incluindo:
  - Gestão Acadêmica (geração automática de horários em todos os períodos);
  - Planificação (metas, indicadores e cronogramas);
  - Monitoria (dashboards dinâmicos e alertas em tempo real);
  - Relatórios (estatísticos, mensais e anuais, com diagnósticos inteligentes);
  - Emissão e Recepção de Expedientes (tramitação digital com trilhas de auditoria imutáveis);
  - Chat Interno (comunicação intersetorial segura e colaborativa).

📌 Impactos

Do ponto de vista prático:
• Redução significativa do tempo de tramitação documental;
• Eliminação de duplicidade e sobreposição de dados;
• Fortalecimento da confiança institucional por meio de autenticação avançada;
• Sustentabilidade digital com menor custo de manutenção em cloud.

Do ponto de vista teórico e científico:
• Avanço na literatura sobre sistemas multi‑tenant aplicados à gestão pública;
• Exploração da aplicação de IA em processos administrativos, ampliando o campo de pesquisa em ciência da informação;
• Oferta de um modelo replicável para universidades, ministérios e empresas privadas, consolidando a integração entre tecnologia e gestão.`},{id:"objetivos",title:"4. Objetivos",content:`🎯 Objetivo Geral
Validar e implementar o SIGEP – Sistema Integrado de Gestão de Processos como uma plataforma tecnológica e científica capaz de modernizar a gestão documental e institucional em Moçambique, assegurando eficiência, segurança, transparência e conformidade legal com a Lei n.º 8/2024.

📌 Objetivos Específicos

• Gestão Acadêmica: Automatizar a geração de horários em todos os períodos com apenas um clique, otimizando a organização de turmas e docentes.

• Planificação Institucional: Estruturar metas, indicadores e cronogramas, garantindo alinhamento estratégico entre objetivos e execução.

• Monitoria em Tempo Real: Implementar dashboards dinâmicos e alertas visuais para acompanhar o desempenho institucional e assegurar conformidade.

• Geração de Relatórios: Produzir relatórios estatísticos, mensais e anuais, com diagnósticos inteligentes que apoiem auditorias e decisões estratégicas.

• Gestão Documental e Expedientes: Digitalizar e organizar processos internos, assegurando emissão e recepção eletrónica de expedientes com trilhas de auditoria imutáveis.

• Comunicação Intersetorial: Integrar chat interno para colaboração entre departamentos, reduzindo falhas de informação e aumentando a eficiência organizacional.

• Segurança Criptográfica e Autenticação: Aplicar algoritmos de IA para remoção de fundo em assinaturas digitais e autenticação criptográfica de relatórios via QR Codes e hash.

• Gestão Hierárquica de Perfis: Garantir controle granular de acessos e responsabilidades entre administradores gerais, institucionais e colaboradores.

• Interoperabilidade e Sustentabilidade Digital: Assegurar integração entre diferentes órgãos e instituições, com arquitetura multi‑tenant que reduz custos e promove sustentabilidade em cloud.`},{id:"revisao-bibliografica",title:"5. Revisão Bibliográfica",content:`
**1.** Gestão Documental e Arquivos em Moçambique: O Governo aprovou a Estratégia Nacional para a Gestão de Documentos e Arquivos do Estado, reconhecendo que a área não acompanhou a evolução tecnológica e carece de normas uniformes, formação de técnicos e informatização dos sistemas. A gestão documental é vista como instrumento chave de apoio à administração, cultura e desenvolvimento científico, mas enfrenta problemas de subfinanciamento e falta de recursos humanos qualificados.
**2.** Princípios Arquivísticos e Diplomáticos: Estudos da Universidade Eduardo Mondlane (UEM) analisam a aplicação de princípios arquivísticos e diplomáticos em sistemas de gestão documental, como no CEDSIF. Foram identificadas inconsistências na classificação documental, mas também avanços como metadados automáticos, níveis de confidencialidade e uso de assinaturas digitais, que reforçam autenticidade e integridade. Esses princípios são essenciais para o SIGEP, pois garantem que relatórios e expedientes tenham validade legal e científica.
**3.** Legislação e Normas Arquivísticas: A legislação moçambicana, como o Sistema Nacional de Arquivos do Estado (SNAE) e a Lei do Direito à Informação (Lei n.º 34/2014), estabelece diretrizes para gestão documental. Contudo, muitas instituições ainda não aderem plenamente às normas, enfrentando desafios como falta de infraestrutura, escassez de técnicos especializados e fraca monitoria institucional. O fortalecimento do SNAE e a capacitação contínua são apontados como condições indispensáveis para preservar a memória institucional e melhorar a governação pública.
**4.** Relevância para o SIGEP: O SIGEP, ao integrar gestão de planificação, gestão de expedientes, relatórios de monitoria em tempo real, comunicação interna via chat e gestão de agendamento, responde diretamente às lacunas identificadas na literatura: a) Planificação: supera a ausência de modelos uniformes de organização documental; b) Expedientes: garante tramitação eficiente e rastreável; c) Relatórios em tempo real: fortalecem a monitoria institucional e a tomada de decisão baseada em dados; d) Chat interno: promove comunicação ágil e reduz falhas informacionais; e) Agendamento: organiza compromissos e sincroniza atividades, aumentando a produtividade.
**5.** Síntese: A revisão bibliográfica confirma que a gestão documental em Moçambique está em processo de transformação, mas ainda enfrenta desafios estruturais. O SIGEP posiciona‑se como uma resposta científica e prática, alinhada às normas arquivísticas e às necessidades de modernização administrativa.`},{id:"metodologia",title:"6. Metodologia",content:`5.1 Tipo de Pesquisa
• Natureza: aplicada e exploratória, com foco em inovação tecnológica e gestão institucional.
• Abordagem: qualitativa e quantitativa, permitindo análise de desempenho e impacto prático.

5.2 Procedimentos Metodológicos

Levantamento de Requisitos
• Entrevistas com gestores acadêmicos e administrativos;
• Análise documental dos processos existentes (planificação, expedientes, relatórios).

Modelagem do Sistema
• Definição da arquitetura cloud‑native multi‑tenant;
• Estruturação dos módulos:
  - Gestão Acadêmica (horários automáticos);
  - Planificação (metas, indicadores, cronogramas);
  - Monitoria (dashboards e alertas);
  - Relatórios (estatísticos e diagnósticos);
  - Gestão Documental (emissão e recepção de expedientes);
  - Chat Interno (comunicação intersetorial).

Implementação Tecnológica
• Uso do Firebase/Firestore para dados e autenticação;
• Integração de Inteligência Artificial para:
  - Remoção de fundo em assinaturas digitais;
  - Autenticação criptográfica de relatórios (QR Codes e hash);
• Configuração de perfis hierárquicos de acesso.

Testes e Validação
• Testes funcionais em ambiente institucional piloto;
• Validação da conformidade com a Lei n.º 8/2024 (tramitação eletrónica);
• Avaliação da interoperabilidade entre órgãos e departamentos.

5.3 Indicadores de Avaliação
• Eficiência: tempo médio de tramitação documental antes e depois do SIGEP;
• Transparência: número de relatórios autenticados e auditáveis;
• Produtividade: redução de duplicidade de registros e sobreposição de dados;
• Sustentabilidade: custos de manutenção em cloud comparados ao modelo tradicional;
• Aceitação Institucional: feedback de gestores e colaboradores sobre usabilidade.

5.4 Cronograma
• Fase 1: Levantamento e modelagem (2 meses);
• Fase 2: Implementação tecnológica (3 meses);
• Fase 3: Testes e validação (2 meses);
• Fase 4: Ajustes finais e documentação científica (1 mês).`},{id:"plano-trabalho",title:"7. Plano de Trabalho",content:"Etapa 1: Levantamento de requisitos. Etapa 2: Modelagem do banco de dados e fluxos (DAGs). Etapa 3: Desenvolvimento de módulos (Auth, Workflow, Reports). Etapa 4: Testes de carga e validação de segurança. Cronograma de 6 meses."},{id:"resultados-esperados",title:"8. Resultados Esperados",content:`📊 Resultados Quantitativos

• Redução do tempo de tramitação documental em até 60%, comparando processos manuais com fluxos digitais automatizados;
• Eliminação de duplicidade de registros e sobreposição de dados, garantindo maior consistência informacional;
• Aumento da produtividade institucional, medido pelo número de expedientes processados por período;
• Disponibilidade imediata de relatórios estatísticos e diagnósticos, gerados automaticamente em segundos;
• Redução de custos operacionais com manutenção documental e logística, graças à arquitetura cloud‑native.

📈 Resultados Qualitativos

• Gestão Acadêmica otimizada, com geração automática de horários em todos os períodos com apenas um clique;
• Planificação institucional estruturada, com metas, indicadores e cronogramas integrados em dashboards dinâmicos;
• Monitoria contínua, com alertas visuais e relatórios comparativos em tempo real;
• Gestão documental digitalizada, assegurando emissão e recepção eletrónica de expedientes com trilhas de auditoria imutáveis;
• Comunicação intersetorial fortalecida, através do chat interno que promove colaboração entre departamentos;
• Segurança criptográfica avançada, com autenticação de relatórios via QR Codes e hash;
• Gestão hierárquica de perfis, garantindo controle granular de acessos e responsabilidades;
• Interoperabilidade institucional, assegurada pela arquitetura multi‑tenant, com isolamento e confidencialidade dos dados.

📌 Impacto Institucional

• Modernização da gestão de processos administrativos e acadêmicos, com exceção da área financeira;
• Fortalecimento da credibilidade institucional perante a sociedade, em conformidade com a Lei n.º 8/2024 sobre digitalização e tramitação eletrónica;
• Criação de um modelo replicável para universidades, ministérios e empresas privadas;
• Consolidação da integração entre tecnologia, gestão e legislação, promovendo inovação e sustentabilidade digital.`},{id:"discussao",title:"9. Discussão",content:`A implementação do SIGEP – Sistema Integrado de Gestão de Processos representa um avanço significativo na modernização da gestão institucional em Moçambique. Os resultados esperados apontam para ganhos expressivos em eficiência, transparência e confiabilidade, mas também revelam limites e desafios que merecem análise crítica.

7.1 Comparação com o Cenário Tradicional
• Antes do SIGEP: os processos eram marcados por morosidade, duplicidade de registros e fragilidade na autenticação documental.
• Com o SIGEP: há redução do tempo de tramitação, eliminação de redundâncias e fortalecimento da confiança institucional por meio de autenticação criptográfica e trilhas de auditoria imutáveis.

7.2 Alinhamento com a Legislação
A Lei n.º 8/2024, que aprova a tramitação eletrónica de processos em Moçambique, legitima o uso de plataformas digitais como o SIGEP. A conformidade legal fortalece a credibilidade institucional e garante que a digitalização não seja apenas uma inovação tecnológica, mas também uma exigência normativa.

7.3 Impactos Positivos
• Gestão Acadêmica: geração automática de horários em todos os períodos com apenas um clique, otimizando a organização de turmas e docentes;
• Planificação e Monitoria: dashboards dinâmicos permitem acompanhar metas e indicadores em tempo real;
• Gestão Documental: emissão e recepção eletrónica de expedientes com rastreabilidade total;
• Comunicação Interna: chat intersetorial promove colaboração e reduz falhas de informação;
• Segurança: autenticação criptográfica de relatórios assegura integridade e confiabilidade.

7.4 Limites e Desafios
• Infraestrutura tecnológica: a dependência de conectividade estável pode limitar a eficácia em regiões com acesso precário à internet;
• Capacitação de usuários: a adoção plena exige treinamento contínuo de gestores e colaboradores;
• Resistência cultural: a transição de processos manuais para digitais pode enfrentar resistência em ambientes institucionais tradicionais;
• Escopo funcional: embora o SIGEP cubra todos os processos administrativos e acadêmicos, não abrange a área financeira, o que pode exigir integração com sistemas complementares.

7.5 Perspectivas Futuras
• Expansão do SIGEP para integração com sistemas financeiros e de recursos humanos;
• Aplicação de Inteligência Artificial avançada para análise preditiva de desempenho institucional;
• Replicação do modelo em universidades, ministérios e empresas privadas, consolidando o SIGEP como referência em gestão digital.`},{id:"conclusao",title:"10. Conclusão",content:`O SIGEP – Sistema Integrado de Gestão de Processos demonstra ser uma solução tecnológica e científica capaz de transformar profundamente a gestão institucional em Moçambique. Sua implementação responde aos desafios históricos da tramitação documental — morosidade, duplicidade de registros e fragilidade na autenticação — ao oferecer uma plataforma digital que garante eficiência, transparência e segurança.

A conformidade com a Lei n.º 8/2024, que regula a tramitação eletrónica de processos, legitima o SIGEP como instrumento alinhado às políticas nacionais de modernização administrativa. Assim, o sistema não apenas atende às exigências legais, mas também fortalece a credibilidade institucional perante a sociedade.

Do ponto de vista prático, o SIGEP contribui para:

• Gestão Acadêmica eficiente, com geração automática de horários em todos os períodos;
• Planificação estruturada, apoiada por metas, indicadores e cronogramas;
• Monitoria contínua, com dashboards dinâmicos e alertas em tempo real;
• Relatórios inteligentes, que consolidam dados estatísticos e diagnósticos para auditorias e decisões estratégicas;
• Gestão documental digitalizada, assegurando emissão e recepção de expedientes com rastreabilidade total;
• Comunicação intersetorial eficaz, por meio de chat interno integrado;
• Segurança criptográfica avançada, garantindo autenticidade e integridade dos documentos.

Do ponto de vista institucional, o SIGEP cobre todos os processos administrativos e acadêmicos, com exceção da área financeira, consolidando‑se como um modelo replicável para universidades, ministérios e empresas privadas.

Do ponto de vista científico, o projeto contribui para a evolução da gestão digital aplicada à administração pública e acadêmica, explorando a aplicação de Inteligência Artificial em processos administrativos e consolidando a integração entre tecnologia, gestão e legislação.

Em síntese, o SIGEP não se limita a ser uma ferramenta tecnológica: ele representa um paradigma de inovação institucional, capaz de promover a transformação digital contínua, reduzir custos operacionais, aumentar a confiança social e posicionar Moçambique em consonância com as melhores práticas internacionais de gestão documental e acadêmica.`},{id:"referencias",title:"11. Bibliografia e Referências",content:`📚 Formação Acadêmica e Profissional

VICENTE, Franzissi Tripalonga. Curso de Engenharia Militar e Defesa Química. Escola Prática de Engenharia Militar, Boquisso – Província de Maputo, 2011.

VICENTE, Franzissi Tripalonga. Curso Técnico Básico em Montagem, Desmontagem, Reparação e Instalação de Computadores. CFP TECNICOL, Maputo, 2012.

VICENTE, Franzissi Tripalonga. Nível Médio Profissional em Reparação e Manutenção de Computadores, Instalação em Rede, Montagem e Assistência Técnica. MICIT, Maputo, 2011–2013.

VICENTE, Franzissi Tripalonga. Formação Profissionalizante em Redes de Computadores. MECHANICAL TECNOLOGIAS, Maputo, set. 2021 – fev. 2022.

VICENTE, Franzissi Tripalonga. Formação Profissionalizante em Programação. MECHANICAL TECNOLOGIAS, Maputo, set. 2021 – fev. 2022.

VICENTE, Franzissi Tripalonga. Formação Profissionalizante em Gestão e Configuração de Servidores. MECHANICAL TECNOLOGIAS, Maputo, set. 2021 – fev. 2022.

VICENTE, Franzissi Tripalonga. Curso de Formação de Professores. Instituto de Formação de Professores de Angónia, 2007.

VICENTE, Franzissi Tripalonga. Ensino Médio – 12ª Classe, Grupo C. E.SP.U., Tete, 2009.

VICENTE, Franzissi Tripalonga. Atualmente a frequentar o curso de Informática Aplicada. Universidade Púnguè (UNIPUNGUE), Tete, em curso.

📑 Experiência Profissional

VICENTE, Franzissi Tripalonga. Chefe da Secretaria. Escola Prática de Engenharia Militar, Maputo/Boquisso, 2010.

VICENTE, Franzissi Tripalonga. Assistente de Compras e Fiel de Armazém. Comando do Exército, Maputo, 2011–2012.

VICENTE, Franzissi Tripalonga. Técnico de Informática. Ministério da Educação, Maputo.

VICENTE, Franzissi Tripalonga. Articulador técnico e estratégico institucional. ISPS/DPEP, Moçambique, 2026.

⚖️ Referências Legais

MOÇAMBIQUE. Assembleia da República. Lei n.º 8/2024, de 7 de junho. Aprova o regime jurídico da tramitação eletrónica de processos jurisdicionais e cria o Centro de Gestão de Tecnologias do Sector da Justiça. Boletim da República, Maputo, 2024.

💻 Softwares e Linguagens Utilizadas

• HTML5 – estruturação de páginas e sistemas web;
• CSS3 – estilização e design responsivo;
• JavaScript (JS) – lógica e interatividade do sistema;
• Sublime Text – editor de código utilizado no desenvolvimento;
• Compiladores Online – testes rápidos de código e validação de scripts;
• Firebase/Firestore – gestão de dados e autenticação;
• Google AI Studio – integração de modelos de IA para automação de processos;
• Vercel – hospedagem e deploy da aplicação SIGEP;
• GitHub – versionamento e gestão colaborativa do código;
• Microsoft Azure/Cloud – suporte à arquitetura multi‑tenant;
• Canva – design de fluxogramas e organogramas institucionais;
• Autodesk AutoCAD – apoio em documentação técnica e projetos de engenharia.

🌐 Sites de Pesquisa Consultados

• Google AI Studio – SIGEP Project: <https://aistudio.google.com>
• Vercel SIGEP-M Overview: <https://vercel.com/slaitertripas-projects/sigep-m>
• SIGEP App: <https://sigep-m.vercel.app>
• GitHub SLAITERTRIPAS – ISPSPLANO: <https://github.com/SLAITERTRIPAS/SLAITERTRIPAS--SLAITERTRIPAS-ISPSPLANO>
• Ascenty Blog – Tecnologia na Educação: <https://ascenty.com/blog/artigos/tecnologia-na-educacao>
• Google Search – Planificação e Estatística: <https://www.google.com/search>
• Getty Images – Estatística: <https://www.gettyimages.pt/fotos/estatistica>`},{id:"apendices-anexos",title:"12. Apêndices / Anexos",content:"Fluxogramas de tramitação de processos; Organograma funcional da instituição de teste; Exemplos de modelos de relatórios de gestão gerados pelo sistema."}],h=()=>e.jsxDEV("div",{className:"flex flex-col items-center justify-between min-h-[750px] text-center font-serif p-12 border-2 border-slate-300 bg-white rounded-xl shadow-sm text-slate-900",children:[e.jsxDEV("div",{className:"space-y-4",children:e.jsxDEV(j,{size:"lg",className:"mx-auto"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:25,columnNumber:5},void 0),e.jsxDEV("div",{className:"my-16 space-y-4",children:[e.jsxDEV("div",{className:"inline-block px-4 py-1 bg-blue-100 text-blue-900 rounded-full font-black text-xs tracking-widest uppercase mb-2",children:"Documentação Teórica Oficial"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:30,columnNumber:7},void 0),e.jsxDEV("h2",{className:"text-4xl md:text-6xl font-black uppercase tracking-widest text-blue-950 font-serif",children:"SIGEP"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:33,columnNumber:7},void 0),e.jsxDEV("p",{className:"text-xl md:text-2xl italic text-slate-700 font-serif",children:"Sistema Integrado de Gestão de Processos"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:34,columnNumber:7},void 0),e.jsxDEV("div",{className:"w-32 h-1 bg-blue-900 mx-auto mt-6 rounded-full"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:35,columnNumber:7},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:29,columnNumber:5},void 0),e.jsxDEV("div",{className:"mt-auto w-full text-center space-y-2 border-t border-slate-200 pt-8",children:[e.jsxDEV("p",{className:"text-lg font-bold text-slate-900",children:["Autor: ",e.jsxDEV("span",{className:"font-serif",children:"Franzissi Tripalonga Vicente (Slaiter Tripas)"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:39,columnNumber:62},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:39,columnNumber:7},void 0),e.jsxDEV("p",{className:"text-sm text-slate-600",children:"Curso: Engenharia Informática / Informática Aplicada"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:40,columnNumber:7},void 0),e.jsxDEV("p",{className:"text-base font-black text-slate-800 mt-6 font-serif",children:"Songo, Moçambique — 2026"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:41,columnNumber:7},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:38,columnNumber:5},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:24,columnNumber:3},void 0),v=()=>e.jsxDEV("div",{className:"flex flex-col items-center justify-between min-h-[750px] text-center font-serif p-12 border-2 border-slate-300 bg-white rounded-xl shadow-sm text-slate-900",children:[e.jsxDEV("div",{className:"space-y-2",children:[e.jsxDEV(j,{size:"md",className:"mx-auto mb-2"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:49,columnNumber:7},void 0),e.jsxDEV("p",{className:"text-lg font-bold text-slate-900",children:"Franzissi Tripalonga Vicente (Slaiter Tripas)"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:50,columnNumber:7},void 0),e.jsxDEV("p",{className:"text-xs text-slate-500 uppercase tracking-widest",children:"Autor e Arquiteto de Software"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:51,columnNumber:7},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:48,columnNumber:5},void 0),e.jsxDEV("div",{className:"my-8 space-y-3",children:[e.jsxDEV("h2",{className:"text-3xl md:text-4xl font-black uppercase tracking-widest text-blue-950",children:"SIGEP"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:55,columnNumber:7},void 0),e.jsxDEV("p",{className:"text-lg italic text-slate-700",children:"Sistema Integrado de Gestão de Processos"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:56,columnNumber:7},void 0),e.jsxDEV("p",{className:"text-sm font-bold text-slate-600",children:"Projeto Científico & Memória Descritiva Oficial"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:57,columnNumber:7},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:54,columnNumber:5},void 0),e.jsxDEV("div",{className:"my-6 text-base max-w-xl text-left border-l-4 border-blue-900 pl-6 py-2 bg-slate-50/80 rounded-r-lg",children:[e.jsxDEV("p",{className:"text-slate-700 leading-relaxed",children:"Projeto científico e fundamentação teórica do Sistema Integrado de Gestão de Processos (SIGEP), apresentado ao Instituto Superior Politécnico de Songo, como requisito de validação da arquitetura tecnológica, gestão documental e conformidade com a Lei n.º 8/2024 de Moçambique."},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:61,columnNumber:7},void 0),e.jsxDEV("p",{className:"mt-6 font-bold text-slate-900",children:"Orientador: PhD. Félix Banze"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:64,columnNumber:7},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:60,columnNumber:5},void 0),e.jsxDEV("div",{className:"mt-auto w-full text-center border-t border-slate-200 pt-6",children:e.jsxDEV("p",{className:"text-base font-bold text-slate-900",children:"Songo, Moçambique — 2026"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:68,columnNumber:7},void 0)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:67,columnNumber:5},void 0)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:47,columnNumber:3},void 0);function B({onBack:E}){const t=l.useMemo(()=>R(),[]),[r,b]=l.useState(t[0].id),[d,f]=l.useState("completo"),[g,m]=l.useState(!1),[x,c]=l.useState(null),N=t.find(a=>a.id===r)||t[0],P=()=>{window.print()},V=async()=>{m(!0),c(null);const a=document.getElementById("projeto-cientifico-print-area");if(!a){window.print(),m(!1);return}try{const o={margin:[10,10,10,10],filename:"SIGEP_Projeto_Cientifico_Parte_Teorica.pdf",image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,logging:!1},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}};await I().set(o).from(a).save(),c("PDF gerado e descarregado com sucesso!"),setTimeout(()=>c(null),4e3)}catch(o){console.warn("Falha no html2pdf, redirecionando para a janela de impressão/PDF:",o),window.print()}finally{m(!1)}},w=()=>{try{let a=`
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>SIGEP - Projeto Científico e Parte Teórica</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 2cm; color: #000; line-height: 1.6; }
            h1 { font-size: 22pt; text-align: center; text-transform: uppercase; margin-bottom: 24pt; color: #0c2340; }
            h2 { font-size: 16pt; margin-top: 18pt; margin-bottom: 12pt; color: #0c2340; border-bottom: 1pt solid #0c2340; padding-bottom: 4pt; }
            p { font-size: 12pt; text-align: justify; margin-bottom: 12pt; }
            ul { margin-bottom: 12pt; }
            li { font-size: 12pt; margin-bottom: 4pt; }
            .capa { text-align: center; margin-bottom: 50pt; }
            .footer { margin-top: 40pt; font-size: 10pt; text-align: center; color: #666; border-top: 1pt solid #ccc; padding-top: 10pt; }
          </style>
        </head>
        <body>
          <div className="capa">
            <h1>INSTITUTO SUPERIOR POLITÉCNICO DE SONGO</h1>
            <h2>SIGEP - SISTEMA INTEGRADO DE GESTÃO DE PROCESSOS</h2>
            <p><strong>PROJETO CIENTÍFICO E PARTE TEÓRICA OFICIAL</strong></p>
            <p>Autor: Franzissi Tripalonga Vicente (Slaiter Tripas)</p>
            <p>Songo, Moçambique — 2026</p>
          </div>
          <hr />
      `;t.forEach((n,u)=>{a+=`
          <h2>${u+1}. ${n.title}</h2>
          <div>
            <p>${String(n.content||"").replace(/\n/g,"</p><p>")}</p>
          </div>
          <br />
        `}),a+=`
          <div class="footer">
            SIGEP-ISPS © 2026 — Documento Teórico Oficial do Sistema Integrado de Gestão de Processos
          </div>
        </body>
        </html>
      `;const o=new Blob(["\uFEFF"+a],{type:"application/msword"}),i=URL.createObjectURL(o),s=document.createElement("a");s.href=i,s.download="SIGEP_Projeto_Cientifico_Parte_Teorica.doc",document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i),c("Documento (.doc) descarregado com sucesso!"),setTimeout(()=>c(null),4e3)}catch(a){console.error("Erro ao gerar documento .doc:",a)}};return e.jsxDEV("div",{className:"h-full flex flex-col bg-slate-100 overflow-hidden font-sans",children:[e.jsxDEV("style",{children:`
        @media print {
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            font-family: 'Times New Roman', Times, serif !important;
          }
          header, nav, .print-hidden, button {
            display: none !important;
          }
          .print-container {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .print-page {
            page-break-after: always !important;
            break-after: page !important;
            padding: 20mm 15mm !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            min-height: 0 !important;
          }
        }
      `},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:184,columnNumber:7},this),e.jsxDEV("header",{className:"bg-slate-900 text-white p-4 md:px-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shadow-xl z-20 print:hidden flex-none",children:[e.jsxDEV("div",{className:"flex items-center gap-4",children:[e.jsxDEV("button",{onClick:E,className:"p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition shadow-sm cursor-pointer",title:"Voltar ao Sistema",children:e.jsxDEV(D,{size:20},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:225,columnNumber:13},this)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:220,columnNumber:11},this),e.jsxDEV("div",{children:[e.jsxDEV("div",{className:"flex items-center gap-2",children:[e.jsxDEV("span",{className:"px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black tracking-widest rounded uppercase",children:"Parte Teórica"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:229,columnNumber:15},this),e.jsxDEV("span",{className:"text-xs text-slate-400 font-bold",children:"• 16 Capítulos"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:232,columnNumber:15},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:228,columnNumber:13},this),e.jsxDEV("h2",{className:"text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2",children:"Projeto Científico & Fundamentação Teórica SIGEP"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:234,columnNumber:13},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:227,columnNumber:11},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:219,columnNumber:9},this),e.jsxDEV("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxDEV("div",{className:"bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-700",children:[e.jsxDEV("button",{onClick:()=>f("completo"),className:`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${d==="completo"?"bg-blue-600 text-white shadow-md":"text-slate-300 hover:text-white"}`,children:[e.jsxDEV(S,{size:14},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:252,columnNumber:15},this),e.jsxDEV("span",{children:"Documento Completo"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:253,columnNumber:15},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:244,columnNumber:13},this),e.jsxDEV("button",{onClick:()=>f("capitulo"),className:`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${d==="capitulo"?"bg-blue-600 text-white shadow-md":"text-slate-300 hover:text-white"}`,children:[e.jsxDEV(A,{size:14},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:263,columnNumber:15},this),e.jsxDEV("span",{children:"Por Capítulo"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:264,columnNumber:15},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:255,columnNumber:13},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:243,columnNumber:11},this),e.jsxDEV("button",{onClick:P,className:"px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer",title:"Imprimir todos os documentos da Parte Teórica",children:[e.jsxDEV(T,{size:16},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:274,columnNumber:13},this),e.jsxDEV("span",{children:"Imprimir Parte Teórica"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:275,columnNumber:13},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:269,columnNumber:11},this),e.jsxDEV("button",{onClick:V,disabled:g,className:"px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer",title:"Descarregar todos os documentos em PDF",children:g?e.jsxDEV(e.Fragment,{children:[e.jsxDEV(C,{size:16},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:287,columnNumber:17},this),e.jsxDEV("span",{children:"A Gerar PDF..."},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:288,columnNumber:17},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:286,columnNumber:15},this):e.jsxDEV(e.Fragment,{children:[e.jsxDEV(G,{size:16},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:292,columnNumber:17},this),e.jsxDEV("span",{children:"Descarregar PDF"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:293,columnNumber:17},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:291,columnNumber:15},this)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:279,columnNumber:11},this),e.jsxDEV("button",{onClick:w,className:"px-3 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-md active:scale-95 cursor-pointer",title:"Descarregar documento em formato Word (.doc)",children:[e.jsxDEV(z,{size:16},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:304,columnNumber:13},this),e.jsxDEV("span",{className:"hidden sm:inline",children:"Descarregar .DOC"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:305,columnNumber:13},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:299,columnNumber:11},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:241,columnNumber:9},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:218,columnNumber:7},this),x&&e.jsxDEV("div",{className:"bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2 duration-200 print:hidden",children:[e.jsxDEV("span",{className:"flex items-center gap-2",children:[e.jsxDEV(y,{size:16},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:314,columnNumber:13},this)," ",x]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:313,columnNumber:11},this),e.jsxDEV("button",{onClick:()=>c(null),className:"text-emerald-100 hover:text-white font-black",children:"✕"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:316,columnNumber:11},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:312,columnNumber:9},this),e.jsxDEV("div",{className:"flex-1 flex overflow-hidden print:block print:overflow-visible",children:[e.jsxDEV("aside",{className:"w-72 bg-white border-r border-slate-200 p-4 space-y-1 overflow-y-auto hidden md:block print:hidden shrink-0 shadow-sm",children:[e.jsxDEV("div",{className:"p-2 mb-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-1.5",children:[e.jsxDEV(p,{size:14,className:"text-blue-600"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:326,columnNumber:15},this),"Índice da Parte Teórica"]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:325,columnNumber:13},this),e.jsxDEV("span",{className:"text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full",children:t.length},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:329,columnNumber:13},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:324,columnNumber:11},this),e.jsxDEV("div",{className:"space-y-1",children:t.map((a,o)=>e.jsxDEV("button",{onClick:()=>{if(b(a.id),d==="completo"){const i=document.getElementById(`section-${a.id}`);i&&i.scrollIntoView({behavior:"smooth"})}},className:`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${r===a.id?"bg-blue-900 text-white shadow-md":"text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`,children:[e.jsxDEV("span",{className:"truncate pr-2",children:a.title},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:351,columnNumber:17},this),e.jsxDEV("span",{className:"text-[9px] opacity-70 font-mono",children:["Pág. ",o+1]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:352,columnNumber:17},this)]},a.id,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:336,columnNumber:15},this))},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:334,columnNumber:11},this),e.jsxDEV("div",{className:"mt-8 p-4 bg-slate-900 text-white rounded-2xl text-[11px] space-y-2",children:[e.jsxDEV("p",{className:"font-bold flex items-center gap-1 text-blue-400",children:[e.jsxDEV(q,{size:14},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:359,columnNumber:15},this)," Dica de Impressão"]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:358,columnNumber:13},this),e.jsxDEV("p",{className:"text-slate-300 leading-relaxed text-[10px]",children:["O botão ",e.jsxDEV("strong",{className:"text-white",children:'"Imprimir Parte Teórica"'},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:362,columnNumber:23},this)," compila automaticamente todos os 16 capítulos com formatação académica em papel A4 e quebras de página oficiais."]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:361,columnNumber:13},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:357,columnNumber:11},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:323,columnNumber:9},this),e.jsxDEV("main",{className:"flex-1 overflow-y-auto bg-slate-200/80 p-4 md:p-8 print:p-0 print:bg-white print:overflow-visible",children:e.jsxDEV("div",{id:"projeto-cientifico-print-area",className:"max-w-[210mm] mx-auto space-y-8 print:space-y-0 print:block print-container",children:d==="completo"?t.map((a,o)=>e.jsxDEV("div",{id:`section-${a.id}`,className:"bg-white shadow-xl rounded-xl border border-slate-200 p-8 md:p-16 min-h-[297mm] flex flex-col justify-between relative print:shadow-none print:border-none print:rounded-none print:m-0 print:p-0 print:min-h-0 print-page",children:[e.jsxDEV("div",{className:"flex-1 space-y-6 font-serif",children:a.id==="capa"?e.jsxDEV(h,{},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:384,columnNumber:23},this):a.id==="folha-rosto"?e.jsxDEV(v,{},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:386,columnNumber:23},this):e.jsxDEV(e.Fragment,{children:[e.jsxDEV("div",{className:"border-b-4 border-double border-blue-900 pb-4 mb-8 bg-gradient-to-r from-blue-50/80 via-white to-transparent p-4 rounded-lg shadow-sm border border-blue-100",children:[e.jsxDEV("span",{className:"text-xs font-black tracking-widest text-blue-800 uppercase font-serif",children:"SIGEP — Documentação Científica & Memória Descritiva"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:390,columnNumber:27},this),e.jsxDEV("h3",{className:"text-2xl md:text-3xl font-black text-blue-950 mt-2 flex items-center gap-3 font-serif",children:[e.jsxDEV(p,{size:28,className:"text-blue-900 print:hidden"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:394,columnNumber:29},this),a.title]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:393,columnNumber:27},this),e.jsxDEV("p",{className:"text-xs italic text-slate-600 mt-1 font-serif",children:"Fundamentação Teórica, Arquitetura e Processos Oficiais do SIGEP"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:397,columnNumber:27},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:389,columnNumber:25},this),a.id==="indice"?e.jsxDEV("div",{className:"space-y-4 font-sans my-8",children:[e.jsxDEV("p",{className:"text-sm font-bold text-slate-500 uppercase tracking-widest mb-4",children:"Estrutura dos Capítulos e Paginação (Início no Resumo)"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:402,columnNumber:29},this),e.jsxDEV("ul",{className:"divide-y divide-slate-100",children:t.map((i,s)=>{const n=t.findIndex(_=>_.id==="resumo"),u=s<n?"—":`Pág. ${s-n+1}`;return e.jsxDEV("li",{className:"py-3 flex justify-between items-center text-slate-800 text-sm font-medium hover:bg-slate-50 px-2 rounded",children:[e.jsxDEV("span",{className:"font-bold text-blue-950",children:i.title},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:411,columnNumber:37},this),e.jsxDEV("span",{className:"font-mono text-slate-400 text-xs",children:u},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:412,columnNumber:37},this)]},i.id,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:410,columnNumber:35},this)})},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:405,columnNumber:29},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:401,columnNumber:27},this):e.jsxDEV("div",{className:"text-slate-800 leading-relaxed text-base md:text-lg font-serif text-justify whitespace-pre-line space-y-4",children:a.content},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:419,columnNumber:27},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:388,columnNumber:23},this)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:382,columnNumber:19},this),e.jsxDEV("div",{className:"mt-12 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-widest font-sans",children:[e.jsxDEV("span",{children:"SIGEP — PARTE TEÓRICA & PROJETO CIENTÍFICO"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:429,columnNumber:21},this),e.jsxDEV("span",{children:(()=>{const i=t.findIndex(s=>s.id==="resumo");return o<i?"Pré-texto":`Pág. ${o-i+1}`})()},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:430,columnNumber:21},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:428,columnNumber:19},this)]},a.id,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:377,columnNumber:17},this)):e.jsxDEV("div",{className:"bg-white shadow-xl rounded-xl border border-slate-200 p-8 md:p-16 min-h-[297mm] flex flex-col justify-between font-serif",children:[e.jsxDEV("div",{className:"flex-1 space-y-6",children:r==="capa"?e.jsxDEV(h,{},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:444,columnNumber:21},this):r==="folha-rosto"?e.jsxDEV(v,{},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:446,columnNumber:21},this):e.jsxDEV(e.Fragment,{children:[e.jsxDEV("div",{className:"border-b-4 border-double border-blue-900 pb-4 mb-8 bg-gradient-to-r from-blue-50/80 via-white to-transparent p-4 rounded-lg shadow-sm border border-blue-100",children:[e.jsxDEV("span",{className:"text-xs font-black tracking-widest text-blue-800 uppercase font-serif",children:"SIGEP — Capítulo Selecionado & Memória Descritiva"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:450,columnNumber:25},this),e.jsxDEV("h3",{className:"text-2xl md:text-3xl font-black text-blue-950 mt-2 flex items-center gap-3 font-serif",children:[e.jsxDEV(p,{size:28,className:"text-blue-900"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:454,columnNumber:27},this),N.title]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:453,columnNumber:25},this),e.jsxDEV("p",{className:"text-xs italic text-slate-600 mt-1 font-serif",children:"Visualização Direta de Capítulo Oficial do SIGEP"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:457,columnNumber:25},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:449,columnNumber:23},this),r==="indice"?e.jsxDEV("div",{className:"space-y-4 font-sans my-8",children:[e.jsxDEV("p",{className:"text-sm font-bold text-slate-500 uppercase tracking-widest mb-4",children:"Estrutura dos Capítulos e Paginação (Início no Resumo)"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:462,columnNumber:27},this),e.jsxDEV("ul",{className:"divide-y divide-slate-100",children:t.map((a,o)=>{const i=t.findIndex(n=>n.id==="resumo"),s=o<i?"—":`Pág. ${o-i+1}`;return e.jsxDEV("li",{className:"py-3 flex justify-between items-center text-slate-800 text-sm font-medium hover:bg-slate-50 px-2 rounded cursor-pointer",onClick:()=>b(a.id),children:[e.jsxDEV("span",{className:"font-bold text-blue-950",children:a.title},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:471,columnNumber:35},this),e.jsxDEV("span",{className:"font-mono text-slate-400 text-xs",children:s},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:472,columnNumber:35},this)]},a.id,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:470,columnNumber:33},this)})},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:465,columnNumber:27},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:461,columnNumber:25},this):e.jsxDEV("div",{className:"text-slate-800 leading-relaxed text-base md:text-lg font-serif text-justify whitespace-pre-line space-y-4",children:N.content},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:479,columnNumber:25},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:448,columnNumber:21},this)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:442,columnNumber:17},this),e.jsxDEV("div",{className:"mt-12 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-widest font-sans",children:[e.jsxDEV("span",{children:"SIGEP — PARTE TEÓRICA"},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:488,columnNumber:19},this),e.jsxDEV("span",{children:(()=>{const a=t.findIndex(i=>i.id===r),o=t.findIndex(i=>i.id==="resumo");return a<o?"Pré-texto (Sem Numeração)":`Pág. ${a-o+1}`})()},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:489,columnNumber:19},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:487,columnNumber:17},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:441,columnNumber:15},this)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:370,columnNumber:11},this)},void 0,!1,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:368,columnNumber:9},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:321,columnNumber:7},this)]},void 0,!0,{fileName:"/app/applet/src/blocos/bloco3_unidades_organicas/ProjetoCientificoView.tsx",lineNumber:182,columnNumber:5},this)}export{B as default};
