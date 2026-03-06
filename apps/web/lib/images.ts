// Imagens do Unsplash - uso gratuito com atribuição
// https://unsplash.com/license

export const unsplashImages = {
  // Hero e backgrounds
  hero: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80", // Silos agrícolas
  heroAlt: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&q=80", // Fazenda
  
  // Equipamentos - Silos e armazenagem
  silo1: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80", // Silos
  silo2: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80", // Silos metálicos
  silo3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", // Campo agrícola
  
  // Equipamentos - Industrial
  industrial1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", // Máquinas industriais
  industrial2: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80", // Fábrica
  conveyor: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80", // Esteira/produção
  
  // Tratores e máquinas agrícolas
  tractor1: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&q=80", // Trator
  tractor2: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&q=80", // Colheitadeira
  harvester: "https://images.unsplash.com/photo-1591341093485-a0e67d35c18c?w=800&q=80", // Colheita
  
  // Peças e componentes
  gears: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", // Engrenagens
  parts: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80", // Peças mecânicas
  maintenance: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80", // Manutenção
  
  // Eventos e feiras
  event1: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", // Feira/evento
  event2: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", // Conferência
  exhibition: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=800&q=80", // Exposição
  
  // Equipe e empresa
  team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", // Equipe
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", // Escritório
  warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", // Armazém
  
  // Suporte e atendimento
  support: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80", // Atendimento
  technician: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80", // Técnico
  
  // Campos e natureza agrícola
  field1: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80", // Campo de trigo
  field2: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&q=80", // Plantação
  sunset: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80", // Campo ao pôr do sol
};

// Função helper para pegar imagem por categoria
export function getProductImage(index: number, type: "equipment" | "part" = "equipment"): string {
  const equipmentImages = [
    unsplashImages.silo1,
    unsplashImages.silo2,
    unsplashImages.conveyor,
    unsplashImages.industrial1,
    unsplashImages.tractor1,
    unsplashImages.harvester,
  ];
  
  const partImages = [
    unsplashImages.gears,
    unsplashImages.parts,
    unsplashImages.maintenance,
    unsplashImages.industrial2,
  ];
  
  const images = type === "equipment" ? equipmentImages : partImages;
  return images[index % images.length];
}

export function getEventImage(index: number): string {
  const images = [
    unsplashImages.event1,
    unsplashImages.event2,
    unsplashImages.exhibition,
  ];
  return images[index % images.length];
}
