import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Loader2 } from "lucide-react";

interface AIRecommendationInputProps {
  onRecommendation: (query: string) => void;
  isLoading: boolean;
}

const suggestedQueries = [
  "I want a phone under $500 with good camera",
  "Show me the best laptop for programming",
  "I need wireless headphones for gaming",
  "Find me a tablet for digital art",
  "Budget smartphone with long battery life"
];

export const AIRecommendationInput = ({ onRecommendation, isLoading }: AIRecommendationInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onRecommendation(query.trim());
    }
  };

  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery);
    onRecommendation(suggestedQuery);
  };

  return (
    <Card className="bg-gradient-hero border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          🤖 GPT-4 Product Recommendations
        </CardTitle>
        <p className="text-muted-foreground">
          Powered by OpenAI GPT-4 • Tell me what you're looking for and I'll find the perfect products for you
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="E.g., I want a smartphone under $600 with excellent camera quality..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            variant="ai" 
            className="w-full" 
            disabled={!query.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </form>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Try these suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleSuggestedQuery(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};