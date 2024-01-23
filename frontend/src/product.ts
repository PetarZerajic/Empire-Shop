import { IProducts } from "./models/IProducts";

export const products: IProducts[] = [
  {
    _id: 1,
    name: "AirPods 2nd generation",
    image: "/images/airpods.jpeg",
    price: 129.0,
    description:
      "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case, AirPods deliver an incredible wireless headphone experience. Simply take them out and they’re ready to use with all your devices.",
    brand: "Apple",
    category: "Electronics",
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: 2,
    name: "Iphone 15 Pro Max 512GB",
    image: "/images/iphon15promax.jpg",
    price: 1199,
    description:
      "The iPhone 15 Pro Max comes with 6.7-inch OLED display with 120Hz refresh rate and Apple's improved A17 Pro processor. On the back there is a Triple camera setup with 48MP",
    brand: "Apple",
    category: "Electronics",
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    _id: 3,
    name: "Playstation 5",
    image: "/images/ps5.jpg",
    price: 500,
    description:
      "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback1, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games.",
    brand: "Sony",
    category: "Electronics",
    countInStock: 12,
    rating: 4.5,
    numReviews: 9,
  },
  {
    _id: 4,
    name: "Canon EOS R3",
    image: "/images/canonEosR3.jpeg",
    price: 4999,
    description:
      "The Canon EOS R3 is the first of a new camera class, slotted between the extreme professional 1-series and the high-performance 5-series. Featuring high reliability, durability, and exceptional speed, the R3 is designed to meet professional requirements with an emphasis on outstanding results when photographing challenging and fast-moving subjects.",
    brand: "Canon",
    category: "Electronics",
    countInStock: 4,
    rating: 4.4,
    numReviews: 4,
  },
  {
    _id: 5,
    name: "Fanatec GT DD Pro",
    image: "/images/fanatecGTDDPro.jpg",
    price: 700,
    description:
      "The Fanatec GT DD Pro sets a high standard for all racing wheels. A direct-drive motor can throw the wheel around with so much force you're holding on for dear life.You feel every bump or loss of traction with the GT DD",
    brand: "Fanatec",
    category: "Electronics",
    countInStock: 6,
    rating: 4.3,
    numReviews: 7,
  },
  {
    _id: 6,
    name: "Samsung S24 Ultra ",
    image: "/images/samsung24ultra.png",
    price: 1300,
    description:
      "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility — starting with the most important device in your life. Your smartphone.",
    brand: "Samsung",
    category: "Electronics",
    countInStock: 10,
    rating: 4.9,
    numReviews: 10,
  },
];
