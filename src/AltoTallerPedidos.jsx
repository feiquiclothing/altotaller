import React, { useMemo, useReducer, useRef, useState } from "react";

// ======================================================
// ALTO TALLER — PEDIDOS
// ======================================================

const ORDERS_ENDPOINT = "/api/alto";

const PHONE_URUGUAY = "099666040";

// Por ahora dejamos la web abierta para poder probarla.
// Después ponemos los horarios reales de Alto.
const FORCE_OPEN = true;

// ======================================================
// PRECIOS
// Todo Alto = 15% menos que el precio original
// ======================================================

const discount15 = (price) => Math.round(price * 0.85);

const currency = (value) =>
  new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(value);

// ======================================================
// ZONAS DE ENVÍO
// ======================================================

const ZONES = [
  { id: "cv", name: "Ciudad Vieja", fee: 0 },
  { id: "centro", name: "Centro / Cordón / Aguada", fee: 170 },
  { id: "pocitos", name: "Parque Rodó / Punta Carretas / Pocitos", fee: 220 },
  { id: "otras", name: "Otras zonas — coordinar", fee: 270 },
];

// ======================================================
// MENÚ
// ======================================================

const MENU = [
  {
    id: "combos",
    name: "EL COMBO IDEAL",
    items: [
      {
        id: "combo-cafe-budin",
        name: "Café + budín cítrico",
        description: "Café americano con budín cítrico glaseado.",
        basePrice: 490,
      },
      {
        id: "combo-perfecto",
        name: "Combo perfecto",
        description:
          "Dos bebidas a elección más dos rebanadas de carrot cake.",
        basePrice: 690,
        combo: {
          drinks: 2,
        },
      },
      {
        id: "combo-cafe-croissant",
        name: "Café más croissant",
        description: "Bebida a elección + croissant clásico.",
        basePrice: 390,
        combo: {
          drinks: 1,
        },
      },
      {
        id: "combo-pollo-bebida",
        name: "Sándwich de pollo + bebida",
        description:
          "Sándwich de pollo en pan focaccia, pollo, cebolla, zanahoria, cilantro y alioli, con bebida a elección.",
        basePrice: 550,
        combo: {
          drinks: 1,
        },
      },
      {
        id: "combo-2-sandwich",
        name: "2 sándwiches con bebida",
        description:
          "Dos sándwiches a elección con bebida para compartir.",
        basePrice: 1300,
        combo: {
          sandwiches: 2,
          drinks: 1,
        },
      },
    ],
  },

  {
    id: "cafeteria",
    name: "CAFETERÍA ILLY",
    items: [
      {
        id: "espresso",
        name: "Espresso",
        description: "Café espresso illy.",
        basePrice: 130,
      },
      {
        id: "americano",
        name: "Americano",
        description:
          "Intenso espresso doble illy rebajado con agua caliente para lograr un sabor suave y equilibrado.",
        basePrice: 150,
      },
      {
        id: "cortado",
        name: "Cortado",
        description: "Espresso illy con un toque de leche.",
        basePrice: 180,
      },
      {
        id: "capuccino",
        name: "Capuccino",
        description: "Café illy con leche vaporizada cremosa.",
        basePrice: 190,
      },
      {
        id: "chocochino",
        name: "Chocochino",
        description:
          "Bebida caliente a base de chocolate, leche cremosa y cacao.",
        basePrice: 210,
      },
      {
        id: "te",
        name: "Té",
        description: "Variedad de té a elección.",
        basePrice: 140,
      },
      {
        id: "te-leche",
        name: "Té con leche",
        description: "Té caliente con leche.",
        basePrice: 140,
      },
      {
        id: "te-frappe",
        name: "Té frappé",
        description: "Té helado.",
        basePrice: 140,
      },
    ],
  },

  {
    id: "sandwiches",
    name: "SÁNDWICHES",
    items: [
      {
        id: "bauru",
        name: "Baurú frontera Brasil",
        description:
          "Pan tortuga, salsa de la casa, lechuga, tomate, carne, jamón, queso, huevo frito, arveja y choclo.",
        basePrice: 560,
      },
      {
        id: "stagliata-bola",
        name: "Stagliata de bola italiana",
        description:
          "Focaccia, pesto de perejil y maní, stracciatella, muzza fresca y mortadela de bola.",
        basePrice: 469,
      },
      {
        id: "stagliata-french-beef",
        name: "Stagliata french beef",
        description:
          "Stagliata crocante, roast beef, pepinillos, mostaza, huevo duro y tomate.",
        basePrice: 480,
      },
      {
        id: "stagliata-pollo",
        name: "Stagliata pollo peruano",
        description:
          "Focaccia, pollo sous vide, alioli, cebolla colorada, cilantro y zanahoria.",
        basePrice: 420,
      },
      {
        id: "veggie-grecia",
        name: "Veggie Grecia",
        description: "Stagliata, fainá, rúcula, tomate y hummus.",
        basePrice: 380,
      },
      {
        id: "chivito",
        name: "Chivito uruguayo",
        description:
          "Pan catalán, mayonesa, lechuga, tomate, carne, jamón, queso, panceta, huevo frito y aceituna.",
        basePrice: 490,
      },
      {
        id: "cochinita",
        name: "Cochinita pibil de México DF",
        description:
          "Catalán, cerdo braseado, cebolla caramelizada, queso fundido, tomate fresco, alioli y sweet chilli.",
        basePrice: 420,
      },
      {
        id: "barros-luco",
        name: "Barros Luco Chile weón",
        description:
          "Catalán, alioli, churrasco de carne, queso fundido y palta fresca.",
        basePrice: 420,
      },
      {
        id: "especial-gales",
        name: "Especial galés",
        description:
          "Pan de campo tostado, mezcla de quesos colby, saint paulin, gloucester y requesón, gratinado con tomillo.",
        basePrice: 680,
      },
      {
        id: "campo-suizo",
        name: "Campo suizo jamón y queso",
        description: "Jamón y queso.",
        basePrice: 320,
      },
      {
        id: "olimpico-argentino",
        name: "Olímpico argentino",
        description:
          "Mayonesa, lechuga, tomate, jamón, queso y huevo duro.",
        basePrice: 360,
      },
      {
        id: "veggie-frances",
        name: "Edición especial veggie francés",
        description:
          "Pan de campo tostado, brie cremoso, peras asadas, calabaza caramelizada, tomate fresco, lechuga y mostaza antigua.",
        basePrice: 680,
      },
      {
        id: "refuerzo-bola",
        name: "Refuerzo bola italiano mortadela",
        description:
          "Focaccia, pesto de perejil y maní, stracciatella, muzza fresca y mortadela de bola.",
        basePrice: 450,
      },
    ],
  },

  {
    id: "salado",
    name: "SALADO",
    items: [
      {
        id: "croissant",
        name: "Croissant clásico",
        description: "Croissant clásico hojaldrado.",
        basePrice: 290,
      },
      {
        id: "croissant-jyq",
        name: "Croissant de jamón y queso",
        description: "Croissant hojaldrado relleno de jamón y queso.",
        basePrice: 380,
      },
      {
        id: "toston-huevos",
        name: "Tostón con huevos",
        description: "Tostón de pan de campo con 3 huevos revueltos.",
        basePrice: 180,
      },
      {
        id: "toston-avocado",
        name: "Tostón avocado",
        description: "Tostón con huevos revueltos y palta fresca.",
        basePrice: 220,
      },
      {
        id: "toston-americano",
        name: "Tostón americano",
        description:
          "Tostón de masa madre con huevos revueltos y panceta planchada.",
        basePrice: 220,
      },
      {
        id: "sandwich-prensado",
        name: "Sándwich prensado",
        description:
          "Sándwich de jamón y queso en pan de campo de masa madre.",
        basePrice: 320,
      },
      {
        id: "sandwich-olimpico",
        name: "Sándwich olímpico",
        description: "Sándwich olímpico en pan de campo tostado.",
        basePrice: 380,
      },
      {
        id: "sandwich-pollo",
        name: "Sándwich de pollo",
        description:
          "Pollo desmenuzado en pan focaccia, cebolla colorada, zanahoria, alioli y cilantro.",
        basePrice: 420,
      },
      {
        id: "dos-croissant",
        name: "Dos croissants",
        description: "Dos croissants clásicos.",
        basePrice: 500,
      },
    ],
  },

  {
    id: "acompanamientos",
    name: "ACOMPAÑAMIENTOS",
    items: [
      {
        id: "papas",
        name: "Papas steak",
        description: "Porción de papas.",
        basePrice: 250,
      },
      {
        id: "boniatos",
        name: "Boniatos crunch",
        description: "Porción de boniatos fritos.",
        basePrice: 280,
      },
      {
        id: "aros-cebolla",
        name: "Aros de cebolla",
        description: "Porción de aros de cebolla.",
        basePrice: 280,
      },
      {
        id: "coleslaw",
        name: "Ensalada coleslaw",
        description: "Porción de ensalada coleslaw.",
        basePrice: 250,
      },
    ],
  },

  {
    id: "dulces",
    name: "DULCES",
    items: [
      {
        id: "carrot-cake",
        name: "Carrot cake",
        description:
          "Dos rebanadas de carrot cake con nueces y frosting de queso.",
        basePrice: 280,
      },
      {
        id: "budin",
        name: "Budín casero con glaseado",
        description: "Generosa rebanada de budín casero con glasé.",
        basePrice: 250,
      },
      {
        id: "roll-canela",
        name: "Roll de canela",
        description: "Roll artesanal de canela con frosting de queso.",
        basePrice: 190,
      },
      {
        id: "cheesecake",
        name: "Cheesecake horneado",
        description:
          "Cheesecake horneado a baja temperatura con salsa de frutos rojos.",
        basePrice: 220,
      },
      {
        id: "brownie",
        name: "Brownie",
        description: "Brownie húmedo de chocolate con nueces.",
        basePrice: 190,
      },
      {
        id: "alto-alfajor",
        name: "Alto alfajor",
        description:
          "Alfajor relleno de dulce de leche, galletas de cacao y suave toque de naranja.",
        basePrice: 250,
      },
    ],
  },

  {
    id: "panes",
    name: "NUESTROS PANES",
    items: [
      {
        id: "alto-campo",
        name: "Alto campo",
        description:
          "Hogaza de campo de masa madre, fermentada 48 hs, mezcla de harinas de trigo e integral.",
        basePrice: 490,
      },
      {
        id: "focaccia",
        name: "Focaccia",
        description: "Focaccia de fermentación 48 hs de 20 × 30 cm.",
        basePrice: 490,
      },
      {
        id: "tortuga-brioche",
        name: "Tortuga de brioche",
        description: "Tortuga en masa de brioche de 10 cm de diámetro.",
        basePrice: 50,
      },
    ],
  },

  {
    id: "bebidas",
    name: "BEBIDAS",
    items: [
      {
        id: "limonada",
        name: "Limonada",
        description: "Limonada natural refrescante.",
        basePrice: 140,
      },
      {
        id: "limonada-hibiscus",
        name: "Limonada de hibiscus",
        description: "Bebida refrescante de hibiscus.",
        basePrice: 140,
      },
      {
        id: "jugo-naranja",
        name: "Jugo de naranja",
        description: "Jugo natural de naranja recién exprimido.",
        basePrice: 160,
      },
      {
        id: "coca-zero",
        name: "Coca-Cola Zero 600 ml",
        description: "Coca-Cola Zero.",
        basePrice: 160,
      },
      {
        id: "coca",
        name: "Coca-Cola 600 ml",
        description: "Coca-Cola Original.",
        basePrice: 160,
      },
      {
        id: "sprite-zero",
        name: "Sprite Zero 600 ml",
        description: "",
        basePrice: 160,
      },
      {
        id: "schweppes",
        name: "Schweppes Pomelo 500 ml",
        description: "Pomelo clásico.",
        basePrice: 160,
      },
      {
        id: "schweppes-zero",
        name: "Schweppes Pomelo Zero 500 ml",
        description: "Pomelo Zero.",
        basePrice: 160,
      },
      {
        id: "agua-gas",
        name: "Agua Vitale con gas 500 ml",
        description: "",
        basePrice: 140,
      },
      {
        id: "agua-sin-gas",
        name: "Agua Vitale sin gas 500 ml",
        description: "",
        basePrice: 140,
      },
      {
        id: "kombucha",
        name: "Kombucha natural",
        description: "Kombucha natural de té negro 500 ml.",
        basePrice: 140,
      },
      {
        id: "mahou",
        name: "Cerveza Mahou 330 ml",
        description: "Cerveza española Mahou.",
        basePrice: 180,
      },
      {
        id: "mahou-zero",
        name: "Cerveza Mahou 0,0",
        description: "Cerveza española Mahou sin alcohol 330 ml.",
        basePrice: 180,
      },
    ],
  },
];

