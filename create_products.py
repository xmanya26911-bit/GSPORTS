import json, urllib.request, time, sys

BASE = "https://goldenwillowe.vercel.app"

products = [
    # (name, image_filename, brand, price)
    ("PowerPro", "powerpro.png", "Golden Willowe", "₹13,999"),
    ("NaturalSeries", "naturalseries.png", "Golden Willowe", "₹8,999"),
    ("ProfessionalDesign", "professionaldesign.png", "Golden Willowe", "₹14,500"),
    ("Premium Collection", "premiumcollection.png", "Golden Willowe", "₹18,999"),
    ("Gold Series", "goldseries.png", "Golden Willowe", "₹11,500"),
    ("Signature Edition", "signatureedition.png", "Golden Willowe", "₹15,999"),
    ("Power Series", "powerseries.png", "Golden Willowe", "₹10,500"),
    ("Ergonomic Handel", "ergonomichandel.png", "Golden Willowe", "₹12,500"),
    ("Retail Display", "retaildisplay.png", "Golden Willowe", "₹9,999"),
    ("Classic Range", "classicrange.png", "Golden Willowe", "₹6,999"),
    ("Signature Duo", "signatureduo.png", "Golden Willowe", "₹22,999"),
    ("Professional Edge", "professionaledge.png", "Golden Willowe", "₹13,500"),
    ("Craftman Series", "craftmanseries.png", "Golden Willowe", "₹7,999"),
    ("Premium Bat Kit", "premiumbatkit.png", "Golden Willowe", "₹16,999"),
    ("Premium Blade", "premiumblade.png", "Golden Willowe", "₹14,999"),
    ("Master Craft", "mastercraft.png", "Golden Willowe", "₹12,999"),
    ("Power Elite", "powerelite.png", "Golden Willowe", "₹15,500"),
]

def api_call(url, data, timeout=120):
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode(),
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        return {"error": f"HTTP {e.code}: {body[:200]}"}
    except Exception as e:
        return {"error": str(e)}

created = []
failed = []

for name, img, brand, price in products:
    print(f"\n=== {name} ===")

    # Step 1: AI generate content
    print(f"  Generating AI content...")
    ai_result = api_call(f"{BASE}/api/ai/generate", {
        "productName": name + " Cricket Bat",
        "brand": brand,
        "price": price
    }, timeout=120)

    if "error" in ai_result and not ai_result.get("content"):
        # Check if error response still has fallback content
        print(f"  ⚠ AI gen issue, using fallback")
        # Use a basic fallback
        content = {
            "description": f"The {name} Cricket Bat by Golden Willowe Sports represents the pinnacle of Kashmiri craftsmanship. Handcrafted from premium willow, this bat is designed for cricketers who demand the best. Every bat undergoes rigorous quality checks to ensure consistent performance, superior feel, and long-lasting durability. From the selection of raw willow to the final finishing touches, each step is performed by master craftsmen with over 15 years of experience, making it a trusted choice for 10000+ happy customers across India.",
            "features": [
                f"Premium {name.lower()} design handcrafted for superior performance",
                "Made from hand-selected premium willow for optimal strength",
                "Expertly shaped by skilled Kashmiri craftsmen with 15+ years experience",
                "Balanced weight distribution for powerful, controlled strokes",
                "Comfortable grip handle for maximum bat control",
                "Factory-direct pricing — premium quality without middlemen",
                "6-month quality guarantee with dedicated customer support",
                "Free delivery across India in 3-5 business days",
            ],
            "specifications": [
                {"label": "Brand", "value": "Golden Willowe"},
                {"label": "Model", "value": name},
                {"label": "Category", "value": "Cricket Bat"},
                {"label": "Material", "value": "Premium Willow"},
                {"label": "Origin", "value": "Kashmir, India"},
                {"label": "Warranty", "value": "6 months"},
                {"label": "Craftsmanship", "value": "Handcrafted"},
                {"label": "Customers Served", "value": "10000+"},
            ],
            "highlights": ["Premium Willow", "Handcrafted", "Kashmir Made", "Factory Direct", "Quality Guaranteed"],
            "faqs": [
                {"question": "What makes this bat special?", "answer": f"The {name} is handcrafted by skilled artisans in Kashmir using premium materials, ensuring exceptional quality and performance."},
                {"question": "Is this suitable for professional play?", "answer": "Absolutely. Our bats are trusted by players across all levels, from club cricket to professional tournaments."},
                {"question": "How long does delivery take?", "answer": "We deliver across India within 3-5 business days via trusted courier partners."},
                {"question": "What is the warranty period?", "answer": "All Golden Willowe bats come with a 6-month warranty against manufacturing defects."},
                {"question": "Can I visit the workshop?", "answer": "Yes! Visit our workshop in Khanda, Srinagar to see our bats being handcrafted."},
            ],
        }
    elif "error" in ai_result and ai_result.get("content"):
        print(f"  ⚠ Using fallback content (AI error)")

    content = ai_result.get("content", {})
    print(f"  ✓ Content: {len(content.get('description',''))} chars, "
          f"{len(content.get('features',[]))} features, "
          f"{len(content.get('specifications',[]))} specs")

    # Step 2: Create product
    desc = content.get("description", f"Premium {name} Cricket Bat by Golden Willowe Sports, handcrafted in Kashmir.")
    features = content.get("features", [])
    specs = content.get("specifications", [])
    highlights = content.get("highlights", [])
    faqs = content.get("faqs", [])

    product_data = {
        "name": name + " Cricket Bat",
        "brand": brand,
        "category": "Cricket",
        "description": desc,
        "images": [f"{BASE}/images/{img}"],
        "price": price,
        "features": features[:10],
        "specifications": specs,
        "highlights": highlights[:6],
        "faqs": faqs,
    }

    print(f"  Creating product...")
    result = api_call(f"{BASE}/api/products/create", product_data, timeout=30)

    if result.get("success"):
        print(f"  ✓ LIVE → {result.get('storeUrl','/products')}")
        created.append(name)
    else:
        err = result.get("errors", result.get("error", "unknown"))
        print(f"  ✗ Create failed: {err}")
        failed.append(name)

    time.sleep(2)  # rate limit buffer

print(f"\n\n========== SUMMARY ==========")
print(f"Created: {len(created)}/17")
for c in created:
    print(f"  ✓ {c}")
if failed:
    print(f"Failed: {len(failed)}/17")
    for f in failed:
        print(f"  ✗ {f}")
