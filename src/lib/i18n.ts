/**
 * Módulo Central de Internacionalização (i18n) do SIGEP
 * Suporta Português (pt), Inglês (en), Francês (fr) e Espanhol (es)
 * Aplicação instantânea em menus, formulários, botões, notificações, dashboards e relatórios.
 */

import { useState, useEffect } from "react";
import i18n, {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  changeSystemLanguage,
  resolveInitialLanguage,
  LANGUAGE_OPTIONS,
  LanguageOption,
} from "../i18n";

export type Language = SupportedLanguage;
export { LANGUAGE_OPTIONS, changeSystemLanguage, resolveInitialLanguage };
export type { LanguageOption, SupportedLanguage };

export const translations = {
  pt: {
    systemTitle: "SIGEP - Sistema Integrado de Gestão Estratégica e Planificação",
    loginTitle: "Acesso ao Sistema",
    loginSubtitle: "Insira as suas credenciais institucionais para aceder",
    identifierLabel: "Identificador (Email, NUIT ou ID)",
    passwordLabel: "Palavra-passe",
    loginButton: "Entrar no Sistema",
    languageLabel: "Idioma",
    selectLanguage: "Selecionar Idioma",
    autoLanguage: "Automático (Navegador)",
    forgotPassword: "Esqueceu a palavra-passe?",
    contactAdmin: "Contactar Administrador",
    changePasswordRequired: "Alteração Obrigatória de Palavra-passe",
    newPassword: "Nova Palavra-passe",
    confirmPassword: "Confirmar Palavra-passe",
    savePassword: "Guardar Nova Palavra-passe",
    profileSettings: "Configurações do Perfil",
    languagePreference: "Idioma Preferido",
    portuguese: "Português",
    english: "English",
    french: "Français",
    spanish: "Español",
    notice: "Aviso",
    save: "Guardar",
    cancel: "Cancelar",
    success: "Sucesso",
    error: "Erro",
    workspace: "Área de Trabalho",
    sync: "Sincronizar",
    database: "Base de Dados",
    minimize: "Minimizar",
    fullscreen: "Ecrã Completo",
    restoreScreen: "Restaurar Ecrã",
    logout: "Terminar Sessão",
    back: "Voltar",
    online: "ON-LINE",
    userConnected: "Utilizador Conectado",
    selectLanguageToContinue: "Selecione a língua para continuar",
    institution: "Instituição",
    loggedInstitution: "INSTITUIÇÃO LOGADA",
    integratedSystem: "SISTEMA DE GESTÃO INTEGRADA",
    generalAdminPanel: "PAINEL ADMINISTRADOR GERAL",
    changePassword: "Alterar Palavra-passe",
    version: "Versão 2026.9.1 Quântica",
    developedBy: "Desenvolvido por Slaiter Tripas",
    systemFooterTitle: "SIGEP - Sistema Integrado de Gestão de Processo",
    repMozambique: "República de Moçambique",
    minEducation: "Ministério da Educação e Cultura",
    dirHigherEd: "Direcção Nacional de Ensino Superior",
    fiscalYear: "Exercício Económico:",
    date: "Data:",
    subject: "Assunto:",
    to: "Ao:",
    from: "De:",
    ourRef: "N/Ref:",
    infoProposta: "INFORMAÇÃO / PROPOSTA",
    infoPropostaNum: "Informação Proposta Nº",
    parecerDicosafa: "1. Parecer Técnico & Homologação (DICOSAFA)",
    despachoGDG: "2. Despacho & Homologação (Diretor-Geral)",
    detalhesDeslocacao: "Detalhes da Deslocação:",
    actividade: "Actividade:",
    local: "Local:",
    datas: "Datas:",
    participantes: "Participante(s):",
    tabelaCustos: "Tabela de Custos / Abonos:",
    ordemServico: "ORDEM DE SERVIÇO",
    ordemServicoNum: "ORDEM DE SERVIÇO Nº",
    transferenciaFuncionario: "A transferência do funcionário:",
    guiaApresentacao: "GUIA DE APRESENTAÇÃO INTERNA",
    pedidoDispensa: "PEDIDO DE DISPENSA",
    justificacaoFaltas: "JUSTIFICAÇÃO DE FALTAS",
    pedidoDispensaOuFaltas: "PEDIDO DE DISPENSA OU JUSTIFICAÇÃO DE FALTAS",
    nomeFuncionario: "Nome do(a) Funcionário(a):",
    categoriaCarreira: "Categoria / Carreira:",
    departamentoDirecao: "Departamento / Direção:",
    reparticaoSeccao: "Repartição / Secção:",
    parecerChefe: "PARECER DO CHEFE HIERÁRQUICO",
    infoDRH: "INFORMAÇÃO DO DEPARTAMENTO DOS RECURSOS HUMANOS [DRH]",
    despacho: "DESPACHO",
    planoActividade: "Plano de Actividade",
    planoActividades: "Plano de Actividades",
    requerimentoFerias: "REQUERIMENTO DE FÉRIAS",
    orgaoDirecaoGestao: "Órgão de Direção e Gestão",
    servicosCentrais: "Serviços Centrais",
    unidadeOrganica: "Unidade Orgânica",
    diretorGeral: "Diretor-Geral",
    diretorDicosafa: "Director da DICOSAFA",
    chefeGabinete: "Chefe do Gabinete",
    chefeDepartamento: "Chefe do Departamento",
    chefeReparticao: "Chefe da Repartição",
    responsavelSetor: "Responsável do Setor",
    pagina: "Pág.",
    campusPrincipal: "Campus Principal",
    distritoDe: "Distrito de",
    provinciaDe: "Província de",
    caixaPostal: "Caixa Postal nº",
    paginaOficial: "Página oficial:",
    cliqueParaAssinar: "Clique para assinar",
    areaEmBrancoParecer: "Área em branco (aguarda parecer)",
    areaEmBrancoDespacho: "Área em branco (aguarda despacho)",
    imprimirPdf: "Imprimir / PDF",
    guardarSistema: "Guardar no Sistema",
    voltar: "Voltar",
    registadoSucesso: "Registado com Sucesso!",
    aguarde: "Aguarde...",
    aGuardar: "A guardar...",
    geral: "Geral",
    selecioneDocumento: "Selecione o Documento Normativo",
    selecioneUmDoc: "Selecione um documento...",
    modelosFormulariosOficiais: "Modelos e Formulários Oficiais",
    modelosDesc: "Selecione o documento normativo desejado na lista abaixo para preenchimento e emissão",
    cumprase: "Cumpra-se.",
    efeitosImediatos: "A presente Ordem de Serviço produz efeitos imediatos",
    guiaTransferenciaBens: "GUIA DE TRANSFERÊNCIA DE BENS",
    requisicaoInterna: "REQUISIÇÃO INTERNA",
    fichaInventarioMovel: "FICHA DE CADASTRO DE INVENTÁRIO DE BENS MÓVEIS",
    totalGeral: "Total Geral (MZN)",
    valorTotal: "Valor Total (MZN)",
    valorDiario: "Valor Diário",
    dias: "Dias",
    descricao: "Descrição",
    beneficiario: "Nome do Beneficiário",
    ord: "Ord.",
    justificacao: "Justificação:",
    anexos: "Anexos:",
    verAnexoOficial: "Ver / Abrir Anexo Oficial:",
    fechoCortesia: "Na expectativa da vossa aprovação, apresento os meus melhores cumprimentos.",
    chefeMaximoDept: "O CHEFE DO DEPARTAMENTO",
    secretariaGeral: "1. SECRETARIA GERAL",
    parecerDpep: "2. PARECER DO DPEP",
    parecerDaf: "3. PARECER DO DAF",
    repTransporte: "4. REP. TRANSPORTE",
    emBranco: "Em branco",
    assinar: "Assinar",
    favoravel: "Favorável",
    desfavoravel: "Desfavorável",
    autorizado: "Autorizado",
    naoAutorizado: "Não Autorizado",
    propostaActividadesPESO: "PROPOSTA DE ATIVIDADES PARA O PESO",
    actividadesPlanificadas: "Actividades Planificadas",
    novaActividade: "Nova Actividade",
    organizarPorMes: "Organizar por Mês & Ordem",
    pesquisar: "Pesquisar",
    filtros: "Filtros",
    todos: "Todos",
    dashboard: "Painel de Controlo",
    planning: "Planificação",
    reports: "Relatórios",
    settings: "Configurações",
    users: "Utilizadores",
    institutions: "Instituições",
    analytics: "Análise",
    backup: "Cópia de Segurança",
    audit: "Auditoria",
    system: "Sistema",
    welcome: "Bem-vindo",
    enterCredentials: "Insira as suas credenciais de acesso.",
    identifierInputPlaceholder: "ID, NUIT ou E-mail",
    passwordInputPlaceholder: "•••••",
    signInSystem: "Entrar no sistema",
    aboutSystem: "Sobre o Sistema",
    clearCacheHelp: "Resolver problemas de acesso (Limpar Cache)",
    forgotPasswordHelp: "Esqueci a minha senha (Validação Dinâmica de Identidade)",
    plansAndDeadlines: "Publicação de Planos & Prazos Definidos",
    activitiesToExecute: "Actividades a Executar no Mês",
    commemorativeDates: "Datas comemorativas",
    nationalHolidays: "Feriados nacionais",
    institutionalHolidays: "Feriados institucionais",
    noEventsScheduled: "Nenhum evento agendado nos próximos dias.",
    developedByFooter: "Desenvolvido por Franzíssi Tripalonga - 2025-2026 | @todos os direitos reservados",
    instPlanningService: "SERVIÇO DE PLANIFICAÇÃO INSTITUCIONAL",
    integratedInstPlatform: "Plataforma Institucional Integrada",
    multiInstPlatform: "SIGEP - Plataforma Multi-Institucional",
    institutionalCoverTitle: "NOTA INSTITUCIONAL DE APRESENTAÇÃO — SIGEP V1.1.2.0",
    institutionalCoverSubtitle: "Plataforma Inteligente de Gestão Estratégica e Projeção Académica • Moçambique",
    repMozambiqueMCTES: "REPÚBLICA DE MOÇAMBIQUE • MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E ENSINO SUPERIOR",
    userDataTitle: "Dados do Utilizador Conectado no Sistema",
    userServerLabel: "Utilizador / Servidor:",
    roleFunctionLabel: "Cargo / Função:",
    organUnitLabel: "Órgão / Unidade:",
    confirmCoverAccess: "Confirmar Leitura e Aceder à Área de Trabalho (SIGEP)",
    institutionalNoteP1: "O SIGEP (Sistema Integrado de Gestão de Processos) é a Plataforma Oficial de Gestão Estratégica, Projeção Académica e Tramitação Eletrónica implementada para assegurar a excelência operacional, a transparência e a celeridade administrativa nas instituições de ensino superior e técnico de Moçambique.",
    institutionalNoteP2: "Através desta nota institucional, certifica-se que o utilizador autenticado encontra-se devidamente autorizado e enquadrado nos fluxos de trabalho parametrizados, com acesso em tempo real aos órgãos de gestão, diretórios executivos, controlo de expediente, tesouraria, património e relatórios gerenciais automatizados.",
    institutionalNoteP3: "Todos os prazos, tramitações e despachos executados por este utilizador são auditados e sincronizados com a base de dados central, garantindo o rigor normativo e o cumprimento das metas estratégicas da instituição.",
    presentationTitle: "SIGEP Moçambique",
    presentationSubtitle: "Apresentação Institucional de Sistemas",
    accessSigep: "Aceder ao SIGEP",
    enter: "Entrar",
    slideCounter: "Slide {{current}} de {{total}} (4s)",
    moduleCapabilities: "Capacidades Principais do Módulo",
    home: "Início",
    quantumAi: "IA QUÂNTICA",
    onlineBadge: "SISTEMA ON-LINE",
    editDataAndPhoto: "ON-LINE • EDITAR DADOS & FOTO",
    userOnline: "Online",
    pendingProcesses: "Processos Pendentes",
    pendingNotificationsMsg: "Existem notificações que requerem a sua atenção imediata no sistema.",
    mainMenu: "Menu Principal",
    selectAreaToAccess: "Selecione a área a que deseja aceder",
    availableCourses: "Cursos Disponíveis",
    selectArea: "Selecione a Área",
    selectCourseDetails: "Selecione um curso para ver mais detalhes.",
    navigateSectors: "Navegue pelas repartições e setores disponíveis.",
    budgetCeiling: "Teto Orçamental",
    annualReport: "Relatório Anual",
    sectorPlan: "Plano Setorial",
    budget: "Orçamento",
    access: "Aceder",
    visaoGeral: "Visão Geral",
    boardOverview: "Conselho de Gestão",
    efetivoGeral: "Efetivo Geral",
    corpoDocente: "Corpo Docente",
    corpoCTA: "Corpo Técnico Administrativo (CTA)",
    estudantesPorCursoGenero: "Estudantes por Curso e Género",
    planosAtividades: "Planos de Atividades",
    relatoriosDirecao: "Relatórios da Direção",
    gestaoExpediente: "Gestão de Expediente",
    recursosFinanceiros: "Recursos Financeiros",
    totalAtividadesPlanificadas: "Total de Atividades Planificadas",
    orcamentoTotalProposto: "Orçamento Total Proposto",
    entradosPendentes: "Entrados / Pendentes",
    emTramitacao: "Em Tramitação",
    concluidos: "Concluídos",
    homens: "Homens",
    mulheres: "Mulheres",
    total: "Total",
    cursoLicenciatura: "Curso / Licenciatura",
    ativos: "Ativos",
    transferidos: "Transferidos",
    reformados: "Reformados",
    aceder: "Aceder",
    voltarVisaoGeral: "Voltar para Visão Geral",
    informacaoIndisponivel: "Informação Indisponível",
    detalhamentoEstudantes: "Detalhamento de Estudantes",
    desistentes: "Desistentes",
    graduados: "Graduados",
    nivel: "Nível",
    subvencaoEstatal: "Orçamento Geral de Estado (OGE)",
    receitasProprias: "Receitas Próprias",
    gestaoProdutosPrecos: "Gestão de Produtos e Preços",
    gestaoFornecedores: "Gestão de Fornecedores",
    planoAquisicao: "Plano de Aquisição",
    planoContratacao: "Plano de Contratação",
    acaoOrcamental: "Ação Orçamental",
    calendario: "Calendário",
    caixaMensagens: "Caixa de Mensagens",
    assinaturaDigital: "Assinatura Digital",
    atribuirAtividade: "Atribuir Atividade",
    historicoDocumentos: "Histórico de Documentos",
    documentosNormativos: "Documentos Normativos",
    balanco: "Balanço",
    gestaoPessoal: "Gestão de Pessoal",
    gestaoAcademica: "Gestão Académica",
    corpoDiscente: "Corpo Discente",
    gestaoEstudantil: "Gestão Estudantil",
    gestaoFrota: "Gestão de Frota",
    gestaoViatura: "Gestão de Viatura",
    bolsaEstudos: "Bolsa de Estudos",
    estatistica: "Estatística",
    biblioteca: "Biblioteca",
    ugea: "Aquisições (UGEA)",
    arquivoGeral: "Arquivo Geral",
    quadroAtividades: "Quadro de Atividades",
    minhaMatriz: "Minha Matriz",
    gestaoFormacao: "Gestão de Formação",
    horarios: "Horários",
    exames: "Exames",
    graduadosMenu: "Graduados",
    disciplinas: "Disciplinas",
    laboratorios: "Laboratórios",
    oficinas: "Oficinas",
    blocosSalas: "Blocos e Salas de Aula",
    selecioneLingua: "Selecione a língua para continuar",
    footerTitle: "SIGEP • Sistema Integrado de Gestão e Planificação",
    rightsReserved: "Direitos Reservados ©",
    legalInfoAndSupport: "Informações Legais & Suporte",
    backupCenterTitle: "Centro de Backup e Proteção de Dados por Órgãos",
    backupCenterSubtitle: "Preservação automática e transparente de todas as informações dos 4 Órgãos do SIGEP",
    activeStatus: "Ativo",
    fourOrgansAndOperations: "4 Órgãos & Operações",
    automaticBackupsInSystem: "Backups Automáticos no Sistema",
    autoProtectionGuaranteed: "Proteção Automática de Dados Garantida",
    autoProtectionSubtitle: "Os backups são efetuados automaticamente a cada 12 horas e resguardam integralmente todos os registos nos 4 Órgãos do Instituto Superior Politécnico de Songo.",
    runBackupNow: "Executar Backup Agora",
    fourOrgansCovered: "Os 4 Órgãos Cobertos pelo Sistema de Backup:",
    activeCollectionsFirestore: "44 coleções ativas no Firestore",
    organBackupBtn: "Backup do Órgão",
    restoreBtn: "Restaurar",
    independentOperationsTitle: "Operações Independentes de Backup e Restauração",
    independentOpsSubtitle: "O sistema mantém os backups de Dados e de Sistema completamente separados e independentes.",
    dataBackupTitle: "Backup e Restauração de Dados",
    dataBackupSubtitle: "Exclusivo para registos institucionais, colaboradores, actividades, estudantes, finanças e inventário dos 4 Órgãos.",
    downloadDataBackupBtn: "Descarregar Backup de Dados (JSON)",
    restoreDataBackupBtn: "Restaurar Backup de Dados",
    systemBackupTitle: "Backup e Restauração do Sistema",
    systemBackupSubtitle: "Exclusivo para contas de utilizadores, configurações gerais, documentos normativos, notas, calendário e mensagens.",
    downloadSystemBackupBtn: "Descarregar Backup do Sistema (JSON)",
    restoreSystemBackupBtn: "Restaurar Backup do Sistema",
    savedCloudBackupsTitle: "Cópia de Segurança Guardada na Nuvem / Sistema",
    savedCloudSubtitle: "O Administrador pode descarregar, restaurar ou limpar backups guardados",
    deleteAllVersionsBtn: "Excluir Todas as Versões",
    newAutoBackupBtn: "Novo Backup Automático",
    noBackupsYetTitle: "Nenhum backup registado ainda",
    noBackupsYetDesc: "O sistema executa backups automaticamente de 12 em 12 horas ou ao clicar no botão acima.",
    downloadJsonBtn: "Baixar JSON",
    deleteBtn: "Excluir",
    sigepInstitutionalTitle: "SIGEP Institucional",
    officialBadge: "Oficial",
    versionDetailsAndCopyright: "Detalhes da Versão e Direitos Autorais",
    softwareVersionLabel: "Versão do Software",
    architectureLabel: "Arquitetura",
    hybridCloudSyncVal: "Cloud Sync Híbrida",
    dataSecurityLabel: "Segurança de Dados",
    quantumFirestoreVal: "Firestore Quântico",
    intellectualPropertyTitle: "Propriedade Intelectual & Desenvolvimento",
    developedByFull: "Desenvolvido por Franzíssi Tripalonga (Slaiter Tripas)",
    copyrightReservedVal: "2025 - 2026 | @todos os direitos reservados",
    intellectualPropertyDesc: "Desenvolvimento exclusivo do Sistema Integrado de Gestão de Processos (SIGEP), concebido para garantir a integridade, segurança, rastreabilidade e governança eletrónica de expedientes e recursos institucionais.",
    coreModulesOperatingTitle: "Módulos Centrais em Operação",
    processManagementVal: "Gestão de Processos",
    ugeaSuppliersVal: "UGEA & Fornecedores",
    staffHRManagementVal: "Gestão de Efetivo & RH",
    autoCloudBackupVal: "Backup Automático em Nuvem",
    highPerformanceEngineVal: "SIGEP High-Performance Engine",
    closeBtn: "Fechar",
  },
  en: {
    systemTitle: "SIGEP - Integrated Strategic Management and Planning System",
    loginTitle: "System Login",
    loginSubtitle: "Enter your institutional credentials to access",
    identifierLabel: "Identifier (Email, NUIT or ID)",
    passwordLabel: "Password",
    loginButton: "Sign In",
    languageLabel: "Language",
    selectLanguage: "Select Language",
    autoLanguage: "Automatic (Browser)",
    forgotPassword: "Forgot password?",
    contactAdmin: "Contact Administrator",
    changePasswordRequired: "Mandatory Password Change",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    savePassword: "Save New Password",
    profileSettings: "Profile Settings",
    languagePreference: "Preferred Language",
    portuguese: "Portuguese",
    english: "English",
    french: "Français",
    spanish: "Español",
    notice: "Notice",
    save: "Save",
    cancel: "Cancel",
    success: "Success",
    error: "Error",
    workspace: "Workspace",
    sync: "Sync",
    database: "Database",
    minimize: "Minimize",
    fullscreen: "Fullscreen",
    restoreScreen: "Restore Screen",
    logout: "Sign Out",
    back: "Back",
    online: "ONLINE",
    userConnected: "Connected User",
    selectLanguageToContinue: "Select the language to continue",
    institution: "Institution",
    loggedInstitution: "LOGGED INSTITUTION",
    integratedSystem: "INTEGRATED MANAGEMENT SYSTEM",
    generalAdminPanel: "GENERAL ADMIN PANEL",
    changePassword: "Change Password",
    version: "Quantum Version 2026.9.1",
    developedBy: "Developed by Slaiter Tripas",
    systemFooterTitle: "SIGEP - Integrated Process Management System",
    repMozambique: "Republic of Mozambique",
    minEducation: "Ministry of Education and Culture",
    dirHigherEd: "National Directorate of Higher Education",
    fiscalYear: "Financial Year:",
    date: "Date:",
    subject: "Subject:",
    to: "To:",
    from: "From:",
    ourRef: "Our Ref:",
    infoProposta: "INFORMATION / PROPOSAL",
    infoPropostaNum: "Information Proposal No.",
    parecerDicosafa: "1. Technical Opinion & Approval (DICOSAFA)",
    despachoGDG: "2. Dispatch & Approval (Director-General)",
    detalhesDeslocacao: "Travel Details:",
    actividade: "Activity:",
    local: "Location:",
    datas: "Dates:",
    participantes: "Participant(s):",
    tabelaCustos: "Cost Table / Allowances:",
    ordemServico: "SERVICE ORDER",
    ordemServicoNum: "SERVICE ORDER No.",
    transferenciaFuncionario: "Transfer of employee:",
    guiaApresentacao: "INTERNAL PRESENTATION LETTER",
    pedidoDispensa: "DISPENSATION REQUEST",
    justificacaoFaltas: "JUSTIFICATION OF ABSENCES",
    pedidoDispensaOuFaltas: "DISPENSATION REQUEST OR ABSENCE JUSTIFICATION",
    nomeFuncionario: "Employee Name:",
    categoriaCarreira: "Category / Career:",
    departamentoDirecao: "Department / Directorate:",
    reparticaoSeccao: "Section / Office:",
    parecerChefe: "OPINION OF HIERARCHICAL SUPERIOR",
    infoDRH: "INFORMATION FROM HUMAN RESOURCES DEPARTMENT [DRH]",
    despacho: "DISPATCH",
    planoActividade: "Activity Plan",
    planoActividades: "Activities Plan",
    requerimentoFerias: "VACATION REQUEST",
    orgaoDirecaoGestao: "Governance and Management Body",
    servicosCentrais: "Central Services",
    unidadeOrganica: "Organic Unit",
    diretorGeral: "Director-General",
    diretorDicosafa: "Director of DICOSAFA",
    chefeGabinete: "Head of Cabinet",
    chefeDepartamento: "Head of Department",
    chefeReparticao: "Head of Section",
    responsavelSetor: "Sector Manager",
    pagina: "Page",
    campusPrincipal: "Main Campus",
    distritoDe: "District of",
    provinciaDe: "Province of",
    caixaPostal: "P.O. Box No.",
    paginaOficial: "Official website:",
    cliqueParaAssinar: "Click to sign",
    areaEmBrancoParecer: "Blank area (awaiting opinion)",
    areaEmBrancoDespacho: "Blank area (awaiting dispatch)",
    imprimirPdf: "Print / PDF",
    guardarSistema: "Save to System",
    voltar: "Back",
    registadoSucesso: "Successfully Registered!",
    aguarde: "Please wait...",
    aGuardar: "Saving...",
    geral: "General",
    selecioneDocumento: "Select Normative Document",
    selecioneUmDoc: "Select a document...",
    modelosFormulariosOficiais: "Official Templates & Forms",
    modelosDesc: "Select the desired normative document from the list below to fill and issue",
    cumprase: "Let it be executed.",
    efeitosImediatos: "This Service Order takes immediate effect",
    guiaTransferenciaBens: "ASSET TRANSFER LETTER",
    requisicaoInterna: "INTERNAL REQUISITION",
    fichaInventarioMovel: "MOVABLE ASSETS INVENTORY FORM",
    totalGeral: "Grand Total (MZN)",
    valorTotal: "Total Amount (MZN)",
    valorDiario: "Daily Rate",
    dias: "Days",
    descricao: "Description",
    beneficiario: "Beneficiary Name",
    ord: "No.",
    justificacao: "Justification:",
    anexos: "Attachments:",
    verAnexoOficial: "View / Open Official Attachment:",
    fechoCortesia: "Looking forward to your approval, I extend my best regards.",
    chefeMaximoDept: "THE HEAD OF DEPARTMENT",
    secretariaGeral: "1. GENERAL SECRETARIAT",
    parecerDpep: "2. DPEP OPINION",
    parecerDaf: "3. DAF OPINION",
    repTransporte: "4. TRANSPORT SECTION",
    emBranco: "Blank",
    assinar: "Sign",
    favoravel: "Favorable",
    desfavoravel: "Unfavorable",
    autorizado: "Authorized",
    naoAutorizado: "Not Authorized",
    propostaActividadesPESO: "PROPOSAL OF ACTIVITIES FOR PESO",
    actividadesPlanificadas: "Planned Activities",
    novaActividade: "New Activity",
    organizarPorMes: "Organize by Month & Order",
    pesquisar: "Search",
    filtros: "Filters",
    todos: "All",
    dashboard: "Dashboard",
    planning: "Planning",
    reports: "Reports",
    settings: "Settings",
    users: "Users",
    institutions: "Institutions",
    analytics: "Analytics",
    backup: "Backup",
    audit: "Audit",
    system: "System",
    welcome: "Welcome",
    enterCredentials: "Enter your login credentials.",
    identifierInputPlaceholder: "ID, TAX ID or Email",
    passwordInputPlaceholder: "•••••",
    signInSystem: "Sign In",
    aboutSystem: "About System",
    clearCacheHelp: "Resolve access issues (Clear Cache)",
    forgotPasswordHelp: "Forgot password (Dynamic Identity Validation)",
    plansAndDeadlines: "Publication of Plans & Defined Deadlines",
    activitiesToExecute: "Activities to Execute This Month",
    commemorativeDates: "Commemorative dates",
    nationalHolidays: "National holidays",
    institutionalHolidays: "Institutional holidays",
    noEventsScheduled: "No events scheduled in the coming days.",
    developedByFooter: "Developed by Franzíssi Tripalonga - 2025-2026 | @all rights reserved",
    instPlanningService: "INSTITUTIONAL PLANNING SERVICE",
    integratedInstPlatform: "Integrated Institutional Platform",
    multiInstPlatform: "SIGEP - Multi-Institutional Platform",
    institutionalCoverTitle: "INSTITUTIONAL PRESENTATION NOTE — SIGEP V1.1.2.0",
    institutionalCoverSubtitle: "Intelligent Strategic Management and Academic Projection Platform • Mozambique",
    repMozambiqueMCTES: "REPUBLIC OF MOZAMBIQUE • MINISTRY OF SCIENCE, TECHNOLOGY AND HIGHER EDUCATION",
    userDataTitle: "Connected User Information in the System",
    userServerLabel: "User / Officer:",
    roleFunctionLabel: "Position / Role:",
    organUnitLabel: "Governance Body / Unit:",
    confirmCoverAccess: "Confirm Reading and Access Workspace (SIGEP)",
    institutionalNoteP1: "SIGEP (Integrated Process Management System) is the Official Platform for Strategic Management, Academic Projection, and Electronic Workflow implemented to ensure operational excellence, transparency, and administrative speed in higher education and technical institutions of Mozambique.",
    institutionalNoteP2: "Through this institutional note, it is certified that the authenticated user is duly authorized and assigned within parametrized workflows, with real-time access to governance bodies, executive directories, document tracking, treasury, asset management, and automated management reports.",
    institutionalNoteP3: "All deadlines, proceedings, and authorizations performed by this user are audited and synchronized with the central database, guaranteeing regulatory compliance and fulfillment of the institution's strategic objectives.",
    presentationTitle: "SIGEP Mozambique",
    presentationSubtitle: "Institutional Systems Presentation",
    accessSigep: "Access SIGEP",
    enter: "Sign In",
    slideCounter: "Slide {{current}} of {{total}} (4s)",
    moduleCapabilities: "Core Module Capabilities",
    home: "Home",
    quantumAi: "QUANTUM AI",
    onlineBadge: "SYSTEM ONLINE",
    editDataAndPhoto: "ONLINE • EDIT PROFILE & PHOTO",
    userOnline: "Online",
    pendingProcesses: "Pending Processes",
    pendingNotificationsMsg: "There are notifications requiring your immediate attention in the system.",
    mainMenu: "Main Menu",
    selectAreaToAccess: "Select the area you wish to access",
    availableCourses: "Available Courses",
    selectArea: "Select Area",
    selectCourseDetails: "Select a course to view more details.",
    navigateSectors: "Navigate through available sections and sectors.",
    budgetCeiling: "Budget Ceiling",
    annualReport: "Annual Report",
    sectorPlan: "Sector Plan",
    budget: "Budget",
    access: "Access",
    visaoGeral: "Overview",
    boardOverview: "Management Board",
    efetivoGeral: "General Staff",
    corpoDocente: "Faculty / Teaching Staff",
    corpoCTA: "Technical Administrative Staff",
    estudantesPorCursoGenero: "Students by Course and Gender",
    planosAtividades: "Activity Plans",
    relatoriosDirecao: "Directorate Reports",
    gestaoExpediente: "Document Dispatch",
    recursosFinanceiros: "Financial Resources",
    totalAtividadesPlanificadas: "Total Planned Activities",
    orcamentoTotalProposto: "Total Proposed Budget",
    entradosPendentes: "Received / Pending",
    emTramitacao: "In Process",
    concluidos: "Completed",
    homens: "Men",
    mulheres: "Women",
    total: "Total",
    cursoLicenciatura: "Course / Degree",
    ativos: "Active",
    transferidos: "Transferred",
    reformados: "Retired",
    aceder: "Access",
    voltarVisaoGeral: "Back to Overview",
    informacaoIndisponivel: "Information Unavailable",
    detalhamentoEstudantes: "Student Details",
    desistentes: "Dropouts",
    graduados: "Graduates",
    nivel: "Level",
    subvencaoEstatal: "State General Budget (OGE)",
    receitasProprias: "Own Revenue",
    gestaoProdutosPrecos: "Products & Prices Management",
    gestaoFornecedores: "Supplier Management",
    planoAquisicao: "Procurement Plan",
    planoContratacao: "Contracting Plan",
    acaoOrcamental: "Budget Action",
    calendario: "Calendar",
    caixaMensagens: "Message Inbox",
    assinaturaDigital: "Digital Signature",
    atribuirAtividade: "Assign Activity",
    historicoDocumentos: "Document History",
    documentosNormativos: "Regulatory Documents",
    balanco: "Balance & Review",
    gestaoPessoal: "Staff Management",
    gestaoAcademica: "Academic Management",
    corpoDiscente: "Student Body",
    gestaoEstudantil: "Student Management",
    gestaoFrota: "Fleet Management",
    gestaoViatura: "Vehicle Management",
    bolsaEstudos: "Scholarships",
    estatistica: "Statistics",
    biblioteca: "Library",
    ugea: "Procurement (UGEA)",
    arquivoGeral: "General Archive",
    quadroAtividades: "Activity Board",
    minhaMatriz: "My Matrix",
    gestaoFormacao: "Training Management",
    horarios: "Schedules",
    exames: "Exams",
    graduadosMenu: "Graduates",
    disciplinas: "Subjects / Courses",
    laboratorios: "Laboratories",
    oficinas: "Workshops",
    blocosSalas: "Buildings & Classrooms",
    selecioneLingua: "Select the language to continue",
    footerTitle: "SIGEP • Integrated Management and Planning System",
    rightsReserved: "All Rights Reserved ©",
    legalInfoAndSupport: "Legal Information & Support",
    backupCenterTitle: "Backup and Data Protection Center by Governance Bodies",
    backupCenterSubtitle: "Automatic and transparent preservation of all information across SIGEP's 4 Bodies",
    activeStatus: "Active",
    fourOrgansAndOperations: "4 Governance Bodies & Operations",
    automaticBackupsInSystem: "Automatic Backups in System",
    autoProtectionGuaranteed: "Guaranteed Automatic Data Protection",
    autoProtectionSubtitle: "Backups are performed automatically every 12 hours and fully safeguard all records across the 4 Bodies of the Higher Polytechnic Institute of Songo.",
    runBackupNow: "Run Backup Now",
    fourOrgansCovered: "The 4 Bodies Covered by the Backup System:",
    activeCollectionsFirestore: "44 active collections in Firestore",
    organBackupBtn: "Body Backup",
    restoreBtn: "Restore",
    independentOperationsTitle: "Independent Backup & Restore Operations",
    independentOpsSubtitle: "The system keeps Data and System backups completely separate and independent.",
    dataBackupTitle: "Data Backup & Restore",
    dataBackupSubtitle: "Exclusive to institutional records, employees, activities, students, finances, and inventory of the 4 Bodies.",
    downloadDataBackupBtn: "Download Data Backup (JSON)",
    restoreDataBackupBtn: "Restore Data Backup",
    systemBackupTitle: "System Backup & Restore",
    systemBackupSubtitle: "Exclusive to user accounts, general settings, regulatory documents, notes, calendar, and messages.",
    downloadSystemBackupBtn: "Download System Backup (JSON)",
    restoreSystemBackupBtn: "Restore System Backup",
    savedCloudBackupsTitle: "Backup Copy Saved in Cloud / System",
    savedCloudSubtitle: "The Administrator can download, restore, or purge saved backups",
    deleteAllVersionsBtn: "Delete All Versions",
    newAutoBackupBtn: "New Automatic Backup",
    noBackupsYetTitle: "No backups recorded yet",
    noBackupsYetDesc: "The system automatically performs backups every 12 hours or upon clicking the button above.",
    downloadJsonBtn: "Download JSON",
    deleteBtn: "Delete",
    sigepInstitutionalTitle: "SIGEP Institutional",
    officialBadge: "Official",
    versionDetailsAndCopyright: "Version Details and Copyright",
    softwareVersionLabel: "Software Version",
    architectureLabel: "Architecture",
    hybridCloudSyncVal: "Hybrid Cloud Sync",
    dataSecurityLabel: "Data Security",
    quantumFirestoreVal: "Quantum Firestore",
    intellectualPropertyTitle: "Intellectual Property & Development",
    developedByFull: "Developed by Franzíssi Tripalonga (Slaiter Tripas)",
    copyrightReservedVal: "2025 - 2026 | @all rights reserved",
    intellectualPropertyDesc: "Exclusive development of the Integrated Process Management System (SIGEP), designed to ensure the integrity, security, traceability, and electronic governance of institutional files and resources.",
    coreModulesOperatingTitle: "Core Modules Operating",
    processManagementVal: "Process Management",
    ugeaSuppliersVal: "UGEA & Suppliers",
    staffHRManagementVal: "Staff & HR Management",
    autoCloudBackupVal: "Automatic Cloud Backup",
    highPerformanceEngineVal: "SIGEP High-Performance Engine",
    closeBtn: "Close",
  },
};

