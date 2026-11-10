# Validação — 10 de novembro de 2026

Executada no checkout `/workspace/-Volte-A-Sorrir-Brasil`, com Node.js 24.22.1, npm 11.9.0, Next.js 16.4.6 e Chromium 156.0.8078.79.

- Instalação reproduzida com `npm ci --cache /workspace/.npm-cache --no-audit --no-fund`: aprovada.
- `npm run build`: aprovado, sem erros de compilação.
- `npm run typecheck`: aprovado.
- `npm test`: **16 testes aprovados**, nenhum teste ignorado ou com falha na execução final.
- Desenvolvimento com `npm run dev -- --port 3000`: HTTP 200, conteúdo e caminhos de recursos finais conferidos.
- Capturas finais de desktop e mobile revisadas visualmente.

A suíte verificou as larguras 320, 375, 390, 430, 768, 1024 e 1440 px sem overflow horizontal e com todas as imagens carregadas. Validou menu, foco e Escape, abas por teclado, troca de imagem/texto/mensagem, FAQ, endereços de WhatsApp e e-mail, metadados locais, rotas de SEO, página 404 e abertura sem repetição na sessão. A auditoria automatizada axe nos cenários desktop, mobile e menu mobile terminou sem violações nos critérios WCAG A/AA selecionados; isso não equivale a uma certificação de acessibilidade.

O mapa foi testado com resposta externa isolada: o teste valida o clique para carregar e a busca pelo endereço correto. Não foi validado um pin real, o recebimento de mensagens, o funcionamento externo do WhatsApp/Instagram nem publicação em domínio de produção. Nenhuma mensagem foi enviada.

A aplicação não foi publicada. Domínio, responsável técnico, CRO e revisão clínica do conteúdo permanecem pendentes. O rascunho reutilizável da nuvem não pôde ser persistido pelo backend; veja `CLOUD_SETUP.md`.
