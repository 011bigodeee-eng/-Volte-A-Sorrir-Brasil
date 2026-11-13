import Image from "next/image";
import { images } from "@/lib/images";
import { MotionEffects, CinematicExperience } from "@/components/effects";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Mail,
  Instagram,
  MoveUpRight,
} from "lucide-react";
import {
  Header,
  TreatmentExplorer,
  FAQ,
  CurrentYear,
  Map,
} from "@/components/interactive";
import {
  Appointment,
  Brand,
  Eyebrow,
  WhatsAppFloat,
  Starburst,
} from "@/components/ui";
import { clinic, treatments, whatsappUrl } from "@/lib/clinic";

export default function Home() {
  const technicalDirector = process.env.NEXT_PUBLIC_TECHNICAL_DIRECTOR;
  const cro = process.env.NEXT_PUBLIC_CRO;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    description:
      "Clínica odontológica em Buriticupu, Maranhão. Informações sobre implantes, próteses dentárias, dentaduras e aparelhos ortodônticos.",
    telephone: "+55-98-98427-8547",
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Davi Alves Silva, S/N, Centro",
      addressLocality: "Buriticupu",
      addressRegion: "MA",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [clinic.instagram],
    ...(process.env.SITE_URL ? { url: process.env.SITE_URL } : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="intro" aria-hidden="true">
        <div className="intro-grain" />
        <div className="intro-frame">
          <span>BURITICUPU, MARANHÃO</span>
          <span>UM NOVO COMEÇO</span>
        </div>
        <svg
          className="intro-curves"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            className="intro-curve-echo"
            d="M-150 200C220 900 1230 810 1590 100"
          />
          <path
            className="intro-curve-gold"
            pathLength="1"
            d="M-150 150C220 850 1230 760 1590 50"
          />
        </svg>
        <div className="intro-editorial">
          <span className="intro-text-mask">
            <span>Todo sorriso</span>
          </span>
          <span className="intro-text-mask">
            <em>merece cuidado.</em>
          </span>
        </div>
        <div className="intro-signature">
          <Brand light />
          <span className="intro-signature-rule" />
        </div>
      </div>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="topbar">
        <div className="container">
          <span>
            <MapPin size={13} />
            Seu sorriso tem um lugar. Buriticupu, MA.
          </span>
          <span className="topbar-hours">
            <Clock3 size={13} />
            Seg–Sex, 08h–18h<span className="topbar-separator">·</span>Sáb,
            08h–12h
          </span>
        </div>
      </div>
      <Header />
      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="liquid-scene" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <Eyebrow>Odontologia em Buriticupu, Maranhão</Eyebrow>
              <h1>
                Seu sorriso
                <br />
                merece um
                <br />
                <em>novo começo.</em>
                <span className="title-dot">.</span>
              </h1>
              <p className="hero-description">
                Conheça nossos tratamentos com implantes, próteses dentárias e
                aparelhos ortodônticos em Buriticupu — MA.
              </p>
              <div className="hero-actions">
                <Appointment />
                <a className="hero-secondary" href="#tratamentos">
                  Conhecer tratamentos
                  <ArrowDown size={17} />
                </a>
              </div>
              <div className="hero-footnote">
                <span className="care-icon">
                  <Heart size={19} strokeWidth={1.5} />
                </span>
                <p>
                  Um cuidado que começa
                  <br />
                  <strong>ouvindo você.</strong>
                </p>
                <span className="hero-footnote-line" />
                <span className="hero-footnote-location">
                  No coração de
                  <br />
                  <strong>Buriticupu.</strong>
                </span>
              </div>
            </div>
            <div className="hero-visual" data-tilt>
              <div className="hero-image-wrap">
                <Image
                  className="hero-photo"
                  src={images.hero}
                  alt="Imagem ilustrativa de um sorriso natural em detalhe, mostrando somente a boca e os dentes"
                  quality={90}
                  placeholder="blur"
                  preload
                  sizes="(max-width: 900px) 90vw, 48vw"
                />
                <div className="hero-image-shade" />
                <div className="hero-image-label">
                  <span className="mini-sun">
                    <Starburst />
                  </span>
                  <span>
                    Novos motivos.
                    <br />
                    <strong>O mesmo sorriso que é só seu.</strong>
                  </span>
                </div>
              </div>
              <div className="hero-orbit" />
              <span className="hero-side-label">
                SAÚDE, CONFIANÇA E NOVOS COMEÇOS
              </span>
              <div className="hero-sticker">
                <span>É sobre você.</span>
                <Heart size={20} />
              </div>
              <span className="hero-corner-number">01 / UM NOVO COMEÇO</span>
            </div>
          </div>
          <a
            href="#clinica"
            className="hero-scroll"
            aria-label="Conheça a clínica"
          >
            <ArrowDown size={16} />
          </a>
        </section>
        <div className="service-strip" aria-label="Tratamentos disponíveis">
          <div className="container">
            {treatments.map((t) => (
              <a href="#tratamentos" key={t.id}>
                {t.title}
                <span>
                  <Starburst />
                </span>
              </a>
            ))}
          </div>
        </div>
        <section className="section about-section" id="clinica">
          <div className="container about-grid">
            <div className="about-art about-care" data-reveal>
              <Image
                className="about-care-photo"
                src={images.cuidado}
                alt="Imagem ilustrativa em detalhe de uma boca durante avaliação com espelho dental, sem mostrar rostos; não representa um caso real da clínica"
                quality={90}
                placeholder="blur"
                sizes="(max-width: 700px) 90vw, 42vw"
                loading="lazy"
              />
              <div className="about-art-bottom">
                <span>
                  Cada sorriso
                  <br />
                  tem uma história.
                </span>
                <ArrowDownRight size={48} strokeWidth={1} />
              </div>
            </div>
            <div className="about-copy" data-reveal>
              <Eyebrow>Prazer, somos a Volte a Sorrir Brasil</Eyebrow>
              <h2>
                Cuidar do seu sorriso
                <br />é a nossa <em>prioridade.</em>
              </h2>
              <p className="lead">
                Mais que um sorriso.
                <br />
                Uma parte de quem você é.
              </p>
              <p>
                Na Volte a Sorrir Brasil, você encontra opções de tratamentos
                odontológicos para cuidar da saúde bucal, recuperar a função dos
                dentes e valorizar o seu sorriso.
              </p>
              <p>
                O primeiro passo é entender suas necessidades. Converse com a
                nossa equipe e conheça as possibilidades de cuidado para você.
              </p>
              <a
                className="text-link"
                href={whatsappUrl(
                  "Olá! Gostaria de conversar com a equipe da Volte a Sorrir Brasil.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale com nossa equipe
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </section>
        <section className="section treatments-section" id="tratamentos">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <Eyebrow>Cuidado em cada detalhe</Eyebrow>
                <h2>
                  Tratamentos para cada
                  <br />
                  fase do seu <em>sorriso.</em>
                </h2>
              </div>
              <div className="section-heading-aside">
                <span className="small-cross">
                  <Starburst />
                </span>
                <p>
                  Seu momento, suas necessidades.
                  <br />
                  Vamos encontrar o próximo passo.
                </p>
              </div>
            </div>
            <div className="treatment-grid">
              {treatments.filter((t) => t.id !== "proteses").map((t, i) => (
                <article
                  className="treatment-card"
                  key={t.id}
                  data-reveal
                  data-tilt
                >
                  <a
                    className="treatment-image"
                    data-mouse-reveal
                    href={whatsappUrl(t.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Conversar sobre ${t.title.toLowerCase()} pelo WhatsApp`}
                  >
                    <Image
                      src={t.image}
                      alt={t.alt}
                      quality={90}
                      placeholder="blur"
                      loading="lazy"
                      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 23vw"
                    />
                    <span className="detail-lens" aria-hidden="true">
                      <Image
                        src={t.image}
                        alt=""
                        quality={90}
                        sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 23vw"
                        loading="lazy"
                      />
                    </span>
                    <span className="treatment-number">0{i + 1}</span>
                    <span className="treatment-image-arrow">
                      <ArrowUpRight size={22} />
                    </span>
                  </a>
                  <div className="treatment-card-copy">
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <a
                      className="text-link"
                      href={whatsappUrl(t.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Quero saber mais
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-note">
              Imagens ilustrativas geradas por IA. A indicação de cada
              tratamento depende de avaliação profissional.
            </p>
          </div>
        </section>
        <section className="confidence-section">
          <div className="container confidence-grid">
            <div className="confidence-copy" data-reveal>
              <Eyebrow light>Um sorriso. Muitas possibilidades.</Eyebrow>
              <h2>
                Volte a sorrir
                <br />
                com <em>confiança.</em>
              </h2>
              <p>
                Um sorriso pode fazer parte de momentos especiais. Conheça as
                possibilidades de cuidado odontológico e encontre o tratamento
                adequado para suas necessidades.
              </p>
              <Appointment>Vamos dar o primeiro passo?</Appointment>
              <span className="confidence-bottom">
                PARA A VIDA ACONTECER. PARA VOCÊ SORRIR.
              </span>
            </div>
            <div className="confidence-photo">
              <Image
                src={images.sorriso}
                alt="Imagem ilustrativa de uma boca sorrindo, sem mostrar o rosto"
                quality={90}
                placeholder="blur"
                sizes="(max-width: 900px) 100vw, 50vw"
                loading="lazy"
              />
              <span className="confidence-photo-quote">
                Os melhores momentos
                <br />
                merecem o seu sorriso.
              </span>
            </div>
          </div>
        </section>
        <CinematicExperience />
        <TreatmentExplorer />
        <section className="section orientation-section">
          <div className="container">
            <div className="orientation-heading" data-reveal>
              <Eyebrow>O primeiro passo é se informar</Eyebrow>
              <h2>
                Seu cuidado começa
                <br />
                com uma boa <em>orientação.</em>
              </h2>
            </div>
            <div className="orientation-grid">
              {[
                {
                  Icon: Heart,
                  title: "Tratamentos odontológicos",
                  text: "Conheça as opções de atendimento disponíveis.",
                  href: "#tratamentos",
                  link: "Explore os tratamentos",
                },
                {
                  Icon: MapPin,
                  title: "Localização em Buriticupu",
                  text: "Encontre a clínica no Centro da cidade.",
                  href: "#contato",
                  link: "Veja como chegar",
                },
                {
                  Icon: MessageCircle,
                  title: "Contato facilitado",
                  text: "Converse diretamente com a equipe pelo WhatsApp.",
                  href: whatsappUrl(),
                  link: "Fale com a equipe",
                },
                {
                  Icon: Clock3,
                  title: "Horários de atendimento",
                  text: "Consulte os horários de segunda a sábado.",
                  href: "#contato",
                  link: "Confira os horários",
                },
              ].map(({ Icon, title, text, href, link }) => (
                <div
                  className="orientation-card"
                  key={title}
                  data-reveal
                  data-tilt
                >
                  <span className="orientation-icon">
                    <Icon size={26} strokeWidth={1.4} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a
                    href={href}
                    className="subtle-link"
                    {...(href.startsWith("https")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section faq-section" id="duvidas">
          <div className="container faq-grid">
            <div className="faq-intro" data-reveal>
              <Eyebrow>Vamos conversar?</Eyebrow>
              <h2>
                Boas perguntas.
                <br />
                <em>Mais clareza.</em>
              </h2>
              <p>
                Reunimos algumas dúvidas para ajudar você a dar o próximo passo
                com tranquilidade.
              </p>
              <div className="faq-contact">
                <MessageCircle size={25} strokeWidth={1.4} />
                <div>
                  <strong>Ficou com alguma dúvida?</strong>
                  <a
                    href={whatsappUrl(
                      "Olá! Tenho uma dúvida sobre os tratamentos odontológicos.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Converse com nossa equipe
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
              <span className="faq-asterisk" aria-hidden="true">
                <Starburst />
              </span>
            </div>
            <div data-reveal>
              <FAQ />
              <p className="faq-disclaimer">
                Conteúdo educativo. As informações não substituem uma avaliação
                odontológica individual.
              </p>
            </div>
          </div>
        </section>
        <section className="section contact-section" id="contato">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <Eyebrow>Perto de você</Eyebrow>
                <h2>
                  Seu próximo sorriso
                  <br />
                  começa <em>aqui.</em>
                </h2>
              </div>
              <p>
                Estamos no Centro de Buriticupu.
                <br />
                Será um prazer conversar com você.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-info" data-reveal>
                <div className="contact-block">
                  <MapPin size={21} />
                  <div>
                    <span className="small-label">VENHA NOS CONHECER</span>
                    <h3>Buriticupu, Maranhão</h3>
                    <p>
                      Rua Davi Alves Silva, S/N
                      <br />
                      Centro, Buriticupu — MA
                    </p>
                    <a
                      className="text-link"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Como chegar
                      <ArrowUpRight size={17} />
                    </a>
                  </div>
                </div>
                <div className="contact-block">
                  <Clock3 size={21} />
                  <div>
                    <span className="small-label">HORÁRIOS DE ATENDIMENTO</span>
                    <p className="hours-row">
                      <span>Segunda a sexta</span>
                      <strong>08h às 18h</strong>
                    </p>
                    <p className="hours-row">
                      <span>Sábado</span>
                      <strong>08h às 12h</strong>
                    </p>
                  </div>
                </div>
                <div className="contact-links">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={20} />
                    <span>{clinic.phone}</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <a href={`mailto:${clinic.email}`}>
                    <Mail size={20} />
                    <span>{clinic.email}</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={clinic.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={20} />
                    <span>@volteasorrirbrasil</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <Appointment>Agendar pelo WhatsApp</Appointment>
              </div>
              <div data-reveal>
                <Map />
              </div>
            </div>
          </div>
        </section>
        <section className="closing-section">
          <div className="container closing-inner">
            <span className="closing-symbol" aria-hidden="true">
              <Starburst />
            </span>
            <div>
              <p>Um novo começo está a uma conversa de distância.</p>
              <h2>Vamos cuidar do seu sorriso?</h2>
            </div>
            <Appointment>Agendar minha avaliação</Appointment>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#inicio" aria-label="Voltar ao início">
                <Brand light />
              </a>
              <p>
                Saúde bucal, confiança e<br />
                novos motivos para sorrir.
              </p>
              <a
                className="footer-instagram"
                href={clinic.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Volte a Sorrir Brasil"
              >
                <Instagram size={19} />
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div>
              <h3>Seu sorriso</h3>
              <ul>
                {treatments.map((t) => (
                  <li key={t.id}>
                    <a
                      href={whatsappUrl(t.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Encontre a gente</h3>
              <p>
                Rua Davi Alves Silva, S/N
                <br />
                Centro, Buriticupu — MA
              </p>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                {clinic.phone}
              </a>
              <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
            </div>
            <div>
              <h3>Portas abertas</h3>
              <p>
                Segunda a sexta
                <br />
                <strong>08h às 18h</strong>
              </p>
              <p>
                Sábado
                <br />
                <strong>08h às 12h</strong>
              </p>
            </div>
          </div>
          {technicalDirector && cro && (
            <div className="professional-info">
              <span>
                Responsável técnico: {technicalDirector} · CRO: {cro}
              </span>
            </div>
          )}
          <div className="footer-bottom">
            <span>
              © <CurrentYear initialYear={new Date().getFullYear()} /> Volte a
              Sorrir Brasil. Todos os direitos reservados.
            </span>
            <span>
              Feito para novos sorrisos.
              <Heart size={13} />
            </span>
            <a href="#inicio">
              Voltar ao topo
              <MoveUpRight size={16} />
            </a>
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
      <MotionEffects />
    </>
  );
}