export function getTranslation(
  lang: Language = "pt",
  key: keyof typeof translations.pt
): string {
  const dict = translations[lang] || translations.pt;
  return dict[key] || translations.pt[key] || String(key);
}

export function getCurrentLanguage(): Language {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("idioma") || localStorage.getItem("sigep_language");
      if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
        return stored as Language;
      }
      const user = JSON.parse(localStorage.getItem("sigep_logged_in_user") || "null");
      if (user && user.idioma && (SUPPORTED_LANGUAGES as readonly string[]).includes(user.idioma)) {
        return user.idioma as Language;
      }
    }
  } catch (e) {}
  return resolveInitialLanguage();
}

export function setLanguagePreference(lang: Language | "auto", user?: any) {
  return changeSystemLanguage(lang, user);
}

/**
 * Hook do React para sincronização instantânea de idioma em qualquer componente
 */
export function useCurrentLanguage(): Language {
  const [lang, setLang] = useState<Language>(() => {
    const active = (i18n.language || getCurrentLanguage()) as Language;
    return (SUPPORTED_LANGUAGES as readonly string[]).includes(active) ? active : "pt";
  });

  useEffect(() => {
    const handleLangChange = (e: any) => {
      const newLang = e?.detail?.lang || (i18n.language as Language) || getCurrentLanguage();
      setLang((SUPPORTED_LANGUAGES as readonly string[]).includes(newLang) ? newLang : "pt");
    };

    const handleI18nChange = (lng: string) => {
      const clean = lng ? (lng.split("-")[0].toLowerCase() as Language) : "pt";
      setLang((SUPPORTED_LANGUAGES as readonly string[]).includes(clean) ? clean : "pt");
    };

    window.addEventListener("sigep_language_changed", handleLangChange);
    i18n.on("languageChanged", handleI18nChange);

    return () => {
      window.removeEventListener("sigep_language_changed", handleLangChange);
      i18n.off("languageChanged", handleI18nChange);
    };
  }, []);

  return lang;
}

