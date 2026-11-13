import { Appointment, Eyebrow } from "./ui";

const steps = [
  ["Avaliação", "Conversamos sobre suas necessidades e avaliamos a saúde bucal, o histórico de saúde e as condições do osso. Exames podem ser solicitados."],
  ["Planejamento", "O profissional explica as alternativas, os cuidados, os riscos e as etapas indicadas para o seu caso, incluindo a necessidade de procedimentos adicionais."],
  ["Instalação e cicatrização", "Quando indicado, o implante é instalado no osso em um procedimento cirúrgico. O acompanhamento orienta a recuperação e o período de integração ao osso."],
  ["Reabilitação e acompanhamento", "A prótese é planejada e instalada conforme a evolução clínica. Higiene diária e consultas de manutenção fazem parte do cuidado a longo prazo."],
];

const questions = [
  ["A colocação do implante dói?", "O procedimento é realizado com anestesia. Pode haver dor, inchaço ou desconforto após a cirurgia; o profissional orienta o controle desses sintomas e os cuidados necessários. A experiência varia de pessoa para pessoa."],
  ["Quanto tempo leva o tratamento?", "O prazo depende das condições ósseas, da cicatrização e do planejamento da prótese. Alguns casos precisam de etapas adicionais, como enxertos. Somente a avaliação permite estimar o tempo; a colocação imediata de dentes não é indicada para todos."],
  ["Quais cuidados preciso ter?", "Siga as orientações de higiene, alimentação e uso de medicamentos fornecidas pela equipe, sem se automedicar. Evite fumar e mantenha as consultas de acompanhamento. Se houver sintomas persistentes ou inesperados, entre em contato com o profissional."],
];

export function Implants() {
  return (
    <section className="section implants-section" id="implantes" aria-labelledby="implants-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>Entenda o tratamento</Eyebrow>
            <h2 id="implants-title">Como funciona o<br /><em>implante dentário.</em></h2>
          </div>
          <p>Informação para dar o próximo passo com mais clareza, desde a primeira conversa até os cuidados de manutenção.</p>
        </div>
        <div className="implants-intro">
          <h3>Uma base para repor dentes perdidos</h3>
          <p>O implante é uma estrutura instalada no osso que serve de suporte para uma coroa ou prótese. Pode ser uma opção para substituir um ou mais dentes ausentes e contribuir para a mastigação e a aparência do sorriso. A indicação depende da saúde bucal e geral, das condições ósseas e das necessidades de cada pessoa.</p>
        </div>
        <ol className="implants-steps" aria-label="Etapas do tratamento com implantes">
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span className="implants-step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className="implants-questions">
          <h3>Dúvidas sobre implantes</h3>
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <div className="implants-appointment">
          <p>Indicação, prazos e resultados dependem da avaliação individual. Este conteúdo é educativo e não substitui uma consulta odontológica.</p>
          <Appointment message="Olá! Gostaria de agendar uma avaliação para implantes dentários.">Agendar avaliação para implantes</Appointment>
        </div>
      </div>
    </section>
  );
}
