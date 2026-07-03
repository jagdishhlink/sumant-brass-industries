// Curated Unsplash photo IDs per category for guaranteed high-quality, relevant results
const CATEGORY_PHOTOS: Record<string, string[]> = {
  restaurant: [
    "1517248135467-4c7edcad34c4", "1552566626-98f62da14ae0", "1414235077428-338989a2e8c0",
    "1559339352-11d035aa65de", "1466978913421-dad2ebd01d17", "1504674900247-0877df9cc836",
  ],
  cafe: [
    "1501339847302-ac426a4a7cbb", "1495474472287-4d71bcdd2085", "1442512595331-e89e73853f31",
    "1509042239860-f550ce710b93", "1511081692775-05d0f180a065", "1453614512568-c4024d13c247",
  ],
  salon: [
    "1560066984-138dadb4c035", "1522337360788-8b13dee7a37e", "1633681926022-84c23e8cb2d6",
    "1521590832167-7228fcb7c45e", "1562322140-8baeececf3df", "1595476108010-b4d1f102b1b1",
  ],
  fashion: [
    "1558618666-fcd25c85f1aa", "1490481651871-ab68de25d43d", "1445205170230-053b83016050",
    "1469334031218-e382a71b716b", "1483985988355-763728e1935b", "1509631179647-0177331693ae",
  ],
  gym: [
    "1534438327276-14e5300c3a48", "1571019613454-1cb2f99b2d8b", "1517836357463-d25dfeac3438",
    "1540497077202-7c8a3999166f", "1576678927484-cc907957088c", "1593079831268-3381b0db4a77",
  ],
  hotel: [
    "1566073771259-6a3b3cbf9a08", "1582719508461-905c673c0b2f", "1551882547-ff40c63fe5fa",
    "1520250497591-112f2f40a3f4", "1584132967334-10e028bd69f7", "1542314831-068cd1dbfeeb",
  ],
  spa: [
    "1540555700478-4be289fbecef", "1544161515-4ab6ce6db874", "1507652313519-d4e9174996dd",
    "1600334089648-b0d9d3028eb2", "1519823551278-64ac92734fb1", "1596178065887-1198b6148b2b",
  ],
  medical: [
    "1519494026-5a53d7b35ddf", "1538108149393-fbbd81895907", "1576091160399-112ba8d25d1d",
    "1551076805-e1869033e561", "1579684385127-1ef15d508118", "1666214280557-f1b5022eb634",
  ],
  electronics: [
    "1518770660439-4636190af475", "1550009158-9ebf69173e03", "1531297484001-80022131f5a1",
    "1496181133206-80ce9b88a853", "1519389950473-47ba0277781c", "1550745165-9bc0b252726f",
  ],
  manufacturing: [
    "1504917595217-d4dc5ede4b0c", "1565193566-1db58b6c8b08", "1581091226825-a6a306c49f3d",
    "1567789395961-cf3d2a690aca", "1558618666-fcd25c85f1aa", "1533417479674-2e19f8bfc4ca",
  ],
  construction: [
    "1504307651254-35680f356dfd", "1541888946425-d81bb19240f5", "1503387762-592deb58ef4e",
    "1508450859948-4e04fabaa4ea", "1545259742-b4fd8a49eca4", "1581094794329-c8112a89af12",
  ],
  jewelry: [
    "1515562141207-82bf828ebac6", "1535632066927-ab7c9ab60908", "1601121141461-9d6647bca1ed",
    "1506630448388-4e683c67ddb0", "1611652022419-a9419f74343d", "1603561596112-0a132b757442",
  ],
  bakery: [
    "1509440159596-0249088772ff", "1486427944544-d2c246c2c0b7", "1558961363-fa8fdf82db35",
    "1517433670267-9dbff930e9ad", "1464305795204-6f5bbfc7fb81", "1555507036-ab1f4038808a",
  ],
  flower: [
    "1490750967868-88aa4f5820c8", "1487530811176-3780de880c2d", "1455659817273-f96807779a8a",
    "1462275646964-a0e3c11f18a9", "1508610048659-a7ae67a89793", "1444021465936-c6ca6d72b661",
  ],
  automobile: [
    "1492144534655-ae79c964c9d7", "1503376780353-7e6692767b70", "1494976388531-d1058494cdd8",
    "1549317661-bd32c8ce0bbe", "1552519507-da3b142c6e3b", "1502877338535-766e1452684a",
  ],
  education: [
    "1524178232363-1fb2b075b655", "1503676260728-1c00da094a0b", "1523050854058-8df90110c9f1",
    "1497633762265-9d179a990aa6", "1427504494785-3a9ca7044f45", "1509062522246-3755977927d7",
  ],
  default: [
    "1497366216548-37526070297c", "1497366811353-6870744d04b2", "1556761175-4b46a572b786",
    "1486406146926-c627a92ad1ab", "1497215728101-856f4ea42174", "1560472354-b33ff0c44a43",
  ],
};