/**
 * Tradutor de frases institucionais, cargos e nomes de documentos comuns
 */
export function translateInstitutionalText(text: string, lang: Language): string {
  if (!text) return "";
  if (lang === "pt") return text;

  const t = text.trim();
  const lower = t.toLowerCase();

  if (lang === "en") {
    if (lower === "informação / proposta" || lower === "informacao / proposta") return "INFORMATION / PROPOSAL";
    if (lower === "ordem de serviço" || lower === "ordem de servico") return "SERVICE ORDER";
    if (lower === "guia de apresentação interna") return "INTERNAL PRESENTATION LETTER";
    if (lower === "pedido de dispensa") return "DISPENSATION REQUEST";
    if (lower === "justificação de faltas") return "JUSTIFICATION OF ABSENCES";
    if (lower === "órgão de direção e gestão" || lower === "orgao de direcao e gestao") return "Governance and Management Body";
    if (lower === "serviços centrais" || lower === "servicos centrais") return "Central Services";
    if (lower === "unidade orgânica" || lower === "unidade organica") return "Organic Unit";
    if (lower === "diretor-geral" || lower === "diretor geral" || lower === "director-geral") return "Director-General";
    if (lower === "chefe do gabinete" || lower === "chefe de gabinete") return "Head of Cabinet";
    if (lower === "chefe do departamento" || lower === "chefe de departamento") return "Head of Department";
    if (lower === "chefe da repartição" || lower === "chefe de repartição" || lower === "chefe da reparticao") return "Head of Section";
    if (lower === "responsável do setor" || lower === "responsavel do setor") return "Sector Manager";
    if (lower === "diretor da divisão" || lower === "diretor da divisao") return "Division Director";
    if (lower === "diretor" || lower === "director") return "Director";
    if (lower === "gabinete do diretor-geral" || lower === "gabinete do diretor geral") return "Director-General's Cabinet";
    if (lower === "república de moçambique" || lower === "republica de mocambique") return "Republic of Mozambique";
    if (lower === "ministério da educação e cultura" || lower === "ministerio da educacao e cultura") return "Ministry of Education and Culture";
    if (lower === "direcção nacional de ensino superior" || lower === "direccao nacional de ensino superior") return "National Directorate of Higher Education";
    if (lower === "ministério da ciência, tecnologia e ensino superior" || lower === "ministerio da ciencia, tecnologia e ensino superior") return "Ministry of Science, Technology and Higher Education";
    if (lower === "sistema de gestão integrada" || lower === "sistema de gestao integrada") return "INTEGRATED MANAGEMENT SYSTEM";
    if (lower === "painel administrador geral") return "GENERAL ADMIN PANEL";
    if (lower === "instituição logada" || lower === "instituicao logada") return "LOGGED INSTITUTION";
    if (lower === "início" || lower === "inicio") return "Home";
    if (lower === "serviço de planificação institucional" || lower === "servico de planificacao institucional") return "INSTITUTIONAL PLANNING SERVICE";
    if (lower === "plataforma institucional integrada") return "Integrated Institutional Platform";
    if (lower === "plano de actividade" || lower === "plano de atividade") return "Activity Plan";
    if (lower === "plano de actividades" || lower === "plano de atividades") return "Activity Plan";
  }

  return text;
}

