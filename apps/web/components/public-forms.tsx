"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormStatus } from "@/components/form-status";
import { validateLeadLikeClient } from "@/lib/validators";

type SubmitState = { loading: boolean; message?: string; error?: boolean; downloadUrl?: string; protocol?: string };

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}

async function postForm(url: string, body: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Falha ao enviar.");
  }
  return data;
}

function formToRecord(fd: FormData) {
  return Object.fromEntries(fd.entries());
}

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ loading: false });
  return (
    <form
      className="panel space-y-4 p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const body = formToRecord(fd);
        const validationError = validateLeadLikeClient(body as { name?: string; email?: string; phone?: string });
        if (validationError) {
          setState({ loading: false, error: true, message: validationError });
          return;
        }
        setState({ loading: true });
        try {
          await postForm("/api/contact", body);
          form.reset();
          setState({ loading: false, message: "Mensagem enviada. Nosso time retornará em breve." });
        } catch (error) {
          setState({ loading: false, error: true, message: (error as Error).message });
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome"><Input name="name" required aria-label="Nome" /></Field>
        <Field label="Email"><Input type="email" name="email" required aria-label="Email" /></Field>
        <Field label="Telefone"><Input name="phone" required aria-label="Telefone" /></Field>
        <Field label="Assunto"><Input name="subject" required aria-label="Assunto" /></Field>
      </div>
      <Field label="Mensagem"><Textarea name="message" required aria-label="Mensagem" /></Field>
      <Button type="submit" disabled={state.loading}>{state.loading ? "Enviando..." : "Enviar contato"}</Button>
      <FormStatus message={state.message} error={state.error} />
    </form>
  );
}

export function QuoteForm({ productName, sourceLabel }: { productName?: string; sourceLabel: string }) {
  const [state, setState] = useState<SubmitState>({ loading: false });
  const defaultMessage = useMemo(
    () =>
      productName
        ? `Solicitação de orçamento/cotação para ${sourceLabel}: ${productName}.`
        : `Solicitação comercial para ${sourceLabel}.`,
    [productName, sourceLabel],
  );

  return (
    <form
      className="panel space-y-4 p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const body = formToRecord(fd);
        const validationError = validateLeadLikeClient(body as { name?: string; email?: string; phone?: string });
        if (validationError) {
          setState({ loading: false, error: true, message: validationError });
          return;
        }
        setState({ loading: true });
        try {
          await postForm("/api/quote", body);
          form.reset();
          setState({ loading: false, message: "Solicitação registrada. Um especialista entrará em contato." });
        } catch (error) {
          setState({ loading: false, error: true, message: (error as Error).message });
        }
      }}
    >
      <input type="hidden" name="productName" defaultValue={productName || ""} />
      <input type="hidden" name="origin" defaultValue={sourceLabel} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome"><Input name="name" required aria-label="Nome completo" /></Field>
        <Field label="Email"><Input type="email" name="email" required aria-label="E-mail" /></Field>
        <Field label="Telefone"><Input name="phone" required aria-label="Telefone" /></Field>
        <Field label="Assunto"><Input name="subject" defaultValue="Solicitar orçamento" required aria-label="Assunto" /></Field>
      </div>
      <Field label="Mensagem"><Textarea name="message" defaultValue={defaultMessage} aria-label="Mensagem" /></Field>
      <Button type="submit" disabled={state.loading}>{state.loading ? "Enviando..." : "Solicitar orçamento"}</Button>
      <FormStatus message={state.message} error={state.error} />
    </form>
  );
}

export function CatalogLeadForm() {
  const [state, setState] = useState<SubmitState>({ loading: false });
  const isSuccess = state.downloadUrl && !state.error;

  return (
    <form
      className={`panel space-y-4 p-6 transition-all duration-500 ${isSuccess ? "ring-2 ring-accent/50 bg-accent/5" : ""}`}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const body = formToRecord(fd);
        const validationError = validateLeadLikeClient(body as { name?: string; email?: string; phone?: string });
        if (validationError) {
          setState({ loading: false, error: true, message: validationError });
          return;
        }
        setState({ loading: true, message: undefined });
        try {
          const data = await postForm("/api/catalog", body);
          setState({
            loading: false,
            message: "✅ Lead registrado com sucesso! Clique abaixo para baixar.",
            downloadUrl: data.downloadUrl,
          });
        } catch (error) {
          setState({ loading: false, error: true, message: (error as Error).message });
        }
      }}
    >
      {!isSuccess && (
        <>
          <Field label="Nome"><Input name="name" required aria-label="Nome completo" /></Field>
          <Field label="Email"><Input name="email" type="email" required aria-label="E-mail" /></Field>
          <Field label="Telefone"><Input name="phone" required aria-label="Telefone" /></Field>
          <Button type="submit" disabled={state.loading} className="w-full">
            {state.loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Processando...
              </span>
            ) : (
              "Baixar Catálogo"
            )}
          </Button>
        </>
      )}
      <FormStatus message={state.message} error={state.error} />
      {isSuccess && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm text-muted">Seu catálogo está pronto!</p>
          <a
            href={state.downloadUrl}
            download
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-accent/90"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Baixar Catálogo PDF
          </a>
        </div>
      )}
    </form>
  );
}

