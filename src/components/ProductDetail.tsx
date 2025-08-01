import { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, ArrowLeft, Check, Zap, Shield, Heart } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  isRecommended?: boolean;
}

export const ProductDetail = ({ product, onBack, isRecommended }: ProductDetailProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4 gap-2 hover:bg-primary/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-subtle">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
            {isRecommended && (
              <Badge className="absolute top-4 right-4 bg-gradient-ai text-white border-0 shadow-elegant">
                🤖 AI Recommended
              </Badge>
            )}
            <Badge 
              variant="secondary" 
              className="absolute top-4 left-4 capitalize backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-muted-foreground/30'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-muted-foreground">
              {product.reviews.toLocaleString()} reviews
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              Free shipping • 30-day returns
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full gap-2 text-lg py-6"
              variant={isRecommended ? "ai" : "default"}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg" className="gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Zap className="h-4 w-4" />
                Quick Buy
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <div className="font-medium">Secure Purchase</div>
              <div className="text-muted-foreground">Protected by buyer guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="font-medium">{product.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews:</span>
                  <span className="font-medium">{product.reviews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product ID:</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">What's Included</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{product.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>User Manual</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Warranty Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Original Packaging</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};