/**
 * Constantes e mensagens padronizadas do sistema
 */

export const ERROR_MESSAGES = {
  // Autenticação
  UNAUTHORIZED: "Não autorizado.",
  INVALID_PASSWORD: "Senha incorreta.",
  
  // Validação
  REQUIRED_FIELD: (field: string) => `Campo obrigatório: ${field}`,
  INVALID_EMAIL: "Email inválido.",
  INVALID_PHONE: "Telefone inválido.",
  NAME_TOO_SHORT: "Nome é obrigatório.",
  MESSAGE_TOO_SHORT: "Mensagem muito curta.",
  SUBJECT_REQUIRED: "Assunto é obrigatório.",
  
  // Leads
  LEAD_REGISTER_FAILED: "Falha ao registrar contato.",
  QUOTE_REGISTER_FAILED: "Falha ao registrar solicitação.",
  CATALOG_REGISTER_FAILED: "Falha ao registrar lead.",
  
  // Tickets
  TICKET_CREATE_FAILED: "Falha ao abrir chamado.",
  PROTOCOL_REQUIRED: "Informe o protocolo.",
  PROTOCOL_NOT_FOUND: "Protocolo não encontrado.",
  
  // Genérico
  GENERIC_ERROR: "Ocorreu um erro. Tente novamente.",
} as const;

export const SUCCESS_MESSAGES = {
  CONTACT_SENT: "Mensagem enviada. Nosso time retornará em breve.",
  QUOTE_SENT: "Solicitação registrada. Um especialista entrará em contato.",
  CATALOG_DOWNLOAD: "Lead registrado. Download liberado abaixo.",
  TICKET_CREATED: "Chamado aberto com sucesso.",
} as const;

export const ADMIN_CONFIG = {
  COOKIE_NAME: "jhr_admin",
  SESSION_DURATION_HOURS: 8,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_EXTENSIONS: [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".doc", ".docx"] as readonly string[],
} as const;
