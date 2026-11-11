# Efeitos visuais

A referência foi adaptada à identidade da clínica e às imagens de boca e tratamentos, sem retratos de pessoas ou equipe.

| Efeito               | Implementação                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| Animação ao rolar    | IntersectionObserver, revelação progressiva e intervalos discretos entre cards.                         |
| Imagem em 3D         | Inclinação do conjunto visual da hero conforme o ponteiro, com camadas em profundidades diferentes.     |
| Efeito líquido       | Formas suaves com gradientes e deformação animada no fundo da hero.                                     |
| Card minimalista     | Superfícies claras, bordas finas, sombra leve e realce localizado.                                      |
| Scroll diagonal      | Faixa decorativa inclinada que se desloca com a rolagem normal, sem capturar a navegação.               |
| Vidro                | Painel de agendamento translúcido, com desfoque e borda luminosa. Não apresenta preços não confirmados. |
| Vídeo expansível     | Quadro cresce ao rolar no desktop; o botão abre um player maior em diálogo acessível.                   |
| Sobreposição         | Painel de vidro sobre o quadro do vídeo e placa flutuante sobre a hero.                                 |
| Efeitos 3D           | Cards e painel respondem à posição do ponteiro com inclinação limitada a aproximadamente 3,5 graus.     |
| Revelação pelo mouse | Lupa circular nos cards revela uma ampliação da própria imagem do tratamento.                           |

`src/components/effects.tsx` centraliza os efeitos e o player. Os eventos de scroll e ponteiro são limitados a requestAnimationFrame, não há biblioteca de animação adicional, e todos os listeners são removidos ao desmontar ou mudar a preferência de movimento. O vídeo é local, sem áudio e sem autoplay. Seu arquivo só é carregado para reprodução após interação.

A preferência `prefers-reduced-motion` desativa a revelação animada, deformações, inclinação, lupa e expansão automática. O vídeo continua disponível por escolha explícita. Telas de toque usam uma composição estável e não dependem de hover. O diálogo oferece controles nativos, legendas descritivas, fechamento por Escape e devolução do foco ao botão de reprodução.

## Origem do vídeo

`public/media/sorrisos-ilustrativos.mp4`: sequência ilustrativa de 14,5 segundos, 1280 × 720, H.264, sem áudio, com transições entre as imagens de sorriso, implante, prótese e ortodontia já documentadas em `ASSETS.md`. Não é gravação de atendimento, equipe ou paciente. `sorrisos-ilustrativos.vtt` descreve as cenas.

## Validação

Compilação de produção e TypeScript aprovados. Os 16 testes de regressão verificaram layout nas sete larguras, imagens, contatos, navegação, abertura e acessibilidade automatizada. Três testes adicionais verificaram reprodução H.264 real, dimensões/duração do vídeo, fechamento por Escape, pausa e foco, expansão ao rolar, movimento diagonal, inclinação, lupa e mudança dinâmica para movimento reduzido. As capturas desktop, mobile e do player foram revisadas.
