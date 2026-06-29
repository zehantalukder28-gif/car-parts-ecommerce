export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  specs: { label: string; value: string }[];
  compatibleVehicles: string[];
  sku: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Brembo GT Series Brake Kit",
    category: "Brakes",
    brand: "Brembo",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://store.activeautowerke.com/cdn/shop/products/Large256_fe94d6f2-5d3c-46e4-84dd-d1749bdb968c.jpg?v=1409325787&width=600",
    rating: 4.9,
    reviews: 324,
    inStock: true,
    description: "High-performance brake kit featuring 6-piston calipers and drilled rotors for superior stopping power.",
    specs: [
      { label: "Caliper Type", "value": "6-Piston Monobloc" },
      { label: "Rotor Size", "value": "380mm Front" },
      { label: "Material", "value": "Forged Aluminum" },
      { label: "Pad Compound", "value": "Street/Race" }
    ],
    compatibleVehicles: ["BMW M3", "Audi RS5", "Mercedes C63"],
    sku: "BRM-GT-380-6P"
  },
  {
    id: 2,
    name: "Bilstein B16 Coilover Suspension",
    category: "Suspension",
    brand: "Bilstein",
    price: 2199.00,
    image: "https://www.vagtech.co.uk/wp-content/uploads/2014/12/Bilstein-B16.jpg",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    description: "Premium adjustable coilover system with 10-way damping adjustment for the perfect ride quality.",
    specs: [
      { label: "Adjustment", "value": "10-Way Damping" },
      { label: "Height Range", "value": "-30mm to -80mm" },
      { label: "Spring Rate", "value": "Progressive" },
      { label: "Warranty", "value": "2 Years" }
    ],
    compatibleVehicles: ["VW Golf R", "Audi S3", "Ford Focus RS"],
    sku: "BIL-B16-ADJ"
  },
  {
    id: 3,
    name: "AKRAPOVIČ Evolution Exhaust System",
    category: "Exhaust",
    brand: "Akrapovič",
    price: 3499.00,
    originalPrice: 3999.00,
    image: "https://www.jimaimracing.co.uk/wp-content/uploads/2022/08/Untitled3-2.jpg",
    rating: 5.0,
    reviews: 156,
    inStock: true,
    description: "Titanium exhaust system delivering unmatched sound and performance gains up to 15HP.",
    specs: [
      { label: "Material", "value": "Grade 9 Titanium" },
      { label: "Weight Savings", "value": "-12kg" },
      { label: "Power Gain", "value": "+15HP" },
      { label: "Sound Level", "value": "95dB" }
    ],
    compatibleVehicles: ["BMW M4", "Audi RS6", "Porsche 911"],
    sku: "AKR-EVO-TI"
  },
  {
    id: 4,
    name: "VORTECH V3 Supercharger Kit",
    category: "Engine",
    brand: "Vortech",
    price: 5499.00,
    image: "https://mustangdirect.com/boutique/image/cache/catalog/Vortech/VT-4FL218-140L-980x980.jpg",
    rating: 4.7,
    reviews: 98,
    inStock: true,
    description: "Complete supercharger kit with intercooler, capable of 500+ HP on supported applications.",
    specs: [
      { label: "Max Boost", "value": "15 PSI" },
      { label: "Horsepower", "value": "+200HP" },
      { label: "Compressor", "value": "V3 Si-Trim" },
      { label: "Includes", "value": "Intercooler, BOV" }
    ],
    compatibleVehicles: ["Ford Mustang GT", "Chevy Camaro SS", "Dodge Challenger"],
    sku: "VOR-V3-SC"
  },
  {
    id: 5,
    name: "Volk Racing TE37 Wheels Set",
    category: "Wheels",
    brand: "Rays",
    price: 2899.00,
    image: "https://i.ebayimg.com/images/g/~EoAAOSwpNVoSVHY/s-l1200.jpg",
    rating: 4.9,
    reviews: 412,
    inStock: true,
    description: "Iconic forged magnesium wheels, renowned for strength and lightweight performance.",
    specs: [
      { label: "Size", "value": "19x9.5 / 19x10.5" },
      { label: "Weight", "value": "8.2kg Front" },
      { label: "Material", "value": "Forged Magnesium" },
      { label: "Finish", "value": "Bronze" }
    ],
    compatibleVehicles: ["Universal 5x114.3"],
    sku: "RAY-TE37-19"
  },
  {
    id: 6,
    name: "KW Variant 4 Coilovers",
    category: "Suspension",
    brand: "KW",
    price: 2899.00,
    // Fix only this line:
    image: "https://racehaus.co.uk/cdn/shop/products/1408_001.jpg?v=1667493930",
    rating: 4.8,
    reviews: 267,
    inStock: true,
    description: "Street and track ready coilovers with stainless steel construction and TVR-A technology.",
    specs: [
      { label: "Damping", "value": "16-Way Adjustable" },
      { label: "Construction", "value": "Stainless Steel" },
      { label: "Drop Range", "value": "-20mm to -70mm" },
      { label: "Technology", "value": "TVR-A" }
    ],
    compatibleVehicles: ["BMW M2", "Audi TTRS", "Mercedes A45"],
    sku: "KW-V4-SS"
  },
  {
    id: 7,
    name: "APR Stage 2 ECU Tune",
    category: "Engine",
    brand: "APR",
    price: 799.00,
    originalPrice: 999.00,
    image: "https://images.goapr.com/20_tsi_ea888_gen3_trans_210ps_s0_vs_s1_l_87_g.png",
    rating: 4.6,
    reviews: 534,
    inStock: true,
    description: "Professional ECU calibration delivering up to 30% power increase with warranty coverage.",
    specs: [
      { label: "Power Gain", "value": "+80HP" },
      { label: "Torque Gain", "value": "+100LB-FT" },
      { label: "Programs", "value": "4 Modes" },
      { label: "Warranty", "value": "1 Year" }
    ],
    compatibleVehicles: ["VW Golf R", "Audi S3", "Ford Focus ST"],
    sku: "APR-STG2-ECU"
  },
  {
    id: 8,
    name: "Mishimoto Performance Radiator",
    category: "Cooling",
    brand: "Mishimoto",
    price: 449.00,
    image: "https://the86shop.com.au/cdn/shop/products/MMRAD-BRZ-13_600x600.jpg?v=1622438233",
    rating: 4.7,
    reviews: 289,
    inStock: true,
    description: "Aluminum racing radiator with 30% increased cooling capacity for high-performance applications.",
    specs: [
      { label: "Core Size", "value": "55mm Dual Pass" },
      { label: "Capacity", "value": "+30%" },
      { label: "Material", "value": "T6061 Aluminum" },
      { label: "Warranty", "value": "Lifetime" }
    ],
    compatibleVehicles: ["Honda Civic Type R", "Subaru WRX", "Mitsubishi EVO"],
    sku: "MISH-RAD-55"
  }
];

