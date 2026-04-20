// utils/textCleaner.ts
export function cleanProductText(text: string): string {
    if (!text || typeof text !== 'string') return '';
    
    return text
      // Remove escaped newlines and variations
      .replace(/\\n+/g, ' ')
      .replace(/\n+/g, ' ')
      .replace(/\\r/g, ' ')
      .replace(/\r/g, ' ')
      
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      
      // Clean up specific formatting issues
      .replace(/InColor:/g, 'Color: ')
      .replace(/Brand([A-Z])/g, 'Brand: $1')
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
      
      // Remove HTML entities if any
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      
      // Clean up multiple spaces and trim
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  export function cleanProductFeatures(features: string[]): string[] {
    if (!Array.isArray(features)) return [];
    
    return features
      .map(feature => cleanProductText(feature))
      .filter(feature => feature.length > 0 && feature.length < 200) // Remove empty or overly long features
      .slice(0, 8); // Limit to reasonable number of features
  }
  
  export function cleanProductDescription(description: string): string {
    if (!description) return '';
    
    let cleaned = cleanProductText(description);
    
    // Remove specification-like content that's too technical for descriptions
    cleaned = cleaned.replace(/Technical characteristics.*?$/i, '');
    cleaned = cleaned.replace(/Specification for.*?$/i, '');
    
    // Ensure description ends properly
    if (cleaned.length > 300) {
      cleaned = cleaned.substring(0, 297) + '...';
    }
    
    return cleaned;
  }
  
  // You can also create a utility to clean entire product objects
  export function cleanProduct(product: any) {
    return {
      ...product,
      title: cleanProductText(product.title),
      description: cleanProductDescription(product.description),
      features: cleanProductFeatures(product.features || []),
      inStock: product.inStock !== undefined ? product.inStock : true, // Preserve inStock status, default to true
    };
  }