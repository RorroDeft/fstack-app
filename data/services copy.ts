export const services = [
  // 🏆 Servicio Exclusivo por Marca y Modelo (Mazda 3 2025)
  {
    id: "kit-interior",
    name: "Kit Interior",
    description: "Protege el interior de tu auto con PPF.",
    category: "interior",
    defaultGallery: [
      "/images/default/interior-1.jpg",
      "/images/default/interior-2.jpg",
    ],
    specificGallery: {
      "mazda-3-2025": [
        "/images/mazda3-2025/interior-1.jpg",
        "/images/mazda3-2025/interior-2.jpg",
      ],
    },
    exclusiveCategory: ["mazda", "mazda-3-2025"],
    base_price: 149000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      Sedan: 149000,
      SUV: 165000,
      "SUV Grande": 185000,
    },
    video: "https://www.youtube.com/embed/HsiwVTwisYo",
  },

  // 🎯 Servicio Exclusivo para Autos 2025
  {
    id: "kit-proteccion-2025",
    name: "Kit Full Protección",
    description: "Protege tu auto desde el primer momento con cerámico + PPF.",
    category: "exclusive-2025",
    defaultGallery: [
      "/images/default/proteccion-1.jpg",
      "/images/default/proteccion-2.jpg",
    ],
    exclusiveCategory: ["exclusive-2025"],
    base_price: 399000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      Sedan: 379000,
      SUV: 449000,
      "SUV Grande": 499000,
    },
    video: "https://www.youtube.com/embed/proteccion2025",
  },

  // 🚗 Servicio General (Todos los autos)
  {
    id: "tratamiento-ceramico",
    name: "Tratamiento Cerámico",
    description: "Protección para la pintura de tu auto.",
    category: "recommended",
    defaultGallery: [
      "/images/default/ceramic-1.jpg",
      "/images/default/ceramic-2.jpg",
    ],
    exclusiveCategory: ["default"],
    base_price: 290000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      Sedan: 270000,
      SUV: 350000,
      "SUV Grande": 399000,
    },
    video: "https://www.youtube.com/embed/ceramicVideo",
  },

  // 🔹 Servicio para Alta Gama
  {
    id: "kit-ppf-fullfront",
    name: "Kit PPF Full Front",
    description: "Protección total para la parte delantera del auto.",
    category: "recommended",
    defaultGallery: [
      "/images/default/ppf-fullfront-1.jpg",
      "/images/default/ppf-fullfront-2.jpg",
    ],
    exclusiveCategory: ["alta-gama"],
    base_price: 790000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      "Coupe/Deportivo": 850000,
      "SUV Grande": 899000,
    },
    video: "https://www.youtube.com/embed/ppffullfront",
  },

  // 🏆 Servicio Exclusivo para Porsche Macan 2020
  {
    id: "proteccion-macan-2020",
    name: "Protección Exclusiva Macan",
    description: "Servicio de protección especial para Porsche Macan.",
    category: "recommended",
    defaultGallery: [
      "/images/default/macan-1.jpg",
      "/images/default/macan-2.jpg",
    ],
    exclusiveCategory: ["porsche", "porsche-macan-2020"],
    base_price: 499000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      "Coupe/Deportivo": 550000,
      SUV: 570000,
      "SUV Grande": 599000,
    },
    video: "https://www.youtube.com/embed/macanVideo",
  },

  // 🚙 Servicio para SUVs en General
  {
    id: "proteccion-suv",
    name: "Protección para SUVs",
    description: "Servicio recomendado para vehículos tipo SUV.",
    category: "recommended",
    defaultGallery: ["/images/default/suv-1.jpg", "/images/default/suv-2.jpg"],
    exclusiveCategory: ["default"],
    base_price: 320000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      SUV: 350000,
      "SUV Grande": 399000,
    },
    video: "https://www.youtube.com/embed/suvProtection",
  },  {
    id: "proteccion-suv",
    name: "Protección para SUVs",
    description: "Servicio recomendado para vehículos tipo SUV.",
    category: "interior",
    defaultGallery: ["/images/default/suv-1.jpg", "/images/default/suv-2.jpg"],
    exclusiveCategory: ["default"],
    base_price: 320000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      SUV: 350000,
      "SUV Grande": 399000,
    },
    video: "https://www.youtube.com/embed/suvProtection",
  }
];