// Agrega automáticamente el precio con 15% OFF.
const CATALOG = MENU.map((category) => ({
  ...category,
  items: category.items.map((item) => ({
    ...item,
    price: discount15(item.basePrice),
  })),
}));

const ALL_ITEMS = CATALOG.flatMap((category) => category.items);

const categoryById = (id) => CATALOG.find((category) => category.id === id);

const pickItems = (categoryId, ids) => {
  const category = categoryById(categoryId);
  return (category?.items || []).filter((item) => ids.includes(item.id));
};

const SANDWICH_TAB = [
  { id: "sandwich-combos", name: "COMBOS", items: pickItems("combos", ["combo-pollo-bebida", "combo-2-sandwich"]) },
  categoryById("sandwiches"),
  { id: "otros-sandwiches", name: "OTROS SÁNDWICHES", items: pickItems("salado", ["sandwich-prensado", "sandwich-olimpico", "sandwich-pollo"]) },
  categoryById("acompanamientos"),
  categoryById("panes"),
  categoryById("bebidas"),
].filter(Boolean);

const CAFE_TAB = [
  { id: "cafe-combos", name: "COMBOS DE CAFÉ", items: pickItems("combos", ["combo-cafe-budin", "combo-perfecto", "combo-cafe-croissant"]) },
  categoryById("cafeteria"),
  { id: "cafe-salado", name: "SALADO", items: pickItems("salado", ["croissant", "croissant-jyq", "toston-huevos", "toston-avocado", "toston-americano", "dos-croissant"]) },
  categoryById("dulces"),
  categoryById("bebidas"),
].filter(Boolean);

