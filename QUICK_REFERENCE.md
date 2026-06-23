# Atlas Leather — Quick Reference Guide

Quick answers to common questions during development.

---

## 🚀 Getting Started (5 min checklist)

```bash
# 1. Clone and install
git clone <repo>
cd atlas-leather
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 3. Setup database
npx supabase link --project-id your-id
npx supabase db push

# 4. Start dev server
npm run dev
# Visit http://localhost:3000
```

---

## 📁 Where to Find Things

| What | Where |
|------|-------|
| Product types | `src/types/index.ts` |
| API routes | `src/app/api/` |
| Page components | `src/app/(group)/route/page.tsx` |
| Reusable components | `src/components/` |
| Form validation | `src/lib/validations/schemas.ts` |
| Constants/magic strings | `src/lib/constants.ts` |
| Store (cart, wishlist) | `src/store/` |
| Tailwind colors | `tailwind.config.ts` |
| Database schemas | `supabase/migrations/` |

---

## 🔧 Common Tasks

### Add a New Product Category

1. Update enum in `supabase/migrations/001_initial_schema.sql`
2. Add to `ProductCategory` type in `src/types/index.ts`
3. Add label to `PRODUCT_CATEGORIES` in `src/lib/constants.ts`
4. Add to category labels in same file
5. Run `npm run db:types`

### Create a New API Endpoint

```typescript
// src/app/api/feature/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  // validation schema
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    
    // Your logic here
    
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
```

### Add Form Validation

1. Add schema to `src/lib/validations/schemas.ts`
2. Import in component: `import { yourSchema } from "@/lib/validations/schemas"`
3. Use with react-hook-form:
```typescript
const { register, formState: { errors } } = useForm({
  resolver: zodResolver(yourSchema),
});
```

### Add a New Page

```typescript
// src/app/(group)/feature/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feature Title",
  description: "Feature description",
};

export default function FeaturePage() {
  return <div>Feature content</div>;
}
```

### Update Database Schema

```bash
# 1. Create migration
npx supabase migration new migration_name

# 2. Edit supabase/migrations/XXXXXX_migration_name.sql

# 3. Push changes
npx supabase db push

# 4. Generate types
npm run db:types
```

---

## 🧪 Testing

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Run tests (when set up)
npm test
```

---

## 🎨 Styling

### Color Usage

```javascript
// From tailwind.config.ts
cream-100     // Main background
ink           // Main text
sand-300      // Accents
leather-100   // Muted elements
gold          // Highlights
```

### Common Classes

```html
<!-- Container -->
<div className="container-premium">

<!-- Section -->
<section className="py-12 lg:py-20">

<!-- Heading -->
<h1 className="font-serif text-display-sm text-ink">

<!-- Button -->
<button className="btn-primary"> or btn-outline or btn-secondary
```

---

## 🛒 Cart Store Usage

```typescript
import { useCartStore } from "@/store/cart.store";

const {
  items,
  isOpen,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  getTotalPrice,
  getTotalItems,
} = useCartStore();

// Add item
addItem({
  productId: "123",
  slug: "product-name",
  name: "Product Name",
  price: 1000,
  image: "https://...",
  color: "Cognac",
  colorHex: "#A8703E",
  quantity: 1,
  stock: 10,
});

// Get totals
const total = getTotalPrice();
const count = getTotalItems();
```

---

## 💳 Payment Methods

### Stripe
- **File**: `src/app/api/checkout/stripe/route.ts`
- **Dashboard**: https://dashboard.stripe.com
- **Keys**: In `.env.local` (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

### PayPal
- **File**: `src/app/api/checkout/paypal/route.ts`
- **Dashboard**: https://developer.paypal.com
- **Keys**: In `.env.local` (PAYPAL_CLIENT_SECRET, NEXT_PUBLIC_PAYPAL_CLIENT_ID)
- **⚠️ TODO**: Replace hardcoded exchange rate with real-time rate

### Cash on Delivery (COD)
- **File**: `src/app/api/checkout/cod/route.ts`
- **Availability**: Morocco only
- **Status**: Sets order to "confirmee" immediately

---

## 🔒 Authentication

### Protected Routes

Protected routes require authentication middleware check:

```typescript
// In middleware.ts
const protectedRoutes = ["/compte"];
if (isProtectedRoute && !user) {
  redirect("/connexion?redirect=" + currentPath);
}
```

Protected routes:
- `/compte` - Account dashboard
- `/compte/commandes` - Order history
- `/compte/wishlist` - Wishlist (saved for later)

---

## 📊 Database Tables

| Table | Purpose |
|-------|---------|
| profiles | User profiles (extends auth.users) |
| products | Catalog |
| orders | All orders |
| wishlists | Saved products |
| testimonials | Customer reviews |
| blog_posts | Blog content |
| contact_messages | Contact form submissions |
| newsletter_subscribers | Email list |

---

## 🐛 Debugging

### Check Types
```bash
npm run type-check
```

### Check Lint
```bash
npm run lint
```

### View Supabase Logs
```bash
npx supabase logs --project-id your-id
```

### Test API Route
```bash
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Browser DevTools
- Network tab → check API responses
- Console → check error messages
- Application → LocalStorage (cart, wishlist)

---

## 📝 Environment Variables Needed

**Must Have:**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_STRIPE_PUBLIC_KEY
- STRIPE_SECRET_KEY

**Should Have:**
- NEXT_PUBLIC_PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- NEXT_PUBLIC_SITE_URL

**Optional:**
- RESEND_API_KEY (for emails)
- EXCHANGE_RATE_API_KEY (for real-time rates)

---

## 🚨 Common Issues & Fixes

### Issue: "Type error: Cannot find module"
**Fix**: Run `npm run db:types` to regenerate types from Supabase

### Issue: "Supabase connection failed"
**Fix**: Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local

### Issue: "Cart not persisting"
**Fix**: Check localStorage is enabled and not in private/incognito mode

### Issue: "Stripe payment failing"
**Fix**: 
1. Check STRIPE_SECRET_KEY is set
2. Verify webhook secret in Stripe dashboard
3. Check payment method is allowed in Stripe settings

### Issue: "PayPal amounts incorrect"
**Fix**: Update exchange rate in `src/lib/exchange-rates.ts` or use real-time API

### Issue: "Form validation not showing"
**Fix**: Ensure Field component is imported and error prop is passed

---

## 📚 Quick Links

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Integration**: https://stripe.com/docs/payments
- **PayPal Integration**: https://developer.paypal.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 💡 Best Practices

1. **Always validate input** - Use Zod schemas
2. **Error handling** - Try/catch with proper HTTP codes
3. **Type safety** - Enable TS strict mode
4. **Git commits** - Clear, descriptive messages
5. **Comments** - Document why, not what
6. **Constants** - Use `src/lib/constants.ts`
7. **Imports** - Use path aliases (`@/...`)
8. **Components** - Keep small, reusable
9. **Stores** - Use Zustand for global state
10. **Databases** - Always run migrations before pushing

---

## 🆘 Getting Help

1. Check [PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md) for known issues
2. Check [FIXES_APPLIED.md](FIXES_APPLIED.md) for what's been fixed
3. Read [readme.md](readme.md) for project overview
4. Check error messages in browser console
5. Check Supabase dashboard for database issues

---

**Last Updated**: December 23, 2024  
**Version**: 1.0

