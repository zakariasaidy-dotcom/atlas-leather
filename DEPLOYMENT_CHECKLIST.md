# ATLAS LEATHER - DEPLOYMENT CHECKLIST

## Pre-Deployment Phase

### 1. Code Preparation
- [ ] Run `npm run type-check` - Verify no TypeScript errors
- [ ] Run `npm run lint` - Check for linting issues
- [ ] Run `npm run build` - Test production build locally
- [ ] Commit all changes to git: `git add . && git commit -m "Ready for Vercel deployment"`
- [ ] Push to main branch: `git push origin main`

### 2. GitHub Repository Setup
- [ ] GitHub repository is public or Vercel has access to private repo
- [ ] GitHub account connected to Vercel
- [ ] Deploy key installed (automatic if using Vercel's GitHub app)

### 3. Supabase Preparation
- [ ] Supabase project created
- [ ] Get Project URL from Settings → API
- [ ] Get Anonymous Key from Settings → API (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] Get Service Role Key from Settings → API (SUPABASE_SERVICE_ROLE_KEY - KEEP SECRET)
- [ ] Database migrations have been tested locally
- [ ] RLS policies are properly configured:
  - [ ] users table has RLS enabled
  - [ ] orders table has RLS enabled
  - [ ] newsletter_subscribers table has RLS enabled (if exists)
  - [ ] contact_messages table has RLS enabled (if exists)

### 4. Stripe Setup
- [ ] Stripe account created (test and production mode)
- [ ] Test publishable key: `pk_test_...` (in development)
- [ ] Test secret key: `sk_test_...` (keep secret)
- [ ] Production publishable key: `pk_live_...`
- [ ] Production secret key: `sk_live_...` (keep secret)
- [ ] Webhook endpoint created at `/api/webhooks/stripe`
- [ ] Webhook events enabled: `payment_intent.succeeded`, `charge.refunded`
- [ ] Webhook signing secret obtained: `whsec_...`

### 5. PayPal Setup
- [ ] PayPal Business account created
- [ ] Sandbox Client ID obtained
- [ ] Sandbox Client Secret obtained
- [ ] Production Client ID obtained
- [ ] Production Client Secret obtained
- [ ] Webhook endpoint registered at `/api/webhooks/paypal`
- [ ] IPN webhook events enabled

### 6. Domain Setup (if using custom domain)
- [ ] Custom domain registered
- [ ] DNS records configured (if needed)
- [ ] Domain added to Vercel project

---

## Vercel Project Creation

### 7. Create Vercel Project
- [ ] Log in to [vercel.com](https://vercel.com)
- [ ] Click "Add New..." → "Project"
- [ ] Select GitHub repository (atlas-leather)
- [ ] Configure project:
  - Framework: Next.js (should auto-detect)
  - Build Command: `npm run build` (auto-filled)
  - Start Command: `npm start` (auto-filled)
  - Install Command: `npm install` (auto-filled)

### 8. Production Environment Variables
Add these to Vercel (Settings → Environment Variables):

**Supabase:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` → Your Supabase URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anonymous key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` → Service role key (Production only)

**Stripe:**
- [ ] `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` → Stripe publishable key (pk_live_...)
- [ ] `STRIPE_SECRET_KEY` → Stripe secret key (sk_live_...)
- [ ] `STRIPE_WEBHOOK_SECRET` → Stripe webhook secret (whsec_...)

**PayPal:**
- [ ] `NEXT_PUBLIC_PAYPAL_CLIENT_ID` → PayPal Client ID
- [ ] `PAYPAL_CLIENT_SECRET` → PayPal Client Secret
- [ ] `PAYPAL_ENV` → Set to `production` for live (or `sandbox` for testing)

**Site Configuration:**
- [ ] `NEXT_PUBLIC_SITE_URL` → Your production URL (e.g., https://atlas-leather.com)

**Optional:**
- [ ] `EXCHANGE_RATE_API_KEY` → Open Exchange Rates API key (optional)

### 9. Environment Variable Visibility
For each environment variable, select appropriate visibility:
- Variables starting with `NEXT_PUBLIC_` → Expose to client (safe, public)
- Variables WITHOUT `NEXT_PUBLIC_` → Server-only (secret, keep hidden)
- Select "Production" and "Preview" as needed
- Some (like `SUPABASE_SERVICE_ROLE_KEY`) should only be in "Production"

---

## Database Setup (Production Supabase)

### 10. Run Migrations on Production Database
Execute these SQL migrations in your production Supabase database:

**In Supabase Dashboard → SQL Editor:**

1. **Initial Schema** - Run `supabase/migrations/001_initial_schema.sql`
   - Creates: users, orders, order_items, wishlist_items, newsletter_subscribers, contact_messages tables

2. **RLS Policies** - Run `supabase/migrations/002_rls_policies.sql`
   - Configures Row Level Security for data access control

3. **Seed Data** (optional) - Run `supabase/migrations/003_seed_data.sql`
   - Adds sample data for testing (optional for production)

**Verification:**
- [ ] All tables created successfully
- [ ] RLS policies enabled on all tables
- [ ] Test access with different user roles

### 11. Test Supabase Connection
From Vercel deployment:
- [ ] Visit application URL
- [ ] Navigation loads without errors
- [ ] Check browser console for connection errors

---

## Webhook Configuration

### 12. Stripe Webhooks
In Stripe Dashboard (https://dashboard.stripe.com/webhooks):

1. Create webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - [ ] `payment_intent.succeeded`
     - [ ] `charge.refunded`
     - [ ] `charge.dispute.created`
   - [ ] Copy webhook signing secret
   - [ ] Add to Vercel as `STRIPE_WEBHOOK_SECRET`

2. Test webhook:
   - Use Stripe CLI locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Trigger test event in Stripe Dashboard

### 13. PayPal Webhooks
In PayPal Developer (https://developer.paypal.com/dashboard):

1. Create webhook endpoint:
   - Listener URL: `https://your-domain.com/api/webhooks/paypal`
   - Events to listen for:
     - [ ] `PAYMENT.SALE.COMPLETED`
     - [ ] `PAYMENT.SALE.DENIED`
     - [ ] `PAYMENT.SALE.REFUNDED`

2. Test webhook in PayPal sandbox

### 14. Update Webhook URLs in Code
- [ ] Update Stripe webhook URL in environment
- [ ] Update PayPal webhook URL in environment
- [ ] Test webhook delivery in both dashboards

---

## First Deployment

### 15. Initial Deployment
- [ ] Push changes: `git push origin main`
- [ ] Vercel automatically builds and deploys
- [ ] Monitor deployment in Vercel Dashboard
- [ ] Check build logs for errors

### 16. Smoke Tests (Immediate Post-Deployment)
- [ ] Open production URL in browser
- [ ] [ ] Home page loads without errors
- [ ] [ ] Navigation works
- [ ] [ ] Product pages load
- [ ] [ ] Shopping cart functions
- [ ] [ ] Checkout process starts
- [ ] [ ] No console errors (F12 → Console tab)

### 17. Database Connection Test
- [ ] Try creating an account (signup page)
- [ ] Verify user is created in Supabase
- [ ] Log in with new account
- [ ] Check Supabase dashboard for new user record

### 18. Payment Gateway Test
- [ ] Test Stripe payment (use test card: 4242 4242 4242 4242)
- [ ] Test PayPal (use sandbox account)
- [ ] Test COD (Cash on Delivery)
- [ ] Verify orders appear in Supabase orders table

### 19. Webhook Test
- [ ] Complete a test payment
- [ ] Verify webhook is received (check Stripe/PayPal dashboard)
- [ ] Verify order status is updated in database

---

## Production Verification

### 20. Security Checks
- [ ] All sensitive keys are environment variables (not hardcoded)
- [ ] No console.log statements logging sensitive data
- [ ] HTTPS enforced (Vercel default)
- [ ] CORS configured correctly
- [ ] RLS policies prevent unauthorized access

### 21. Performance Checks
- [ ] Page load time < 3s (check Vercel Analytics)
- [ ] No unhandled JavaScript errors
- [ ] Images are optimized (next/image)
- [ ] API endpoints respond quickly

### 22. Email Verification (if applicable)
- [ ] Test contact form emails
- [ ] Test order confirmation emails
- [ ] Test newsletter signup emails
- [ ] Check spam folder

### 23. DNS Setup (for custom domain)
- [ ] Add custom domain in Vercel Settings
- [ ] Configure DNS records (A, CNAME, or NS)
- [ ] Verify domain is pointing to Vercel
- [ ] SSL certificate auto-generated (within 24-48h)

---

## Post-Deployment

### 24. Monitoring Setup
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry/similar - optional)
- [ ] Monitor payment processing
- [ ] Check daily logs for errors

### 25. Backup Strategy
- [ ] Enable Supabase automatic backups
- [ ] Set backup retention policy
- [ ] Test backup restoration process
- [ ] Document recovery procedure

### 26. Documentation
- [ ] Document all environment variables
- [ ] Create runbook for common issues
- [ ] Document deployment rollback process
- [ ] Share access credentials with team (securely)

### 27. Team Collaboration
- [ ] Grant Vercel access to relevant team members
- [ ] Set up GitHub branch protection rules
- [ ] Configure Vercel deployment previews for PRs
- [ ] Establish deployment approval process (if needed)

---

## Troubleshooting Checklist

If deployment fails or site doesn't work:

### Build Failures
- [ ] Check Vercel build logs (Deployments tab)
- [ ] Run `npm run build` locally to reproduce
- [ ] Verify all environment variables are set
- [ ] Check for TypeScript errors: `npm run type-check`

### Runtime Errors
- [ ] Check Vercel Function logs (Runtime tab)
- [ ] Check browser console (F12)
- [ ] Check Vercel error tracking
- [ ] Review recent code changes

### Database Issues
- [ ] Verify Supabase credentials in environment variables
- [ ] Test connection: visit app home page
- [ ] Check Supabase database logs
- [ ] Verify RLS policies allow expected access

### Payment Issues
- [ ] Verify Stripe/PayPal credentials
- [ ] Check webhook configuration
- [ ] Review webhook logs in Stripe/PayPal dashboard
- [ ] Test with test credentials first

---

## Rollback Procedure

If you need to rollback to a previous version:

1. In Vercel Dashboard → Deployments
2. Find the previous stable deployment
3. Click "..." menu → "Redeploy"
4. Or revert GitHub commit and push (Vercel will auto-redeploy)

---

## Success Criteria

Your deployment is successful when:

- ✅ Application accessible at production URL
- ✅ All pages load without errors
- ✅ User authentication works (signup/login)
- ✅ Products display correctly
- ✅ Shopping cart functions
- ✅ Stripe payments work (use test card)
- ✅ PayPal payments work (use sandbox)
- ✅ COD option available in Morocco
- ✅ Webhooks receive order events
- ✅ Orders saved to Supabase database
- ✅ No sensitive data in logs
- ✅ Performance is acceptable (< 3s load time)

---

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Stripe Integration**: https://stripe.com/docs/integration/stripe-js
- **PayPal Integration**: https://developer.paypal.com/docs/integration
