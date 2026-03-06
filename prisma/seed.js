const { PrismaClient, ProductType, LeadSource, LeadStatus, TicketStatus } = require("@prisma/client");

const prisma = new PrismaClient();

const equipmentCategories = [
  {
    name: "Elevadores",
    slug: "elevadores",
    type: ProductType.EQUIPMENT,
    description: "Solucoes para movimentacao vertical de graos e insumos com foco em produtividade.",
  },
  {
    name: "Secadores",
    slug: "secadores",
    type: ProductType.EQUIPMENT,
    description: "Equipamentos para etapas de pre-processamento e secagem com configuracao sob projeto.",
  },
  {
    name: "Silos",
    slug: "silos",
    type: ProductType.EQUIPMENT,
    description: "Armazenagem industrial/agro com modularidade para operacoes de diferentes portes.",
  },
];

const partCategories = [
  {
    name: "Transmissao",
    slug: "transmissao",
    type: ProductType.PART,
    description: "Itens de reposicao para conjuntos de acionamento e movimento.",
  },
  {
    name: "Estruturas e Fixacao",
    slug: "estruturas-fixacao",
    type: ProductType.PART,
    description: "Componentes estruturais e acessorios de instalacao para campo e industria.",
  },
  {
    name: "Sensores e Controle",
    slug: "sensores-controle",
    type: ProductType.PART,
    description: "Acessorios para monitoramento operacional e seguranca de processo.",
  },
];

function placeholderSpecs(kind) {
  return {
    capacidade: "Placeholder (definir conforme projeto)",
    dimensoes: "Placeholder (L x A x C)",
    potencia: "Placeholder (kW/HP)",
    aplicacao: `Placeholder de aplicacao para ${kind}`,
    observacoes: "Dados ilustrativos para demonstracao comercial. Validar em proposta tecnica.",
  };
}

function placeholderImages(seed) {
  return [
    `/images/placeholders/product-${((seed - 1) % 4) + 1}.svg`,
    `/images/placeholders/product-${((seed) % 4) + 1}.svg`,
  ];
}

async function upsertCategory(category) {
  return prisma.productCategory.upsert({
    where: { slug: category.slug },
    update: category,
    create: category,
  });
}

async function main() {
  const categories = [];
  for (const c of [...equipmentCategories, ...partCategories]) {
    categories.push(await upsertCategory(c));
  }

  const productData = [
    ["elevador-de-canecas-linha-x", "Elevador de Canecas Linha X", "elevadores", ProductType.EQUIPMENT],
    ["transportador-vertical-modular", "Transportador Vertical Modular", "elevadores", ProductType.EQUIPMENT],
    ["secador-fluxo-controlado", "Secador Fluxo Controlado", "secadores", ProductType.EQUIPMENT],
    ["secador-compacto-serie-s", "Secador Compacto Serie S", "secadores", ProductType.EQUIPMENT],
    ["silo-metalico-modular", "Silo Metalico Modular", "silos", ProductType.EQUIPMENT],
    ["silo-pulmao-operacional", "Silo Pulmao Operacional", "silos", ProductType.EQUIPMENT],
    ["kit-correntes-e-engrenagens", "Kit Correntes e Engrenagens", "transmissao", ProductType.PART],
    ["conjunto-fixacao-estrutural", "Conjunto de Fixacao Estrutural", "estruturas-fixacao", ProductType.PART],
    ["sensor-temperatura-celula", "Sensor de Temperatura para Celula", "sensores-controle", ProductType.PART],
    ["painel-alerta-operacional", "Painel de Alerta Operacional", "sensores-controle", ProductType.PART],
  ];

  let idx = 1;
  for (const [slug, name, categorySlug, type] of productData) {
    const category = categories.find((c) => c.slug === categorySlug);
    await prisma.product.upsert({
      where: { slug },
      update: {
        name,
        type,
        categoryId: category.id,
        shortDesc: "Descricao resumida para demonstracao do catalogo digital e fluxo de cotacao.",
        longDesc:
          "Produto de exemplo para o novo portal JHONROB. Esta descricao foi escrita para fins de demonstracao do layout, SEO e fluxo comercial, sem replicar texto institucional anterior.",
        specs: placeholderSpecs(name),
        images: placeholderImages(idx),
      },
      create: {
        name,
        slug,
        type,
        categoryId: category.id,
        shortDesc: "Descricao resumida para demonstracao do catalogo digital e fluxo de cotacao.",
        longDesc:
          "Produto de exemplo para o novo portal JHONROB. Esta descricao foi escrita para fins de demonstracao do layout, SEO e fluxo comercial, sem replicar texto institucional anterior.",
        specs: placeholderSpecs(name),
        images: placeholderImages(idx),
      },
    });
    idx += 1;
  }

  const events = [
    {
      slug: "feira-agro-norte-2026",
      title: "Feira Agro Norte 2026",
      date: new Date("2026-04-10T10:00:00Z"),
      location: "Sinop/MT",
      coverImage: "/images/placeholders/event-1.svg",
      content:
        "Participacao institucional com foco em armazenagem, pos-venda e projetos industriais para expansao operacional.",
    },
    {
      slug: "rodada-tecnica-armazenagem-sc",
      title: "Rodada Tecnica de Armazenagem SC",
      date: new Date("2026-06-22T13:30:00Z"),
      location: "Criciuma/SC",
      coverImage: "/images/placeholders/event-2.svg",
      content:
        "Encontro com clientes e parceiros para apresentar fluxos de manutencao, retrofit e automacao comercial.",
    },
    {
      slug: "encontro-pos-venda-jhonrob",
      title: "Encontro Pos-venda JHONROB",
      date: new Date("2026-08-05T09:00:00Z"),
      location: "Online + Presencial",
      coverImage: "/images/placeholders/event-3.svg",
      content:
        "Agenda de suporte consultivo, orientacoes de atendimento e demonstracao do portal de chamados e catalogo.",
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    });
  }

  const demoLeads = [
    {
      name: "Lead Demo Catalogo",
      email: "lead.catalogo@demo.local",
      phone: "(66) 99999-0001",
      source: LeadSource.CATALOG,
      status: LeadStatus.NEW,
      message: "Interesse em catalogo de equipamentos.",
    },
    {
      name: "Lead Demo Contato",
      email: "lead.contato@demo.local",
      phone: "(48) 99999-0002",
      source: LeadSource.CONTACT,
      status: LeadStatus.IN_CONTACT,
      message: "Solicitando retorno comercial.",
      notes: "Lead de exemplo em contato para demonstrar pipeline.",
    },
  ];
  for (const lead of demoLeads) {
    const exists = await prisma.lead.findFirst({ where: { email: lead.email, source: lead.source } });
    if (!exists) await prisma.lead.create({ data: lead });
  }

  await prisma.ticket.upsert({
    where: { protocol: "JHR-2026-0001" },
    update: {},
    create: {
      protocol: "JHR-2026-0001",
      name: "Cliente Demo",
      email: "cliente@demo.local",
      phone: "(66) 98888-0000",
      subject: "Suporte preventivo",
      message: "Chamado criado para demonstrar painel de pos-venda.",
      status: TicketStatus.OPEN,
      attachments: [],
    },
  });

  console.log("Seed concluido.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
