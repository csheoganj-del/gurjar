export type CategoryId =
  | "finance"
  | "business"
  | "lifestyle"
  | "tech"
  | "software";

export type ProductKind = "object" | "tool" | "original";
export type ProductStatus = "chosen" | "recommended" | "forthcoming";
export type BudgetTier = "entry" | "considered" | "committed" | "piece";

export type TablePlacement = {
  x: number;
  y: number;
  w: number;
  rotate?: number;
  z: number;
};

export type Alternative = {
  tier: BudgetTier;
  budget: string;
  title: string;
  maker?: string;
  note: string;
  href?: string;
  productSlug?: string;
  current?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  maker: string;
  category: CategoryId;
  kind: ProductKind;
  status: ProductStatus;
  table?: TablePlacement;
  objectImage: string;
  exhibitImage: string;
  note: string;
  recommendation?: string;
  buyUrl?: string;
  buyLabel?: string;
  priceLabel?: string;
  related: string[];
  alternatives: Alternative[];
};

export type Category = {
  id: CategoryId;
  label: string;
  latin: string;
  index: string;
  headline: string;
  statement: string;
  tableObject: string;
};

export const house = {
  name: "Gurjar",
  person: "Man Singh Gurjar",
  experience: "The Private Table",
  line: "A museum of decisions.",
  year: "2026",
} as const;

export const categories: Category[] = [
  {
    id: "finance",
    label: "Finance",
    latin: "Capital",
    index: "01",
    headline: "Systems before stories.",
    statement:
      "Money as a practice: writing, waiting, and instruments that outlast mood.",
    tableObject: "meisterstuck-149",
  },
  {
    id: "business",
    label: "Business",
    latin: "Correspondence",
    index: "02",
    headline: "The room where decisions arrive.",
    statement:
      "A house for work that still feels private — paper, leather, and the weight of a yes.",
    tableObject: "cognac-folio",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    latin: "Presence",
    index: "03",
    headline: "What you wear when nobody is selling to you.",
    statement:
      "Objects chosen slowly. A watch that shows its work. A rose that refuses to be pretty.",
    tableObject: "santos-skeleton",
  },
  {
    id: "tech",
    label: "Tech",
    latin: "Instruments",
    index: "04",
    headline: "Quiet tools for a loud century.",
    statement:
      "The everyday kit: close at hand, unbranded in spirit, built to disappear into the day.",
    tableObject: "everyday-kit",
  },
  {
    id: "software",
    label: "Software",
    latin: "Atelier",
    index: "05",
    headline: "The machine as a private press.",
    statement:
      "A Mac on the table is not a gadget. It is the studio. Recommended tools now — original software next.",
    tableObject: "macbook-atelier",
  },
];

