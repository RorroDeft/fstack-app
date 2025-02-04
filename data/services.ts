export const services = [
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
    recommendedFor: {
      brand: ["Mazda"],
      model: ["Mazda 3"],
      year: [2025],
    },
    base_price: 149000, // Precio por defecto
    adjusted_price: {
      Mazda: {
        "Mazda 3": {
          2025: 169000,
          2024: 159000,
        },
        default: 155000,
      },
      Toyota: {
        Corolla: {
          2025: 160000,
          2024: 150000,
        },
      },
      SUV: 165000, // Precio general para SUVs
    },
    video: "https://www.youtube.com/embed/HsiwVTwisYo",
  },

  {
    id: "tratamiento-ceramico",
    name: "Tratamiento Cerámico",
    description: "Protección para la pintura de tu auto.",
    category: "exterior",
    defaultGallery: [
      "/images/default/ceramic-1.jpg",
      "/images/default/ceramic-2.jpg",
    ],
    recommendedFor: {
      year: [2025],
      vehicleType: ["Sedan/Hatchback", "SUV"],
    },
    base_price: 290000, // Precio base estándar
    adjusted_price: {
      Mazda: {
        "Mazda 3": {
          2025: 310000,
          2024: 299000,
        },
        "CX-5": {
          2025: 349000,
        },
      },
      Toyota: {
        "Corolla Cross": {
          2025: 320000,
        },
      },
      Sedan: 270000, // Precio general para sedanes
      SUV: 350000, // Precio general para SUVs
    },
    video: "https://www.youtube.com/embed/ceramicVideo",
  },

  {
    id: "proteccion-pilares",
    name: "Protección de Pilares",
    description: "Evita daños en los pilares de tu auto.",
    category: "exterior",
    defaultGallery: [
      "/images/default/pilares-1.jpg",
      "/images/default/pilares-2.jpg",
    ],
    recommendedFor: {
      vehicleType: ["Sedan/Hatchback", "SUV"],
    },
    base_price: 50000,
    adjusted_price: {
      SUV: 55000,
    },
    video: "https://www.youtube.com/embed/pilaresVideo",
  },

  {
    id: "focos-ppf",
    name: "PPF para Focos",
    description: "Protección para los faros delanteros y traseros.",
    category: "exterior",
    defaultGallery: [
      "/images/default/focos-1.jpg",
      "/images/default/focos-2.jpg",
    ],
    specificGallery: {
      "mazda-3-2025": [
        "/images/mazda3-2025/focos-1.jpg",
        "/images/mazda3-2025/focos-2.jpg",
      ],
    },
    recommendedFor: {
      brand: ["Mazda"],
      year: [2025, 2024],
    },
    base_price: 89000,
    adjusted_price: {
      Mazda: {
        default: 99000,
      },
      SUV: 95000,
    },
    video: "https://www.youtube.com/embed/focosVideo",
  },
];
