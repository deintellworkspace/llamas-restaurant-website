// Llamas Restaurant menu, transcribed from the five printed-menu photographs
// (IMG_8632–8636). Names, descriptions and prices follow the print. Spellings
// that look like print errors are kept as printed and listed in REVIEW_FLAGS.
// Prices are the photographed prices and still need owner confirmation.

export type Variant = { label: string; price: string };
export type MenuItem = {
  id: string;
  name: string;
  en?: string; // short English helper for Spanish names
  desc?: string;
  price?: string;
  variants?: Variant[];
};
export type MenuGroup = {
  id: string;
  title: string;
  intro?: string;
  items: MenuItem[];
  notes?: string[];
};
export type MenuCategory = { id: string; label: string; groups: MenuGroup[] };

export const MENU: MenuCategory[] = [
  {
    id: "peruvian",
    label: "Peruvian",
    groups: [
      {
        id: "peru-starters",
        title: "Starters",
        items: [
          {
            id: "yucas-fritas",
            name: "Yucas Fritas",
            en: "Fried yuca",
            desc: "Golden, crispy yuca fries with a side of creamy, mildly spicy huancaína sauce.",
            price: "9.99",
          },
          {
            id: "papa-a-la-huancaina",
            name: "Papa a la Huancaína",
            en: "Potatoes in ají amarillo cheese sauce",
            desc: "Soft sliced potatoes bathed in ají amarillo cream sauce made with Peruvian peppers and fresh cheese, finished with egg and olives.",
            price: "9.99",
          },
          {
            id: "ceviche-clasico",
            name: "Ceviche Clásico",
            en: "Classic lime-cured fish",
            desc: "Fresh, tender fish marinated in zesty lime juice.",
            price: "17.99",
          },
          {
            id: "ceviche-mixto",
            name: "Ceviche Mixto",
            en: "Mixed seafood ceviche",
            desc: "Shrimp, mussels, calamari and fish, marinated in fresh lime juice with a touch of spice.",
            price: "23.99",
          },
          {
            id: "fish-and-fries",
            name: "Fish & Fries",
            desc: "Crispy fried fish fillets with seasoned fries, tartar sauce and fresh lime wedges.",
            price: "12.99",
          },
          {
            id: "salchipollo",
            name: "Salchipollo",
            en: "Fries with sausage and fried chicken",
            desc: "Crispy French fries topped with sausage slices and a golden, deep-fried breaded chicken breast.",
            price: "9.99",
          },
        ],
      },
      {
        id: "peru-house",
        title: "House specialties",
        intro:
          "Tender meat stir-fried with onions, tomatoes and garlic, finished with soy sauce and vinegar. Served with rice and crispy fries.",
        items: [
          {
            id: "lomo-saltado",
            name: "Lomo Saltado",
            en: "Stir-fried steak",
            desc: "Steak.",
            price: "22.99",
          },
          {
            id: "pollo-saltado",
            name: "Pollo Saltado",
            en: "Stir-fried chicken",
            desc: "Chicken.",
            price: "17.99",
          },
          {
            id: "lomo-a-lo-pobre",
            name: "Lomo a lo Pobre",
            desc: "Lomo clásico with plantains and over-easy eggs.",
            price: "24.99",
          },
          {
            id: "lomo-mixto-especial",
            name: "Lomo Mixto Especial",
            desc: "Steak, shrimp and chicken.",
            price: "26.99",
          },
        ],
      },
      {
        id: "peru-criollos",
        title: "Platos criollos",
        items: [
          {
            id: "aji-de-gallina",
            name: "Ají de Gallina",
            en: "Creamy ají amarillo chicken",
            desc: "Shredded chicken breast simmered in a savory ají amarillo pepper sauce with milk and parmesan cheese, served with white rice.",
            price: "16.99",
          },
          {
            id: "seco-de-carne",
            name: "Seco de Carne",
            en: "Beef in cilantro sauce",
            desc: "Slow-cooked beef in a rich cilantro sauce, with Peruvian-style beans, rice and salsa criolla.",
            price: "22.99",
          },
          {
            id: "arroz-con-mariscos",
            name: "Arroz con Mariscos",
            en: "Seafood rice",
            desc: "Shrimp, mussels and calamari seasoned with Peruvian ají panca pepper and a touch of white wine, cooked with rice and garnished with green onions and peppers.",
            price: "22.99",
          },
          {
            id: "bisteck-a-lo-pobre",
            name: "Bisteck a lo Pobre",
            desc: "Grilled sirloin steak and plantain, served with French fries, rice and eggs any style.",
            price: "21.99",
          },
          {
            id: "parihuela",
            name: "Parihuela",
            en: "Seafood soup",
            desc: "Seafood soup with shrimp, mussels, calamari and fish, made with ají panca.",
            price: "21.99",
          },
          {
            id: "mojarra-fusion",
            name: "Mojarra Fusión",
            en: "Whole fried tilapia",
            desc: "Whole tilapia, deep-fried golden and crispy, with Peruvian cilantro rice, your choice of fries or yucas fritas, fresh salsa criolla and crunchy cancha corn.",
            price: "18.99",
          },
          {
            id: "milanesa-de-pollo",
            name: "Milanesa de Pollo",
            en: "Breaded chicken cutlet",
            desc: "Golden panko-breaded chicken with Peruvian white rice and crispy fries.",
            price: "16.99",
          },
        ],
      },
      {
        id: "peru-jalea",
        title: "Crispy seafood",
        intro: "Hand-breaded, deep-fried fish and seafood.",
        items: [
          {
            id: "jalea-mixta",
            name: "Jalea Mixta",
            en: "Fried mixed seafood",
            variants: [
              { label: "Personal", price: "21.99" },
              { label: "Familiar", price: "36.99" },
              { label: "6 servings", price: "58.99" },
            ],
          },
          {
            id: "jalea-de-pescado",
            name: "Jalea de Pescado",
            en: "Fried fish",
            variants: [
              { label: "Personal", price: "17.99" },
              { label: "Familiar", price: "29.99" },
              { label: "6 servings", price: "42.99" },
            ],
          },
        ],
      },
      {
        id: "peru-pastas",
        title: "Peruvian pastas",
        items: [
          {
            id: "tallarines-verdes",
            name: "Tallarines Verdes",
            en: "Green linguini",
            desc: "Peruvian-style linguini tossed in a creamy basil, spinach and garlic sauce, garnished with parmesan. Choose your protein.",
            variants: [
              { label: "Milanesa", price: "16.99" },
              { label: "Steak", price: "19.99" },
              { label: "Plain", price: "10.99" },
            ],
          },
          {
            id: "tallarin-saltado",
            name: "Tallarín Saltado",
            en: "Wok-fried linguini",
            desc: "Peruvian-style stir-fried linguini with onions, tomatoes, garlic and soy sauce.",
            variants: [
              { label: "Chicken", price: "16.99" },
              { label: "Steak", price: "19.99" },
              { label: "Seafood (de mariscos)", price: "22.99" },
            ],
          },
        ],
        notes: ["Tallarines a la Huancaína are also listed on the menu with the same options."],
      },
    ],
  },
  {
    id: "mexican",
    label: "Mexican",
    groups: [
      {
        id: "mex-starters",
        title: "Appetizers",
        items: [
          {
            id: "chicken-nachos",
            name: "Chicken Nachos",
            desc: "Beans, cheese, tomatoes, sour cream, mozzarella and cilantro.",
            price: "12.99",
          },
          {
            id: "guacamole-dip",
            name: "Guacamole Dip",
            desc: "Made fresh with ripe avocados, cilantro, salt and freshly squeezed lime juice. Served with crispy tortilla chips.",
            price: "8.99",
          },
          {
            id: "quesadilla",
            name: "Quesadilla",
            desc: "Flour tortilla filled with melted mozzarella and your choice of meat, grilled.",
            price: "12.99",
          },
          {
            id: "asada-fries",
            name: "Asada Fries",
            desc: "Beans, cheese, diced tomatoes, sour cream and cilantro.",
            price: "12.99",
          },
        ],
      },
      {
        id: "mex-tacos",
        title: "Tacos & more",
        intro: "Choose grilled chicken, carnitas or asada.",
        items: [
          {
            id: "street-tacos",
            name: "3 Street Tacos",
            desc: "Three street tacos with your choice of meat, onions, cilantro and salsa ($3.99 each).",
            price: "9.99",
          },
          {
            id: "taco-salad",
            name: "Taco Salad",
            desc: "Crispy flour tortilla with your choice of meat, rice, beans, lettuce, cheese, sour cream and avocado.",
            price: "12.99",
          },
          {
            id: "two-tacos-rice-beans",
            name: "2 Street Tacos, Rice & Beans",
            desc: "Two street tacos with your choice of meat, onions, cilantro and salsa.",
            price: "12.99",
          },
        ],
      },
      {
        id: "mex-birria",
        title: "Birria",
        intro: "Add rice & beans for $2.",
        items: [
          {
            id: "birria-street-tacos",
            name: "4 Birria Street Tacos",
            desc: "Consommé upon request.",
            price: "12.99",
          },
          {
            id: "quesabirrias",
            name: "3 Quesabirrias",
            desc: "Cheesy birria tacos. Consommé included.",
            price: "14.99",
          },
          {
            id: "birria-super-burrito",
            name: "Birria Super Burrito",
            desc: "Shredded birria (beef), rice, beans, cheese, sour cream, onions, cilantro and salsa.",
            price: "12.99",
          },
          {
            id: "birria-quesadilla",
            name: "Birria Quesadilla",
            desc: "Shredded birria (beef), cheese, sour cream and pico de gallo.",
            price: "12.99",
          },
        ],
      },
      {
        id: "mex-burritos",
        title: "Burritos",
        items: [
          {
            id: "wet-burrito",
            name: "Wet Burrito",
            en: "Red or green",
            desc: "Your choice of meat, rice, beans (whole or refried), pico de gallo, salsa, cheese and sour cream, topped with red or green sauce.",
            price: "14.99",
          },
          {
            id: "super-burrito",
            name: "Super Burrito",
            desc: "Your choice of meat, Spanish rice, Peruvian beans, pico de gallo, salsa, cheese and sour cream. Avocado +$1.50.",
            price: "13.99",
          },
          {
            id: "california-burrito",
            name: "California Burrito",
            desc: "Grilled steak, country potatoes, beans, pico de gallo and melted cheese.",
            price: "13.99",
          },
          {
            id: "chimichanga",
            name: "Chimichanga",
            desc: "Deep-fried burrito with your choice of meat, beans, rice, cheese, onions, cilantro, lettuce and tomatoes.",
            price: "13.99",
          },
        ],
      },
      {
        id: "mex-dinners",
        title: "Dinners",
        items: [
          {
            id: "fajitas",
            name: "Fajitas",
            desc: "A sizzling mix of grilled chicken, steak and shrimp, served with rice, beans, sour cream, guacamole, lettuce, tomatoes and warm tortillas.",
            variants: [
              { label: "Chicken", price: "17.99" },
              { label: "Steak", price: "19.99" },
              { label: "Mixed (chicken, steak & shrimp)", price: "21.99" },
            ],
          },
          {
            id: "carnitas-plate",
            name: "Carnitas Plate",
            desc: "Fresh carnitas with rice, beans, guacamole, cheese, sour cream, pico de gallo, grilled onions and tortillas.",
            price: "16.99",
          },
          {
            id: "chile-verde",
            name: "Chile Verde",
            desc: "Diced pork cooked in green tomatillo sauce, with rice, beans and your choice of warm tortillas.",
            price: "16.99",
          },
          {
            id: "carne-asada",
            name: "Carne Asada",
            desc: "Grilled steak with rice, beans, sour cream, guacamole, lettuce, pico de gallo and corn or flour tortillas.",
            price: "19.99",
          },
        ],
      },
      {
        id: "mex-combos",
        title: "Combo specials",
        items: [
          { id: "combo-1", name: "Combo #1", desc: "Choose 1 item and 2 sides.", price: "12.99" },
          { id: "combo-2", name: "Combo #2", desc: "Choose 2 items and 2 sides.", price: "16.99" },
        ],
        notes: [
          "Items: crispy taco, soft taco, enchilada, chile relleno, tamale, chimichanga, burrito, quesadilla, butter fish tacos.",
          "Protein: chicken, beef or carnitas.",
          "Sides: Mexican rice, refried beans, whole beans or salad.",
        ],
      },
    ],
  },
  {
    id: "sushi",
    label: "Sushi",
    groups: [
      {
        id: "sushi-special",
        title: "Special rolls",
        items: [
          {
            id: "sacramento-roll",
            name: "Sacramento Roll",
            desc: "Crab mix and avocado, topped with ebi shrimp and sauces.",
            price: "10.99",
          },
          {
            id: "snow-roll",
            name: "Snow Roll",
            desc: "Crab mix, shrimp tempura and cream cheese, topped with crab mix and sauces.",
            price: "13",
          },
          {
            id: "truxel-roll",
            name: "Truxel Roll",
            desc: "Crab mix, shrimp tempura, cucumber and avocado, topped with tempura crunch and sauces.",
            price: "12",
          },
          {
            id: "rainbow-roll",
            name: "Rainbow Roll",
            desc: "Crab mix and avocado, topped with tuna, salmon, hamachi and ebi shrimp.",
            price: "14.50",
          },
          {
            id: "spicy-dragon-roll",
            name: "Spicy Dragon Roll",
            desc: "Crab mix, shrimp tempura and cucumber, topped with spicy tuna, avocado, jalapeño, green onions and sauces.",
            price: "14.50",
          },
          {
            id: "salmon-fry-roll",
            name: "Salmon Fry Roll",
            desc: "Crab mix and avocado, topped with deep-fried salmon and sauces.",
            price: "10",
          },
          {
            id: "dragon-roll",
            name: "Dragon Roll",
            desc: "Crab mix, shrimp tempura and cucumber, topped with avocado.",
            price: "12",
          },
          {
            id: "jalisco-roll",
            name: "Jalisco Roll",
            desc: "Crab mix, tempura, avocado and cucumber, topped with tuna.",
            price: "14.50",
          },
          {
            id: "king-kong-roll",
            name: "King Kong Roll",
            desc: "Crab mix, shrimp tempura, avocado, cucumber, spicy tuna and cream cheese.",
            price: "14.50",
          },
          {
            id: "fireworks-roll",
            name: "Fireworks Roll",
            desc: "Crab mix, shrimp tempura, avocado and cream cheese, topped with spicy tuna and green onions. Torch roll.",
            price: "14.50",
          },
          {
            id: "lion-king-roll",
            name: "Lion King Roll",
            desc: "Crab and avocado, topped with salmon. Baked.",
            price: "13.99",
          },
          {
            id: "spicy-salmon-roll",
            name: "Spicy Salmon Roll",
            desc: "Tempura shrimp, cucumber and avocado, topped with salmon and jalapeños.",
            price: "13.99",
          },
          {
            id: "cherry-blason-roll",
            name: "Cherry Blason Roll",
            desc: "Crab mix, cucumber and avocado, topped with tuna and masago.",
            price: "12.99",
          },
          {
            id: "madison-roll",
            name: "Madison Roll",
            desc: "Crab mix, tempura shrimp and avocado, topped with maguro and salmon.",
            price: "13.99",
          },
          {
            id: "las-vegas-roll",
            name: "Las Vegas Roll",
            desc: "Spicy tuna, avocado and tempura shrimp, topped with albacore and fried onions. Torched.",
            price: "15.50",
          },
          {
            id: "inside-out-roll",
            name: "Inside Out Roll",
            desc: "Tempura shrimp, cucumber and avocado, topped with ebi shrimp.",
            price: "12.99",
          },
          {
            id: "caterpillar-roll",
            name: "Caterpillar Roll",
            desc: "Cucumber, crab mix and unagi (eel) inside, topped with avocado.",
            price: "13.99",
          },
          {
            id: "yummy-yummy-roll",
            name: "Yummy Yummy Roll",
            desc: "Cream cheese, avocado, shrimp tempura and crab mix.",
            price: "11.99",
          },
          {
            id: "unagi-roll",
            name: "Unagi Roll",
            desc: "Shrimp tempura, crab mix and cucumber inside, topped with eel.",
            price: "12.99",
          },
          {
            id: "spider-roll",
            name: "Spider Roll",
            desc: "Avocado, cucumber, crab mix and soft-shell crab inside.",
            price: "10.99",
          },
        ],
      },
      {
        id: "sushi-basic",
        title: "Basic rolls",
        items: [
          {
            id: "california-roll",
            name: "California Roll",
            desc: "Crab mix and avocado.",
            price: "7",
          },
          {
            id: "spicy-tuna-roll",
            name: "Spicy Tuna Roll",
            desc: "Spicy tuna and cucumber.",
            price: "7",
          },
          { id: "avo-cuc-roll", name: "Avo-Cuc Roll", desc: "Avocado and cucumber.", price: "7" },
          {
            id: "chicken-roll",
            name: "Chicken Roll",
            desc: "Fried chicken, cream cheese and avocado.",
            price: "9.99",
          },
          {
            id: "carnitas-roll",
            name: "Carnitas Roll",
            desc: "Carnitas, avocado and bell pepper.",
            price: "8.99",
          },
        ],
      },
      {
        id: "sushi-fried",
        title: "Deep-fried rolls",
        items: [
          {
            id: "california-df",
            name: "California Roll, deep fried",
            desc: "Crab mix and avocado, topped with special sauces.",
            price: "10",
          },
          {
            id: "spicy-tuna-df",
            name: "Spicy Tuna, deep fried",
            desc: "Spicy tuna, avocado and cream cheese, with sauces.",
            price: "10.99",
          },
          {
            id: "northgate-roll",
            name: "Northgate Roll",
            desc: "Crab mix, avocado, cream cheese and spicy tuna, topped with sauces.",
            price: "12",
          },
          {
            id: "julyhet-roll",
            name: "Julyhet Roll",
            desc: "Crab mix, shrimp tempura, avocado and cream cheese.",
            price: "12",
          },
        ],
      },
      {
        id: "sushi-nigiri",
        title: "Nigiri & sashimi",
        items: [
          {
            id: "nigiri-a",
            name: "Nigiri, 2 pieces",
            desc: "Maguro, salmon or ebi.",
            price: "7.50",
          },
          {
            id: "nigiri-b",
            name: "Nigiri, 2 pieces",
            desc: "Unagi, hamachi or albacore.",
            price: "8.50",
          },
          { id: "nigiri-combo", name: "Nigiri Combo", price: "18.99" },
          {
            id: "sashimi-chef",
            name: "Sashimi, chef's choice",
            desc: "Salmon, tuna, albacore and hamachi.",
            variants: [
              { label: "4 pieces", price: "8" },
              { label: "9 pieces", price: "16.99" },
              { label: "12 pieces", price: "19.99" },
            ],
          },
          { id: "peperfin-albacore", name: "Peperfin Albacore", price: "16.99" },
          { id: "seared-steak", name: "Seared Steak", price: "15.99" },
          { id: "ahi-poke-salad", name: "Ahi Poki Salad", price: "14.99" },
        ],
      },
      {
        id: "sushi-starters",
        title: "Sushi bar appetizers",
        items: [
          { id: "edamame", name: "Edamame", desc: "Garlic, spicy or plain.", price: "7" },
          { id: "egg-rolls", name: "Veggie Egg Rolls", price: "7.50" },
          { id: "tempura-shrimp", name: "Tempura Shrimp", price: "10" },
          { id: "california-hand-roll", name: "California Hand Roll", price: "7" },
        ],
      },
    ],
  },
  {
    id: "kids-classics",
    label: "Kids & Classics",
    groups: [
      {
        id: "kids",
        title: "Kids menu",
        intro: "Every kids meal is $7.99.",
        items: [
          { id: "kids-nuggets", name: "Fries & Nuggets", desc: "5 nuggets.", price: "7.99" },
          {
            id: "kids-quesadilla",
            name: "Kids Quesadilla",
            desc: "With fries or rice & beans.",
            price: "7.99",
          },
          {
            id: "kids-taco",
            name: "Kids Taco",
            desc: "With fries or rice & beans.",
            price: "7.99",
          },
          { id: "kids-burrito", name: "Kids Burrito", desc: "Beans & cheese.", price: "7.99" },
          { id: "kids-cheeseburger", name: "Kids Cheese Burger", price: "7.99" },
        ],
      },
      {
        id: "classics",
        title: "Carmichael classics",
        intro: "Burgers come with lettuce, tomatoes and onions with a special tomato-mayo sauce.",
        items: [
          {
            id: "wings",
            name: "Bone-in Wings, 8 pieces",
            desc: "Served with ranch.",
            price: "15.99",
          },
          { id: "cheeseburger", name: "Cheese Burger", price: "11.99" },
          { id: "bacon-cheeseburger", name: "Bacon Cheese Burger", price: "13.99" },
          { id: "double-cheeseburger", name: "Double Cheese Burger", price: "16.99" },
        ],
      },
    ],
  },
  {
    id: "drinks-desserts",
    label: "Drinks & Desserts",
    groups: [
      {
        id: "drinks-peru",
        title: "Peruvian drinks",
        items: [
          { id: "chicha-morada", name: "Chicha Morada", en: "Purple corn drink", price: "5.45" },
          { id: "maracuya", name: "Maracuyá", en: "Passion fruit", price: "5.45" },
          { id: "inca-kola", name: "Inca Kola", price: "4.75" },
        ],
      },
      {
        id: "drinks-mex",
        title: "Mexican drinks",
        items: [
          { id: "horchata", name: "Horchata", en: "Sweet rice drink", price: "5.45" },
          { id: "mexican-coke", name: "Mexican Coke, bottle", price: "4.75" },
          { id: "jarritos", name: "Jarritos, bottle", price: "4.75" },
        ],
      },
      {
        id: "drinks-fountain",
        title: "Fountain drinks",
        items: [
          {
            id: "fountain",
            name: "Fountain drinks",
            desc: "Pepsi, Pepsi Zero, Starry Lemon, Lemonade, Sweet Iced Tea, Dr Pepper, Arnold Palmer.",
            price: "3.99",
          },
        ],
      },
      {
        id: "desserts",
        title: "Desserts",
        items: [
          { id: "churro", name: "Churro", price: "3.99" },
          { id: "plantains", name: "Plantains", en: "Sweet fried plantains", price: "6.99" },
          { id: "crema-volteada", name: "Crema Volteada", en: "Peruvian flan", price: "6.99" },
        ],
      },
    ],
  },
];

// Internal review list for the owner. Not rendered on the page.
export const REVIEW_FLAGS = [
  "Cherry Blason Roll: printed spelling (likely Cherry Blossom); printed 'massago' shown as masago.",
  "Julyhet Roll: printed spelling, confirm the name.",
  "Peperfin Albacore and Seared Steak: printed under sashimi chef's choice with no description.",
  "Ahi Poki Salad: printed 'Poki' (often spelled poke).",
  "Butter fish tacos (combo item): printed wording, confirm.",
  "Kids menu 'Fries/RB': read as fries or rice & beans.",
  "Inca Cola printed; shown as the brand spelling Inca Kola.",
  "Crispy seafood intro on the print names another restaurant ('Lomito's'); left off the site.",
  "Tallarines a la Huancaína: photo caption only ('same options available'), no price printed.",
];

export type FlatItem = MenuItem & { category: string; group: string };
export const ALL_ITEMS: FlatItem[] = MENU.flatMap((c) =>
  c.groups.flatMap((g) => g.items.map((i) => ({ ...i, category: c.id, group: g.id }))),
);
