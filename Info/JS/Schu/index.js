const app = require("express")();
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(require("express").json());

const data = [
  {
    id: 1,
    title: "Lebkuchenherzen",
    description:
      "Traditionelle Lebkuchenherzen, verziert mit Zuckerguss und in einer festlichen Geschenkverpackung.",
    price: 9.99,
    categories: ["Essen", "Bio"],
    image: "http://localhost/placeholder.png",
  },
  {
    id: 2,
    title: "Glühwein",
    description:
      "Wärmer Glühwein mit einem Hauch von Zimt und Nelken, perfekt für gesellige Abende am Kamin.",
    price: 12.99,
    categories: ["Trinken", "Alkoholisch"],
    image: "http://localhost/placeholder.png",
  },
  {
    id: 3,
    title: "Weihnachtstörtchen",
    description:
      "Kleine, feine Törtchen mit Marzipanfüllung, perfekt für den weihnachtlichen Nachmittagstee.",
    price: 14.99,
    categories: ["Essen", "Bio"],
    image: "http://localhost/placeholder.png",
  },
  {
    id: 4,
    title: "Hausgemachte Plätzchen",
    description:
      "Eine süße Auswahl an hausgemachten Plätzchen in verschiedenen Geschmacksrichtungen, ideal für die Feiertage.",
    price: 8.5,
    categories: ["Essen", "Bio"],
    image: "http://localhost/placeholder.png",
  },
  {
    id: 5,
    title: "Punsch mit Früchten",
    description:
      "Erfrischender alkoholfreier Punsch mit exotischen Früchten, perfekt für die gesamte Familie.",
    price: 7.99,
    categories: ["Trinken", "Bio"],
    image: "http://localhost/placeholder.png",
  },
  {
    id: 6,
    title: "Weihnachtlicher Eierlikör",
    description:
      "Cremiger Eierlikör mit einem Hauch von Vanille und Zimt, ideal für festliche Cocktails.",
    price: 15.99,
    categories: ["Trinken", "Alkoholisch"],
    image: "http://localhost/placeholder.png",
  },
];

app.get("/api/products", (_, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