export const products: Product[] = [
  {
    slug: "santos-skeleton",
    name: "Santos de Cartier Skeleton",
    maker: "Cartier",
    category: "lifestyle",
    kind: "object",
    status: "chosen",
    table: { x: 17, y: 46, w: 17, rotate: -8, z: 4 },
    objectImage: "/objects/watch.jpg",
    exhibitImage: "/exhibits/watch.jpg",
    priceLabel: "The piece",
    buyLabel: "View at Cartier",
    buyUrl:
      "https://www.cartier.com/en-us/watches/collections/santos-de-cartier/santos-de-cartier-skeleton-watch-CRWHSA0016.html",
    note: "A square of rose gold that refuses a closed dial. The movement is the face — caliber 9619 MC, bridges drawn as Roman numerals, a blue sapphire on a heptagonal crown. Chosen because time should look like work well made.",
    recommendation:
      "If you are going to own one loud watch, let the loudness be architecture, not a logo.",
    related: ["rose-31", "meisterstuck-149", "macbook-atelier"],
    alternatives: [
      {
        tier: "entry",
        budget: "£400–800",
        title: "PRX Powermatic 80",
        maker: "Tissot",
        note: "Integrated bracelet, honest steel, the silhouette without the gold. A daily education in proportion.",
        href: "https://www.tissotwatches.com/",
      },
      {
        tier: "considered",
        budget: "£6,500–8,500",
        title: "Santos de Cartier, Medium, steel",
        maker: "Cartier",
        note: "The same square, the same screws, a closed dial. Wear this for a year before you open the movement.",
        href: "https://www.cartier.com/en-gb/watches/collections/santos-de-cartier/",
      },
      {
        tier: "committed",
        budget: "£12,000–18,000",
        title: "Santos Large, steel and gold",
        maker: "Cartier",
        note: "Two-tone as a halfway house — presence without the full skeleton.",
        href: "https://www.cartier.com/en-gb/watches/collections/santos-de-cartier/",
      },
      {
        tier: "piece",
        budget: "£35,000–45,000",
        title: "Santos Skeleton, rose gold",
        maker: "Cartier",
        note: "The exhibit. Manual wind, 72 hours, the table’s north star.",
        current: true,
        productSlug: "santos-skeleton",
      },
    ],
  },
  {
    slug: "rose-31",
    name: "Rose 31",
    maker: "Le Labo",
    category: "lifestyle",
    kind: "object",
    status: "chosen",
    table: { x: 33, y: 38, w: 12, rotate: 6, z: 5 },
    objectImage: "/objects/rose.jpg",
    exhibitImage: "/exhibits/rose.jpg",
    priceLabel: "100 ml",
    buyLabel: "View at Le Labo",
    buyUrl: "https://www.lelabofragrances.com/rose-31-146.html",
    note: "Grasse rose rewritten as something you can wear to a meeting. Cumin, cedar, guaiac, a dry musk. The bottle is a laboratory label — typewriter, no theatre — which is the theatre.",
    recommendation:
      "Start with 50 ml if you are unsure. Keep 100 ml when it has already become a signature.",
    related: ["santos-skeleton", "cognac-folio", "table-app"],
    alternatives: [
      {
        tier: "entry",
        budget: "£70–120",
        title: "Eau Rose",
        maker: "Diptyque",
        note: "A clearer, more daylight rose. Useful while you decide whether rose is yours.",
        href: "https://www.diptyqueparis.com/",
      },
      {
        tier: "considered",
        budget: "£150–180",
        title: "Rose 31, 50 ml",
        maker: "Le Labo",
        note: "The same formula, a smaller commitment. The correct first bottle.",
        href: "https://www.lelabofragrances.com/rose-31-146.html",
      },
      {
        tier: "committed",
        budget: "£240–280",
        title: "Rose 31, 100 ml",
        maker: "Le Labo",
        note: "The bottle on the table. Refillable in-lab. This is the one.",
        current: true,
        productSlug: "rose-31",
      },
      {
        tier: "piece",
        budget: "£400+",
        title: "100 ml with the body line",
        maker: "Le Labo",
        note: "Add the perfuming lotion or the candle if the house should smell like the wrist.",
        href: "https://www.lelabofragrances.com/rose-31-146.html",
      },
    ],
  },
  {
    slug: "meisterstuck-149",
    name: "Meisterstück 149",
    maker: "Montblanc",
    category: "finance",
    kind: "object",
    status: "chosen",
    table: { x: 46, y: 58, w: 22, rotate: -4, z: 3 },
    objectImage: "/objects/pen.jpg",
    exhibitImage: "/exhibits/pen.jpg",
    priceLabel: "Fountain, 149",
    buyLabel: "View at Montblanc",
    buyUrl:
      "https://www.montblanc.com/en-gb/fountain-pens/meisterstuck-149-fountain-pen-mb115384",
    note: "Black resin, gold rings, the white star. A pen large enough to slow your hand. Ledgers, letters, and the first line of a decision all improve when they cannot be deleted.",
    recommendation:
      "Buy it to write with, not to display. Ink is the point.",
    related: ["intelligent-investor", "cognac-folio", "santos-skeleton"],
    alternatives: [
      {
        tier: "entry",
        budget: "£30–80",
        title: "Safari or Metropolitan",
        maker: "Lamy / Pilot",
        note: "Learn your nib and your ink on a tool you will not baby.",
        href: "https://www.lamy.com/",
      },
      {
        tier: "considered",
        budget: "£250–400",
        title: "Meisterstück Classique 145",
        maker: "Montblanc",
        note: "The same grammar, a smaller barrel. Better in a jacket.",
        href: "https://www.montblanc.com/",
      },
      {
        tier: "committed",
        budget: "£600–900",
        title: "Meisterstück LeGrand 146",
        maker: "Montblanc",
        note: "The working size for most hands. The 149 is a choice, not a requirement.",
        href: "https://www.montblanc.com/",
      },
      {
        tier: "piece",
        budget: "£900–1,200",
        title: "Meisterstück 149",
        maker: "Montblanc",
        note: "The diplomat. Unreasonable, and therefore remembered.",
        current: true,
        productSlug: "meisterstuck-149",
      },
    ],
  },
  {
    slug: "intelligent-investor",
    name: "The Intelligent Investor",
    maker: "Benjamin Graham",
    category: "finance",
    kind: "object",
    status: "chosen",
    table: { x: 22, y: 74, w: 14, rotate: 10, z: 2 },
    objectImage: "/objects/book.jpg",
    exhibitImage: "/exhibits/book.jpg",
    priceLabel: "Revised edition",
    buyLabel: "Find a clothbound copy",
    buyUrl: "https://www.harpercollins.com/products/the-intelligent-investor-rev-ed-benjamin-graham",
    note: "Not a market book. A temperament book. Cloth, gold stamp, a ribbon — because the physical copy is a reminder to sit still.",
    recommendation:
      "Read chapter 8 and chapter 20 once a year. Ignore the rest of the internet that day.",
    related: ["meisterstuck-149", "macbook-atelier", "table-app"],
    alternatives: [
      {
        tier: "entry",
        budget: "£8–15",
        title: "Paperback reprint",
        note: "The text is the asset. Start here; rebind later if it becomes a companion.",
        href: "https://www.harpercollins.com/products/the-intelligent-investor-rev-ed-benjamin-graham",
      },
      {
        tier: "considered",
        budget: "£20–40",
        title: "Revised hardcover",
        note: "The working copy. Margin notes allowed.",
        current: true,
        productSlug: "intelligent-investor",
      },
      {
        tier: "committed",
        budget: "£80–200",
        title: "Earlier cloth editions",
        note: "For the shelf that is also a room.",
      },
      {
        tier: "piece",
        budget: "£400+",
        title: "First or early printings",
        note: "Collecting is a different sport. Only if the reading is already done.",
      },
    ],
  },
  {
    slug: "cognac-folio",
    name: "Cognac folio",
    maker: "Private commission",
    category: "business",
    kind: "object",
    status: "chosen",
    table: { x: 76, y: 52, w: 16, rotate: 8, z: 3 },
    objectImage: "/objects/folio.jpg",
    exhibitImage: "/exhibits/folio.jpg",
    priceLabel: "Full-grain",
    buyLabel: "Begin with Ettinger",
    buyUrl: "https://www.ettinger.co.uk/",
    note: "A closed folio is a door. Correspondence, a wax seal, one meeting at a time. Leather that is allowed to scar is more honest than leather that is protected.",
    recommendation:
      "Ettinger in London is the right first address if you do not have a maker. Ask for cognac, not chestnut.",
    related: ["meisterstuck-149", "rose-31", "everyday-kit"],
    alternatives: [
      {
        tier: "entry",
        budget: "£80–150",
        title: "A simple A5 leather cover",
        note: "Unlined, untreated, no logo. Let it take the first year of marks.",
      },
      {
        tier: "considered",
        budget: "£250–450",
        title: "Ettinger portfolio",
        maker: "Ettinger",
        note: "English bridle, brass, a house that still understands correspondence.",
        href: "https://www.ettinger.co.uk/",
        current: true,
        productSlug: "cognac-folio",
      },
      {
        tier: "committed",
        budget: "£500–900",
        title: "Bespoke folio",
        note: "Your paper size, your initials inside, nothing on the cover.",
      },
      {
        tier: "piece",
        budget: "£1,200+",
        title: "Commissioned attaché",
        note: "Only if you actually carry paper. Otherwise it is costume.",
      },
    ],
  },
  {
    slug: "everyday-kit",
    name: "Everyday kit",
    maker: "The table",
    category: "tech",
    kind: "object",
    status: "chosen",
    table: { x: 78, y: 74, w: 18, rotate: -6, z: 2 },
    objectImage: "/objects/tech.jpg",
    exhibitImage: "/exhibits/tech.jpg",
    priceLabel: "Daily instruments",
    buyLabel: "Build the kit",
    note: "A leather sleeve instead of a glass brick on the marble. A charger that looks like an object. Earphones in walnut, not in a screaming case. The point is not the phone. The point is that it can leave the room.",
    recommendation:
      "Dress the tools you already own. New devices are rarely the missing piece.",
    related: ["macbook-atelier", "cognac-folio", "table-app"],
    alternatives: [
      {
        tier: "entry",
        budget: "£40–120",
        title: "A sleeve and a quiet charger",
        note: "Vegetable-tanned leather, a puck without a light show.",
      },
      {
        tier: "considered",
        budget: "£200–400",
        title: "Sleeve, charger, and a proper case for earphones",
        note: "The arrangement on the table. Enough.",
        current: true,
        productSlug: "everyday-kit",
      },
      {
        tier: "committed",
        budget: "£800–1,200",
        title: "The current flagship, uncased in leather",
        note: "Buy the phone last. Buy the sleeve first.",
      },
      {
        tier: "piece",
        budget: "£2,000+",
        title: "A full desk kit in one metal",
        note: "Only when the rest of the table is already quiet.",
      },
    ],
  },
  {
    slug: "macbook-atelier",
    name: "The atelier machine",
    maker: "Apple",
    category: "software",
    kind: "object",
    status: "chosen",
    table: { x: 62, y: 26, w: 28, rotate: -12, z: 1 },
    objectImage: "/objects/laptop.jpg",
    exhibitImage: "/exhibits/laptop.jpg",
    priceLabel: "Mac, 14-inch",
    buyLabel: "Configure a MacBook Pro",
    buyUrl: "https://www.apple.com/uk/macbook-pro/",
    note: "The computer is the studio wall. Space black, a dark editorial screen, no carnival of icons. This is the environment from which the rest of the software on this table will be launched.",
    recommendation:
      "Buy the screen and the keyboard you will not resent. Storage is cheaper later. Attention is not.",
    related: ["table-app", "raycast", "things-3"],
    alternatives: [
      {
        tier: "entry",
        budget: "£0–80 / year",
        title: "The tools, on the machine you have",
        note: "Raycast, a notes app, a calendar. Software taste before hardware.",
        productSlug: "raycast",
      },
      {
        tier: "considered",
        budget: "£1,200–1,600",
        title: "MacBook Air, 13-inch",
        maker: "Apple",
        note: "Enough machine for writing, markets, and design. The honest first Mac.",
        href: "https://www.apple.com/uk/macbook-air/",
      },
      {
        tier: "committed",
        budget: "£1,800–2,400",
        title: "MacBook Pro, 14-inch",
        maker: "Apple",
        note: "The atelier on the table. This is the one.",
        current: true,
        productSlug: "macbook-atelier",
      },
      {
        tier: "piece",
        budget: "£3,000+",
        title: "14-inch, fully specified",
        maker: "Apple",
        note: "For picture, film, and the first original products. Not required to begin.",
        href: "https://www.apple.com/uk/macbook-pro/",
      },
    ],
  },
  {
    slug: "table-app",
    name: "TABLE",
    maker: "Gurjar",
    category: "software",
    kind: "original",
    status: "forthcoming",
    table: { x: 54, y: 72, w: 11, rotate: 4, z: 6 },
    objectImage: "/objects/table-app.jpg",
    exhibitImage: "/exhibits/table-app.jpg",
    priceLabel: "First edition, forthcoming",
    buyLabel: "Request first access",
    buyUrl: "mailto:studio@gurjar.world?subject=TABLE%20first%20access",
    note: "A Mac app for private taste — the objects you chose, the alternatives you declined, the systems underneath. Not another notes app. A cabinet. The first original software from this table.",
    recommendation:
      "If you want it, write. First access will be small and slow on purpose.",
    related: ["macbook-atelier", "raycast", "intelligent-investor"],
    alternatives: [
      {
        tier: "entry",
        budget: "Free",
        title: "Raycast",
        maker: "Raycast",
        note: "The launcher as a nervous system. Use this while TABLE is being cut.",
        productSlug: "raycast",
      },
      {
        tier: "considered",
        budget: "£50",
        title: "Things 3",
        maker: "Cultured Code",
        note: "The most adult list still made. A cousin, not a rival.",
        productSlug: "things-3",
      },
      {
        tier: "committed",
        budget: "Invitation",
        title: "TABLE, first edition",
        maker: "Gurjar",
        note: "The piece this room is being built to hold.",
        current: true,
        productSlug: "table-app",
      },
      {
        tier: "piece",
        budget: "Studio",
        title: "Later editions",
        maker: "Gurjar",
        note: "Collections, publishing, and the public face of a private table.",
      },
    ],
  },
  {
    slug: "raycast",
    name: "Raycast",
    maker: "Raycast",
    category: "software",
    kind: "tool",
    status: "recommended",
    objectImage: "/objects/laptop.jpg",
    exhibitImage: "/exhibits/laptop.jpg",
    priceLabel: "Free, then Pro",
    buyLabel: "Open Raycast",
    buyUrl: "https://www.raycast.com/",
    note: "The keyboard as a front door. Launch, snippet, window, note — without looking at a dock. The closest thing, today, to a private operating layer on a Mac.",
    recommendation: "Install it the afternoon you unbox the machine. Then hide the dock.",
    related: ["macbook-atelier", "things-3", "table-app"],
    alternatives: [
      {
        tier: "entry",
        budget: "Free",
        title: "Raycast, free",
        current: true,
        productSlug: "raycast",
        note: "Enough for almost everyone.",
      },
      {
        tier: "considered",
        budget: "Pro",
        title: "Raycast Pro",
        note: "Cloud, AI, extra windows. Only after the free layer is a habit.",
        href: "https://www.raycast.com/",
      },
      {
        tier: "committed",
        budget: "Invitation",
        title: "TABLE",
        productSlug: "table-app",
        note: "When the launcher is no longer the right metaphor.",
      },
      {
        tier: "piece",
        budget: "—",
        title: "Your own scripts",
        note: "The endgame of a launcher is that you stop launching.",
      },
    ],
  },
  {
    slug: "things-3",
    name: "Things 3",
    maker: "Cultured Code",
    category: "software",
    kind: "tool",
    status: "recommended",
    objectImage: "/objects/laptop.jpg",
    exhibitImage: "/exhibits/laptop.jpg",
    priceLabel: "Once, then yours",
    buyLabel: "View Things",
    buyUrl: "https://culturedcode.com/things/",
    note: "Lists with furniture. No account required to begin, no feed, no streak. The rare piece of software that feels closer to a notebook than a product.",
    recommendation: "Pay once. Do not look for a cloud that will outlive your attention.",
    related: ["raycast", "table-app", "meisterstuck-149"],
    alternatives: [
      {
        tier: "entry",
        budget: "Free",
        title: "Apple Reminders",
        note: "Already on the machine. Fine until the lists start to matter.",
      },
      {
        tier: "considered",
        budget: "£50",
        title: "Things 3",
        current: true,
        productSlug: "things-3",
        note: "The one on this table.",
      },
      {
        tier: "committed",
        budget: "Subscription",
        title: "OmniFocus",
        note: "If your work is genuinely a system of projects, not a list of days.",
        href: "https://www.omnigroup.com/omnifocus",
      },
      {
        tier: "piece",
        budget: "Invitation",
        title: "TABLE",
        productSlug: "table-app",
        note: "For taste and decisions, not tasks.",
      },
    ],
  },
];

export const tableProducts = products
  .filter((product) => product.table)
  .sort((a, b) => (a.table?.z ?? 0) - (b.table?.z ?? 0));

export function getCategory(id: string) {
  return categories.find((category) => category.id === id) ?? null;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function productsIn(id: CategoryId) {
  return products.filter((product) => product.category === id);
}

export function relatedProducts(product: Product) {
  return product.related
    .map((slug) => getProduct(slug))
    .filter((item): item is Product => Boolean(item));
}

export const tierLabel: Record<BudgetTier, string> = {
  entry: "Entry",
  considered: "Considered",
  committed: "Committed",
  piece: "The piece",
};
