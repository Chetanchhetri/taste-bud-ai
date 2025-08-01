import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  isRecommended?: boolean;
  onClick?: () => void;
}

export const ProductCard = ({ product, isRecommended, onClick }: ProductCardProps) => {
  return (
    <Card 
      className={`group transition-all duration-300 hover:shadow-card hover:-translate-y-1 cursor-pointer ${
        isRecommended ? "ring-2 ring-primary shadow-ai animate-glow" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isRecommended && (
            <Badge className="absolute top-3 right-3 bg-gradient-ai text-white border-0">
              AI Recommended
            </Badge>
          )}
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 capitalize"
          >
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {product.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
        </div>
        <Button 
          variant={isRecommended ? "ai" : "default"} 
          size="sm" 
          className="gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};