export const services = [
  // 🏆 Servicio Exclusivo por Marca y Modelo (Mazda 3 2025)
  {
    id: "kit-interior",
    name: "Kit Interior",
    description: "Protege el interior de tu auto con PPF.",
    category: "interior",
    defaultGallery: [
      "/images/default/interior-1.jpg",
      "/images/default/interior-2.jpg",
    ],
    exclusiveCategory: ["default"],
    base_price: 149000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      "Sedan/Hatchback": 149000,
      SUV: 149000,
      "SUV Grande": 149000,
      "Coupé/Deportivo": 149000,
      "Pickup/XL": 149000,
    },
    video: "https://www.youtube.com/embed/HsiwVTwisYo",
  },
  {
    id: "exclusive-mazda",
    name: "Solo para Mazda",
    description: "Protege el interior de tu auto con PPF.",
    category: "interior",
    defaultGallery: [
      "/images/default/interior-1.jpg",
      "/images/default/interior-2.jpg",
    ],
    specificGallery: {
      "mazda-3-2025": [
        "/images/mazda3-2025/interior-1.jpg",
        "/images/mazda3-2025/interior-2.jpg",
      ],
    },
    exclusiveCategory: ["Mazda", "mazda"],
    base_price: 149000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      Sedan: 149000,
      SUV: 165000,
      "SUV Grande": 185000,
    },
    video: "https://www.youtube.com/embed/HsiwVTwisYo",
  },
  {
    id: "kit-exterior",
    name: "Kit exterior",
    description: "Protege el exterior de tu auto con PPF.",
    category: "exterior",
    defaultGallery: [
      "/images/default/interior-1.jpg",
      "/images/default/interior-2.jpg",
    ],
    specificGallery: {
      "mazda-3-2025": [
        "/images/mazda3-2025/interior-1.jpg",
        "/images/mazda3-2025/interior-2.jpg",
      ],
    },
    exclusiveCategory: ["default"],
    base_price: 149000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      Sedan: 149000,
      SUV: 165000,
      "SUV Grande": 185000,
    },
    video: "https://www.youtube.com/embed/HsiwVTwisYo",
  },

  // 🎯 Servicio Exclusivo para Autos 2025
  {
    id: "kit-proteccion-2025",
    name: "Kit Full Protección",
    description: "Protege tu auto desde el primer momento con cerámico + PPF.",
    category: "exclusive-2025",
    defaultGallery: [
      "/images/default/proteccion-1.jpg",
      "/images/default/proteccion-2.jpg",
    ],
    exclusiveCategory: ["exclusivo-2025"],
    base_price: 399000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      Sedan: 379000,
      SUV: 449000,
      "SUV Grande": 499000,
    },
    video: "https://www.youtube.com/embed/proteccion2025",
  },

  // 🚗 Servicio General (Todos los autos)
  {
    id: "tratamiento-ceramico",
    name: "Tratamiento Cerámico",
    description: "Protección para la pintura de tu auto.",
    category: "recommended",
    defaultGallery: [
      "/images/default/ceramic-1.jpg",
      "/images/default/ceramic-2.jpg",
    ],
    exclusiveCategory: ["default"],
    base_price: 290000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      Sedan: 270000,
      SUV: 350000,
      "SUV Grande": 399000,
    },
    video: "https://www.youtube.com/embed/ceramicVideo",
  },

  // 🔹 Servicio para Alta Gama
  {
    id: "kit-ppf-fullfront",
    name: "Kit PPF Full Front",
    description: "Protección total para la parte delantera del auto.",
    category: "recommended",
    defaultGallery: [
      "/images/default/ppf-fullfront-1.jpg",
      "/images/default/ppf-fullfront-2.jpg",
    ],
    exclusiveCategory: ["alta-gama"],
    base_price: 790000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      "Coupe/Deportivo": 850000,
      "SUV Grande": 899000,
    },
    video: "https://www.youtube.com/embed/ppffullfront",
  },

  // 🏆 Servicio Exclusivo para Porsche Macan 2020
  {
    id: "proteccion-macan-2020",
    name: "Protección Exclusiva Macan",
    description: "Servicio de protección especial para Porsche Macan.",
    category: "recommended",
    defaultGallery: [
      "/images/default/macan-1.jpg",
      "/images/default/macan-2.jpg",
    ],
    exclusiveCategory: ["porsche", "porsche-macan-2020"],
    base_price: 499000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      "Coupe/Deportivo": 550000,
      SUV: 570000,
      "SUV Grande": 599000,
    },
    video: "https://www.youtube.com/embed/macanVideo",
  },

  // 🚙 Servicio para SUVs en General
  {
    id: "proteccion-suv",
    name: "Protección para SUVs",
    description: "Servicio recomendado para vehículos tipo SUV.",
    category: "recommended",
    defaultGallery: ["/images/default/suv-1.jpg", "/images/default/suv-2.jpg"],
    exclusiveCategory: ["default"],
    base_price: 320000,
    adjusted_price: 0,
    quantity: 1,
    size_price: {
      SUV: 350000,
      "SUV Grande": 399000,
    },
    video: "https://www.youtube.com/embed/suvProtection",
  },
];