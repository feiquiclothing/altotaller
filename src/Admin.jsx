import React, { useEffect, useMemo, useState } from "react";

const ENDPOINT = "/api/alto";

const SOURCE_OPTIONS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "phone", label: "Teléfono" },
  { id: "local", label: "Mostrador" },
  { id: "other", label: "Otro" },
];

const METHOD_OPTIONS = [
  { id: "pickup", label: "Retiro" },
  { id: "delivery", label: "Delivery" },
];

const CATALOG = [
  {
    id: "combos",
    name: "COMBOS",
    items: [
      {
        id: "combo-cafe-budin",
        name: "Café + budín cítrico",
        price: 417,
      },
      {
        id: "combo-perfecto",
        name: "Combo perfecto",
        price: 587,
      },
      {
        id: "combo-cafe-croissant",
        name: "Café + croissant",
        price: 332,
      },
      {
        id: "combo-pollo-bebida",
        name: "Sándwich de pollo + bebida",
        price: 468,
      },
      {
        id: "combo-2-sandwich",
        name: "2 sándwiches con bebida",
        price: 1105,
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
        price: 476,
      },
      {
        id: "stagliata-bola",
        name: "Stagliata de bola italiana",
        price: 399,
      },
      {
        id: "stagliata-french",
        name: "Stagliata French Beef",
        price: 408,
      },
      {
        id: "stagliata-pollo",
        name: "Stagliata pollo peruano",
        price: 357,
      },
      {
        id: "veggie-grecia",
        name: "Veggie Grecia",
        price: 323,
      },
      {
        id: "chivito",
        name: "Chivito uruguayo",
        price: 417,
      },
      {
        id: "cochinita",
        name: "Cochinita pibil de México DF",
        price: 357,
      },
      {
        id: "barros-luco",
        name: "Barros Luco Chile Weon",
        price: 357,
      },
      {
        id: "especial-gales",
        name: "Especial galés",
        price: 578,
      },
      {
        id: "campo-suizo",
        name: "Campo suizo jamón y queso",
        price: 272,
      },
      {
        id: "olimpico",
        name: "Olímpico argentino",
        price: 306,
      },
      {
        id: "veggie-frances",
        name: "Edición especial veggie francés",
        price: 578,
      },
      {
        id: "refuerzo-bola",
        name: "Refuerzo bola italiano mortadela",
        price: 383,
      },
      {
        id: "sandwich-pollo",
        name: "Sándwich de pollo",
        price: 357,
      },
      {
        id: "sandwich-prensado",
        name: "Sándwich prensado",
        price: 272,
      },
      {
        id: "sandwich-olimpico",
        name: "Sándwich olímpico",
        price: 323,
      },
    ],
  },

  {
    id: "acompanamientos",
    name: "ACOMPAÑAMIENTOS",
    items: [
      {
        id: "papas-steak",
        name: "Papas steak",
        price: 213,
      },
      {
        id: "boniatos-crunch",
        name: "Boniatos crunch",
        price: 238,
      },
      {
        id: "aros-cebolla",
        name: "Aros de cebolla",
        price: 238,
      },
      {
        id: "coleslaw",
        name: "Ensalada coleslaw",
        price: 213,
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
        price: 111,
      },
      {
        id: "americano",
        name: "Americano",
        price: 128,
      },
      {
        id: "cortado",
        name: "Cortado",
        price: 153,
      },
      {
        id: "capuccino",
        name: "Capuccino",
        price: 162,
      },
      {
        id: "chocochino",
        name: "Chocochino",
        price: 179,
      },
      {
        id: "te",
        name: "Té",
        price: 119,
      },
      {
        id: "te-leche",
        name: "Té con leche",
        price: 119,
      },
      {
        id: "te-frappe",
        name: "Té frappe",
        price: 119,
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
        price: 247,
      },
      {
        id: "croissant-jyq",
        name: "Croissant de jamón y queso",
        price: 323,
      },
      {
        id: "toston-huevos",
        name: "Tostón con huevos",
        price: 153,
      },
      {
        id: "toston-avocado",
        name: "Tostón avocado",
        price: 187,
      },
      {
        id: "toston-americano",
        name: "Tostón americano",
        price: 187,
      },
      {
        id: "dos-croissant",
        name: "Dos croissant",
        price: 425,
      },
    ],
  },

  {
    id: "dulces",
    name: "DULCES",
    items: [
      {
        id: "carrot",
        name: "Carrot cake",
        price: 238,
      },
      {
        id: "budin",
        name: "Budín casero con glaseado",
        price: 213,
      },
      {
        id: "roll-canela",
        name: "Roll de canela",
        price: 162,
      },
      {
        id: "cheesecake",
        name: "Cheesecake horneado",
        price: 187,
      },
      {
        id: "brownie",
        name: "Brownie",
        price: 162,
      },
      {
        id: "alfajor",
        name: "Alto alfajor",
        price: 213,
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
        price: 417,
      },
      {
        id: "focaccia",
        name: "Focaccia",
        price: 417,
      },
      {
        id: "tortuga-brioche",
        name: "Tortuga de brioche",
        price: 43,
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
        price: 119,
      },
      {
        id: "limonada-hibiscus",
        name: "Limonada de hibiscus",
        price: 119,
      },
      {
        id: "jugo-naranja",
        name: "Jugo de naranja",
        price: 136,
      },
      {
        id: "coca-zero",
        name: "Coca-Cola Zero 600 ml",
        price: 136,
      },
      {
        id: "coca",
        name: "Coca-Cola 600 ml",
        price: 136,
      },
      {
        id: "sprite-zero",
        name: "Sprite Zero 600 ml",
        price: 136,
      },
      {
        id: "schweppes",
        name: "Schweppes Pomelo 500 ml",
        price: 136,
      },
      {
        id: "schweppes-zero",
        name: "Schweppes Pomelo Zero 500 ml",
        price: 136,
      },
      {
        id: "agua-gas",
        name: "Agua Vitale con gas 500 ml",
        price: 119,
      },
      {
        id: "agua-sin-gas",
        name: "Agua Vitale sin gas 500 ml",
        price: 119,
      },
      {
        id: "kombucha",
        name: "Kombucha natural",
        price: 119,
      },
      {
        id: "mahou",
        name: "Cerveza Mahou 330 ml",
        price: 153,
      },
      {
        id: "mahou-00",
        name: "Cerveza Mahou 0,0",
        price: 153,
      },
    ],
  },
];

