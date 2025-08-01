import { useState } from "react";
import { sampleProducts } from "@/data/products";
import { getAIRecommendations } from "@/services/aiRecommendations";
import { Product } from "@/types/product";
import { AIRecommendationInput } from "@/components/AIRecommendationInput";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductDetail } from "@/components/ProductDetail";
import { RecommendationResults } from "@/components/RecommendationResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles, ShoppingBag, Filter, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [recommendations, setRecommendations] = useState<{
    products: Product[];
    reasoning: string;
    query: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRecommended, setIsRecommended] = useState(false);
  const { toast } = useToast();

  const handleRecommendation = async (query: string) => {
    setIsLoading(true);
    try {
      const result = await getAIRecommendations(query);
      setRecommendations({
        products: result.products,
        reasoning: result.reasoning,
        query
      });
      setShowAllProducts(false);
      toast({
        title: "🤖 AI Recommendations Ready!",
        description: `Found ${result.products.length} products perfectly matching your preferences.`,
      });
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations(null);
    setShowAllProducts(true);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsRecommended(recommendations?.products.some(p => p.id === product.id) || false);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setIsRecommended(false);
  };

  const categories = Array.from(new Set(sampleProducts.map(p => p.category)));

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ProductDetail 
            product={selectedProduct}
            onBack={handleBackToProducts}
            isRecommended={isRecommended}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-ai rounded-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">🤖 GPT-4 Product Discovery</h1>
                <p className="text-sm text-muted-foreground">Powered by OpenAI GPT-4</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="capitalize">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* AI Recommendation Input */}
        <section>
          <AIRecommendationInput 
            onRecommendation={handleRecommendation} 
            isLoading={isLoading}
          />
        </section>

        {/* Results Section */}
        {recommendations && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
                AI Recommendations
              </h2>
              <Button 
                variant="aiOutline" 
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Show All Products
              </Button>
            </div>
            <RecommendationResults 
              products={recommendations.products}
              reasoning={recommendations.reasoning}
              query={recommendations.query}
              onProductClick={handleProductClick}
            />
          </section>
        )}

        {/* Separator */}
        {recommendations && showAllProducts && (
          <Separator className="my-12" />
        )}

        {/* All Products Section */}
        {showAllProducts && (
          <section>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  All Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Browse our complete collection of {sampleProducts.length} products
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{sampleProducts.length} Products</Badge>
                    <Badge variant="outline">{categories.length} Categories</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ProductGrid 
              products={sampleProducts}
              title="🛍️ Product Catalog"
              onProductClick={handleProductClick}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Powered by OpenAI GPT-4 • Built with React & TypeScript
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Smart recommendations tailored just for you</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
