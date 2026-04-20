// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, VALID_CATEGORIES } from '@/lib/mongodb';
import { FindOptions } from 'mongodb';

// Max products shown per category on the website
const MAX_PER_CATEGORY = 80;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const { db } = await connectToDatabase();
    const collection = db.collection('products');

    // Build query
    const query: Record<string, unknown> = {
      wilkyart_category: { $in: VALID_CATEGORIES }
    };

    if (category && VALID_CATEGORIES.includes(category as typeof VALID_CATEGORIES[number])) {
      query.wilkyart_category = category;
    }

    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {};
      if (minPrice) priceFilter.$gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.$lte = parseFloat(maxPrice);
      query.price = priceFilter;
    }

    if (search && search.trim()) {
      query.$text = { $search: search.trim() };
    }

    // Sort
    let sortQuery: Record<string, 1 | -1 | { $meta: 'textScore' }> = { _id: -1 };
    if (sort === 'price_asc') sortQuery = { price: 1 };
    if (sort === 'price_desc') sortQuery = { price: -1 };
    if (sort === 'title_asc') sortQuery = { title: 1 };
    if (search && sort === 'relevance') {
      sortQuery = { score: { $meta: 'textScore' } };
    }

    // ── Cap logic ──
    // Single category: cap at MAX_PER_CATEGORY
    // All products (no category, no search): sum of capped counts per category
    // Search: use raw count (search results are already filtered)
    const isSingleCategory = !!category && !search;
    const isAllProducts = !category && !search;

    let effectiveTotal: number;

    if (isSingleCategory) {
      const rawCount = await collection.countDocuments(query);
      effectiveTotal = Math.min(rawCount, MAX_PER_CATEGORY);
    } else if (isAllProducts) {
      // Sum of min(actual, 80) per category
      const cappedCounts = await getCategoryCounts(collection);
      effectiveTotal = cappedCounts.reduce((sum: number, c: any) => sum + c.count, 0);
    } else {
      // Search — use raw count
      effectiveTotal = await collection.countDocuments(query);
    }

    const totalPages = Math.ceil(effectiveTotal / limit);
    const safePage = Math.min(page, totalPages || 1);
    const skip = (safePage - 1) * limit;

    // Cap the limit so we never fetch beyond the effective total
    const maxSkip = isSingleCategory ? MAX_PER_CATEGORY : effectiveTotal;
    const effectiveLimit = Math.min(limit, maxSkip - skip);

    // If skip already past the cap, return empty
    if (skip >= maxSkip) {
      return NextResponse.json({
        products: [],
        pagination: { page: safePage, limit, total: effectiveTotal, totalPages, hasMore: false },
        categories: await getCategoryCounts(collection),
      });
    }

    // Find options for text search
    const findOptions: FindOptions = search
      ? { projection: { score: { $meta: 'textScore' } } }
      : {};

    // Execute
    const products = await collection
      .find(query, findOptions)
      .sort(sortQuery)
      .skip(skip)
      .limit(Math.max(effectiveLimit, 0))
      .toArray();

    // Category counts (also capped at MAX_PER_CATEGORY for display)
    const categoryCounts = await getCategoryCounts(collection);

    return NextResponse.json({
      products: products.map(p => ({ ...p, _id: p._id.toString() })),
      pagination: {
        page: safePage,
        limit,
        total: effectiveTotal,
        totalPages,
        hasMore: safePage * limit < effectiveTotal,
      },
      categories: categoryCounts,
    });

  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

/** Category counts capped at MAX_PER_CATEGORY each */
async function getCategoryCounts(collection: any) {
  const raw = await collection.aggregate([
    { $match: { wilkyart_category: { $in: VALID_CATEGORIES } } },
    { $group: { _id: '$wilkyart_category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]).toArray();

  return raw.map((c: any) => ({
    _id: c._id,
    count: Math.min(c.count, MAX_PER_CATEGORY),
  }));
}