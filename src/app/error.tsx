"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="error-page">
      <p className="eyebrow">Volte a Sorrir Brasil</p>
      <h1>Uma pausa inesperada.</h1>
      <p>
        Não foi possível carregar a página. Tente novamente ou fale com nossa
        equipe.
      </p>
      <button className="button button-primary" onClick={reset}>
        Tentar novamente
      </button>
      <a className="text-link" href="https://wa.me/5598984278547">
        Falar pelo WhatsApp
      </a>
    </main>
  );
}
