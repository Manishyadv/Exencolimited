// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

// Disable caching
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log('Fetching product with ID:', id); // Debug log
    const { db } = await connectToDatabase();
    const collection = db.collection('products');

    let product = null;

    // Try ObjectId first
    if (ObjectId.isValid(id)) {
      product = await collection.findOne({ _id: new ObjectId(id) });
    }

    // Fallback to string id field if exists
    if (!product) {
      product = await collection.findOne({ id: id });
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get related products (same category, limit 4)
    const relatedProducts = await collection
      .find({
        wilkyart_category: product.wilkyart_category,
        _id: { $ne: product._id }
      })
      .limit(4)
      .toArray();

    return NextResponse.json({
      product: {
        ...product,
        _id: product._id.toString()
      },
      relatedProducts: relatedProducts.map(p => ({
        ...p,
        _id: p._id.toString()
      }))
    });

  } catch (error) {
    console.error('Product API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}