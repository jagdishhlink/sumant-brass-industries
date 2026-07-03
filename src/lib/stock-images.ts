const CATEGORY_KEYWORDS: Record<string, string> = {
  restaurant: "restaurant+food+dining",
  cafe: "coffee+cafe+shop",
  salon: "hair+salon+beauty",
  spa: "spa+wellness+massage",
  gym: "gym+fitness+workout",
  yoga: "yoga+meditation+studio",
  hotel: "hotel+luxury+room",
  resort: "resort+pool+tropical",
  clinic: "medical+clinic+healthcare",
  dental: "dental+clinic+smile",
  hospital: "hospital+healthcare",
  school: "school+education+classroom",
  coaching: "coaching+study+education",
  photography: "photography+camera+studio",
  studio: "photography+studio+creative",
  boutique: "fashion+boutique+clothing",
  fashion: "fashion+clothing+store",
  jewellery: "jewellery+gold+ornaments",
  jewelry: "jewelry+gold+ornaments",
  electronics: "electronics+gadgets+store",
  mobile: "mobile+phone+smartphone",
  furniture: "furniture+interior+home",
  interior: "interior+design+home+decor",
  bakery: "bakery+cakes+pastries",
  sweet: "sweets+desserts+confectionery",
  florist: "flowers+florist+bouquet",
  flower: "flowers+garden+shop",
  automobile: "car+automobile+showroom",
  garage: "car+repair+garage+mechanic",
  travel: "travel+tourism+vacation",
  real_estate: "real+estate+property+building",
  construction: "construction+building+architecture",
  printing: "printing+press+design",
  laundry: "laundry+clothes+clean",
  tailor: "tailor+sewing+fabric",
  pet: "pet+shop+animals",
  grocery: "grocery+store+supermarket",
  pharmacy: "pharmacy+medical+store",
  optical: "eyeglasses+optical+vision",
  art: "art+gallery+painting",
  music: "music+instruments+studio",
  dance: "dance+studio+performance",
  temple: "temple+worship+spiritual",
  event: "event+planning+wedding",
  wedding: "wedding+decoration+celebration",
  catering: "catering+food+service",
  cnc: "cnc+machine+manufacturing",
  fabrication: "metal+fabrication+workshop",
  manufacturing: "factory+manufacturing+industrial",
};

function getCategoryKeyword(category: string): string {
  const cat = (category || "").toLowerCase();
  for (const [key, value] of Object.entries(CATEGORY_KEYWORDS)) {
    if (cat.includes(key)) return value;
  }
  // Fallback: use the category itself cleaned up
  return cat.replace(/[^a-z0-9 ]/g, "").split(" ").slice(0, 3).join("+") || "business+store";
}

export function getStockImages(category: string, count: number = 6): string[] {
  const keyword = getCategoryKeyword(category);
  return Array.from({ length: count }, (_, i) =>
    `https://images.unsplash.com/photo-${getPhotoId(keyword, i)}?w=800&h=600&fit=crop&q=80`
  );
}

export function getStockImageUrl(category: string, index: number = 0, width: number = 800, height: number = 600): string {
  const keyword = getCategoryKeyword(category);
  return `https://images.unsplash.com/photo-${getPhotoId(keyword, index)}?w=${width}&h=${height}&fit=crop&q=80`;
}

// Use loremflickr as a reliable free stock image source (no API key needed)
export function getReliableStockImages(category: string, count: number = 6): string[] {
  const keyword = getCategoryKeyword(category);
  return Array.from({ length: count }, (_, i) =>
    `https://loremflickr.com/800/600/${keyword}?lock=${i + 1}`
  );
}

export function getReliableStockImage(category: string, index: number = 0, width: number = 800, height: number = 600): string {
  const keyword = getCategoryKeyword(category);
  return `https://loremflickr.com/${width}/${height}/${keyword}?lock=${index + 10}`;
}

// Deterministic "photo id" generator - creates plausible looking IDs
function getPhotoId(keyword: string, index: number): string {
  // These are valid Unsplash photo patterns - but we'll use loremflickr as primary
  const hash = simpleHash(keyword + index);
  return `${1500000000 + hash}-placeholder`;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash) % 999999;
}
