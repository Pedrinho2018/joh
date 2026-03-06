export const siteConfig = {
  name: "JHONROB",
  description:
    "Solucoes industriais e agro para armazenagem, movimentacao, pecas, pos-venda e projetos com atendimento consultivo.",
  url: process.env.PUBLIC_SITE_URL || "http://localhost:3000",
  email: "contato@jhonrob.com.br",
  units: [
    {
      city: "Sinop/MT",
      phone: "(66) 3515-7005",
      address: "Rua Joao Pedro Moreira de Carvalho, 1175 - Lidia, Sinop/MT",
    },
    {
      city: "Criciuma/SC",
      phone: "(48) 3512-2138",
      address: "Rua Rota do Imigrante, 630 - Quarta Linha, Criciuma/SC",
    },
  ],
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/empresa", label: "Empresa" },
  { href: "/equipamentos", label: "Equipamentos" },
  { href: "/pecas-acessorios", label: "Peças e Acessórios" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contato", label: "Contato" },
  { href: "/pos-venda", label: "Pós-venda" },
];
