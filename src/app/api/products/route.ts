import { NextResponse } from "next/server";
import { productsByCategory, Product } from "@/lib/products-data";

// Function to fetch products from the website
async function fetchProductsFromWebsite(categoryCode: string): Promise<Product[]> {
  try {
    // Since we can't directly scrape from client-side due to CORS,
    // we'll use a server-side fetch approach
    const url = `http://www.space-marine.co.kr/index.html`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      // Add cache revalidation
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.status}`);
      return [];
    }

    const html = await response.text();
    
    // Parse HTML to extract table data
    // This is a simplified parser - you may need to adjust based on actual HTML structure
    const products: Product[] = [];
    
    // TODO: Implement HTML parsing logic here
    // You would need to:
    // 1. Parse the HTML to find tables
    // 2. Extract rows that match the category code
    // 3. Parse each row to extract: code, product name, remarks, unit, price, hasPhoto
    // 4. Return the array of products
    
    // Example parsing logic (pseudo-code):
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(html, 'text/html');
    // const tables = doc.querySelectorAll('table');
    // tables.forEach(table => {
    //   const rows = table.querySelectorAll('tr');
    //   rows.forEach(row => {
    //     const cells = row.querySelectorAll('td');
    //     if (cells.length >= 5 && cells[0].textContent.startsWith(categoryCode)) {
    //       products.push({
    //         code: cells[0].textContent.trim(),
    //         product: cells[1].textContent.trim(),
    //         remarks: cells[2].textContent.trim(),
    //         unit: cells[3].textContent.trim(),
    //         price: parsePrice(cells[4].textContent.trim()),
    //         hasPhoto: cells[0].querySelector('.photo-indicator') !== null
    //       });
    //     }
    //   });
    // });
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fallback product data organized by category (imported from lib)
const fallbackProducts: typeof productsByCategory = productsByCategory;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryCode = searchParams.get("category") || "11";

  try {
    // Try to fetch from website first
    const websiteProducts = await fetchProductsFromWebsite(categoryCode);
    
    // If website fetch fails or returns empty, use fallback data
    const products = websiteProducts.length > 0 
      ? websiteProducts 
      : (fallbackProducts[categoryCode] || []);

    return NextResponse.json({ products, categoryCode });
  } catch (error) {
    console.error("Error in API route:", error);
    // Return fallback data on error
    const products = fallbackProducts[categoryCode] || [];
    return NextResponse.json({ products, categoryCode });
  }
}
