import { Product } from "@/types/product";
import { sampleProducts } from "@/data/products";

interface RecommendationResult {
  products: Product[];
  reasoning: string;
}

// This is a placeholder for OpenAI integration
// In production, you would replace this with actual OpenAI API calls
export const getAIRecommendations = async (query: string): Promise<RecommendationResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simple keyword-based matching for demo purposes
  // In production, this would be handled by OpenAI GPT
  const lowercaseQuery = query.toLowerCase();
  
  let filteredProducts: Product[] = [];
  let reasoning = "";
  
  // Extract price preference
  const priceMatch = query.match(/under \$?(\d+)/i) || query.match(/below \$?(\d+)/i) || query.match(/less than \$?(\d+)/i);
  const maxPrice = priceMatch ? parseInt(priceMatch[1]) : null;
  
  // Extract category preference
  let category = "";
  if (lowercaseQuery.includes("phone") || lowercaseQuery.includes("smartphone")) {
    category = "smartphone";
  } else if (lowercaseQuery.includes("laptop") || lowercaseQuery.includes("computer")) {
    category = "laptop";
  } else if (lowercaseQuery.includes("tablet") || lowercaseQuery.includes("ipad")) {
    category = "tablet";
  } else if (lowercaseQuery.includes("headphone") || lowercaseQuery.includes("earbuds")) {
    category = "headphones";
  }
  
  // Filter products based on criteria
  filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = !category || product.category === category;
    const matchesPrice = !maxPrice || product.price <= maxPrice;
    
    // Additional keyword matching
    const productText = `${product.name} ${product.description} ${product.features.join(" ")}`.toLowerCase();
    const keywords = ["camera", "gaming", "battery", "fast", "premium", "budget", "professional"];
    const hasKeywordMatch = keywords.some(keyword => 
      lowercaseQuery.includes(keyword) && productText.includes(keyword)
    );
    
    return matchesCategory && matchesPrice && (hasKeywordMatch || !keywords.some(k => lowercaseQuery.includes(k)));
  });
  
  // Sort by rating and price
  filteredProducts.sort((a, b) => {
    if (maxPrice) {
      // If budget is specified, prioritize lower prices
      return a.price - b.price;
    }
    return b.rating - a.rating;
  });
  
  // Limit to top 6 recommendations
  filteredProducts = filteredProducts.slice(0, 6);
  
  // Generate reasoning
  if (maxPrice && category) {
    reasoning = `Based on your request for a ${category} under $${maxPrice}, I've found ${filteredProducts.length} excellent options. I've prioritized products within your budget and sorted them by value and customer ratings.`;
  } else if (maxPrice) {
    reasoning = `I found ${filteredProducts.length} products under $${maxPrice} that match your criteria, sorted by value and customer satisfaction.`;
  } else if (category) {
    reasoning = `Here are the top ${filteredProducts.length} ${category} products, ranked by customer ratings and overall quality.`;
  } else {
    reasoning = `Based on your search, I've selected ${filteredProducts.length} highly-rated products that best match your requirements.`;
  }
  
  return {
    products: filteredProducts,
    reasoning
  };
};

// Function to integrate with OpenAI (for future implementation)
export const getOpenAIRecommendations = async (query: string, apiKey: string): Promise<RecommendationResult> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a product recommendation AI. Given a user query and a list of products, recommend the most suitable products and explain your reasoning. Products available: ${JSON.stringify(sampleProducts, null, 2)}`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    
    // Parse the AI response to extract product IDs and reasoning
    // This would need more sophisticated parsing in production
    return {
      products: sampleProducts.slice(0, 3), // Fallback
      reasoning: data.choices[0]?.message?.content || "AI recommendation generated"
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to simple recommendations
    return getAIRecommendations(query);
  }
};