"""
Remove camera/security products that don't belong in WILK YART catalog.
Run: python remove_cameras.py
"""
import json
import re

FILE = "products.json"

# Keywords to exclude
EXCLUDE_KEYWORDS = [
    "camera", "cctv", "surveillance", "security cam", "webcam",
    "dashcam", "dash cam", "ip cam", "nvr", "dvr", "security system",
    "video doorbell", "ring doorbell", "nest cam", "arlo",
    "smartphone", "cell phone", "mobile phone", "iphone", "galaxy s",
    "pixel phone", "android phone"
]

with open(FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

products = data["products"] if isinstance(data, dict) else data
original_count = len(products)

# Filter out unwanted products
def should_exclude(product):
    title = product.get("title", "").lower()
    desc = product.get("description", "").lower()
    text = f"{title} {desc}"
    
    for kw in EXCLUDE_KEYWORDS:
        if kw in text:
            print(f"  ❌ Removing: {product.get('title', '')[:60]}...")
            return True
    return False

filtered = [p for p in products if not should_exclude(p)]

# Re-index IDs
for i, p in enumerate(filtered, start=1):
    p["id"] = i

# Update categories
categories = sorted(set(
    p.get("subcategory") or p.get("category", "")
    for p in filtered
    if p.get("subcategory") or p.get("category")
))

# Save
if isinstance(data, dict):
    data["products"] = filtered
    data["categories"] = categories
    data["totalProducts"] = len(filtered)
else:
    data = {"products": filtered, "categories": categories, "totalProducts": len(filtered)}

with open(FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

removed = original_count - len(filtered)
print(f"\n✅ Done! Removed {removed} products")
print(f"   Before: {original_count} → After: {len(filtered)}")