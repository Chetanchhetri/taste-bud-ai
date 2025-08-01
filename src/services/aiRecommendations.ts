import { Product } from "@/types/product";
import { sampleProducts } from "@/data/products";

interface RecommendationResult {
  products: Product[];
  reasoning: string;
}

const OPENAI_API_KEY = "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";

export const getAIRecommendations = async (query: string): Promise<RecommendationResult> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert product recommendation AI. Analyze the user's request and recommend the most suitable products from this catalog: ${JSON.stringify(sampleProducts, null, 2)}

Instructions:
1. Select 3-6 products that best match the user's criteria
2. Consider price range, category, features, and use case
3. Prioritize products with higher ratings when quality is important
4. Provide clear, helpful reasoning for your recommendations
5. Respond in JSON format: {"productIds": ["1", "2", "3"], "reasoning": "Your detailed explanation"}`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;
    
    try {
      const parsedResponse = JSON.parse(aiResponse);
      const recommendedProducts = sampleProducts.filter(product => 
        parsedResponse.productIds.includes(product.id)
      );
      
      return {
        products: recommendedProducts,
        reasoning: parsedResponse.reasoning
      };
    } catch (parseError) {
      // Fallback parsing if JSON is malformed
      const productIds = aiResponse.match(/"(\d+)"/g)?.map((match: string) => match.replace(/"/g, '')) || [];
      const recommendedProducts = sampleProducts.filter(product => 
        productIds.includes(product.id)
      );
      
      return {
        products: recommendedProducts.length > 0 ? recommendedProducts : sampleProducts.slice(0, 3),
        reasoning: aiResponse || "AI recommendations based on your preferences."
      };
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to simple recommendations
    return getSimpleRecommendations(query);
  }
};

// Fallback recommendation system
const getSimpleRecommendations = (query: string): RecommendationResult => {
  const lowercaseQuery = query.toLowerCase();
  let filteredProducts: Product[] = [];
  
  // Extract price preference
  const priceMatch = query.match(/under \$?(\d+)/i) || query.match(/below \$?(\d+)/i);
  const maxPrice = priceMatch ? parseInt(priceMatch[1]) : null;
  
  // Extract category preference
  let category = "";
  if (lowercaseQuery.includes("phone") || lowercaseQuery.includes("smartphone")) {
    category = "smartphone";
  } else if (lowercaseQuery.includes("laptop") || lowercaseQuery.includes("computer")) {
    category = "laptop";
  } else if (lowercaseQuery.includes("tablet")) {
    category = "tablet";
  } else if (lowercaseQuery.includes("headphone") || lowercaseQuery.includes("earbuds")) {
    category = "headphones";
  }
  
  // Filter products
  filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = !category || product.category === category;
    const matchesPrice = !maxPrice || product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });
  
  // Sort and limit
  filteredProducts.sort((a, b) => b.rating - a.rating);
  filteredProducts = filteredProducts.slice(0, 4);
  
  return {
    products: filteredProducts,
    reasoning: `Found ${filteredProducts.length} products matching your criteria, sorted by customer ratings.`
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