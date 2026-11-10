export const clinic = {
  name: "Volte a Sorrir Brasil",
  phone: "(98) 98427-8547",
  whatsapp: "5598984278547",
  email: "menezesw618@gmail.com",
  address: "Rua Davi Alves Silva, S/N — Centro, Buriticupu — MA",
  instagram: "https://www.instagram.com/volteasorrirbrasil/",
  mapQuery: "Rua Davi Alves Silva, Centro, Buriticupu, Maranhão",
};
export const appointmentMessage =
  "Olá! Gostaria de agendar uma avaliação odontológica.";
export function whatsappUrl(message = appointmentMessage) {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const treatments = [
  {
    id: "implantes",
    short: "Implantes",
    title: "Implantes dentários",
    label: "Um novo ponto de partida",
    description:
      "Os implantes dentários são uma alternativa para substituir dentes perdidos, contribuindo para a recuperação da mastigação e da estética do sorriso, conforme avaliação profissional.",
    detail:
      "O planejamento considera a saúde bucal, as condições ósseas e as necessidades de cada pessoa. A indicação e as etapas são definidas durante a avaliação odontológica.",
    message:
      "Olá! Gostaria de saber mais sobre implantes dentários e agendar uma avaliação.",
    alt: "Ilustração de um implante com coroa, conexão e parafuso em modelo de osso e gengiva",
  },
  {
    id: "proteses",
    short: "Próteses",
    title: "Próteses dentárias",
    label: "Cuidado que reconstrói",
    description:
      "As próteses dentárias ajudam a repor dentes ausentes, proporcionando soluções de reabilitação oral de acordo com as necessidades de cada paciente.",
    detail:
      "Existem modalidades fixas e removíveis. Próteses parciais removíveis e próteses protocolo são exemplos informativos: a disponibilidade e a indicação precisam ser confirmadas com a equipe.",
    message: "Olá! Gostaria de informações sobre próteses dentárias.",
    alt: "Imagem ilustrativa de prótese parcial removível com dentes e estrutura metálica",
  },
  {
    id: "dentaduras",
    short: "Dentaduras",
    title: "Dentaduras",
    label: "Para os pequenos grandes momentos",
    description:
      "As próteses totais são uma opção para pessoas que perderam todos os dentes de uma arcada, auxiliando na mastigação e na recuperação da aparência do sorriso.",
    detail:
      "A adaptação, os cuidados de higiene e o acompanhamento fazem parte do uso da prótese. Uma avaliação individual orienta a escolha e os ajustes necessários.",
    message:
      "Olá! Gostaria de saber mais sobre dentaduras e agendar uma avaliação.",
    alt: "Imagem ilustrativa de próteses totais superior e inferior sobre fundo azul",
  },
  {
    id: "ortodontia",
    short: "Ortodontia",
    title: "Aparelhos ortodônticos",
    label: "Cada sorriso, um planejamento",
    description:
      "Os aparelhos ortodônticos são utilizados para corrigir problemas de alinhamento dentário e de mordida, conforme o planejamento de cada tratamento.",
    detail:
      "O exame clínico e, quando necessários, exames complementares ajudam a avaliar a mordida. O tipo de aparelho e o acompanhamento dependem do planejamento profissional.",
    message:
      "Olá! Gostaria de informações sobre aparelhos ortodônticos e agendar uma avaliação.",
    alt: "Modelo odontológico ilustrativo com aparelho ortodôntico metálico",
  },
];
export const faqs = [
  [
    "Como funciona a avaliação odontológica?",
    "É o momento de conversar sobre suas necessidades e examinar sua saúde bucal. O profissional poderá solicitar exames complementares e orientar as opções de cuidado. Entre em contato para confirmar como agendar e as condições da avaliação.",
  ],
  [
    "O que é um implante dentário?",
    "É uma estrutura colocada no osso para servir de suporte à reposição de um dente perdido. Sua indicação depende da avaliação da saúde bucal, das condições ósseas e de outros fatores individuais.",
  ],
  [
    "Quais são os tipos de próteses dentárias?",
    "Há próteses fixas, removíveis, parciais e totais. A prótese protocolo e a prótese parcial removível são exemplos de modalidades. A equipe precisa confirmar quais estão disponíveis e o profissional avaliar qual se aplica ao seu caso.",
  ],
  [
    "Como saber se preciso de aparelho ortodôntico?",
    "Somente uma avaliação profissional pode indicar a necessidade de tratamento. O alinhamento dos dentes e a relação entre as arcadas são analisados para definir um planejamento individual.",
  ],
  [
    "Onde fica a Volte a Sorrir Brasil?",
    "Estamos na Rua Davi Alves Silva, S/N, no Centro de Buriticupu, Maranhão. Fale com a equipe para confirmar o ponto de referência antes de se deslocar.",
  ],
  [
    "Como posso entrar em contato para agendar?",
    "Use os botões de WhatsApp do site ou o número (98) 98427-8547. Atendemos de segunda a sexta, das 08h às 18h, e aos sábados, das 08h às 12h. O horário da avaliação será confirmado pela equipe.",
  ],
];
