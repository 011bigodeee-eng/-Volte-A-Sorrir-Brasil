"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Menu,
  X,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { clinic, treatments, faqs, whatsappUrl } from "@/lib/clinic";
import { Appointment, Brand, Eyebrow } from "./ui";

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const close = () => {
    dialog.current?.close();
    menuButton.current?.focus();
  };
  useEffect(() => {
    const query = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (query.matches) dialog.current?.close();
    };
    query.addEventListener("change", resize);
    return () => query.removeEventListener("change", resize);
  }, []);
  const links = [
    ["A clínica", "#clinica"],
    ["Tratamentos", "#tratamentos"],
    ["Dúvidas frequentes", "#duvidas"],
    ["Localização", "#contato"],
  ];
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#inicio" aria-label="Volte a Sorrir Brasil — início">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <Appointment className="header-cta">Agendar avaliação</Appointment>
        <button
          className="menu-toggle"
          ref={menuButton}
          aria-label="Abrir menu"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          <Menu />
        </button>
      </div>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Menu de navegação"
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            className="icon-button"
            onClick={close}
            aria-label="Fechar menu"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          {links.map(([label, href], i) => (
            <a key={href} href={href} onClick={close}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight size={20} />
            </a>
          ))}
        </nav>
        <Appointment>Agendar pelo WhatsApp</Appointment>
        <p>
          Buriticupu, Maranhão
          <br />
          Cuidado para o seu sorriso.
        </p>
      </dialog>
    </header>
  );
}
export function TreatmentExplorer() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = treatments[selected];
  function change(index: number, focus = false) {
    setSelected(index);
    if (focus) tabs.current[index]?.focus();
  }
  return (
    <section className="explore-section section" id="explorar">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <Eyebrow>Informação para decidir com tranquilidade</Eyebrow>
            <h2>
              Conheça mais sobre
              <br />
              os <em>tratamentos.</em>
            </h2>
          </div>
          <p>
            Entenda as possibilidades.
            <br />O próximo passo é uma conversa.
          </p>
        </div>
        <div className="explorer" data-reveal>
          <div className="explorer-menu">
            <div
              className="tab-list"
              role="tablist"
              aria-label="Escolha um tratamento"
              aria-orientation="vertical"
            >
              {treatments.map((item, i) => (
                <button
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={selected === i}
                  aria-controls="treatment-panel"
                  tabIndex={selected === i ? 0 : -1}
                  key={item.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  onClick={() => change(i)}
                  onKeyDown={(event) => {
                    let n = selected;
                    if (["ArrowDown", "ArrowRight"].includes(event.key))
                      n = (selected + 1) % 4;
                    else if (["ArrowUp", "ArrowLeft"].includes(event.key))
                      n = (selected + 3) % 4;
                    else if (event.key === "Home") n = 0;
                    else if (event.key === "End") n = 3;
                    else return;
                    event.preventDefault();
                    change(n, true);
                  }}
                >
                  <span>0{i + 1}</span>
                  {item.short}
                  <ArrowUpRight size={20} />
                </button>
              ))}
            </div>
            <p className="explorer-note">
              Cada pessoa é única.
              <br />A indicação depende de avaliação profissional.
            </p>
          </div>
          <div
            id="treatment-panel"
            role="tabpanel"
            aria-labelledby={`tab-${t.id}`}
            tabIndex={0}
            className="explorer-panel"
          >
            <div className="explorer-image">
              <Image
                key={t.id}
                src={t.image}
                alt={t.alt}
                quality={90}
                placeholder="blur"
                sizes="(max-width: 600px) 100vw, 40vw"
              />
            </div>
            <div className="explorer-copy" key={`copy-${t.id}`}>
              <span className="small-label">{t.label}</span>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p className="detail-copy">{t.detail}</p>
              <a
                className="text-link"
                href={whatsappUrl(t.message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar sobre {t.short.toLowerCase()}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faqs.map(([question, answer], i) => (
        <div
          className={`faq-item ${open === i ? "faq-open" : ""}`}
          key={question}
        >
          <h3>
            <button
              id={`faq-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`answer-${i}`}
            >
              <span className="faq-number">0{i + 1}</span>
              <span>{question}</span>
              {open === i ? <Minus size={19} /> : <Plus size={19} />}
            </button>
          </h3>
          <div
            id={`answer-${i}`}
            role="region"
            aria-labelledby={`faq-${i}`}
            hidden={open !== i}
          >
            <p>{answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function Map() {
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent(clinic.mapQuery);
  return (
    <div className="map-box">
      {loaded ? (
        <iframe
          title="Mapa de busca do endereço da Volte a Sorrir Brasil em Buriticupu"
          src={`https://maps.google.com/maps?q=${query}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map-placeholder">
          <div className="map-road map-road-1" />
          <div className="map-road map-road-2" />
          <div className="map-road map-road-3" />
          <span className="map-city">BURITICUPU · MA</span>
          <div className="map-pin">
            <MapPin size={32} />
          </div>
          <div className="map-load">
            <strong>Estamos no Centro de Buriticupu.</strong>
            <span>Carregue o Google Maps para consultar o endereço.</span>
            <button
              className="button button-blue"
              onClick={() => setLoaded(true)}
            >
              Carregar mapa
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}
      <p className="map-disclaimer">
        Busca pelo endereço informado. Confirme o ponto de referência com a
        equipe.
      </p>
    </div>
  );
}

export function CurrentYear({ initialYear }: { initialYear: number }) {
  const [year, setYear] = useState(initialYear);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
