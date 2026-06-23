# Atlas Leather — Project Analysis & Issues Report

## Executive Summary
**Project Status**: Good foundation with critical missing pieces
**Severity**: Medium (Missing configuration, incomplete database, missing endpoints)
**Priority**: Fix environment setup → Database → Missing endpoints → Code improvements

---

## 🔴 CRITICAL ISSUES

### 1. **Missing Environment Variables Documentation**
**Location**: Project root  
**Issue**: No `.env.example` or documentation of required environment variables
**Impact**: Developers cannot set up the project without guessing what's needed

**Required Variables**:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_ENV=sandbox

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Fix**: Create [`.env.example`](.env.example) file

---

### 2. **Missing Newsletter API Route**
**Location**: `src/app/api/newsletter/route.ts` (doesn't exist)
**Issue**: Header component and data likely use newsletter subscription, but endpoint missing
**Impact**: Newsletter subscriptions will fail silently

**Fix**: Create the API route

---

### 3. **Missing Validations Folder Implementation**
**Location**: `src/lib/validations/` (empty directory)
**Issue**: No Zod schemas for reusable validation (forms reference contact validation inline)
**Impact**: Code duplication, hard to maintain form validation logic

**Fix**: Create reusable validation schemas

---

### 4. **Incomplete Database Migrations**
**Location**: `supabase/migrations/003_seed_data.sql`
**Issue**: Newsletter subscriber and contact message tables need RLS enabling, but table definitions are incomplete
**Impact**: Newsletter features won't work after migration

**Fix**: Complete the schema with all required tables

---

### 5. **Missing Cart Store Property**
**Location**: `src/store/cart.store.ts`
**Issue**: `getTotalItems()` exists but no method to calculate subtotal before checkout
**Impact**: Calculations in checkout may be inconsistent

**Fix**: Already has `getTotalPrice()`, but ensure consistency

---

### 6. **Form Component Helper Missing**
**Location**: `src/app/(shop)/paiement/page.tsx` (line ~195)
**Issue**: Code references `Field` and `inputClass` components/functions that aren't imported
**Impact**: Payment page will have runtime errors

**Fix**: Create or import missing form helpers

---

### 7. **Stripe Webhook Issue**
**Location**: `src/app/api/webhooks/stripe/route.ts`
**Issue**: Using hardcoded API version `2024-12-18.acacia` - may be unstable
**Impact**: Stripe API changes could break webhook handling

**Fix**: Use flexible versioning or latest stable

---

### 8. **PayPal Currency Conversion Hardcoded**
**Location**: `src/app/api/checkout/paypal/route.ts` (line ~35)
**Issue**: Hardcoded conversion rate `1 MAD = 10.8 USD` is inaccurate and static
**Impact**: Prices sent to PayPal won't reflect real exchange rates

**Fix**: Use real-time exchange rate API

---

### 9. **Missing Blog Post Routes Implementation**
**Location**: `src/app/(marketing)/blog/[slug]/page.tsx`
**Issue**: Blog routes structure exists but content fetching not implemented
**Impact**: Blog page will not render correctly

**Fix**: Implement data fetching

---

### 10. **README is Empty**
**Location**: `readme.md`
**Issue**: No setup instructions, project overview, or deployment guide
**Impact**: Contributors/maintainers don't know how to work on project

**Fix**: Create comprehensive README

---

## 🟡 IMPORTANT ISSUES

### 11. **Missing Order Status Update Endpoint**
**Issue**: No API to update order status after payment confirmation
**Impact**: Orders stay in "en_attente" status forever

**Fix**: Create `src/app/api/orders/[id]/status/route.ts`

---

### 12. **Admin Functions Missing**
**Issue**: No admin area to manage orders, products, testimonials
**Impact**: Cannot manage business operations

**Fix**: Create admin dashboard (separate issue)

---

### 13. **Wishlist Persistence Not Synced to Database**
**Location**: `src/store/wishlist.store.ts`
**Issue**: Wishlist uses localStorage only, never synced to Supabase for authenticated users
**Impact**: Wishlist lost on new device/browser

**Fix**: Implement Supabase sync for logged-in users

---

### 14. **No Error Boundary or Fallback Components**
**Issue**: No global error handling or custom error pages beyond 404
**Impact**: Crashes show blank screen to users

**Fix**: Create `error.tsx` and global error handling

---

### 15. **Missing Security Headers Review**
**Location**: `next.config.js`
**Issue**: CORS headers not configured, CSP missing
**Impact**: Potential security vulnerabilities

**Fix**: Add comprehensive security headers

---

## 🟢 CODE QUALITY ISSUES

### 16. **Cart ID Generation Inconsistency**
**Location**: `src/store/cart.store.ts` (line ~24)
**Issue**: ID uses color name with replace, but should use consistent slug
```javascript
// Current (fragile):
const id = `${newItem.productId}-${newItem.color.replace(/\s/g, "-").toLowerCase()}`;
// Better:
const id = `${newItem.productId}-${slugify(newItem.color)}`;
```

### 17. **Order Number Generation is Client-Side**
**Location**: `src/lib/utils.ts` (generateOrderNumber)
**Issue**: Using client-side randomization for order numbers creates collision risk
**Impact**: Potential duplicate order numbers

**Fix**: Generate server-side in database trigger

### 18. **Magic Strings in Multiple Places**
**Issue**: Route paths, payment methods hardcoded throughout
**Fix**: Create constants file for routes and payment methods

### 19. **No Loading States for Some Operations**
**Issue**: Product listing, wishlist toggle have no loading indicators
**Impact**: Poor UX, users don't know if action completed

### 20. **TypeScript Strict Mode Issues**
**Issue**: Some files use `!` non-null assertion excessively
**Impact**: Potential runtime errors

---

## 📋 SUMMARY OF FIXES NEEDED

| # | Issue | File(s) | Severity | Effort |
|---|-------|---------|----------|--------|
| 1 | Missing .env.example | Project root | 🔴 Critical | 15 min |
| 2 | Newsletter route | `src/app/api/newsletter/` | 🔴 Critical | 30 min |
| 3 | Validation schemas | `src/lib/validations/` | 🔴 Critical | 45 min |
| 4 | Form helpers | `src/components/form/` | 🔴 Critical | 30 min |
| 5 | Complete DB schema | `supabase/migrations/` | 🔴 Critical | 60 min |
| 6 | README documentation | `readme.md` | 🔴 Critical | 45 min |
| 7 | Order status endpoint | `src/app/api/orders/` | 🟡 Important | 30 min |
| 8 | Blog implementation | `src/app/(marketing)/blog/` | 🟡 Important | 60 min |
| 9 | PayPal currency | `src/app/api/checkout/paypal/` | 🟡 Important | 45 min |
| 10 | Wishlist sync | `src/store/wishlist.store.ts` | 🟡 Important | 60 min |
| 11 | Error boundaries | `src/app/` | 🟡 Important | 45 min |
| 12 | Security headers | `next.config.js` | 🟡 Important | 30 min |
| 13 | Cart ID consistency | `src/store/cart.store.ts` | 🟢 Quality | 15 min |
| 14 | Order number generation | `src/lib/utils.ts` | 🟢 Quality | 45 min |
| 15 | Constants file | `src/lib/constants.ts` | 🟢 Quality | 30 min |

---

## Next Steps (In Priority Order)

1. **FIRST**: Set up environment variables (`.env.example`)
2. **THEN**: Complete database schema and migrations
3. **THEN**: Implement missing API routes (Newsletter, Order Status)
4. **THEN**: Create form helpers and validation schemas
5. **THEN**: Write comprehensive README
6. **FINALLY**: Implement nice-to-have features (admin, analytics, etc.)

