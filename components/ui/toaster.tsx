"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="left">
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex">
              {variant === "success" && (
                <CheckCircle2 className="mr-3 h-5 w-5 text-green-500 dark:text-green-400" />
              )}
              {variant === "destructive" && (
                <AlertCircle className="mr-3 h-5 w-5 text-red-500 dark:text-red-400" />
              )}
              {variant === "warning" && (
                <AlertTriangle className="mr-3  h-32 w-32 text-yellow-500 dark:text-yellow-400" />
              )}
              {variant === "info" && (
                <Info className="mr-3 h-5 w-5 text-blue-500 dark:text-blue-400" />
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
