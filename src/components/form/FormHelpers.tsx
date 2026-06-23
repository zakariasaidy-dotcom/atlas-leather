"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FieldProps {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

export function Field({ label, error, children, className, required }: FieldProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-ink mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-destructive">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export function inputClass(hasError: boolean): string {
  return cn(
    "w-full px-4 py-3 text-sm border-2 rounded transition-colors",
    "bg-cream-100 text-ink placeholder-ink-muted/50",
    "border-cream-300 focus:border-ink focus:outline-none",
    hasError && "border-destructive focus:border-destructive"
  );
}

export function selectClass(hasError: boolean): string {
  return cn(
    "w-full px-4 py-3 text-sm border-2 rounded transition-colors appearance-none",
    "bg-cream-100 text-ink cursor-pointer",
    "border-cream-300 focus:border-ink focus:outline-none",
    "bg-[url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%27%20height=%278%27%20viewBox=%270%200%2012%208%27%3E%3Cpath%20fill=%22%231C1A16%22%20d=%22M1%201l5%205%205-5%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-4 pr-10",
    hasError && "border-destructive focus:border-destructive"
  );
}

export function textareaClass(hasError: boolean): string {
  return cn(
    "w-full px-4 py-3 text-sm border-2 rounded transition-colors resize-vertical min-h-32",
    "bg-cream-100 text-ink placeholder-ink-muted/50",
    "border-cream-300 focus:border-ink focus:outline-none font-sans",
    hasError && "border-destructive focus:border-destructive"
  );
}

export function formErrorMessage(error?: string): ReactNode {
  if (!error) return null;
  return (
    <div className="flex items-center gap-1.5 mt-2 text-xs text-destructive">
      <AlertCircle size={14} />
      <span>{error}</span>
    </div>
  );
}
