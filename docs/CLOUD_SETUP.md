# Configuração reutilizável da nuvem

O backend de onboarding retornou `INVALID_ARGUMENT` nas leituras do rascunho e na tentativa de salvar `install_script` e `start_skill`. A persistência na plataforma não foi confirmada. Estes arquivos preservam as instruções testadas; não significam que um rascunho ou snapshot foi publicado.

## Instalação

Conteúdo de `install_script`: `scripts/cloud-install.sh`. Requer Node.js 24 LTS e npm 11, já disponíveis na instância atual. As dependências são instaladas a partir do lockfile, usando cache gravável em `/workspace/.npm-cache`.

## Inicialização

Conteúdo proposto para `start_skill`:

1. Use o checkout existente em `/workspace/-Volte-A-Sorrir-Brasil`. Cada tarefa já tem um ambiente isolado. Não crie worktrees salvo pedido explícito do usuário.
2. Dependências e arquivos podem ser retidos no snapshot; processos devem ser reiniciados. Se `node_modules` estiver ausente ou o lockfile mudar, execute `npm ci --cache /workspace/.npm-cache --no-audit --no-fund` nesse diretório.
3. Inicie `npm run dev -- --port 3000` em uma sessão persistente. Reutilize um servidor existente desse projeto somente após verificar a resposta. Não encerre processos de outras tarefas.
4. Verifique internamente HTTP 200 e o conteúdo “Seu sorriso merece um novo começo” em `http://127.0.0.1:3000`. Não exponha links de localhost na interface de onboarding.
5. Para validar, execute `npm run build`, `npm run typecheck` e `npm test`. A suíte usa Chromium em `/usr/bin/chromium` e gerencia seu próprio servidor na porta 3101.
6. Leia `README.md` e `ASSETS.md`. Não são necessários segredos ou serviços de backend. Domínio, responsável técnico e CRO devem ser confirmados antes de publicar; não invente esses valores. Recompile após configurá-los.

Os testes do mapa validam a ação e o endereço usando uma resposta externa isolada. Não confirmam um pin ou a disponibilidade do Google Maps neste ambiente.