const DRINK_OPTIONS = ALL_ITEMS.filter((item) =>
  [
    "espresso",
    "americano",
    "cortado",
    "capuccino",
    "chocochino",
    "te",
    "te-leche",
    "te-frappe",
    "limonada",
    "limonada-hibiscus",
    "jugo-naranja",
    "coca-zero",
    "coca",
    "sprite-zero",
    "schweppes",
    "schweppes-zero",
    "agua-gas",
    "agua-sin-gas",
    "kombucha",
  ].includes(item.id)
);

const SANDWICH_OPTIONS = ALL_ITEMS.filter((item) =>
  [
    "bauru",
    "stagliata-bola",
    "stagliata-french-beef",
    "stagliata-pollo",
    "veggie-grecia",
    "chivito",
    "cochinita",
    "barros-luco",
    "especial-gales",
    "campo-suizo",
    "olimpico-argentino",
    "veggie-frances",
    "refuerzo-bola",
    "sandwich-prensado",
    "sandwich-olimpico",
    "sandwich-pollo",
  ].includes(item.id)
);

// ======================================================
// CARRITO
// ======================================================

function reducer(state, action) {
  const next = { ...state };

  if (action.type === "add") {
    const id = action.item.id;

    next[id] = {
      item: action.item,
      qty: (state[id]?.qty || 0) + 1,
    };
  }

  if (action.type === "remove") {
    const id = action.item.id;
    const qty = (state[id]?.qty || 0) - 1;

    if (qty > 0) {
      next[id] = {
        item: action.item,
        qty,
      };
    } else {
      delete next[id];
    }
  }

  if (action.type === "clear") {
    return {};
  }

  return next;
}

