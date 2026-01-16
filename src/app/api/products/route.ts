import { NextResponse } from "next/server";
import { productsByCategory } from "@/lib/products-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryCode = searchParams.get("category") || "11";

  try {
    // Return products from local data
    const products = productsByCategory[categoryCode] || [];

    return NextResponse.json({ products, categoryCode });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { products: [], categoryCode, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
