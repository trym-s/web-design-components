import { RecordsTable, type RecordRow, type RecordTag } from "./records-table";

/** Tag → palette variable declared on the table root. */
const TAG_COLORS: Record<string, string> = {
  "B2B": "var(--tag-orange)",
  "B2C": "var(--tag-lime)",
  "Cafe": "var(--tag-rose)",
  "Catering": "var(--tag-magenta)",
  "Dairy-free": "var(--tag-cyan)",
  "Gelato": "var(--tag-violet)",
  "Imports": "var(--tag-blue)",
  "Local": "var(--tag-green)",
  "Seasonal": "var(--tag-orange)",
  "Sorbet": "var(--tag-cyan)",
  "Vegan": "var(--tag-lime)",
  "Wholesale": "var(--tag-blue)",
};

const tags = (...labels: string[]): RecordTag[] => labels.map((label) => ({ label, color: TAG_COLORS[label] }));

const ROWS: RecordRow[] = [
  { id: "aurora", name: "Aurora Scoops — Reykjavík", tags: tags("Gelato", "Seasonal"), last: "9 days ago", strength: "strong", website: "aurora-scoops.example.com" },
  { id: "kumo", name: "Kumo Creamery — Tokyo", tags: tags("B2C", "Cafe", "Vegan"), last: "3 weeks ago", strength: "strong", website: "kumo-creamery.example.com" },
  { id: "sol-nieve", name: "Sol y Nieve — Buenos Aires", tags: tags("Gelato", "Local"), last: "2 months ago", strength: "weak", website: "sol-y-nieve.example.com" },
  { id: "maple-orbit", name: "Maple Orbit — Montréal", tags: tags("B2B", "Wholesale", "Seasonal"), last: "15 days ago", strength: "weak", website: "maple-orbit.example.com" },
  { id: "blue-fig", name: "Blue Fig Gelato — Florence", tags: tags("Gelato", "Cafe"), last: "over 1 year ago", strength: "veryweak", website: "blue-fig.example.com" },
  { id: "sahara-swirl", name: "Sahara Swirl — Marrakech", tags: tags("Sorbet", "Local"), last: "5 months ago", strength: "veryweak" },
  { id: "cloudberry", name: "Cloudberry Cone — Helsinki", tags: tags("Dairy-free", "Seasonal"), last: "No contact", strength: "none", website: "cloudberry-cone.example.com" },
  { id: "palm-sugar", name: "Palm Sugar Creamery — Bangkok", tags: tags("B2C", "Vegan"), last: "3 months ago", strength: "veryweak", website: "palm-sugar.example.com" },
  { id: "cape-vanilla", name: "Cape Vanilla Co. — Cape Town", tags: tags("Wholesale", "Imports"), last: "over 1 year ago", strength: "veryweak", website: "cape-vanilla.example.com" },
  { id: "andes-snow", name: "Andes Snow Creamery — Quito", tags: tags("Gelato", "Catering"), last: "almost 2 years ago", strength: "veryweak" },
  { id: "tasman-sea", name: "Tasman Sea Gelato — Hobart", tags: tags("Gelato", "Local"), last: "2 months ago", strength: "weak", website: "tasman-sea.example.com" },
  { id: "silk-road", name: "Silk Road Sorbet — Tbilisi", tags: tags("Sorbet", "Imports"), last: "about 1 month ago", strength: "weak", website: "silk-road.example.com" },
  { id: "rosewater", name: "Rosewater Kulfi — Jaipur", tags: tags("B2C", "Seasonal"), last: "2 months ago", strength: "veryweak" },
  { id: "lumen", name: "Lumen Soft Serve — Copenhagen", tags: tags("Dairy-free", "Cafe"), last: "8 months ago", strength: "weak", website: "lumen-soft-serve.example.com" },
  { id: "cacao-norte", name: "Cacao Norte — Oaxaca", tags: tags("B2B", "Local", "Wholesale"), last: "about 2 years ago", strength: "none", website: "cacao-norte.example.com" },
  { id: "pine-pistachio", name: "Pine & Pistachio — Istanbul", tags: tags("Gelato", "Catering"), last: "about 1 month ago", strength: "veryweak" },
  { id: "ember-cone", name: "Ember Cone Company — Seoul", tags: tags("B2C", "Vegan"), last: "15 days ago", strength: "weak", website: "ember-cone.example.com" },
  { id: "coral-coast", name: "Coral Coast Sorbet — Honolulu", tags: tags("Sorbet", "Local"), last: "9 days ago", strength: "strong", website: "coral-coast.example.com" },
  { id: "sunbird", name: "Sunbird Gelateria — Lisbon", tags: tags("Gelato", "Cafe"), last: "over 2 years ago", strength: "none", website: "sunbird.example.com" },
  { id: "mooncake", name: "Mooncake Ice Cream — Singapore", tags: tags("B2B", "Wholesale"), last: "about 1 month ago", strength: "veryweak", website: "mooncake-ice-cream.example.com" },
  { id: "juniper", name: "Juniper & Cream — Vancouver", tags: tags("Dairy-free", "Catering"), last: "No contact", strength: "none" },
  { id: "mango-moon", name: "Mango Moon Gelato — Nairobi", tags: tags("Sorbet", "Vegan"), last: "almost 2 years ago", strength: "veryweak", website: "mango-moon.example.com" },
  { id: "fjord-fizz", name: "Fjord Fizz Ice — Oslo", tags: tags("Dairy-free", "Seasonal"), last: "No contact", strength: "none" },
  { id: "pampa", name: "Pampa Creamery — Córdoba", tags: tags("B2C", "Local"), last: "12 months ago", strength: "veryweak", website: "pampa-creamery.example.com" },
  { id: "lotus-leaf", name: "Lotus Leaf Scoops — Hanoi", tags: tags("Vegan", "Cafe"), last: "15 days ago", strength: "weak" },
  { id: "saffron-sky", name: "Saffron Sky Kulfi — Dubai", tags: tags("Imports", "Catering"), last: "almost 2 years ago", strength: "veryweak", website: "saffron-sky.example.com" },
];

export default function Demo() {
  return (
    <div className="w-full max-w-4xl">
      <RecordsTable rows={ROWS} />
    </div>
  );
}
