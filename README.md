# Atlas Leather — Maroquinerie Artisanale Marocaine

Premium handcrafted leather goods e-commerce platform built with modern technologies.

🎯 **Live Site**: [atlasleather.ma](https://atlasleather.ma)

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Features](#features)
- [API Routes](#api-routes)
- [Known Issues](#known-issues)

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS + CSS Modules
- **Database**: Supabase (PostgreSQL + Auth)
- **Payment**: Stripe, PayPal, Cash on Delivery
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Animation**: Framer Motion
- **UI Components**: Radix UI
- **Type Safety**: TypeScript 5.7

---

## 📁 Project Structure

```
atlas-leather/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (account)/         # Protected account routes
│   │   ├── (auth)/            # Auth routes (login/signup)
│   │   ├── (marketing)/       # Marketing routes (blog, contact, about)
│   │   ├── (shop)/            # Shop routes (cart, checkout, products)
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── checkout/      # Payment processing (Stripe, PayPal, COD)
│   │   │   ├── contact/       # Contact form submissions
│   │   │   ├── newsletter/    # Newsletter subscriptions
│   │   │   ├── products/      # Product data
│   │   │   ├── orders/        # Order management
│   │   │   └── webhooks/      # Stripe/PayPal webhooks
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── account/           # Account page components
│   │   ├── cart/              # Shopping cart
│   │   ├── form/              # Form utilities (Field, inputs)
│   │   ├── home/              # Homepage sections
│   │   ├── layout/            # Header, Footer
│   │   ├── product/           # Product detail pages
│   │   ├── shop/              # Shop page components
│   │   ├── shared/            # Reusable components (ProductCard)
│   │   └── ui/                # Radix UI wrapped components
│   ├── lib/
│   │   ├── supabase/          # Supabase clients (client, server, admin)
│   │   ├── validations/       # Zod schemas for all forms
│   │   ├── utils.ts           # Helper utilities
│   │   ├── constants.ts       # App constants (coming soon)
│   │   └── stripe/, paypal/   # Payment service utilities
│   ├── store/                 # Zustand stores
│   │   ├── cart.store.ts      # Shopping cart state
│   │   └── wishlist.store.ts  # Wishlist state
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── data/
│   │   └── products.ts        # Demo/static product data
│   ├── middleware.ts          # Auth middleware
│   ├── hooks/                 # Custom React hooks (coming soon)
│   └── public/                # Static assets
├── supabase/
│   └── migrations/            # Database migrations
│       ├── 001_initial_schema.sql
│       ├── 002_rls_policies.sql
│       └── 003_seed_data.sql
├── .env.example               # Environment variables template
├── .eslintrc.json             # ESLint config
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── postcss.config.js          # PostCSS config
└── package.json               # Dependencies

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- Stripe account (for payments)
- PayPal developer account (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/atlas-leather.git
cd atlas-leather
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your actual credentials (see [Environment Variables](#environment-variables))

4. **Set up Supabase**
```bash
npx supabase link --project-id your-project-id
npx supabase db push  # Applies migrations from supabase/migrations/
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (secret, for API routes)

### Stripe
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - Stripe publishable key (public)
- `STRIPE_SECRET_KEY` - Stripe secret key (keep secret!)
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (from Stripe dashboard)

### PayPal
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - PayPal client ID (public)
- `PAYPAL_CLIENT_SECRET` - PayPal secret (keep secret!)
- `PAYPAL_ENV` - Set to `sandbox` for testing, `production` for live

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - Your site URL (used in payment redirects)

---

## 🗄️ Database Setup

### Initial Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Link your local environment:
```bash
npx supabase link --project-id your-project-id
```

3. Apply migrations:
```bash
npx supabase db push
```

### Running Migrations

Migrations are in `supabase/migrations/`:
1. `001_initial_schema.sql` - Creates tables and types
2. `002_rls_policies.sql` - Sets up Row Level Security
3. `003_seed_data.sql` - Inserts sample data

### Creating New Migrations

```bash
npx supabase migration new migration_name
# Edit the new file in supabase/migrations/
npx supabase db push
```

### Generating TypeScript Types

Update database types after schema changes:
```bash
npm run db:types
```

This generates `src/types/database.types.ts` from your Supabase schema.

---

## 💻 Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checker
npm run type-check

# Run ESLint
npm run lint

# Generate Supabase types
npm run db:types
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint configured
- **Formatting**: Prettier (configure in VS Code settings)

### Adding New Features

1. **Create API Route**: Add to `src/app/api/`
2. **Create Validation Schema**: Add to `src/lib/validations/schemas.ts`
3. **Create Components**: Add to `src/components/`
4. **Update Types**: Edit `src/types/index.ts` if needed
5. **Use Zustand Store**: Create in `src/store/` if needed

---

## 📦 Deployment

### Vercel (Recommended) — ⭐ Fully Automated

**For complete step-by-step instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

Quick start:
1. Push to GitHub repo
2. GitHub Actions automatically deploys to Vercel on each push to `main`
3. Monitor deployment in **GitHub Actions** tab
4. View live site at `https://atlas-leather.vercel.app`

**Setup required (one-time):**
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Link project (creates .vercel folder)
vercel link

# 3. Add GitHub secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
# See DEPLOYMENT_GUIDE.md Step 2-3

# 4. Set environment variables on Vercel dashboard
# See DEPLOYMENT_GUIDE.md Step 4
```

After setup, every `git push origin main` automatically deploys!

### Manual Deploy Script

```bash
# Deploy production immediately (requires VERCEL_TOKEN)
npm run deploy:vercel
```

### Self-Hosted

```bash
npm run build
npm start
```

### Important: Pre-Deployment Checklist

Before deploying to production:
- [ ] All environment variables set on Vercel (see `.env.example`)
- [ ] Database migrations applied to production Supabase
- [ ] Stripe/PayPal webhooks configured for production URLs
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Test payment flow in staging first
- [ ] Custom domain configured (if applicable)

---

## ✨ Features

### Currently Implemented
- ✅ Product catalog with filtering & search
- ✅ Shopping cart (localStorage + Zustand)
- ✅ Wishlist functionality
- ✅ Multiple payment methods (Stripe, PayPal, COD)
- ✅ User authentication (Supabase)
- ✅ Order management
- ✅ Contact form
- ✅ Newsletter signup
- ✅ Blog (structure in place, content TBD)
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support

### Coming Soon
- 🚧 Admin dashboard
- 🚧 Order tracking
- 🚧 Product reviews & ratings
- 🚧 Email notifications (Resend)
- 🚧 Analytics & reporting
- 🚧 Inventory management
- 🚧 Discount codes & promotions
- 🚧 Mobile app (React Native)

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user

### Products
- `GET /api/products` - Get products (with filters)
  - Query params: `categorie`, `genre`, `tri`, `limit`

### Checkout
- `POST /api/checkout/stripe` - Create Stripe session
- `POST /api/checkout/paypal` - Create PayPal order
- `POST /api/checkout/cod` - Create COD order

### Orders
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]/status` - Update order status (admin only)

### Other
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter` - Unsubscribe from newsletter
- `POST /api/webhooks/stripe` - Stripe webhook handler

---

## 🐛 Known Issues & Fixes

See [PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md) for detailed issues and planned fixes.

### Quick Fixes Needed
1. [ ] PayPal uses static exchange rate (should be real-time)
2. [ ] Blog content implementation
3. [ ] Order tracking page
4. [ ] Admin dashboard
5. [ ] Email notifications

---

## 📚 Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Make your changes
3. Commit with clear messages (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

Proprietary - Atlas Leather © 2024

---

## 📞 Support

- **Email**: support@atlasleather.ma
- **WhatsApp**: +212 6 00 00 00 00 (from `.env`)
- **Instagram**: [@atlasleather.ma](https://instagram.com/atlasleather.ma)

---

**Last Updated**: 2024-12-23  
**Version**: 1.0.0 (Beta)