/**
 * Traduz nomes de instituições conforme o idioma seleccionado
 */
export function translateInstitutionName(name: string, lang: Language): string {
  if (!name || lang === "pt") return name || "";
  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();

  if (lang === "en") {
    if (lower.includes("instituto superior politécnico de songo") || lower.includes("instituto superior politecnico de songo")) {
      return "Higher Polytechnic Institute of Songo";
    }
    if (lower.includes("serviço de planificação institucional") || lower.includes("servico de planificacao institucional")) {
      return "INSTITUTIONAL PLANNING SERVICE";
    }
    if (lower.includes("universidade eduardo mondlane")) {
      return "Eduardo Mondlane University";
    }
    if (lower.includes("universidade pedagógica") || lower.includes("universidade pedagogica")) {
      return "Pedagogical University";
    }
    if (lower.includes("universidade lúrio") || lower.includes("universidade lurio")) {
      return "Lúrio University";
    }
    if (lower.includes("universidade zambeze")) {
      return "Zambeze University";
    }
    if (lower.includes("instituto superior de artes e cultura")) {
      return "Higher Institute of Arts and Culture";
    }
    if (lower.includes("instituto superior de ciências e tecnologia") || lower.includes("instituto superior de ciencias e tecnologia")) {
      return "Higher Institute of Science and Technology of Mozambique";
    }
    if (lower === "instituição" || lower === "instituicao") {
      return "INSTITUTION";
    }
    if (lower === "instituição logada" || lower === "instituicao logada") {
      return "LOGGED INSTITUTION";
    }
    if (lower === "instituição de ensino superior" || lower === "instituicao de ensino superior") {
      return "Higher Education Institution";
    }
    if (lower === "administração geral" || lower === "administracao geral") {
      return "GENERAL ADMINISTRATION";
    }
  }

  return trimmed;
}