// ======================================================
// WHATSAPP
// ======================================================

function buildWhatsAppText(order) {
  const lines = order.items.map(
    ({ item, qty }) =>
      `• ${item.name} x${qty} — ${currency(item.price * qty)}`
  );

  const comboLines = (order.comboSelections || []).flatMap((combo) => {
    const details = [];

    if (combo.sandwiches?.length) {
      details.push(`Sándwiches: ${combo.sandwiches.join(" / ")}`);
    }

    if (combo.drinks?.length) {
      details.push(`Bebidas: ${combo.drinks.join(" / ")}`);
    }

    return details.length
      ? [`  ↳ ${combo.comboName}: ${details.join(" · ")}`]
      : [];
  });

  return [
    "Pedido ALTO TALLER",
    "",
    ...lines,
    ...comboLines,
    "",
    `Subtotal: ${currency(order.subtotal)}`,
    order.method === "delivery" ? `Envío: ${currency(order.fee)}` : null,
    `Total: ${currency(order.total)}`,
    "",
    `Nombre: ${order.name}`,
    `Teléfono: ${order.phone}`,
    order.method === "delivery" ? `Zona: ${order.zoneName}` : null,
    order.method === "delivery"
      ? `Dirección: ${order.address}`
      : "Retiro en el local",
    order.notes ? `Notas: ${order.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

// ======================================================
// COMPONENTE
// ======================================================

export default function AltoTallerPedidos() {
  const [cart, dispatch] = useReducer(reducer, {});
  const [activeTab, setActiveTab] = useState("sandwiches");
  const [method, setMethod] = useState("pickup");
  const [zone, setZone] = useState(ZONES[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [comboSelections, setComboSelections] = useState({});
  const [sending, setSending] = useState(false);
  const cartRef = useRef(null);
  const [cartPeek, setCartPeek] = useState(false);
  const showCartPeek = () => setCartPeek(true);

  const items = useMemo(() => Object.values(cart), [cart]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, { item, qty }) => total + item.price * qty,
        0
      ),
    [items]
  );

  const deliveryFee =
    method === "delivery"
      ? ZONES.find((item) => item.id === zone)?.fee || 0
      : 0;

  const total = subtotal + deliveryFee;

  const visibleCategories = activeTab === "sandwiches" ? SANDWICH_TAB : CAFE_TAB;

  const comboInstances = useMemo(() => {
    const result = [];

    items.forEach(({ item, qty }) => {
      if (!item.combo) return;

      for (let i = 0; i < qty; i += 1) {
        result.push({
          item,
          config: item.combo,
          key: `${item.id}-${i}`,
          index: i,
        });
      }
    });

    return result;
  }, [items]);

  function changeCombo(key, type, index, value) {
    setComboSelections((prev) => {
      const current = prev[key] || {
        drinks: [],
        sandwiches: [],
      };

      const values = [...(current[type] || [])];
      values[index] = value;

      return {
        ...prev,
        [key]: {
          ...current,
          [type]: values,
        },
      };
    });
  }

  const combosComplete = comboInstances.every(({ key, config }) => {
    const selection = comboSelections[key] || {};

    const drinksOK =
      !config.drinks ||
      (selection.drinks || []).filter(Boolean).length === config.drinks;

    const sandwichesOK =
      !config.sandwiches ||
      (selection.sandwiches || []).filter(Boolean).length ===
        config.sandwiches;

    return drinksOK && sandwichesOK;
  });

  const canSend =
    FORCE_OPEN &&
    subtotal > 0 &&
    name.trim() &&
    phone.trim() &&
    combosComplete &&
    (method === "pickup" || address.trim());

  const orderComboSelections = comboInstances.map(({ item, key }) => {
    const selection = comboSelections[key] || {};

    return {
      comboId: item.id,
      comboName: item.name,

      drinks: (selection.drinks || []).map(
        (id) => ALL_ITEMS.find((x) => x.id === id)?.name || id
      ),

      sandwiches: (selection.sandwiches || []).map(
        (id) => ALL_ITEMS.find((x) => x.id === id)?.name || id
      ),
    };
  });

  async function sendOrder() {
    if (!canSend || sending) {
      alert(
        "Completá el pedido, tus datos y las opciones de los combos."
      );
      return;
    }

    const order = {
      items,
      subtotal,
      total,
      fee: deliveryFee,
      method,
      zone,
      zoneName: ZONES.find((item) => item.id === zone)?.name || "",
      name,
      phone,
      address,
      notes,
      comboSelections: orderComboSelections,
      paid: false,
      createdAt: Date.now(),
      source: "web",
    };

    try {
      setSending(true);

      const response = await fetch(ORDERS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "new_order",
          order,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.ok === false) {
        throw new Error(
          data?.error || "No se pudo registrar el pedido."
        );
      }

      if (PHONE_URUGUAY) {
        const text = encodeURIComponent(buildWhatsAppText(order));

        // 099079595 -> 99079595
        // wa.me recibe 598 + número sin el 0 inicial.
        const digits = PHONE_URUGUAY
          .replace(/\D/g, "")
          .replace(/^0/, "");

        window.location.href = `https://wa.me/598${digits}?text=${text}`;
      } else {
        alert("Pedido registrado correctamente.");
      }
    } catch (error) {
      console.error(error);

      alert(
        "No se pudo registrar el pedido. Probá nuevamente."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-black/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-black">
              <img
                src="/alto-logo.jpg"
                alt="Alto Taller"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-neutral-400">
              Café · Panadería · Sándwiches
            </p>
          </div>

          <div className="text-xs font-medium rounded-full bg-white text-black px-3 py-2">
            15% OFF WEB
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-2">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Pedí directo a Alto
        </h2>

        <p className="text-neutral-400 mt-2">
          Toda la carta con 15% de descuento.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-5">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-neutral-800 bg-neutral-950 p-1">
          <button type="button" onClick={() => setActiveTab("sandwiches")} className={`rounded-xl py-3 text-sm font-medium transition ${activeTab === "sandwiches" ? "bg-white text-black" : "text-neutral-400"}`}>SÁNDWICHES</button>
          <button type="button" onClick={() => setActiveTab("cafe")} className={`rounded-xl py-3 text-sm font-medium transition ${activeTab === "cafe" ? "bg-white text-black" : "text-neutral-400"}`}>CAFÉ</button>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MENÚ */}
        <section className="lg:col-span-2 space-y-10">
          {visibleCategories.map((category) => (
            <section key={category.id}>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xs tracking-[0.2em] text-neutral-400 whitespace-nowrap">
                  {category.name}
                </h2>

                <div className="h-px bg-neutral-800 flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <article
                    key={item.id}
                    className="border border-neutral-800 rounded-2xl p-4 bg-neutral-950 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-medium leading-tight">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-end justify-between mt-5 gap-4">
                      <div>
                        <div className="text-xs text-neutral-400 line-through">
                          {currency(item.basePrice)}
                        </div>

                        <div className="font-semibold">
                          {currency(item.price)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: "remove",
                              item,
                            })
                          }
                          className="w-9 h-9 border border-neutral-700 rounded-xl text-neutral-300"
                        >
                          −
                        </button>

                        <span className="w-5 text-center text-sm">
                          {cart[item.id]?.qty || 0}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            dispatch({ type: "add", item });
                            showCartPeek();
                          }}
                          className="w-9 h-9 bg-white text-black rounded-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </section>

        {/* CARRITO */}
        <aside>
          <div ref={cartRef} className="lg:sticky lg:top-24 border border-neutral-800 bg-neutral-950 rounded-2xl p-4">
            <h2 className="text-xs tracking-[0.2em] text-neutral-500 mb-4">
              TU PEDIDO
            </h2>

            {items.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Agregá productos de la carta.
              </p>
            ) : (
              <div className="space-y-3">
                {items.map(({ item, qty }) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <div>
                      <div>{item.name}</div>
                      <div className="text-neutral-400">x{qty}</div>
                    </div>

                    <div className="whitespace-nowrap">
                      {currency(item.price * qty)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* OPCIONES DE COMBOS */}
            {comboInstances.length > 0 && (
              <div className="border-t border-neutral-800 mt-5 pt-5 space-y-4">
                <div>
                  <h3 className="text-xs tracking-[0.16em] text-neutral-500">
                    COMPLETÁ TUS COMBOS
                  </h3>
                </div>

                {comboInstances.map(
                  ({ item, config, key, index }) => {
                    const selection = comboSelections[key] || {};

                    return (
                      <div
                        key={key}
                        className="border border-neutral-200 rounded-xl p-3 space-y-2"
                      >
                        <div className="text-sm font-medium">
                          {item.name}
                          {(cart[item.id]?.qty || 0) > 1
                            ? ` #${index + 1}`
                            : ""}
                        </div>

                        {Array.from({
                          length: config.sandwiches || 0,
                        }).map((_, i) => (
                          <select
                            key={`sandwich-${i}`}
                            value={selection.sandwiches?.[i] || ""}
                            onChange={(e) =>
                              changeCombo(
                                key,
                                "sandwiches",
                                i,
                                e.target.value
                              )
                            }
                            className="w-full border border-neutral-700 rounded-xl p-2 bg-neutral-900 text-white text-sm"
                          >
                            <option value="">
                              Elegí sándwich {i + 1}
                            </option>

                            {SANDWICH_OPTIONS.map((option) => (
                              <option
                                key={option.id}
                                value={option.id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </select>
                        ))}

                        {Array.from({
                          length: config.drinks || 0,
                        }).map((_, i) => (
                          <select
                            key={`drink-${i}`}
                            value={selection.drinks?.[i] || ""}
                            onChange={(e) =>
                              changeCombo(
                                key,
                                "drinks",
                                i,
                                e.target.value
                              )
                            }
                            className="w-full border border-neutral-700 rounded-xl p-2 bg-neutral-900 text-white text-sm"
                          >
                            <option value="">
                              Elegí bebida {i + 1}
                            </option>

                            {DRINK_OPTIONS.map((option) => (
                              <option
                                key={option.id}
                                value={option.id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    );
                  }
                )}
              </div>
            )}

            <hr className="my-5 border-neutral-800" />

            {/* RETIRO / DELIVERY */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod("pickup")}
                className={`rounded-xl p-2 border text-sm ${
                  method === "pickup"
                    ? "bg-white text-black border-white"
                    : "border-neutral-700 text-neutral-300"
                }`}
              >
                Retiro
              </button>

              <button
                type="button"
                onClick={() => setMethod("delivery")}
                className={`rounded-xl p-2 border text-sm ${
                  method === "delivery"
                    ? "bg-white text-black border-white"
                    : "border-neutral-700 text-neutral-300"
                }`}
              >
                Delivery
              </button>
            </div>

            {method === "delivery" && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-xs text-neutral-400">Zona de envío</label>
                  <select value={zone} onChange={(e) => setZone(e.target.value)} className="mt-1 w-full border border-neutral-700 bg-neutral-900 text-white rounded-xl p-2">
                    {ZONES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} · {item.fee === 0 ? "Envío gratis" : currency(item.fee)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-400">Dirección</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Calle, número, apto" className="mt-1 w-full border border-neutral-700 bg-neutral-900 text-white rounded-xl p-2 placeholder-neutral-500" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <label className="text-xs text-neutral-500">
                  Nombre
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="mt-1 w-full border border-neutral-700 bg-neutral-900 text-white rounded-xl p-2 placeholder-neutral-500"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-500">
                  Teléfono
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09..."
                  className="mt-1 w-full border border-neutral-700 bg-neutral-900 text-white rounded-xl p-2 placeholder-neutral-500"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs text-neutral-500">
                Notas
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Aclaraciones del pedido..."
                rows={2}
                className="mt-1 w-full border border-neutral-700 bg-neutral-900 text-white rounded-xl p-2 placeholder-neutral-500"
              />
            </div>

            <div className="border-t border-neutral-800 mt-5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-400">Subtotal</span><span>{currency(subtotal)}</span></div>
              {method === "delivery" && (
                <div className="flex justify-between"><span className="text-neutral-400">Envío</span><span>{deliveryFee === 0 ? "Gratis" : currency(deliveryFee)}</span></div>
              )}
              <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{currency(total)}</span></div>
            </div>

            <button
              type="button"
              disabled={!canSend || sending}
              onClick={sendOrder}
              className={`w-full rounded-2xl py-3 mt-5 ${
                canSend && !sending
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-500"
              }`}
            >
              {sending ? "Registrando..." : "Enviar pedido"}
            </button>

            <button
              type="button"
              onClick={() => {
                dispatch({ type: "clear" });
                setComboSelections({});
              }}
              className="w-full rounded-2xl py-2 mt-2 border border-neutral-700 text-sm text-neutral-300"
            >
              Vaciar carrito
            </button>
          </div>
        </aside>
      </main>

      {/* MINI CARRITO FLOTANTE — MISMO COMPORTAMIENTO QUE SECTO */}
      {items.length > 0 && (
        <div className={"fixed right-3 top-24 z-50 w-[340px] max-w-[90vw] rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl p-4 transition-transform duration-300 " + (cartPeek ? "translate-x-0" : "translate-x-[120%]")} style={{ WebkitTapHighlightColor: "transparent" }}>
          <div className="flex items-start justify-between gap-3">
            <div><div className="text-sm tracking-[0.2em] text-neutral-500">TU PEDIDO</div><div className="text-xs text-neutral-400 mt-1">Elegí si querés seguir agregando o completar los datos</div></div>
            <button type="button" onClick={() => setCartPeek(false)} className="text-sm border border-neutral-200 rounded-xl px-2 py-1 text-neutral-500">✕</button>
          </div>
          <div className="mt-3 max-h-[34vh] overflow-auto pr-1"><div className="space-y-2">
            {items.map(({ item, qty }) => (
              <div key={item.id} className="flex justify-between gap-3 text-sm"><div className="text-neutral-800 leading-tight"><div className="font-medium">{item.name}</div><div className="text-neutral-500">x{qty}</div></div><div className="text-neutral-700 whitespace-nowrap">{currency(item.price * qty)}</div></div>
            ))}
          </div></div>
          <div className="mt-3 pt-3 border-t border-neutral-200 text-sm space-y-3">
            <div className="flex justify-between"><span className="text-neutral-500">Total</span><span className="text-neutral-900 font-medium">{currency(total)}</span></div>
            <div className="grid grid-cols-1 gap-2">
              <button type="button" onClick={() => setCartPeek(false)} className="w-full rounded-2xl py-2 border border-neutral-200 text-sm">Seguir comprando</button>
              <button type="button" onClick={() => { setCartPeek(false); if (cartRef.current) cartRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="w-full rounded-2xl py-3 text-center bg-black text-white">Completar pedido</button>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && !cartPeek && (
        <button type="button" onClick={() => setCartPeek(true)} className="fixed right-3 top-24 z-40 rounded-2xl bg-white text-black px-4 py-3 shadow-2xl text-sm border border-neutral-200">
          Tu pedido · {currency(total)}
        </button>
      )}

      <footer className="max-w-6xl mx-auto px-4 pb-10">
        <hr className="border-neutral-800 mb-4" />

        <div className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Alto Taller
        </div>
      </footer>
    </div>
  );
}
