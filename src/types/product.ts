export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  features: string[];
  rating: number;
  reviews: number;
}

export interface RecommendationRequest {
  query: string;
  preferences?: {
    maxPrice?: number;
    category?: string;
    features?: string[];
  };
}

export interface RecommendationResponse {
  recommendations: Product[];
  reasoning: string;
}