export function TicketForm() {
  const [state, setState] = useState<SubmitState>({ loading: false });
  return (
    <form
      className="panel space-y-4 p-6"
      encType="multipart/form-data"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const validationError = validateLeadLikeClient(Object.fromEntries(fd.entries()) as { name?: string; email?: string; phone?: string });
        if (validationError) {
          setState({ loading: false, error: true, message: validationError });
          return;
        }
        setState({ loading: true });
        try {
          const res = await fetch("/api/tickets", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Falha ao abrir chamado.");
          form.reset();
          setState({ loading: false, message: "Chamado aberto com sucesso.", protocol: data.protocol });
        } catch (error) {
          setState({ loading: false, error: true, message: (error as Error).message });
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome"><Input name="name" required /></Field>
        <Field label="Email"><Input type="email" name="email" required /></Field>
        <Field label="Telefone"><Input name="phone" required /></Field>
        <Field label="Assunto"><Input name="subject" required /></Field>
      </div>
      <Field label="Mensagem"><Textarea name="message" required /></Field>
      <Field label="Upload de foto/anexo"><Input type="file" name="attachments" multiple /></Field>
      <Button type="submit" disabled={state.loading}>{state.loading ? "Enviando..." : "Abrir chamado"}</Button>
      <FormStatus message={state.message} error={state.error} />
      {state.protocol ? <p className="text-sm text-amber">Protocolo: <strong>{state.protocol}</strong></p> : null}
    </form>
  );
}

export function TicketStatusLookup() {
  const [protocol, setProtocol] = useState("");
  const [result, setResult] = useState<{ status?: string; updatedAt?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="panel space-y-4 p-6">
      <h3 className="text-lg font-semibold">Consultar status do chamado</h3>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input value={protocol} onChange={(e) => setProtocol(e.target.value)} placeholder="Ex.: JHR-2026-0001" />
        <Button
          type="button"
          onClick={async () => {
            setLoading(true);
            setResult(null);
            const res = await fetch(`/api/tickets?protocol=${encodeURIComponent(protocol)}`);
            const data = await res.json();
            setLoading(false);
            if (!res.ok) return setResult({ error: data.error || "Protocolo não encontrado." });
            setResult({ status: data.status, updatedAt: data.updatedAt });
          }}
          disabled={!protocol || loading}
        >
          {loading ? "Consultando..." : "Consultar"}
        </Button>
      </div>
      {result?.error ? <p className="text-sm text-red-400">{result.error}</p> : null}
      {result?.status ? (
        <p className="text-sm text-muted">
          Status: <span className="font-semibold text-white">{result.status}</span> | Atualizado em {new Date(result.updatedAt!).toLocaleString("pt-BR")}
        </p>
      ) : null}
    </div>
  );
}

export function ProductFilters({
  categories,
  currentCategory,
  currentSearch,
  currentCapacity,
  currentApplication,
  basePath,
  showTechnicalFilters = false,
}: {
  categories: { slug: string; name: string }[];
  currentCategory?: string;
  currentSearch?: string;
  currentCapacity?: string;
  currentApplication?: string;
  basePath: string;
  showTechnicalFilters?: boolean;
}) {
  return (
    <form
      method="GET"
      action={basePath}
      className={`panel grid gap-4 p-4 ${showTechnicalFilters ? "md:grid-cols-2 xl:grid-cols-[1fr_220px_220px_220px_auto]" : "md:grid-cols-[1fr_220px_auto]"} md:items-end`}
    >
      <Field label="Busca"><Input name="q" defaultValue={currentSearch || ""} placeholder="Nome ou descrição" /></Field>
      <Field label="Tipo/Category">
        <Select name="categoria" defaultValue={currentCategory || ""}>
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>{category.name}</option>
          ))}
        </Select>
      </Field>
      {showTechnicalFilters ? (
        <Field label="Capacidade">
          <Input name="capacidade" defaultValue={currentCapacity || ""} placeholder="Placeholder" />
        </Field>
      ) : null}
      {showTechnicalFilters ? (
        <Field label="Aplicação">
          <Input name="aplicacao" defaultValue={currentApplication || ""} placeholder="Placeholder" />
        </Field>
      ) : null}
      <Button type="submit">Filtrar</Button>
    </form>
  );
}
