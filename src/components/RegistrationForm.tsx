import { useState } from "react";

const MAILCHIMP_ACTION =
  "https://spwcorp.us3.list-manage.com/subscribe/post?u=92672509bc7b68335c65ae498&id=302bd38f23&f_id=0056c1e5f0";

const fieldClass =
  "w-full bg-transparent border-0 border-b border-heritage/25 py-4 text-heritage placeholder:text-heritage/40 focus:outline-none focus:border-[var(--fila-red)] transition-colors";

export function RegistrationForm() {
  const [condicion, setCondicion] = useState<string>("");

  return (
    <form
      action={MAILCHIMP_ACTION}
      method="POST"
      target="_blank"
      noValidate
      className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
    >
      <Field label="Nombre" name="FNAME" type="text" />
      <Field label="Apellidos" name="LNAME" type="text" />
      <Field label="Correo electrónico" name="EMAIL" type="email" required />
      <Field label="Número de teléfono" name="PHONE" type="tel" />

      <div>
        <Label>Nivel de corredor</Label>
        <div className="flex gap-3 mt-3">
          {["Principiante", "Intermedio"].map((n) => (
            <label key={n} className="flex-1 cursor-pointer group">
              <input type="radio" name="MMERGE8" value={n} className="peer sr-only" />
              <div className="border border-heritage/25 py-4 text-center label-tech text-heritage/80 transition-all duration-200 group-hover:border-heritage/60 group-hover:text-heritage group-hover:bg-heritage/[0.04] peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] peer-checked:text-heritage peer-checked:shadow-[0_0_0_1px_var(--fila-red)]">
                {n}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>Talla de camiseta</Label>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {["S", "M", "L"].map((s) => (
            <label key={s} className="cursor-pointer group">
              <input type="radio" name="MMERGE10" value={s} className="peer sr-only" />
              <div className="border border-heritage/25 py-3 text-center label-tech text-heritage/80 transition-all duration-200 group-hover:border-heritage/60 group-hover:text-heritage group-hover:bg-heritage/[0.04] peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] peer-checked:text-heritage peer-checked:shadow-[0_0_0_1px_var(--fila-red)]">
                {s}
              </div>
            </label>
          ))}
        </div>
      </div>

      <Field
        label="Ciudad"
        name="ADRESS"
        type="text"
        className="md:col-span-2"
        maxLength={70}
      />

      <div className="md:col-span-2">
        <Label>¿Sufre de alguna condición de salud?</Label>
        <div className="flex gap-3 mt-3 max-w-xs">
          {[
            { v: "Si", l: "Sí" },
            { v: "No", l: "No" },
          ].map((opt) => (
            <label key={opt.v} className="flex-1 cursor-pointer group">
              <input
                type="radio"
                name="MMERGE7"
                value={opt.v}
                className="peer sr-only"
                onChange={() => setCondicion(opt.v)}
              />
              <div className="border border-heritage/25 py-4 text-center label-tech text-heritage/80 transition-all duration-200 group-hover:border-heritage/60 group-hover:text-heritage group-hover:bg-heritage/[0.04] peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] peer-checked:text-heritage peer-checked:shadow-[0_0_0_1px_var(--fila-red)]">
                {opt.l}
              </div>
            </label>
          ))}
        </div>
      </div>

      {condicion === "Si" && (
        <Field label="¿Cuál?" name="HEALTH_D" type="text" className="md:col-span-2" />
      )}

      <div className="md:col-span-2 space-y-4 pt-4">
        <Checkbox name="terminos" required>
          Acepto los{" "}
          <a
            href="https://filalatin.com/pages/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-heritage hover:text-[var(--fila-red)] transition-colors"
          >
            términos y condiciones
          </a>{" "}
          del evento.
        </Checkbox>
        <Checkbox name="imagen" required>
          Autorizo el uso de mi imagen para fines comunicacionales de FILA.
        </Checkbox>
      </div>

      {/* Honeypot anti-spam */}
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input
          type="text"
          name="b_92672509bc7b68335c65ae498_302bd38f23"
          tabIndex={-1}
          defaultValue=""
        />
      </div>

      <div className="md:col-span-2 pt-6 flex justify-center md:justify-start">
        <button type="submit" className="cta-pill cta-pill-red px-10 py-5">
          <span>Confirmar inscripción</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="label-tech text-heritage/55">{children}</span>;
}

function Field({
  label,
  name,
  type,
  className = "",
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className={fieldClass}
        placeholder=" "
      />
    </div>
  );
}

function Checkbox({
  name,
  children,
  required,
}: {
  name: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-4 cursor-pointer group">
      <input type="checkbox" name={name} required={required} className="peer sr-only" />
      <span className="mt-1 inline-block h-4 w-4 border border-heritage/40 peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] transition-colors shrink-0" />
      <span className="text-sm text-heritage/70 group-hover:text-heritage transition-colors">
        {children}
      </span>
    </label>
  );
}
