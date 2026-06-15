"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projectTypes = ["interior", "exterior", "commercial", "other"] as const;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  projectType: (typeof projectTypes)[number];
  message: string;
};

export function QuoteForm() {
  const t = useTranslations("form");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().min(2, t("errors.nameRequired")),
    email: z.string().email(t("errors.emailInvalid")),
    phone: z.string().min(6, t("errors.phoneRequired")),
    projectType: z.enum(projectTypes, {
      errorMap: () => ({ message: t("errors.projectTypeRequired") }),
    }),
    message: z.string().min(10, t("errors.messageMin")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "interior",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Error");
    }
  };

  if (success) {
    return (
      <div
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-xl-brand bg-white/90 p-10 text-center shadow-brand-md"
        role="status"
      >
        <m.svg
          animate={{ pathLength: 1 }}
          className="h-16 w-16 text-eco-green"
          fill="none"
          initial={{ pathLength: 0 }}
          transition={{ duration: 0.6 }}
          viewBox="0 0 52 52"
        >
          <m.circle
            cx="26"
            cy="26"
            r="24"
            stroke="currentColor"
            strokeWidth="2"
          />
          <m.path
            d="M14 27 L22 35 L38 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </m.svg>
        <p className="font-display text-step-2 font-semibold text-ink">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form
      aria-label="Quote request"
      className="rounded-xl-brand bg-white/90 p-6 shadow-brand-md backdrop-blur-sm md:p-8"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field error={errors.name?.message} id="name" label={t("name")}>
          <input
            {...register("name")}
            autoComplete="name"
            className={inputClass}
            id="name"
          />
        </Field>
        <Field error={errors.email?.message} id="email" label={t("email")}>
          <input
            {...register("email")}
            autoComplete="email"
            className={inputClass}
            id="email"
            type="email"
          />
        </Field>
        <Field error={errors.phone?.message} id="phone" label={t("phone")}>
          <input
            {...register("phone")}
            autoComplete="tel"
            className={inputClass}
            id="phone"
            type="tel"
          />
        </Field>
        <Field error={errors.projectType?.message} id="projectType" label={t("projectType")}>
          <select {...register("projectType")} className={inputClass} id="projectType">
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {t(`projectTypes.${type}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field className="mt-5" error={errors.message?.message} id="message" label={t("message")}>
        <textarea
          {...register("message")}
          className={cn(inputClass, "min-h-[120px] resize-y")}
          id="message"
          rows={4}
        />
      </Field>

      <p className="mt-3 text-step--1 text-ink-soft">{t("photoNote")}</p>

      {error && (
        <p aria-live="assertive" className="mt-4 text-paint-orange-deep" role="alert">
          {error}
        </p>
      )}

      <Button
        className="mt-6 w-full sm:w-auto"
        disabled={!isValid || isSubmitting}
        type="submit"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md-brand border border-line bg-bg px-4 py-3 text-ink transition-colors focus:border-eco-green focus:outline-none focus:ring-2 focus:ring-eco-green/30";

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-step--1 font-medium text-ink" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-step--1 text-paint-orange-deep" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
