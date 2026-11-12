"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Tape } from "@/components/ui/Tape";
import { ease } from "@/lib/motion";
import {
  PROJECT_TYPES,
  quoteSchema,
  type QuoteInput,
} from "@/lib/quote-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

export function QuoteForm() {
  const t = useTranslations("contact");
  const hero = useTranslations("hero");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { type: "piso" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("sending");
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, String(v ?? "")));
    fd.append("locale", locale);
    files.slice(0, 6).forEach((f) => fd.append("photos", f));
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  const err = (k: keyof QuoteInput) => {
    const msg = errors[k]?.message;
    return msg ? t(`errors.${msg}` as "errors.name") : undefined;
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="ok"
            className="relative min-h-[420px] pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
          >
            <m.p
              className="inline-block font-stencil font-black leading-[0.85] text-ink [font-size:clamp(4.5rem,3rem+7vw,9rem)]"
              initial={reduce ? false : { scale: 1.45, rotate: -9, opacity: 0 }}
              animate={{ scale: 1, rotate: -4, opacity: 1 }}
              transition={{ duration: 0.32, ease: ease.cinta }}
            >
              {t("success.stamp")}
            </m.p>
            <m.div
              aria-hidden
              className="mt-2 origin-left overflow-hidden"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: ease.cinta }}
            >
              <Tape print={hero("tape")} className="h-10 -rotate-2" />
            </m.div>
            <h3 className="mt-10 font-display text-h3 font-extrabold">
              {t("success.title")}
            </h3>
            <p className="mt-3 max-w-[28rem] text-lead">{t("success.body")}</p>
            <button
              type="button"
              className="mt-8 font-body font-semibold underline decoration-2 underline-offset-4"
              onClick={() => {
                reset();
                setFiles([]);
                setStatus("idle");
              }}
            >
              {t("success.again")}
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            className="grid gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            aria-busy={status === "sending"}
          >
            <div className="grid gap-7 md:grid-cols-2 md:gap-6">
              <Field
                label={t("fields.name")}
                error={err("name")}
                id={`${uid}-name`}
              >
                <input
                  id={`${uid}-name`}
                  autoComplete="name"
                  placeholder={t("placeholders.name")}
                  className={inputCls(!!errors.name)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${uid}-name-e` : undefined}
                  {...register("name")}
                />
              </Field>
              <Field
                label={t("fields.phone")}
                error={err("phone")}
                id={`${uid}-phone`}
              >
                <input
                  id={`${uid}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={t("placeholders.phone")}
                  className={inputCls(!!errors.phone)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${uid}-phone-e` : undefined}
                  {...register("phone")}
                />
              </Field>
            </div>

            <fieldset>
              <legend className="text-caption font-medium text-ink">
                {t("fields.type")}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROJECT_TYPES.map((p) => (
                  <label key={p} className="relative cursor-pointer">
                    <input
                      type="radio"
                      value={p}
                      className="peer sr-only"
                      {...register("type")}
                    />
                    <span className="block px-4 py-3 font-body text-[0.875rem] font-medium leading-none text-ink shadow-[inset_0_0_0_1.5px_var(--ink)] transition-colors duration-150 hover:bg-ink/10 peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                      {t(`types.${p}`)}
                    </span>
                  </label>
                ))}
              </div>
              {errors.type && <ErrorText>{err("type")}</ErrorText>}
            </fieldset>

            <div className="grid gap-7 md:grid-cols-2 md:gap-6">
              <Field label={t("fields.area")} id={`${uid}-area`}>
                <input
                  id={`${uid}-area`}
                  autoComplete="address-level2"
                  placeholder={t("placeholders.area")}
                  className={inputCls(false)}
                  {...register("area")}
                />
              </Field>
              <Field label={t("fields.size")} id={`${uid}-size`}>
                <input
                  id={`${uid}-size`}
                  inputMode="numeric"
                  placeholder={t("placeholders.size")}
                  className={inputCls(false)}
                  {...register("size")}
                />
              </Field>
            </div>

            <Field label={t("fields.message")} id={`${uid}-msg`}>
              <textarea
                id={`${uid}-msg`}
                rows={3}
                placeholder={t("placeholders.message")}
                className={cn(inputCls(false), "resize-none")}
                {...register("message")}
              />
            </Field>

            {/* Honeypot */}
            <div
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Company
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </label>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <label className="relative inline-flex min-h-[56px] cursor-pointer items-center justify-center px-6 font-body font-semibold text-ink shadow-[inset_0_0_0_1.5px_var(--ink)] transition-colors hover:bg-ink hover:text-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                />
                {files.length
                  ? t("photosSelected", { count: files.length })
                  : t("fields.photos")}
              </label>
              <Button
                type="submit"
                variant="ink"
                className="sm:flex-1"
                disabled={status === "sending"}
              >
                {status === "sending" ? t("sending") : t("submit")}
              </Button>
            </div>

            {status === "error" && (
              <ErrorText role="alert">{t("errors.server")}</ErrorText>
            )}
            <p className="text-caption text-ink">
              {t("privacy")}{" "}
              <span className="underline decoration-1 underline-offset-2">
                {t("privacyLink")}
              </span>
              .
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (invalid: boolean) =>
  cn(
    "w-full bg-transparent py-3 font-body text-[1.0625rem] text-ink outline-none placeholder:text-ink/60 transition-[box-shadow] duration-150 focus-visible:outline-none",
    invalid
      ? "shadow-[inset_0_-3px_0_0_var(--ink)]"
      : "shadow-[inset_0_-1.5px_0_0_var(--ink)] focus:shadow-[inset_0_-3px_0_0_var(--ink)]",
  );

function Field({
  label,
  error,
  id,
  children,
}: {
  label: string;
  error?: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-caption font-medium text-ink">
        {label}
      </label>
      {children}
      {error && <ErrorText id={`${id}-e`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({
  children,
  id,
  role,
}: {
  children: ReactNode;
  id?: string;
  role?: string;
}) {
  return (
    <p
      id={id}
      role={role}
      className="mt-2 flex items-center gap-2 text-caption font-semibold text-ink"
    >
      <span aria-hidden className="block size-2 bg-ink" />
      {children}
    </p>
  );
}
