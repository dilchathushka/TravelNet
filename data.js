const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    image: "pictures/bali.jpg",
    description:
      "Bali is famous for beaches, culture, temples, waterfalls, and relaxing island vibes.",
    attractions: ["Ubud", "Tanah Lot Temple", "Seminyak Beach", "Mount Batur"],
    cost: {
      low: "$40/day",
      moderate: "$90/day",
      luxury: "$220/day"
    },
    type: ["relaxation", "nature", "cultural"]
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    continent: "Europe",
    image: "pictures/paris.png",
    description:
      "Paris offers romance, fashion, museums, luxury shopping, and unforgettable landmarks.",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Seine River"],
    cost: {
      low: "$70/day",
      moderate: "$150/day",
      luxury: "$350/day"
    },
    type: ["cultural", "relaxation"]
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    image: "pictures/tokyo.png",
    description:
      "Tokyo blends modern technology, anime culture, food, temples, and nightlife.",
    attractions: ["Shibuya", "Akihabara", "Tokyo Tower", "Asakusa Temple"],
    cost: {
      low: "$65/day",
      moderate: "$140/day",
      luxury: "$320/day"
    },
    type: ["cultural", "adventure"]
  },
  {
    id: 4,
    name: "Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    image: "pictures/swiss-alps.png",
    description:
      "Beautiful snowy mountains, skiing, hiking, scenic rail rides, and peaceful nature.",
    attractions: ["Zermatt", "Matterhorn", "Interlaken", "Jungfrau"],
    cost: {
      low: "$85/day",
      moderate: "$170/day",
      luxury: "$420/day"
    },
    type: ["nature", "adventure"]
  },
  {
    id: 5,
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    image: "pictures/cape-town.png",
    description:
      "A city of beaches, mountains, wildlife, and unforgettable road trips.",
    attractions: ["Table Mountain", "Cape Point", "Boulders Beach", "Waterfront"],
    cost: {
      low: "$35/day",
      moderate: "$80/day",
      luxury: "$190/day"
    },
    type: ["nature", "adventure", "relaxation"]
  },
  {
    id: 6,
    name: "New York",
    country: "USA",
    continent: "North America",
    image: "pictures/new-york.png",
    description:
      "Fast-paced city life, iconic landmarks, Broadway, food, and culture.",
    attractions: ["Times Square", "Central Park", "Statue of Liberty", "Brooklyn"],
    cost: {
      low: "$90/day",
      moderate: "$180/day",
      luxury: "$450/day"
    },
    type: ["cultural", "adventure"]
  }
];