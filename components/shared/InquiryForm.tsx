"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import type { FieldSchemaEntry, FlowType, InquiryDetails, InquiryPayload } from "@/types/inquiry";
import { inquiryPayloadSchema } from "@/lib/validation/inquiry";
import { useJourney } from "@/lib/context/JourneyProvider";
import { formatDisplayDate, formatDisplayTime } from "@/lib/utils/format";
import { scrollFadeUpProps } from "@/lib/motion";
import { Button } from "./Button";

interface InquiryFormProps {
  flowType: FlowType;
  fields: FieldSchemaEntry[];
  submitEndpoint?: string;
  heading?: string;
  /** Seeds initial form values (e.g. selections made on a prior step). */
  initialValues?: Record<string, string>;
}

type FormValues = Record<string, string>;

function summarizeEventsForContext(events: { date: string; timing: string; city: string }[]): string {
  if (!events.length) return "";
  return events.map((e) => `${formatDisplayDate(e.date)} at ${formatDisplayTime(e.timing)} — ${e.city}`).join("\n");
}

function buildDetails(flowType: FlowType, values: FormValues, journey: ReturnType<typeof useJourney>): InquiryDetails {
  switch (flowType) {
    case "makeup":
      return {
        events: journey.events,
        eventCount: journey.events.length,
        availabilityCheckId: journey.availabilityResult?.checkId,
        availabilityOverallStatus: journey.availabilityResult?.overallStatus,
        eventsSummary: values.eventsSummary,
      };
    case "classes":
      return {
        classType: values.classType ?? "",
        level: values.level ?? "",
        location: values.location ?? "",
        preferredDate: values.preferredDate,
        preferredTiming: values.preferredTiming,
      };
    case "colour-analysis":
      return {
        preferredDate: values.preferredDate ?? "",
        preferredSlot: values.preferredSlot,
        slotCheckId: journey.selectedSlot?.checkId,
      };
    case "stitching":
      return {
        serviceRequired: values.serviceRequired ?? "",
        location: values.location ?? "",
        preferredDate: values.preferredDate,
        referenceDescription: values.referenceDescription,
      };
    default: {
      const _exhaustive: never = flowType;
      throw new Error(`Unhandled flow type: ${_exhaustive}`);
    }
  }
}

export function InquiryForm({
  flowType,
  fields,
  submitEndpoint = "/api/inquiries",
  heading = "Send an Inquiry",
  initialValues,
}: InquiryFormProps) {
  const journey = useJourney();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: initialValues ?? {} });

  const [result, setResult] = useState<{ inquiryId: string; whatsappUrl: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Prefill from JourneyContext once it's hydrated.
  useEffect(() => {
    for (const field of fields) {
      if (field.prefillFromContext === "events") {
        setValue(field.name, summarizeEventsForContext(journey.events));
      }
      if (field.prefillFromContext === "selectedPackage" && journey.selectedPackage) {
        setValue(field.name, journey.selectedPackage.tierName);
      }
    }
    if (flowType === "colour-analysis" && journey.selectedSlot) {
      setValue("preferredDate", journey.selectedSlot.date);
      setValue("preferredSlot", journey.selectedSlot.time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journey.events, journey.selectedPackage, journey.selectedSlot]);

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    const payload: InquiryPayload = {
      flowType,
      fullName: values.fullName,
      whatsappNumber: values.whatsappNumber,
      email: values.email || undefined,
      message: values.message || undefined,
      details: buildDetails(flowType, values, journey),
      selectedPackage: journey.selectedPackage,
      utm: journey.utm,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : `/${flowType}`,
    };

    const parsed = inquiryPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[issue.path.length - 1];
        if (typeof key === "string") {
          setError(key, { message: issue.message });
        }
      }
      setSubmitError("Please check the highlighted fields and try again.");
      return;
    }

    try {
      const res = await fetch(submitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error ?? "Something went wrong. Please try again or reach out on WhatsApp directly.");
        return;
      }
      setResult({ inquiryId: data.inquiryId, whatsappUrl: data.whatsappUrl });
      journey.clearJourney();
    } catch {
      setSubmitError("Something went wrong. Please try again or reach out on WhatsApp directly.");
    }
  }

  if (result) {
    return (
      <motion.div {...scrollFadeUpProps} className="mx-auto max-w-lg border border-charcoal/10 bg-ivory p-10 text-center">
        <h3 className="font-display text-2xl text-charcoal">Thank You</h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
          Your inquiry has been received. For the fastest response, continue the conversation on WhatsApp.
        </p>
        <Button href={result.whatsappUrl} external variant="primary" size="lg" className="mt-8">
          Continue on WhatsApp
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      {...scrollFadeUpProps}
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg space-y-6"
      noValidate
    >
      <h3 className="font-display text-2xl text-charcoal">{heading}</h3>

      <FormField label="Full Name" error={errors.fullName?.message}>
        <input
          type="text"
          {...register("fullName", { required: "Name is required" })}
          className={inputClass}
        />
      </FormField>

      <FormField label="WhatsApp Number" error={errors.whatsappNumber?.message}>
        <input
          type="tel"
          {...register("whatsappNumber", { required: "WhatsApp number is required" })}
          className={inputClass}
          placeholder="+91 XXXXX XXXXX"
        />
      </FormField>

      <FormField label="Email" error={errors.email?.message}>
        <input type="email" {...register("email")} className={inputClass} />
      </FormField>

      {fields.map((field) => (
        <DynamicField key={field.name} field={field} register={register} error={errors[field.name]?.message as string | undefined} />
      ))}

      <FormField label="Additional Message" error={errors.message?.message}>
        <textarea rows={4} {...register("message")} className={inputClass} />
      </FormField>

      {submitError && <p className="text-sm text-wine">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Sending…" : "Submit Inquiry"}
      </Button>
    </motion.form>
  );
}

const inputClass =
  "w-full border-b border-charcoal/25 bg-transparent py-2 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:border-wine focus:outline-none";

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-charcoal-light">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-wine">{error}</span>}
    </label>
  );
}

function DynamicField({
  field,
  register,
  error,
}: {
  field: FieldSchemaEntry;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  error?: string;
}) {
  const requiredRule = field.required ? { required: `${field.label} is required` } : {};

  return (
    <FormField label={field.label} error={error}>
      {field.type === "textarea" ? (
        <textarea rows={3} placeholder={field.placeholder} {...register(field.name, requiredRule)} className={inputClass} />
      ) : field.type === "select" ? (
        <select {...register(field.name, requiredRule)} className={inputClass} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          placeholder={field.placeholder}
          {...register(field.name, requiredRule)}
          className={inputClass}
        />
      )}
    </FormField>
  );
}