const STORAGE_KEY = "alto_admin_recent_orders";

async function post(payload) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await res.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `Respuesta no JSON (HTTP ${res.status}): ${text.slice(0, 200)}`
    );
  }

  if (!res.ok) {
    throw new Error(
      data?.error ||
        `HTTP ${res.status}: ${text.slice(0, 200)}`
    );
  }

  if (data?.ok === false) {
    throw new Error(
      data?.error || "La API respondió con error"
    );
  }

  return data;
}

function formatMoney(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) return "-";

  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(value) {
  if (!value) return "-";

  const d = new Date(value);

  if (Number.isNaN(d.getTime())) {
    return String(value);
  }

  return d.toLocaleString("es-UY", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function safeLoadRecentOrders() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    const parsed =
      raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function OrderSummary({ order }) {
  if (!order) return null;

  const source =
    SOURCE_OPTIONS.find(
      (x) => x.id === order.source
    )?.label ||
    order.source ||
    "Sin origen";

  const method =
    METHOD_OPTIONS.find(
      (x) => x.id === order.method
    )?.label ||
    order.method ||
    "-";

  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        padding: 12,
        display: "grid",
        gap: 8,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 800,
            }}
          >
            {order.customer ||
              order.name ||
              "Sin nombre"}
          </div>

          <div
            style={{
              fontSize: 12,
              opacity: 0.65,
              marginTop: 2,
            }}
          >
            {source} · {method}
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontWeight: 800,
            }}
          >
            {order.total != null
              ? formatMoney(order.total)
              : "-"}
          </div>

          <div
            style={{
              fontSize: 12,
              opacity: 0.65,
              marginTop: 2,
            }}
          >
            {order.paid
              ? "PAGADO"
              : "A PAGAR"}
          </div>
        </div>
      </div>

      {order.rawText ? (
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontSize: 13,
            lineHeight: 1.45,
            background: "#f7f7f7",
            borderRadius: 8,
            padding: 10,
          }}
        >
          {order.rawText}
        </div>
      ) : null}

      <div
        style={{
          fontSize: 12,
          opacity: 0.65,
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 12px",
        }}
      >
        {order.id ? (
          <span>
            ID: {order.id}
          </span>
        ) : null}

        {order.time ? (
          <span>
            Hora: {order.time}
          </span>
        ) : null}

        {order.createdAt ? (
          <span>
            Creado:{" "}
            {formatDate(
              order.createdAt
            )}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function Admin() {
  const [source, setSource] =
    useState("whatsapp");

  const [method, setMethod] =
    useState("pickup");

  const [customer, setCustomer] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [paid, setPaid] =
    useState(false);

  const [time, setTime] =
    useState("ASAP");

  const [categoryId, setCategoryId] =
    useState(CATALOG[0].id);

  const [
    selectedItemId,
    setSelectedItemId,
  ] = useState(
    CATALOG[0].items[0].id
  );

  const [orderItems, setOrderItems] =
    useState([]);

  const [manualName, setManualName] =
    useState("");

  const [manualPrice, setManualPrice] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [statusType, setStatusType] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [checking, setChecking] =
    useState(false);

  const [nextOrder, setNextOrder] =
    useState(null);

  const [
    recentOrders,
    setRecentOrders,
  ] = useState(
    () => safeLoadRecentOrders()
  );

  const sourceLabel = useMemo(
    () =>
      SOURCE_OPTIONS.find(
        (x) => x.id === source
      )?.label || source,
    [source]
  );

  const selectedCategory =
    useMemo(
      () =>
        CATALOG.find(
          (cat) =>
            cat.id === categoryId
        ) || CATALOG[0],
      [categoryId]
    );

  const selectedCatalogItem =
    useMemo(
      () =>
        selectedCategory.items.find(
          (item) =>
            item.id ===
            selectedItemId
        ) ||
        selectedCategory.items[0],
      [
        selectedCategory,
        selectedItemId,
      ]
    );

  const total = useMemo(
    () =>
      orderItems.reduce(
        (sum, row) =>
          sum +
          Number(row.price || 0) *
            Number(row.qty || 0),
        0
      ),
    [orderItems]
  );

  const rawText = useMemo(() => {
    const lines =
      orderItems.map(
        (row) =>
          `• ${row.name} x${row.qty} — ${formatMoney(
            row.price * row.qty
          )}`
      );

    if (notes.trim()) {
      lines.push(
        "",
        `Notas: ${notes.trim()}`
      );
    }

    return lines.join("\n");
  }, [orderItems, notes]);

  const canSubmit =
    orderItems.length > 0 &&
    !sending;

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          recentOrders.slice(0, 20)
        )
      );
    } catch {}
  }, [recentOrders]);

  const setMessage = (
    message,
    type = ""
  ) => {
    setStatus(message);
    setStatusType(type);
  };

  const addItem = (item) => {
    if (!item) return;

    setOrderItems((prev) => {
      const found =
        prev.find(
          (row) =>
            row.id === item.id
        );

      if (found) {
        return prev.map(
          (row) =>
            row.id === item.id
              ? {
                  ...row,
                  qty:
                    row.qty + 1,
                }
              : row
        );
      }

      return [
        ...prev,
        {
          ...item,
          qty: 1,
        },
      ];
    });
  };

  const changeQty = (
    id,
    delta
  ) => {
    setOrderItems((prev) =>
      prev
        .map((row) =>
          row.id === id
            ? {
                ...row,
                qty: Math.max(
                  0,
                  row.qty +
                    delta
                ),
              }
            : row
        )
        .filter(
          (row) =>
            row.qty > 0
        )
    );
  };

  const removeItem = (id) => {
    setOrderItems((prev) =>
      prev.filter(
        (row) => row.id !== id
      )
    );
  };

  const addManualItem = () => {
    const price =
      Math.round(
        Number(manualPrice)
      );

    if (
      !manualName.trim() ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setMessage(
        "Completá nombre y precio válido del ítem manual.",
        "error"
      );

      return;
    }

    addItem({
      id: `manual-${Date.now()}`,
      name: manualName.trim(),
      price,
    });

    setManualName("");
    setManualPrice("");
    setMessage("");
  };

  const ping = async () => {
    setChecking(true);
    setMessage("Pingeando…");

    try {
      const r = await post({
        action: "ping",
      });

      setMessage(
        `PING OK\nbuildId: ${
          r?.buildId ||
          "(sin buildId)"
        }`,
        "success"
      );
    } catch (e) {
      setMessage(
        "PING ERROR: " +
          (e?.message ||
            String(e)),
        "error"
      );
    } finally {
      setChecking(false);
    }
  };

  const peekNext = async () => {
    setChecking(true);

    setMessage(
      "Buscando próximo pedido sin imprimir…"
    );

    try {
      const r = await post({
        action:
          "next_unprinted",
      });

      if (r?.order?.id) {
        setNextOrder(
          r.order
        );

        setMessage(
          `NEXT UNPRINTED OK\nid: ${
            r.order.id
          }\nbuildId: ${
            r?.buildId ||
            "(sin buildId)"
          }`,
          "success"
        );
      } else {
        setNextOrder(null);

        setMessage(
          `No hay pedidos pendientes de impresión.\nbuildId: ${
            r?.buildId ||
            "(sin buildId)"
          }`,
          "success"
        );
      }
    } catch (e) {
      setNextOrder(null);

      setMessage(
        "NEXT ERROR: " +
          (e?.message ||
            String(e)),
        "error"
      );
    } finally {
      setChecking(false);
    }
  };

  const submit = async () => {
    if (!canSubmit) {
      return;
    }

    setSending(true);

    setMessage(
      "Guardando pedido…"
    );

    const createdAt =
      Date.now();

    const order = {
      source,

      customer:
        customer.trim() ||
        sourceLabel,

      name:
        customer.trim() ||
        sourceLabel,

      rawText,

      subtotal: total,

      fee: 0,

      total,

      paid,

      method,

      time:
        time.trim() ||
        "ASAP",

      createdAt,

      manual: true,

      items:
        orderItems.map(
          (row) => ({
            item: {
              id: row.id,
              name: row.name,
              price: row.price,
            },
            qty: row.qty,
          })
        ),

      notes:
        notes.trim(),

      comboSelections: [],
    };

    try {
      const r = await post({
        action:
          "new_order",
        order,
      });

      const id =
        r?.id ||
        r?.orderId ||
        r?.order?.id ||
        "(sin id)";

      const savedOrder = {
        ...order,
        id,
        buildId:
          r?.buildId,
      };

      setRecentOrders(
        (prev) =>
          [
            savedOrder,
            ...prev,
          ].slice(0, 20)
      );

      setMessage(
        `PEDIDO CREADO\nid: ${id} | total: ${formatMoney(
          total
        )} | buildId: ${
          r?.buildId ||
          "(sin buildId)"
        }`,
        "success"
      );

      setCustomer("");
      setNotes("");
      setPaid(false);
      setTime("ASAP");
      setOrderItems([]);
    } catch (e) {
      setMessage(
        "ERROR: " +
          (e?.message ||
            String(e)),
        "error"
      );
    } finally {
      setSending(false);
    }
  };

  const clearForm = () => {
    setCustomer("");
    setNotes("");
    setPaid(false);
    setTime("ASAP");
    setOrderItems([]);
    setMessage("");
  };

  const clearHistory = () => {
    setRecentOrders([]);

    try {
      localStorage.removeItem(
        STORAGE_KEY
      );
    } catch {}
  };

  const copyOrder = async (
    order
  ) => {
    const text = [
      order.customer
        ? `Cliente: ${order.customer}`
        : null,

      order.rawText || null,

      order.total != null
        ? `Total: ${formatMoney(
            order.total
          )}`
        : null,

      order.paid
        ? "Pagado"
        : "A pagar",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(
        text
      );

      setMessage(
        "Pedido copiado al portapapeles.",
        "success"
      );
    } catch {
      setMessage(
        "No se pudo copiar automáticamente.",
        "error"
      );
    }
  };

  const fieldStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: 11,
    borderRadius: 10,
    border:
      "1px solid #ddd",
    background: "#fff",
    font: "inherit",
  };

  const buttonStyle = {
    padding: "11px 14px",
    borderRadius: 10,
    border:
      "1px solid #ddd",
    cursor: "pointer",
    background: "#fff",
    font: "inherit",
  };

  return (
    <div
      style={{
        padding: 16,
        fontFamily:
          "system-ui, sans-serif",
        maxWidth: 900,
        margin: "0 auto",
        color: "#1a1a1a",
      }}
    >
      <header>
        <h1
          style={{
            margin: 0,
          }}
        >
          ALTO TALLER — ADMIN
        </h1>

        <p
          style={{
            opacity: 0.65,
            margin:
              "6px 0 0",
          }}
        >
          Carga manual de
          pedidos.
        </p>
      </header>

      <main
        style={{
          display: "grid",
          gap: 20,
          marginTop: 20,
        }}
      >
        <section
          style={{
            border:
              "1px solid #e5e5e5",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              margin:
                "0 0 14px",
            }}
          >
            NUEVO PEDIDO
          </h2>

          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 10,
              }}
            >
              <label>
                <div
                  style={{
                    fontSize: 12,
                    opacity:
                      0.65,
                    marginBottom: 5,
                  }}
                >
                  Origen
                </div>

                <select
                  value={
                    source
                  }
                  onChange={(
                    e
                  ) =>
                    setSource(
                      e.target
                        .value
                    )
                  }
                  style={
                    fieldStyle
                  }
                >
                  {SOURCE_OPTIONS.map(
                    (option) => (
                      <option
                        key={
                          option.id
                        }
                        value={
                          option.id
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    )
                  )}
                </select>
              </label>

              <label>
                <div
                  style={{
                    fontSize: 12,
                    opacity:
                      0.65,
                    marginBottom: 5,
                  }}
                >
                  Entrega
                </div>

                <select
                  value={
                    method
                  }
                  onChange={(
                    e
                  ) =>
                    setMethod(
                      e.target
                        .value
                    )
                  }
                  style={
                    fieldStyle
                  }
                >
                  {METHOD_OPTIONS.map(
                    (option) => (
                      <option
                        key={
                          option.id
                        }
                        value={
                          option.id
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    )
                  )}
                </select>
              </label>

              <label>
                <div
                  style={{
                    fontSize: 12,
                    opacity:
                      0.65,
                    marginBottom: 5,
                  }}
                >
                  Horario
                </div>

                <input
                  value={time}
                  onChange={(
                    e
                  ) =>
                    setTime(
                      e.target
                        .value
                    )
                  }
                  placeholder="ASAP / 20:00"
                  style={
                    fieldStyle
                  }
                />
              </label>
            </div>

            <input
              placeholder="Cliente / nombre"
              value={
                customer
              }
              onChange={(e) =>
                setCustomer(
                  e.target.value
                )
              }
              style={fieldStyle}
            />

            <div
              style={{
                border:
                  "1px solid #e5e5e5",
                borderRadius: 12,
                padding: 12,
                display: "grid",
                gap: 10,
                background:
                  "#fafafa",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                }}
              >
                AGREGAR PRODUCTO
              </div>

              <label>
                <div
                  style={{
                    fontSize: 12,
                    opacity:
                      0.65,
                    marginBottom: 5,
                  }}
                >
                  Categoría
                </div>

                <select
                  value={
                    categoryId
                  }
                  onChange={(
                    e
                  ) => {
                    const next =
                      CATALOG.find(
                        (
                          cat
                        ) =>
                          cat.id ===
                          e
                            .target
                            .value
                      ) ||
                      CATALOG[0];

                    setCategoryId(
                      next.id
                    );

                    setSelectedItemId(
                      next
                        .items[0]
                        .id
                    );
                  }}
                  style={
                    fieldStyle
                  }
                >
                  {CATALOG.map(
                    (cat) => (
                      <option
                        key={
                          cat.id
                        }
                        value={
                          cat.id
                        }
                      >
                        {
                          cat.name
                        }
                      </option>
                    )
                  )}
                </select>
              </label>

              <label>
                <div
                  style={{
                    fontSize: 12,
                    opacity:
                      0.65,
                    marginBottom: 5,
                  }}
                >
                  Producto
                </div>

                <select
                  value={
                    selectedItemId
                  }
                  onChange={(
                    e
                  ) =>
                    setSelectedItemId(
                      e.target
                        .value
                    )
                  }
                  style={
                    fieldStyle
                  }
                >
                  {selectedCategory.items.map(
                    (item) => (
                      <option
                        key={
                          item.id
                        }
                        value={
                          item.id
                        }
                      >
                        {
                          item.name
                        }{" "}
                        —{" "}
                        {formatMoney(
                          item.price
                        )}
                      </option>
                    )
                  )}
                </select>
              </label>

              <button
                type="button"
                onClick={() =>
                  addItem(
                    selectedCatalogItem
                  )
                }
                style={{
                  ...buttonStyle,
                  background:
                    "#111",
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                + Agregar
              </button>

              <details>
                <summary>
                  Agregar ítem
                  manual
                </summary>

                <div
                  style={{
                    display:
                      "grid",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  <input
                    value={
                      manualName
                    }
                    onChange={(
                      e
                    ) =>
                      setManualName(
                        e
                          .target
                          .value
                      )
                    }
                    placeholder="Nombre"
                    style={
                      fieldStyle
                    }
                  />

                  <input
                    value={
                      manualPrice
                    }
                    onChange={(
                      e
                    ) =>
                      setManualPrice(
                        e
                          .target
                          .value
                      )
                    }
                    placeholder="Precio"
                    inputMode="numeric"
                    style={
                      fieldStyle
                    }
                  />

                  <button
                    type="button"
                    onClick={
                      addManualItem
                    }
                    style={
                      buttonStyle
                    }
                  >
                    Agregar
                  </button>
                </div>
              </details>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: 8,
                }}
              >
                <strong>
                  PEDIDO
                </strong>

                <strong>
                  {formatMoney(
                    total
                  )}
                </strong>
              </div>

              {orderItems.length ===
              0 ? (
                <div
                  style={{
                    padding: 18,
                    border:
                      "1px dashed #ddd",
                    borderRadius: 12,
                    textAlign:
                      "center",
                    opacity:
                      0.55,
                  }}
                >
                  Todavía no
                  agregaste
                  productos.
                </div>
              ) : (
                <div
                  style={{
                    display:
                      "grid",
                    gap: 8,
                  }}
                >
                  {orderItems.map(
                    (row) => (
                      <div
                        key={
                          row.id
                        }
                        style={{
                          border:
                            "1px solid #e5e5e5",
                          borderRadius: 10,
                          padding: 10,
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          gap: 10,
                        }}
                      >
                        <div>
                          <strong>
                            {
                              row.name
                            }
                          </strong>

                          <div
                            style={{
                              fontSize: 12,
                              opacity:
                                0.6,
                            }}
                          >
                            {formatMoney(
                              row.price
                            )}{" "}
                            c/u
                          </div>
                        </div>

                        <div
                          style={{
                            display:
                              "flex",
                            gap: 6,
                            alignItems:
                              "center",
                          }}
                        >
                          <button
                            onClick={() =>
                              changeQty(
                                row.id,
                                -1
                              )
                            }
                            style={
                              buttonStyle
                            }
                          >
                            −
                          </button>

                          <strong>
                            {
                              row.qty
                            }
                          </strong>

                          <button
                            onClick={() =>
                              changeQty(
                                row.id,
                                1
                              )
                            }
                            style={
                              buttonStyle
                            }
                          >
                            +
                          </button>

                          <button
                            onClick={() =>
                              removeItem(
                                row.id
                              )
                            }
                            style={
                              buttonStyle
                            }
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <textarea
              placeholder="Notas, cambios, detalle del combo, dirección, etc."
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              rows={4}
              style={{
                ...fieldStyle,
                resize:
                  "vertical",
              }}
            />

            <label
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <input
                type="checkbox"
                checked={paid}
                onChange={(e) =>
                  setPaid(
                    e.target
                      .checked
                  )
                }
              />

              Ya pagó
            </label>

            <button
              onClick={submit}
              disabled={
                !canSubmit
              }
              style={{
                ...buttonStyle,
                background:
                  canSubmit
                    ? "#111"
                    : "#eee",
                color:
                  canSubmit
                    ? "#fff"
                    : "#888",
                fontWeight: 800,
              }}
            >
              {sending
                ? "Creando pedido…"
                : `Crear pedido · ${formatMoney(
                    total
                  )}`}
            </button>

            <button
              onClick={
                clearForm
              }
              style={
                buttonStyle
              }
            >
              Limpiar
            </button>

            {status ? (
              <div
                style={{
                  padding: 11,
                  borderRadius: 10,
                  whiteSpace:
                    "pre-wrap",
                  background:
                    statusType ===
                    "error"
                      ? "#fff4f4"
                      : statusType ===
                        "success"
                      ? "#f5faf5"
                      : "#f7f7f7",
                }}
              >
                {status}
              </div>
            ) : null}
          </div>
        </section>

        {nextOrder ? (
          <section>
            <h2>
              PRÓXIMO SIN
              IMPRIMIR
            </h2>

            <OrderSummary
              order={
                nextOrder
              }
            />
          </section>
        ) : null}

        <section>
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
            }}
          >
            <h2>
              CREADOS DESDE
              ADMIN
            </h2>

            {recentOrders.length >
            0 ? (
              <button
                onClick={
                  clearHistory
                }
                style={
                  buttonStyle
                }
              >
                Limpiar
                historial
              </button>
            ) : null}
          </div>

          <div
            style={{
              display: "grid",
              gap: 10,
            }}
          >
            {recentOrders.map(
              (
                order,
                index
              ) => (
                <div
                  key={`${
                    order.id ||
                    "local"
                  }-${index}`}
                >
                  <OrderSummary
                    order={
                      order
                    }
                  />

                  <button
                    onClick={() =>
                      copyOrder(
                        order
                      )
                    }
                    style={{
                      ...buttonStyle,
                      marginTop: 5,
                    }}
                  >
                    Copiar pedido
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        <details
          style={{
            border:
              "1px solid #e5e5e5",
            padding: 12,
            borderRadius: 12,
          }}
        >
          <summary>
            DIAGNÓSTICO
          </summary>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={ping}
              disabled={
                checking
              }
              style={
                buttonStyle
              }
            >
              Ping / buildId
            </button>

            <button
              onClick={
                peekNext
              }
              disabled={
                checking
              }
              style={
                buttonStyle
              }
            >
              Ver próximo sin
              imprimir
            </button>
          </div>
        </details>
      </main>
    </div>
  );
}