/**
 * Traduz itens de menu do DirectorDashboard e navegação
 */
export function translateMenuTitle(title: string, lang: Language): string {
  if (!title || lang === "pt") return title || "";
  const trimmed = title.trim();
  const lower = trimmed.toLowerCase();

  if (lang === "en") {
    if (lower === "visão geral" || lower === "visao geral") return "Overview";
    if (lower === "plano") return "Plan";
    if (lower === "gestão de planos" || lower === "gestao de planos") return "Plan Management";
    if (lower === "ação orçamental" || lower === "acao orcamental") return "Budget Action";
    if (lower === "calendário" || lower === "calendario") return "Calendar";
    if (lower === "caixa de mensagens") return "Message Inbox";
    if (lower === "assinatura digital") return "Digital Signature";
    if (lower === "gestão de expediente" || lower === "gestao de expediente") return "Document Dispatch";
    if (lower === "histórico de documentos" || lower === "historico de documentos") return "Document History";
    if (lower === "documentos normativos") return "Regulatory Documents";
    if (lower === "relatórios" || lower === "relatorios") return "Reports";
    if (lower === "balanço" || lower === "balanco") return "Balance & Review";
    if (lower === "atribuir atividade") return "Assign Activity";
    if (lower === "gestão de pessoal" || lower === "gestao de pessoal") return "Staff Management";
    if (lower === "corpo discente") return "Student Body";
    if (lower === "estatística da repartição de pessoal" || lower === "estatistica da reparticao de pessoal") return "Staff Section Statistics";
    if (lower === "gestão estudantil" || lower === "gestao estudantil") return "Student Management";
    if (lower === "gestão de frota" || lower === "gestao de frota") return "Fleet Management";
    if (lower === "gestão de viatura" || lower === "gestao de viatura") return "Vehicle Management";
    if (lower === "bolsa de estudos" || lower === "bolsas de estudo") return "Scholarships";
    if (lower === "estatística" || lower === "estatistica") return "Statistics";
    if (lower === "biblioteca") return "Library";
    if (lower === "produtos e preços" || lower === "produtos e precos") return "Products & Prices";
    if (lower === "ugea") return "Procurement (UGEA)";
    if (lower === "arquivo geral") return "General Archive";
    if (lower === "quadro de atividades") return "Activity Board";
    if (lower === "minha matriz") return "My Matrix";
    if (lower === "gestão de formação" || lower === "gestao de formacao") return "Training Management";
    if (lower === "horários" || lower === "horarios") return "Schedules";
    if (lower === "exames") return "Exams";
    if (lower === "graduados") return "Graduates";
    if (lower === "disciplina" || lower === "disciplinas") return "Courses & Subjects";
    if (lower === "laboratório" || lower === "laboratorios" || lower === "laboratórios") return "Laboratories";
    if (lower === "oficinas") return "Workshops";
    if (lower === "blocos e sala de aula") return "Buildings & Classrooms";
  }

  return trimmed;
}

/**
 * Hook personalizado useTranslation para tradução instantânea e reativa em tempo real
 */
export function useTranslation() {
  const lang = useCurrentLanguage();
  const t = (key: keyof typeof translations.pt) => getTranslation(lang, key);
  const changeLanguage = (newLang: Language | "auto", user?: any) =>
    changeSystemLanguage(newLang, user);

  return {
    t,
    lang,
    getTranslation: (arg1: any, arg2?: any) => {
      if (arg2 !== undefined) {
        return getTranslation(arg1 as Language, arg2 as keyof typeof translations.pt);
      }
      return getTranslation(lang, arg1 as keyof typeof translations.pt);
    },
    changeLanguage,
    translateText: (text: string, overrideLang?: Language) =>
      translateInstitutionalText(text, overrideLang || lang),
    translateMenu: (title: string, overrideLang?: Language) =>
      translateMenuTitle(title, overrideLang || lang),
    translateInstName: (name: string, overrideLang?: Language) =>
      translateInstitutionName(name, overrideLang || lang),
    translateInstitutionalText: (text: string, overrideLang?: Language) =>
      translateInstitutionalText(text, overrideLang || lang),
  };
}

export default useTranslation;
