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
export { LANGUAGE_OPTIONS };
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
  },
  fr: {
    systemTitle: "SIGEP - Système Intégré de Gestion Stratégique et de Planification",
    loginTitle: "Connexion au Système",
    loginSubtitle: "Entrez vos identifiants institutionnels pour accéder",
    identifierLabel: "Identifiant (Email, NUIT ou ID)",
    passwordLabel: "Mot de passe",
    loginButton: "Se connecter",
    languageLabel: "Langue",
    selectLanguage: "Choisir la Langue",
    autoLanguage: "Automatique (Navigateur)",
    forgotPassword: "Mot de passe oublié?",
    contactAdmin: "Contacter l'Administrateur",
    changePasswordRequired: "Changement de mot de passe obligatoire",
    newPassword: "Nouveau Mot de Passe",
    confirmPassword: "Confirmer le Mot de Passe",
    savePassword: "Enregistrer le Nouveau Mot de Passe",
    profileSettings: "Paramètres du Profil",
    languagePreference: "Langue Préférée",
    portuguese: "Portugais",
    english: "Anglais",
    french: "Français",
    spanish: "Espagnol",
    save: "Enregistrer",
    cancel: "Annuler",
    success: "Succès",
    error: "Erreur",
    workspace: "Espace de Travail",
    sync: "Synchroniser",
    database: "Base de Données",
    minimize: "Réduire",
    fullscreen: "Plein Écran",
    restoreScreen: "Restaurer l'Écran",
    logout: "Déconnexion",
    back: "Retour",
    online: "EN LIGNE",
    userConnected: "Utilisateur Connecté",
    institution: "Institution",
    loggedInstitution: "INSTITUTION CONNECTÉE",
    integratedSystem: "SYSTÈME DE GESTION INTÉGRÉE",
    generalAdminPanel: "PANNEAU D'ADMINISTRATION GÉNÉRALE",
    changePassword: "Changer le Mot de Passe",
    version: "Version Quantique 2026.9.1",
    developedBy: "Développé par Slaiter Tripas",
    systemFooterTitle: "SIGEP - Système Intégré de Gestion des Processus",
    repMozambique: "République du Mozambique",
    minEducation: "Ministère de l'Éducation et de la Culture",
    dirHigherEd: "Direction Nationale de l'Enseignement Supérieur",
    fiscalYear: "Exercice Financier:",
    date: "Date:",
    subject: "Objet:",
    to: "À:",
    from: "De:",
    ourRef: "N/Réf:",
    infoProposta: "INFORMATION / PROPOSITION",
    infoPropostaNum: "Information Proposition N°",
    parecerDicosafa: "1. Avis Technique & Approbation (DICOSAFA)",
    despachoGDG: "2. Décision & Approbation (Directeur Général)",
    detalhesDeslocacao: "Détails du Déplacement:",
    actividade: "Activité:",
    local: "Lieu:",
    datas: "Dates:",
    participantes: "Participant(s):",
    tabelaCustos: "Tableau des Coûts / Indemnités:",
    ordemServico: "ORDRE DE SERVICE",
    ordemServicoNum: "ORDRE DE SERVICE N°",
    transferenciaFuncionario: "Transfert de l'employé:",
    guiaApresentacao: "LETTRE DE PRÉSENTATION INTERNE",
    pedidoDispensa: "DEMANDE DE DISPENSE",
    justificacaoFaltas: "JUSTIFICATION D'ABSENCES",
    pedidoDispensaOuFaltas: "DEMANDE DE DISPENSE OU JUSTIFICATION D'ABSENCES",
    nomeFuncionario: "Nom de l'Employé(e):",
    categoriaCarreira: "Catégorie / Carrière:",
    departamentoDirecao: "Département / Direction:",
    reparticaoSeccao: "Section / Bureau:",
    parecerChefe: "AVIS DU SUPÉRIEUR HIÉRARCHIQUE",
    infoDRH: "INFORMATION DU DÉPARTEMENT DES RESSOURCES HUMAINES [DRH]",
    despacho: "DÉCISION",
    planoActividade: "Plan d'Activité",
    planoActividades: "Plan d'Activités",
    requerimentoFerias: "DEMANDE DE CONGÉ",
    orgaoDirecaoGestao: "Organe de Direction et de Gestion",
    servicosCentrais: "Services Centraux",
    unidadeOrganica: "Unité Organique",
    diretorGeral: "Directeur Général",
    diretorDicosafa: "Directeur de la DICOSAFA",
    chefeGabinete: "Chef de Cabinet",
    chefeDepartamento: "Chef de Département",
    chefeReparticao: "Chef de Section",
    responsavelSetor: "Responsable de Secteur",
    pagina: "Page",
    campusPrincipal: "Campus Principal",
    distritoDe: "District de",
    provinciaDe: "Province de",
    caixaPostal: "Boîte Postale N°",
    paginaOficial: "Site officiel:",
    cliqueParaAssinar: "Cliquez pour signer",
    areaEmBrancoParecer: "Zone blanche (en attente d'avis)",
    areaEmBrancoDespacho: "Zone blanche (en attente de décision)",
    imprimirPdf: "Imprimer / PDF",
    guardarSistema: "Enregistrer dans le Système",
    voltar: "Retour",
    registadoSucesso: "Enregistré avec succès!",
    aguarde: "Veuillez patienter...",
    aGuardar: "Enregistrement...",
    geral: "Général",
    selecioneDocumento: "Sélectionnez le Document Normatif",
    selecioneUmDoc: "Sélectionnez un document...",
    modelosFormulariosOficiais: "Modèles et Formulaires Officiels",
    modelosDesc: "Sélectionnez le document normatif souhaité dans la liste ci-dessous",
    cumprase: "Qu'il en soit fait ainsi.",
    efeitosImediatos: "Cet Ordre de Service prend effet immédiat",
    guiaTransferenciaBens: "BON DE TRANSFERT DE BIENS",
    requisicaoInterna: "RÉQUISITION INTERNE",
    fichaInventarioMovel: "FICHE D'INVENTAIRE DES BIENS MEUBLES",
    totalGeral: "Total Général (MZN)",
    valorTotal: "Montant Total (MZN)",
    valorDiario: "Montant Journalier",
    dias: "Jours",
    descricao: "Description",
    beneficiario: "Nom du Bénéficiaire",
    ord: "N°",
    justificacao: "Justification:",
    anexos: "Pièces jointes:",
    verAnexoOficial: "Voir / Ouvrir la Pièce Jointe Officielle:",
    fechoCortesia: "Dans l'attente de votre approbation, je vous prie d'agréer mes salutations distinguées.",
    chefeMaximoDept: "LE CHEF DU DÉPARTEMENT",
    secretariaGeral: "1. SECRÉTARIAT GÉNÉRAL",
    parecerDpep: "2. AVIS DU DPEP",
    parecerDaf: "3. AVIS DU DAF",
    repTransporte: "4. SECTION TRANSPORT",
    emBranco: "En blanc",
    assinar: "Signer",
    favoravel: "Favorable",
    desfavoravel: "Défavorable",
    autorizado: "Autorisé",
    naoAutorizado: "Non Autorisé",
    propostaActividadesPESO: "PROPOSITION D'ACTIVITÉS POUR LE PESO",
    actividadesPlanificadas: "Activités Planifiées",
    novaActividade: "Nouvelle Activité",
    organizarPorMes: "Organiser par Mois & Ordre",
    pesquisar: "Rechercher",
    filtros: "Filtres",
    todos: "Tous",
    dashboard: "Tableau de Bord",
    planning: "Planification",
    reports: "Rapports",
    settings: "Paramètres",
    users: "Utilisateurs",
    institutions: "Institutions",
    analytics: "Analytique",
    backup: "Sauvegarde",
    audit: "Audit",
    system: "Système",
  },
  es: {
    systemTitle: "SIGEP - Sistema Integrado de Gestión Estratégica y Planificación",
    loginTitle: "Acceso al Sistema",
    loginSubtitle: "Ingrese sus credenciales institucionales para acceder",
    identifierLabel: "Identificador (Email, NUIT o ID)",
    passwordLabel: "Contraseña",
    loginButton: "Iniciar Sesión",
    languageLabel: "Idioma",
    selectLanguage: "Seleccionar Idioma",
    autoLanguage: "Automático (Navegador)",
    forgotPassword: "¿Olvidó su contraseña?",
    contactAdmin: "Contactar al Administrador",
    changePasswordRequired: "Cambio Obligatorio de Contraseña",
    newPassword: "Nueva Contraseña",
    confirmPassword: "Confirmar Contraseña",
    savePassword: "Guardar Nueva Contraseña",
    profileSettings: "Configuraciones del Perfil",
    languagePreference: "Idioma Preferido",
    portuguese: "Portugués",
    english: "Inglés",
    french: "Francés",
    spanish: "Español",
    save: "Guardar",
    cancel: "Cancelar",
    success: "Éxito",
    error: "Error",
    workspace: "Área de Trabajo",
    sync: "Sincronizar",
    database: "Base de Datos",
    minimize: "Minimizar",
    fullscreen: "Pantalla Completa",
    restoreScreen: "Restaurar Pantalla",
    logout: "Cerrar Sesión",
    back: "Volver",
    online: "EN LÍNEA",
    userConnected: "Usuario Conectado",
    institution: "Institución",
    loggedInstitution: "INSTITUCIÓN CONECTADA",
    integratedSystem: "SISTEMA DE GESTIÓN INTEGRADA",
    generalAdminPanel: "PANEL ADMINISTRADOR GENERAL",
    changePassword: "Cambiar Contraseña",
    version: "Versión Cuántica 2026.9.1",
    developedBy: "Desarrollado por Slaiter Tripas",
    systemFooterTitle: "SIGEP - Sistema Integrado de Gestión de Procesos",
    repMozambique: "República de Mozambique",
    minEducation: "Ministerio de Educación y Cultura",
    dirHigherEd: "Dirección Nacional de Educación Superior",
    fiscalYear: "Ejercicio Económico:",
    date: "Fecha:",
    subject: "Asunto:",
    to: "A:",
    from: "De:",
    ourRef: "N/Ref:",
    infoProposta: "INFORMACIÓN / PROPUESTA",
    infoPropostaNum: "Información Propuesta Nº",
    parecerDicosafa: "1. Dictamen Técnico & Homologación (DICOSAFA)",
    despachoGDG: "2. Despacho & Homologación (Director General)",
    detalhesDeslocacao: "Detalles del Desplazamiento:",
    actividade: "Actividad:",
    local: "Lugar:",
    datas: "Fechas:",
    participantes: "Participante(s):",
    tabelaCustos: "Tabla de Costos / Viáticos:",
    ordemServico: "ORDEN DE SERVICIO",
    ordemServicoNum: "ORDEN DE SERVICIO Nº",
    transferenciaFuncionario: "Transferencia del funcionario:",
    guiaApresentacao: "GUÍA DE PRESENTACIÓN INTERNA",
    pedidoDispensa: "SOLICITUD DE DISPENSA",
    justificacaoFaltas: "JUSTIFICACIÓN DE FALTAS",
    pedidoDispensaOuFaltas: "SOLICITUD DE DISPENSA O JUSTIFICACIÓN DE FALTAS",
    nomeFuncionario: "Nombre del Funcionario(a):",
    categoriaCarreira: "Categoría / Carrera:",
    departamentoDirecao: "Departamento / Dirección:",
    reparticaoSeccao: "Sección / Oficina:",
    parecerChefe: "DICTAMEN DEL JEFE JERÁRQUICO",
    infoDRH: "INFORMACIÓN DEL DEPARTAMENTO DE RECURSOS HUMANOS [DRH]",
    despacho: "DESPACHO",
    planoActividade: "Plan de Actividades",
    planoActividades: "Plan de Actividades",
    requerimentoFerias: "SOLICITUD DE VACACIONES",
    orgaoDirecaoGestao: "Órgano de Dirección y Gestión",
    servicosCentrais: "Servicios Centrales",
    unidadeOrganica: "Unidad Orgánica",
    diretorGeral: "Director General",
    diretorDicosafa: "Director de la DICOSAFA",
    chefeGabinete: "Jefe de Gabinete",
    chefeDepartamento: "Jefe de Departamento",
    chefeReparticao: "Jefe de Sección",
    responsavelSetor: "Responsable del Sector",
    pagina: "Pág.",
    campusPrincipal: "Campus Principal",
    distritoDe: "Distrito de",
    provinciaDe: "Provincia de",
    caixaPostal: "Apartado Postal Nº",
    paginaOficial: "Página oficial:",
    cliqueParaAssinar: "Haga clic para firmar",
    areaEmBrancoParecer: "Área en blanco (espera dictamen)",
    areaEmBrancoDespacho: "Área en blanco (espera despacho)",
    imprimirPdf: "Imprimir / PDF",
    guardarSistema: "Guardar en el Sistema",
    voltar: "Volver",
    registadoSucesso: "¡Registrado con éxito!",
    aguarde: "Espere por favor...",
    aGuardar: "Guardando...",
    geral: "General",
    selecioneDocumento: "Seleccione el Documento Normativo",
    selecioneUmDoc: "Seleccione un documento...",
    modelosFormulariosOficiais: "Modelos y Formularios Oficiales",
    modelosDesc: "Seleccione el documento normativo deseado en la lista a continuación",
    cumprase: "Cúmplase.",
    efeitosImediatos: "La presente Orden de Servicio produce efectos inmediatos",
    guiaTransferenciaBens: "GUÍA DE TRANSFERENCIA DE BIENES",
    requisicaoInterna: "REQUISICIÓN INTERNA",
    fichaInventarioMovel: "FICHA DE REGISTRO DE INVENTARIO DE BIENES MUEBLES",
    totalGeral: "Total General (MZN)",
    valorTotal: "Valor Total (MZN)",
    valorDiario: "Valor Diario",
    dias: "Días",
    descricao: "Descripción",
    beneficiario: "Nombre del Beneficiario",
    ord: "Nº",
    justificacao: "Justificación:",
    anexos: "Anexos:",
    verAnexoOficial: "Ver / Abrir Anexo Oficial:",
    fechoCortesia: "A la espera de su aprobación, le saluda atentamente.",
    chefeMaximoDept: "EL JEFE DEL DEPARTAMENTO",
    secretariaGeral: "1. SECRETARÍA GENERAL",
    parecerDpep: "2. DICTAMEN DEL DPEP",
    parecerDaf: "3. DICTAMEN DEL DAF",
    repTransporte: "4. SECCIÓN DE TRANSPORTE",
    emBranco: "En blanco",
    assinar: "Firmar",
    favoravel: "Favorable",
    desfavoravel: "Desfavorable",
    autorizado: "Autorizado",
    naoAutorizado: "No Autorizado",
    propostaActividadesPESO: "PROPUESTA DE ACTIVIDADES PARA EL PESO",
    actividadesPlanificadas: "Actividades Planificadas",
    novaActividade: "Nueva Actividad",
    organizarPorMes: "Organizar por Mes y Orden",
    pesquisar: "Buscar",
    filtros: "Filtros",
    todos: "Todos",
    dashboard: "Panel de Control",
    planning: "Planificación",
    reports: "Informes",
    settings: "Configuraciones",
    users: "Usuarios",
    institutions: "Instituciones",
    analytics: "Analítica",
    backup: "Copia de Seguridad",
    audit: "Auditoría",
    system: "Sistema",
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
    if (lower === "órgão de direção e gestão") return "Governance and Management Body";
    if (lower === "serviços centrais") return "Central Services";
    if (lower === "unidade orgânica") return "Organic Unit";
    if (lower === "diretor-geral") return "Director-General";
    if (lower === "chefe do departamento") return "Head of Department";
    if (lower === "chefe da repartição") return "Head of Section";
    if (lower === "responsável do setor") return "Sector Manager";
    if (lower === "república de moçambique") return "Republic of Mozambique";
    if (lower === "ministério da educação e cultura") return "Ministry of Education and Culture";
    if (lower === "direcção nacional de ensino superior") return "National Directorate of Higher Education";
  } else if (lang === "fr") {
    if (lower === "informação / proposta" || lower === "informacao / proposta") return "INFORMATION / PROPOSITION";
    if (lower === "ordem de serviço" || lower === "ordem de servico") return "ORDRE DE SERVICE";
    if (lower === "guia de apresentação interna") return "LETTRE DE PRÉSENTATION INTERNE";
    if (lower === "pedido de dispensa") return "DEMANDE DE DISPENSE";
    if (lower === "justificação de faltas") return "JUSTIFICATION D'ABSENCES";
    if (lower === "órgão de direção e gestão") return "Organe de Direction et de Gestion";
    if (lower === "serviços centrais") return "Services Centraux";
    if (lower === "unidade orgânica") return "Unité Organique";
    if (lower === "diretor-geral") return "Directeur Général";
    if (lower === "chefe do departamento") return "Chef de Département";
    if (lower === "chefe da repartição") return "Chef de Section";
    if (lower === "responsável do setor") return "Responsable de Secteur";
    if (lower === "república de moçambique") return "République du Mozambique";
    if (lower === "ministério da educação e cultura") return "Ministère de l'Éducation et de la Culture";
    if (lower === "direcção nacional de ensino superior") return "Direction Nationale de l'Enseignement Supérieur";
  } else if (lang === "es") {
    if (lower === "informação / proposta" || lower === "informacao / proposta") return "INFORMACIÓN / PROPUESTA";
    if (lower === "ordem de serviço" || lower === "ordem de servico") return "ORDEN DE SERVICIO";
    if (lower === "guia de apresentação interna") return "GUÍA DE PRESENTACIÓN INTERNA";
    if (lower === "pedido de dispensa") return "SOLICITUD DE DISPENSA";
    if (lower === "justificação de faltas") return "JUSTIFICACIÓN DE FALTAS";
    if (lower === "órgão de direção e gestão") return "Órgano de Dirección y Gestión";
    if (lower === "serviços centrais") return "Servicios Centrales";
    if (lower === "unidade orgânica") return "Unidad Orgánica";
    if (lower === "diretor-geral") return "Director General";
    if (lower === "chefe do departamento") return "Jefe de Departamento";
    if (lower === "chefe da repartição") return "Jefe de Sección";
    if (lower === "responsável do setor") return "Responsable del Sector";
    if (lower === "república de moçambique") return "República de Mozambique";
    if (lower === "ministério da educação e cultura") return "Ministerio de Educación y Cultura";
    if (lower === "direcção nacional de ensino superior") return "Dirección Nacional de Educación Superior";
  }

  return text;
}

/**
 * Hook personalizado useTranslation para tradução instantânea em tempo real
 */
export function useTranslation() {
  const lang = useCurrentLanguage();
  const t = (key: keyof typeof translations.pt) => getTranslation(lang, key);
  const changeLanguage = (newLang: Language | "auto", user?: any) =>
    changeSystemLanguage(newLang, user);

  return {
    t,
    lang,
    changeLanguage,
    translateText: (text: string) => translateInstitutionalText(text, lang),
  };
}