function getCategoryPhotos(category: string): string[] {
  const cat = (category || "").toLowerCase();
  for (const [key, photos] of Object.entries(CATEGORY_PHOTOS)) {
    if (key === "default") continue;
    if (cat.includes(key)) return photos;
  }
  // Check aliases
  if (cat.includes("clinic") || cat.includes("dental") || cat.includes("hospital")) return CATEGORY_PHOTOS.medical;
  if (cat.includes("boutique") || cat.includes("cloth") || cat.includes("garment")) return CATEGORY_PHOTOS.fashion;
  if (cat.includes("yoga") || cat.includes("fitness")) return CATEGORY_PHOTOS.gym;
  if (cat.includes("resort")) return CATEGORY_PHOTOS.hotel;
  if (cat.includes("sweet") || cat.includes("cake")) return CATEGORY_PHOTOS.bakery;
  if (cat.includes("florist")) return CATEGORY_PHOTOS.flower;
  if (cat.includes("school") || cat.includes("coaching") || cat.includes("institute")) return CATEGORY_PHOTOS.education;
  if (cat.includes("jewel") || cat.includes("gold") || cat.includes("ornament")) return CATEGORY_PHOTOS.jewelry;
  if (cat.includes("car") || cat.includes("bike") || cat.includes("garage") || cat.includes("motor")) return CATEGORY_PHOTOS.automobile;
  if (cat.includes("factory") || cat.includes("industri") || cat.includes("cnc") || cat.includes("fabricat") || cat.includes("brass") || cat.includes("metal")) return CATEGORY_PHOTOS.manufacturing;
  if (cat.includes("builder") || cat.includes("architect") || cat.includes("civil")) return CATEGORY_PHOTOS.construction;
  if (cat.includes("mobile") || cat.includes("computer") || cat.includes("gadget")) return CATEGORY_PHOTOS.electronics;
  if (cat.includes("food") || cat.includes("kitchen") || cat.includes("dining")) return CATEGORY_PHOTOS.restaurant;
  if (cat.includes("coffee") || cat.includes("tea")) return CATEGORY_PHOTOS.cafe;
  if (cat.includes("beauty") || cat.includes("hair") || cat.includes("parlour")) return CATEGORY_PHOTOS.salon;
  if (cat.includes("wellness") || cat.includes("massage") || cat.includes("ayurved")) return CATEGORY_PHOTOS.spa;

  return CATEGORY_PHOTOS.default;
}

export function getReliableStockImages(category: string, count: number = 6): string[] {
  const photos = getCategoryPhotos(category);
  return photos.slice(0, count).map((id) =>
    `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop&q=80`
  );
}

export function getReliableStockImage(category: string, index: number = 0, width: number = 800, height: number = 600): string {
  const photos = getCategoryPhotos(category);
  const id = photos[index % photos.length];
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&q=80`;
}
