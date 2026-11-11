"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X, Heart, Maximize2 } from "lucide-react";
import { images } from "@/lib/images";
import { Appointment, Eyebrow } from "./ui";

/** Progressive enhancement: no scroll hijacking, and no hidden content without JS. */
export function MotionEffects() {
  useEffect(() => {
    try {
      sessionStorage.setItem("vas-intro", "seen");
    } catch {}
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let dispose = () => {};
    const configure = () => {
      dispose();
      const reveal = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]"),
      );
      if (motion.matches) {
        reveal.forEach((el) => el.classList.remove("will-reveal"));
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      reveal.forEach((el, index) => {
        if (el.getBoundingClientRect().top > innerHeight) {
          el.style.setProperty("--reveal-delay", `${(index % 4) * 45}ms`);
          el.classList.add("will-reveal");
          observer.observe(el);
        }
      });
      const removers: (() => void)[] = [];
      if (pointer.matches) {
        document
          .querySelectorAll<HTMLElement>("[data-tilt], [data-mouse-reveal]")
          .forEach((el) => {
            let frame = 0;
            const move = (event: PointerEvent) => {
              if (event.pointerType === "touch") return;
              cancelAnimationFrame(frame);
              frame = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(1, (event.clientX - rect.left) / rect.width),
                );
                const y = Math.max(
                  0,
                  Math.min(1, (event.clientY - rect.top) / rect.height),
                );
                el.style.setProperty("--pointer-x", `${x * 100}%`);
                el.style.setProperty("--pointer-y", `${y * 100}%`);
                if (el.hasAttribute("data-tilt")) {
                  el.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
                  el.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
                }
              });
            };
            const reset = () => {
              cancelAnimationFrame(frame);
              el.style.removeProperty("--tilt-x");
              el.style.removeProperty("--tilt-y");
            };
            el.addEventListener("pointermove", move, { passive: true });
            el.addEventListener("pointerleave", reset);
            removers.push(() => {
              reset();
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", reset);
              el.style.removeProperty("--pointer-x");
              el.style.removeProperty("--pointer-y");
            });
          });
      }
      const diagonal = document.querySelector<HTMLElement>(".diagonal-band");
      const stage = document.querySelector<HTMLElement>(".cinema-stage");
      let scrollFrame = 0;
      const renderScroll = () => {
        scrollFrame = 0;
        if (diagonal) {
          const rect = diagonal.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < innerHeight) {
            const progress = Math.max(
              0,
              Math.min(
                1,
                (innerHeight - rect.top) / (innerHeight + rect.height),
              ),
            );
            diagonal.style.setProperty(
              "--diagonal-x",
              `${(progress - 0.5) * -150}px`,
            );
            diagonal.style.setProperty(
              "--diagonal-y",
              `${(progress - 0.5) * 22}px`,
            );
          }
        }
        if (stage) {
          const rect = stage.getBoundingClientRect();
          const progress = Math.max(
            0,
            Math.min(1, (innerHeight - rect.top) / (innerHeight * 0.75)),
          );
          stage.style.setProperty(
            "--cinema-scale",
            `${0.88 + progress * 0.12}`,
          );
          stage.style.setProperty("--cinema-radius", `${32 - progress * 24}px`);
        }
      };
      const scroll = () => {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(renderScroll);
      };
      renderScroll();
      window.addEventListener("scroll", scroll, { passive: true });
      window.addEventListener("resize", scroll);
      dispose = () => {
        observer.disconnect();
        removers.forEach((remove) => remove());
        cancelAnimationFrame(scrollFrame);
        window.removeEventListener("scroll", scroll);
        window.removeEventListener("resize", scroll);
        reveal.forEach((el) => {
          el.classList.remove("will-reveal");
          el.style.removeProperty("--reveal-delay");
        });
        diagonal?.style.removeProperty("--diagonal-x");
        diagonal?.style.removeProperty("--diagonal-y");
        stage?.style.removeProperty("--cinema-scale");
        stage?.style.removeProperty("--cinema-radius");
      };
    };
    configure();
    motion.addEventListener("change", configure);
    pointer.addEventListener("change", configure);
    return () => {
      dispose();
      motion.removeEventListener("change", configure);
      pointer.removeEventListener("change", configure);
    };
  }, []);
  return null;
}

