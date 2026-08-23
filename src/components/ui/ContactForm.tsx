"use client";

import { useReducer, useRef } from "react";
import { useAnimatedLabel } from "@/hooks/useAnimatedLabel";

/*
  Form state machine — all possible states the form can be in.

  Transitions:
    idle ──────▶ submitting  (on valid submit)
    submitting ▶ success     (on 200 response)
    submitting ▶ error       (on non-200 or network failure)
    success    ▶ idle        (after 4s auto-reset)
    error      ▶ idle        (when user starts typing again)
*/
type Status = "idle" | "submitting" | "success" | "error";

type State = {
  status: Status;
  errorMessage: string | null;
};

type Action =
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "ERROR"; message: string }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SUBMIT":
      return { status: "submitting", errorMessage: null };
    case "SUCCESS":
      return { status: "success", errorMessage: null };
    case "ERROR":
      return { status: "error", errorMessage: action.message };
    case "RESET":
      return { status: "idle", errorMessage: null };
  }
}

const INITIAL_STATE: State = { status: "idle", errorMessage: null };

/*
  ContactForm — an interactive form that POSTs to /api/contact.

  On success: shows a confirmation message and resets after 4 seconds.
  On error: shows the server's error message.
  While submitting: the button shows "Sending..." and is disabled.

  Client component because it manages local state and makes a fetch request.
*/
export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const message = (data.get("message") as string).trim();

    if (!name || !email || !message) return;

    dispatch({ type: "SUBMIT" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        dispatch({ type: "SUCCESS" });
        formRef.current?.reset();
        // Auto-reset to idle after 4 seconds so the form can be used again
        setTimeout(() => dispatch({ type: "RESET" }), 4000);
      } else {
        const body = await res.json().catch(() => ({}));
        dispatch({
          type: "ERROR",
          message: body.error ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      dispatch({
        type: "ERROR",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  const isSubmitting = state.status === "submitting";
  const isSuccess = state.status === "success";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-lg text-left"
    >
      <FormField
        id="name"
        label="Name"
        type="text"
        placeholder="Maya Ben-Ari"
        autoComplete="name"
        required
        disabled={isSubmitting || isSuccess}
        onChange={() => state.status === "error" && dispatch({ type: "RESET" })}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="maya@example.com"
        autoComplete="email"
        required
        disabled={isSubmitting || isSuccess}
        onChange={() => state.status === "error" && dispatch({ type: "RESET" })}
      />
      <FormField
        id="message"
        label="Message"
        type="textarea"
        placeholder="Hi Yarin, I’d like to chat about…"
        autoComplete="off"
        required
        disabled={isSubmitting || isSuccess}
        onChange={() => state.status === "error" && dispatch({ type: "RESET" })}
      />

      <StatusMessage status={state.status} errorMessage={state.errorMessage} />

      <SubmitButton status={state.status} />
    </form>
  );
}

/* A labeled input or textarea field */
function FormField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  required,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  autoComplete: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) {
  const sharedClass =
    "mt-1 block w-full rounded-xl border border-glass-edge bg-glass px-4 py-3 text-sm text-ink backdrop-blur-sm transition-[border-color,box-shadow] duration-150 placeholder:text-faint focus:border-accent-mid focus:outline-none focus:ring-2 focus:ring-accent-light disabled:opacity-50";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-dim">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          onChange={onChange}
          className={sharedClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          // An email address is not a word. Spellcheck only produces a red underline on it.
          spellCheck={type === "email" ? false : undefined}
          required={required}
          disabled={disabled}
          onChange={onChange}
          className={sharedClass}
        />
      )}
    </div>
  );
}

/*
  The single live region for the form.

  It renders on every status so a screen reader has a stable node to watch.
  A region that mounts only on error is announced unreliably, and the success
  state reaches the button label alone, which is never announced at all.
*/
function StatusMessage({
  status,
  errorMessage,
}: {
  status: Status;
  errorMessage: string | null;
}) {
  const isError = status === "error" && errorMessage !== null;
  const isSuccess = status === "success";

  return (
    <p
      role="status"
      aria-live="polite"
      className={
        isError
          ? "mb-4 rounded-lg bg-error-bg px-4 py-3 text-sm text-error-text"
          : isSuccess
            ? "mb-4 rounded-lg bg-open-bg px-4 py-3 text-sm text-open-text"
            : "sr-only"
      }
    >
      {isError ? errorMessage : isSuccess ? "Your message is sent. Yarin will reply by email." : ""}
    </p>
  );
}

/* Submit button — label and style change based on form status */
function SubmitButton({ status }: { status: Status }) {
  const animatedSending = useAnimatedLabel(status === "submitting", "Sending");

  const labels: Record<Status, string> = {
    idle: "Send Message",
    submitting: animatedSending,
    success: "Sent ✓",
    error: "Send Message",
  };

  return (
    <button
      type="submit"
      disabled={status === "submitting" || status === "success"}
      className="focus-ring bg-gradient-accent w-full rounded-full py-3.5 text-sm font-semibold text-canvas shadow-lg shadow-accent-mid/25 transition duration-150 hover:shadow-xl hover:shadow-accent-mid/40 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {labels[status]}
    </button>
  );
}
