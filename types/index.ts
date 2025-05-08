export interface reviw {
  id: number;
  name: string;
  image?: string;
  comment?: string;
}
export interface supplier {
  id: number;
  name: string;
  description: string;
  image: string;
  Clients?: number;
  contact?: {
    country: string;
    city: string;
    Facebook: string;
    Email: string;
  };
  reviews: {
    average_reviews: number;
    total_reviews: number;
    ratings?: {
      [key: number]: number;
    };
    customers_comments: reviw[];
  };
  companies?: {
    id: number;
    companyName: string;
  }[];
  products_tipe?: {
    id: number;
    product: string;
    product_image: string;
    price: number;
  }[];
}
export type Language = "en" | "ar";