export const categories = [
  { name: "Brakes", icon: "disc", count: 156, image: "https://cdn.pixabay.com/photo/2023/11/15/15/54/ai-generated-8390398_960_720.jpg" },
  { name: "Exhaust", icon: "wind", count: 189, image:"https://www.sandgateautoelectrics.com.au/wp-content/uploads/2024/02/dem6yjxu0ae-bbxjpg-c2f6f82ec0f7f6fc.jpg" },
  { name: "Engine", icon: "gauge", count: 312, image: "https://di-uploads-pod33.dealerinspire.com/auffenbergofcarbondale1/uploads/2023/09/15.jpg" },
  { name: "Wheels", icon: "circle", count: 267, image: "https://www.shutterstock.com/image-photo/alloy-wheel-sports-car-part-600nw-2701590443.jpg" },
  { name: "Cooling", icon: "thermometer", count: 145, image: "https://us.123rf.com/450wm/andranik2018/andranik20182305/andranik2018230500671/204899235-car-engine-generative-ai.jpg?ver=6" }
];
export const reviews = [
  {
    id: 1,
    name: "Marcus T.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    date: "2 days ago",
    text: "Best brake kit I've ever installed. Stopping power is incredible and the installation guide was perfect. Will definitely buy from here again!",
    product: "Brembo GT Series Brake Kit"
  },
  {
    id: 2,
    name: "Sarah K.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    date: "1 week ago",
    text: "Fast shipping and authentic products. The Akrapovič exhaust sounds absolutely amazing on my M4. Customer service was top notch!",
    product: "AKRAPOVIČ Evolution Exhaust"
  },
  {
    id: 3,
    name: "James R.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 5,
    date: "3 weeks ago",
    text: "The TE37s are legendary for a reason. Perfect fitment and the weight savings are noticeable. ApexAuto delivered quickly with great packaging.",
    product: "Volk Racing TE37 Wheels"
  }
];

export const vehicleMakes = ["Audi", "BMW", "Chevrolet", "Dodge", "Ford", "Honda", "Mercedes", "Porsche", "Subaru", "Toyota", "Volkswagen"];

export const vehicleModels: Record<string, string[]> = {
  Audi: ["A3", "A4", "A5", "RS3", "RS4", "RS5", "RS6", "S3", "S4", "S5", "TTRS", "R8"],
  BMW: ["M2", "M3", "M4", "M5", "M8", "X3M", "X4M", "X5M", "Z4"],
  Chevrolet: ["Camaro SS", "Camaro ZL1", "Corvette C7", "Corvette C8"],
  Dodge: ["Challenger", "Charger", "Viper"],
  Ford: ["Focus RS", "Focus ST", "Mustang GT", "Mustang GT500", "F-150 Raptor"],
  Honda: ["Civic Si", "Civic Type R", "Accord", "S2000"],
  Mercedes: ["A45 AMG", "C63 AMG", "E63 AMG", "GT", "GLA45 AMG"],
  Porsche: ["911", "911 GT3", "Cayman", "Boxster", "Macan", "Cayenne"],
  Subaru: ["WRX", "WRX STI", "BRZ", "Outback"],
  Toyota: ["GR Supra", "GR86", "GR Corolla", "Camry TRD"],
  Volkswagen: ["Golf R", "Golf GTI", "Jetta GLI", "Arteon"]
};

export const years = Array.from({ length: 25 }, (_, i) => 2024 - i);