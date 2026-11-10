import Link from "next/link";
import { Brand } from "@/components/ui";
export default function NotFound() {
  return (
    <main className="error-page">
      <Brand />
      <p className="eyebrow">404 · Página não encontrada</p>
      <h1>
        Vamos voltar
        <br />a sorrir?
      </h1>
      <p>O endereço que você procura não está disponível.</p>
      <Link className="button button-primary" href="/">
        Voltar ao início
      </Link>
    </main>
  );
}
