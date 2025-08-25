import { ShoppingCart, Truck, CheckCircle, Star, Quote } from "lucide-react";

// Product type definition
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
}

// Order type definition
export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryAddress: string;
  deliveryDate?: Date;
}

// Branch type definition
export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Products data
export const products: Product[] = [
  {
    id: "1",
    name: "Regular Milk",
    description: "Fresh and pure milk from our happy, healthy cows",
    price: 75,
    image: "/images/Milk.png",
    category: "Milk",
    unit: "1 Litre",
    inStock: true,
  },
  {
    id: "2",
    name: "A2 Milk",
    description: "Premium A2 milk from indigenous breed cows",
    price: 100,
    image: "/images/A2Milk.png",
    category: "Milk",
    unit: "1 Litre",
    inStock: true,
  },
  {
    id: "3",
    name: "Cow Ghee",
    description: "Pure and aromatic ghee made from A2 milk",
    price: 2200,
    image: "/images/CowGhee.png",
    category: "Ghee",
    unit: "1 kg",
    inStock: true,
  },
  {
    id: "4",
    name: "Paneer",
    description: "Fresh and soft paneer made from pure milk",
    price: 180,
    image: "/images/Paneer.png",
    category: "Dairy",
    unit: "200g",
    inStock: true,
  }
];

// Categories data
export const categories = [
  { id: "milk", name: "Milk", icon: "🥛" },
  { id: "dairy", name: "Dairy Products", icon: "🧀" },
  { id: "ghee", name: "Ghee", icon: "🧈" },
];

// How it works data
export const howItWorks = [
  {
    title: "Order Online",
    description: "Browse our fresh products and place your order through our website or app",
    icon: ShoppingCart,
  },
  {
    title: "We Prepare Fresh",
    description: "Your order is prepared fresh from our farm with the highest quality standards",
    icon: CheckCircle,
  },
  {
    title: "Fast Delivery",
    description: "Get your fresh dairy products delivered to your doorstep within hours",
    icon: Truck,
  },
];

// Testimonials data
export const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Jubilee Hills",
    rating: 5,
    comment: "The milk quality is exceptional! You can taste the difference - it's so fresh and creamy. My kids love it!",
    avatar: "/images/avatar1.jpg",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    location: "Banjara Hills",
    rating: 5,
    comment: "Finally found a reliable source for pure A2 milk. The delivery is always on time and the packaging is excellent.",
    avatar: "/images/avatar2.jpg",
  },
  {
    id: "3",
    name: "Anita Reddy",
    location: "Kondapur",
    rating: 5,
    comment: "Their ghee is absolutely divine! Made the traditional way, you can smell the purity. Highly recommended!",
    avatar: "/images/avatar3.jpg",
  },
];

// Branches data
export const branches: Branch[] = [
  {
    id: "1",
    name: "Jubilee Hills Branch",
    address: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
    phone: "+91 9810649456",
    image: "/images/branch1.jpg",
    coordinates: {
      lat: 17.4326,
      lng: 78.4071,
    },
  },
  {
    id: "2",
    name: "Banjara Hills Branch",
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana 500034",
    phone: "+91 9667035805",
    image: "/images/branch2.jpg",
    coordinates: {
      lat: 17.4065,
      lng: 78.4691,
    },
  },
  {
    id: "3",
    name: "Kondapur Branch",
    address: "HITEC City Road, Kondapur, Hyderabad, Telangana 500084",
    phone: "+91 9810649456",
    image: "/images/branch3.jpg",
    coordinates: {
      lat: 17.4435,
      lng: 78.3665,
    },
  },
];

// Mock orders for development
export const mockOrders: Order[] = [
  {
    id: "ORD001",
    userId: "user1",
    items: [
      { productId: "1", quantity: 2, price: 80 },
      { productId: "3", quantity: 1, price: 200 },
    ],
    total: 360,
    status: "delivered",
    createdAt: new Date("2024-01-15"),
    deliveryAddress: "123 Dairy Lane, Jubilee Hills, Hyderabad",
    deliveryDate: new Date("2024-01-16"),
  },
  {
    id: "ORD002",
    userId: "user1",
    items: [
      { productId: "2", quantity: 1, price: 120 },
      { productId: "4", quantity: 1, price: 800 },
    ],
    total: 920,
    status: "confirmed",
    createdAt: new Date("2024-01-20"),
    deliveryAddress: "123 Dairy Lane, Jubilee Hills, Hyderabad",
  },
];
