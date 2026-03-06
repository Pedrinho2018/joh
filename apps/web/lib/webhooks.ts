type WebhookPayload = Record<string, unknown>;

const WEBHOOK_TIMEOUT_MS = 5000;
const MAX_RETRIES = 2;

async function postWebhook(
  path: string,
  payload: WebhookPayload,
  retries = MAX_RETRIES
): Promise<boolean> {
  const base = process.env.AUTOMATION_WEBHOOK_URL;
  if (!base) {
    console.warn("[Webhook] AUTOMATION_WEBHOOK_URL não configurado");
    return false;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    clearTimeout(timeoutId);
    
    const isAbort = error instanceof Error && error.name === "AbortError";
    const errorMsg = isAbort ? "timeout" : (error as Error).message;
    
    console.error(`[Webhook] Falha em ${path}: ${errorMsg}`);

    if (retries > 0) {
      console.log(`[Webhook] Tentando novamente... (${retries} restantes)`);
      await new Promise((r) => setTimeout(r, 1000));
      return postWebhook(path, payload, retries - 1);
    }

    return false;
  }
}

export function notifyLead(payload: WebhookPayload): Promise<boolean> {
  return postWebhook("/webhook/lead", payload);
}

export function notifyTicket(payload: WebhookPayload): Promise<boolean> {
  return postWebhook("/webhook/ticket", payload);
}
