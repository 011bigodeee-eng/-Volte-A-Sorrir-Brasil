# Volte a Sorrir Brasil

Landing page da clínica em Buriticupu, Maranhão. Next.js App Router, React, TypeScript, CSS responsivo e Lucide. Fontes, identidade e imagens são servidas localmente. Sem banco de dados, cadastro ou credenciais obrigatórias; o agendamento abre uma conversa no WhatsApp, sem enviar mensagens automaticamente.

## Desenvolvimento

Requisito: Node.js 24 LTS e npm 11 (versões utilizadas na validação).

```bash
cd /workspace/-Volte-A-Sorrir-Brasil
npm ci --cache /workspace/.npm-cache
npm run dev
```

O ambiente já é isolado. Use este checkout; não crie worktrees, salvo pedido explícito.

## Compilação e validação

```bash
npm run build
npm run typecheck
npm test
```

Os testes Playwright iniciam a versão de produção na porta 3101, usam Chromium em `/usr/bin/chromium` e encerram o servidor de testes ao terminar. Em outra máquina, configure `CHROMIUM_PATH` com o caminho do navegador instalado. Não é necessário baixar outro Chromium neste ambiente.

A suíte verifica 320, 375, 390, 430, 768, 1024 e 1440 px, imagens, overflow, CTA inferior, contatos, metadados, abas com teclado, FAQ, menu, abertura e acessibilidade automatizada com axe. O teste do iframe isola a resposta externa do Google: valida o acionamento e o endereço, sem afirmar que o pin ou o serviço externo foi validado.

Para executar a versão de produção:

```bash
npm start -- --port 3000
```

## Conteúdo e estrutura

- `src/lib/clinic.ts`: informações oficiais, mensagens de WhatsApp, tratamentos e FAQ.
- `src/app/page.tsx`: seções, identificação profissional e JSON-LD sem avaliações inventadas.
- `src/components/interactive.tsx`: menu com diálogo nativo, abas acessíveis, accordion, mapa sob demanda e efeitos de movimento.
- `src/components/ui.tsx`: marca, CTAs e contatos fixos.
- `src/app/globals.css`: identidade, composição editorial e adaptações mobile.
- `public/images/`: recursos locais, com origem descrita em `ASSETS.md`.

A abertura dura aproximadamente 1,8 s no desktop e 1,1 s no celular. Não se repete na sessão; links com âncora e a preferência por movimento reduzido a dispensam. As animações não ocultam conteúdo se JavaScript estiver indisponível. O Google Maps só é solicitado depois de clicar em “Carregar mapa”.

## Preparação para publicação

Preencha as variáveis de `.env.example` no ambiente da hospedagem ou em `.env.local`, com dados confirmados:

- `SITE_URL`: URL HTTPS do domínio oficial. Sem esse valor, a página usa `noindex`, o robots bloqueia indexação e o sitemap não inventa um domínio. Com o valor configurado, a compilação gera canonical, sitemap e imagens Open Graph absolutas.
- `NEXT_PUBLIC_TECHNICAL_DIRECTOR`: nome confirmado do responsável técnico.
- `NEXT_PUBLIC_CRO`: identificação profissional completa e confirmada, incluindo UF quando aplicável.

Recompile depois de alterar essas variáveis. As variáveis são públicas e não devem conter segredos.

Antes da publicação definitiva, a clínica deve validar a identificação profissional obrigatória, os conteúdos e representações odontológicas, o endereço/ponto de referência e a disponibilidade atual de modalidades específicas. Não foram inventados preços, profissionais, depoimentos, registros, resultados ou promessas clínicas. As imagens geradas por IA são identificadas como ilustrações, não como pacientes ou instalações reais.

O mapa usa uma busca pelo endereço informado, sem coordenadas inventadas. Google Maps, WhatsApp e Instagram são serviços externos; não se enviam mensagens durante os testes. Não há analytics nem formulário armazenando dados pessoais nesta versão.