export function DiagonalGallery() {
  return (
    <div className="diagonal-band" aria-hidden="true">
      <div className="diagonal-track">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>
            Cuidado para o seu sorriso<span className="diagonal-star">✦</span>
            Novos começos<span className="diagonal-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CinematicExperience() {
  const modal = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);
  const open = () => {
    setFailed(false);
    modal.current?.showModal();
    video.current?.play().catch(() => {
      /* Native controls remain available if playback needs a second gesture. */
    });
  };
  const close = () => modal.current?.close();
  const stop = () => {
    video.current?.pause();
    if (video.current?.readyState) video.current.currentTime = 0;
    trigger.current?.focus();
  };
  useEffect(
    () => () => {
      video.current?.pause();
    },
    [],
  );
  return (
    <section className="cinematic-section section" id="experiencia">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <Eyebrow>Um olhar mais próximo</Eyebrow>
            <h2>
              O cuidado está
              <br />
              nos <em>detalhes.</em>
            </h2>
          </div>
          <p>
            Conheça os sorrisos e as possibilidades
            <br />
            que inspiram nossos cuidados.
          </p>
        </div>
        <div className="cinema-stage">
          <div className="cinema-frame">
            <button
              type="button"
              ref={trigger}
              className="cinema-trigger"
              onClick={open}
              aria-label="Reproduzir vídeo ilustrativo"
              aria-haspopup="dialog"
            >
              <Image
                src={images.sorriso}
                alt="Detalhe ilustrativo de um sorriso, sem mostrar o rosto"
                quality={90}
                placeholder="blur"
                sizes="(max-width: 700px) 95vw, 85vw"
              />
              <span className="cinema-shade" />
              <span className="cinema-top-label">
                VOLTE A SORRIR BRASIL <Maximize2 size={17} />
              </span>
              <span className="cinema-play">
                <Play size={23} fill="currentColor" />
                <span>
                  Um sorriso, novas possibilidades
                  <small>Assistir ao vídeo ilustrativo · 14 s</small>
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className="glass-appointment" data-tilt data-reveal>
          <span className="glass-icon">
            <Heart size={23} strokeWidth={1.5} />
          </span>
          <div>
            <span className="small-label">Seu próximo passo</span>
            <h3>
              Uma conversa pode ser
              <br />
              um novo começo.
            </h3>
            <p>Converse com a equipe e agende sua avaliação.</p>
          </div>
          <Appointment>Vamos conversar</Appointment>
        </div>
        <p className="cinema-caption">
          Sequência animada de imagens ilustrativas geradas por IA. Sem áudio;
          não apresenta casos clínicos reais.
        </p>
      </div>
      <dialog
        className="cinema-dialog"
        ref={modal}
        aria-labelledby="cinema-title"
        aria-describedby="cinema-description"
        onClose={stop}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="cinema-dialog-header">
          <h3 id="cinema-title">Um sorriso, novas possibilidades</h3>
          <button
            autoFocus
            type="button"
            className="cinema-close"
            onClick={close}
            aria-label="Fechar vídeo"
          >
            <X size={23} />
          </button>
        </div>
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          poster={images.sorriso.src}
          onError={() => setFailed(true)}
          aria-label="Vídeo ilustrativo de sorrisos e tratamentos odontológicos"
        >
          <source src="/media/sorrisos-ilustrativos.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/media/sorrisos-ilustrativos.vtt"
            srcLang="pt-BR"
            label="Descrição das cenas"
            default
          />
          Seu navegador não suporta vídeo.{" "}
          <a href="/media/sorrisos-ilustrativos.mp4">Abrir vídeo ilustrativo</a>
        </video>
        {failed && (
          <p role="status">
            Não foi possível reproduzir o vídeo.{" "}
            <a href="/media/sorrisos-ilustrativos.mp4">
              Abrir arquivo de vídeo
            </a>
          </p>
        )}
        <p id="cinema-description">
          Vídeo sem áudio, composto por imagens ilustrativas geradas por IA de
          um sorriso, implante, prótese e aparelho ortodôntico. Não representa
          pacientes ou resultados reais.
        </p>
      </dialog>
    </section>
  );
}
