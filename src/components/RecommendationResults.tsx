import { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "./ProductGrid";
import { Brain, Lightbulb } from "lucide-react";

interface RecommendationResultsProps {
  products: Product[];
  reasoning: string;
  query: string;
}

export const RecommendationResults = ({ products, reasoning, query }: RecommendationResultsProps) => {
  if (products.length === 0) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            No products found matching your criteria. Try adjusting your requirements.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-hero border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <p className="text-muted-foreground">{reasoning}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary/30">
              Query: "{query}"
            </Badge>
            <Badge variant="secondary">
              {products.length} recommendations found
            </Badge>
          </div>
        </CardContent>
      </Card>

      <ProductGrid 
        products={products} 
        recommendedIds={products.map(p => p.id)}
        title="🤖 AI Recommended Products"
      />
    </div>
  );
};