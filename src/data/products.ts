import { Product } from "@/types/product";
import iphoneImage from "@/assets/iphone-15-pro.jpg";
import samsungImage from "@/assets/samsung-galaxy-s24.jpg";
import macbookImage from "@/assets/macbook-air-m3.jpg";
import airpodsImage from "@/assets/airpods-pro-2.jpg";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 999,
    category: "smartphone",
    description: "Latest iPhone with titanium design and advanced camera system",
    image: iphoneImage,
    features: ["A17 Pro chip", "48MP camera", "USB-C", "Titanium design", "5G"],
    rating: 4.8,
    reviews: 1247
  },
  {
    id: "2", 
    name: "Samsung Galaxy S24",
    price: 799,
    category: "smartphone",
    description: "Flagship Android phone with AI features and excellent display",
    image: samsungImage,
    features: ["Snapdragon 8 Gen 3", "50MP camera", "AI photography", "120Hz display", "5G"],
    rating: 4.6,
    reviews: 892
  },
  {
    id: "3",
    name: "Google Pixel 8",
    price: 699,
    category: "smartphone", 
    description: "Pure Android experience with exceptional AI photography",
    image: "/api/placeholder/300/300",
    features: ["Tensor G3", "50MP camera", "Magic Eraser", "Pure Android", "7 years updates"],
    rating: 4.5,
    reviews: 634
  },
  {
    id: "4",
    name: "OnePlus 12",
    price: 599,
    category: "smartphone",
    description: "Fast charging flagship with premium performance",
    image: "/api/placeholder/300/300", 
    features: ["Snapdragon 8 Gen 3", "100W charging", "50MP camera", "OxygenOS", "5G"],
    rating: 4.4,
    reviews: 428
  },
  {
    id: "5",
    name: "iPhone 14",
    price: 729,
    category: "smartphone",
    description: "Previous generation iPhone with proven reliability",
    image: "/api/placeholder/300/300",
    features: ["A15 Bionic", "48MP camera", "Lightning port", "Aluminum design", "5G"],
    rating: 4.7,
    reviews: 2156
  },
  {
    id: "6",
    name: "Xiaomi 14 Ultra",
    price: 899,
    category: "smartphone",
    description: "Photography flagship with Leica cameras",
    image: "/api/placeholder/300/300",
    features: ["Snapdragon 8 Gen 3", "Leica cameras", "50MP main", "2K display", "120W charging"],
    rating: 4.6,
    reviews: 312
  },
  {
    id: "7",
    name: "MacBook Air M3",
    price: 1099,
    category: "laptop",
    description: "Ultra-thin laptop with Apple M3 chip",
    image: macbookImage,
    features: ["M3 chip", "18hr battery", "13.6\" display", "Fanless design", "macOS"],
    rating: 4.8,
    reviews: 892
  },
  {
    id: "8",
    name: "Dell XPS 13",
    price: 999,
    category: "laptop",
    description: "Premium Windows ultrabook with stunning display",
    image: "/api/placeholder/300/300",
    features: ["Intel Core i7", "13.4\" OLED", "16GB RAM", "512GB SSD", "Windows 11"],
    rating: 4.5,
    reviews: 567
  },
  {
    id: "9",
    name: "ThinkPad X1 Carbon",
    price: 1299,
    category: "laptop",
    description: "Business laptop with legendary keyboard and durability",
    image: "/api/placeholder/300/300",
    features: ["Intel Core i7", "14\" display", "Military-grade", "TrackPoint", "Windows 11"],
    rating: 4.6,
    reviews: 743
  },
  {
    id: "10",
    name: "iPad Pro 12.9\"",
    price: 1099,
    category: "tablet",
    description: "Professional tablet with M2 chip and Apple Pencil support",
    image: "/api/placeholder/300/300",
    features: ["M2 chip", "12.9\" Liquid Retina", "Apple Pencil", "USB-C", "iPadOS"],
    rating: 4.7,
    reviews: 445
  },
  {
    id: "11",
    name: "Samsung Tab S9",
    price: 799,
    category: "tablet",
    description: "Android tablet with S Pen and productivity features",
    image: "/api/placeholder/300/300",
    features: ["Snapdragon 8 Gen 2", "11\" AMOLED", "S Pen included", "DeX mode", "5G"],
    rating: 4.4,
    reviews: 289
  },
  {
    id: "12",
    name: "AirPods Pro 2",
    price: 249,
    category: "headphones",
    description: "Premium wireless earbuds with adaptive transparency",
    image: airpodsImage,
    features: ["H2 chip", "Active noise cancellation", "Spatial audio", "USB-C", "6hr battery"],
    rating: 4.6,
    reviews: 1893
  }
];