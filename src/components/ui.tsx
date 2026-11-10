import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/clinic";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-symbol">
        <Image
          src="/images/marca-original.jpeg"
          alt=""
          width={58}
          height={60}
        />
      </span>
      <span className="brand-type">
        Volte a Sorrir
        <strong>
          BRASIL<span className="brand-dot">.</span>
        </strong>
      </span>
    </span>
  );
}
export function Appointment({
  children = "Agendar minha avaliação",
  message,
  className = "",
  arrow = true,
}: {
  children?: React.ReactNode;
  message?: string;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a
      className={`button button-primary ${className}`}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      {arrow && <ArrowUpRight size={18} aria-hidden="true" />}
    </a>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function WhatsAppFloat() {
  return (
    <>
      <a
        className="whatsapp-float"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar pelo WhatsApp"
      >
        <MessageCircle size={25} />
        <span>Vamos conversar?</span>
      </a>
      <div className="mobile-appointment">
        <span>
          Seu novo sorriso
          <br />
          <strong>começa aqui.</strong>
        </span>
        <Appointment>Agendar avaliação</Appointment>
      </div>
    </>
  );
}

export function Starburst() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="32,0 37,20 55,9 44,27 64,32 44,37 55,55 37,44 32,64 27,44 9,55 20,37 0,32 20,27 9,9 27,20" />
    </svg>
  );
}
