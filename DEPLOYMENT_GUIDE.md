# 🚀 Vercel Deployment Guide — Atlas Leather

**Complete step-by-step guide to deploy on Vercel with GitHub Actions automation**

---

## 📋 Prerequisites

- ✅ GitHub repository created and pushed (already done)
- ✅ Vercel account (free tier OK) — [Sign up](https://vercel.com/signup)
- ✅ GitHub token access to repository
- ✅ Supabase project configured

---

## 🔧 Step 1: Create Vercel Project & Get Credentials

### Option A: Link via CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel (opens browser)
vercel login

# 3. Link project (this creates .vercel folder)
vercel link
# Choose: Create a new project
# Answer prompts:
#   - Project name: atlas-leather
#   - Framework: Next.js
#   - Root directory: ./
#   - Build command: npm run build
#   - Output directory: .next
```

✅ After this, you can find credentials in Vercel dashboard

### Option B: Use Vercel Dashboard (Manual)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import from GitHub → Select `atlas-leather` repo
4. Configure:
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
5. Don't add environment variables yet (we'll do this in GitHub)
6. **Deploy** (this creates the project)

---

## 🔑 Step 2: Get Vercel Credentials

### Find `VERCEL_TOKEN`

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create"**
3. Name: `github-atlas-leather`
4. Choose scope: **"Full Account"** (or specific project)
5. Expiration: No expiration (or 1 year)
6. **Copy the token** (shown once only!) ⚠️

### Find `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **atlas-leather** project
3. Go to **Settings** tab
4. Copy:
   - **Project ID**: Listed under "Project Settings"
   - **Team/Organization ID**: Go to Team Settings if applicable, or use Personal account ID

**Or get them from `.vercel/project.json`** (after running `vercel link` locally):

```bash
cat .vercel/project.json
# Output:
# {
#   "projectId": "prj_xxxxx",
#   "orgId": "team_xxxxx"  (or "your_username")
# }
```

---

## 📝 Step 3: Add GitHub Secrets

### Go to Repository Settings

1. Go to **GitHub repo** → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**

### Add Three Secrets

**Secret 1: VERCEL_TOKEN**
- **Name**: `VERCEL_TOKEN`
- **Value**: (paste from Step 2)
- Click **"Add secret"**

**Secret 2: VERCEL_ORG_ID**
- **Name**: `VERCEL_ORG_ID`
- **Value**: (your org/team ID from Step 2)
- Click **"Add secret"**

**Secret 3: VERCEL_PROJECT_ID**
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: (your project ID from Step 2)
- Click **"Add secret"**

✅ All three secrets now visible in GitHub (as dots/masked)

---

## 🌍 Step 4: Set Environment Variables on Vercel

### Add Environment Variables to Vercel Project

1. Go to **Vercel dashboard** → **atlas-leather project** → **Settings** → **Environment Variables**
2. Add all variables from `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
PAYPAL_ENV=production
NEXT_PUBLIC_SITE_URL=https://atlas-leather.vercel.app  (or your custom domain)
```

**Important**: Select which environments each variable applies to:
- `NEXT_PUBLIC_*` → Production, Preview, Development
- Secrets → Production only (for safety)

3. Click **"Save"** for each variable

---

## ✅ Step 5: Test the Deployment

### Option A: Trigger via GitHub Actions

1. Go to **GitHub repo** → **Actions**
2. You should see the workflow: **"Deploy to Vercel"**
3. Click on it → **"Run workflow"** → **"Run workflow"**
4. Watch the logs in real-time

**Expected output:**
```
✓ Deploy to Vercel
✓ Installing dependencies
✓ Building project
✓ Deploying to Vercel
✓ Production URL: https://atlas-leather.vercel.app
```

### Option B: Trigger via Git Push

```bash
# Make a small change, commit, and push
echo "# Deployment test" >> DEPLOYMENT_TEST.md
git add DEPLOYMENT_TEST.md
git commit -m "test: trigger Vercel deploy"
git push origin main
```

Then watch **GitHub Actions** tab → see workflow run automatically

### Option C: Deploy Locally (if Actions fails)

```bash
# Install Vercel CLI
npm install -g vercel

# Login (opens browser)
vercel login --token YOUR_VERCEL_TOKEN_HERE

# Deploy production
vercel --prod --token YOUR_VERCEL_TOKEN_HERE
```

---

## 🔍 Verify Deployment Success

### ✅ Checks to Perform

1. **GitHub Actions Workflow**
   - Go to **Actions** tab
   - See "Deploy to Vercel" with green ✓ checkmark
   - Click on workflow → view logs

2. **Vercel Project**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **atlas-leather** → **Deployments**
   - See latest deployment with status: **✓ Ready**
   - Click deployment → view build logs

3. **Live Site**
   - Visit URL: `https://atlas-leather.vercel.app` (or your custom domain)
   - See homepage loading
   - Check browser console for errors
   - Test a product page: `/boutique`

4. **Check Logs**
   ```bash
   # View production logs on Vercel
   vercel logs --prod
   ```

---

## 🐛 Troubleshooting

### ❌ GitHub Actions Fails: "Command not found: vercel"

**Fix**: Already fixed in workflow — `npm i -g vercel` is included

### ❌ Build Fails: "Cannot find module @/lib/..."

**Cause**: TypeScript path aliases not recognized during build

**Fix**: Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### ❌ Deployment Fails: "No authentication token provided"

**Cause**: GitHub secrets not set up correctly

**Fix**: 
1. Double-check secret names: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
2. Verify tokens are not empty or malformed
3. Re-run workflow after fixing secrets

### ❌ Site Shows "404 Not Found"

**Cause**: `vercel.json` routing misconfigured

**Fix**: Ensure [vercel.json](vercel.json) has:
```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/next" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

### ❌ Environment Variables Not Loading

**Cause**: Variables not set on Vercel dashboard

**Fix**: 
1. Go to **Settings** → **Environment Variables** on Vercel
2. Check all required variables are set
3. Redeploy after adding variables

---

## 🔄 Auto-Deploy on Each Push

Now that everything is configured, **every push to `main` will automatically deploy**:

```bash
# Local workflow:
git add .
git commit -m "feat: add new feature"
git push origin main

# Result:
# ✓ GitHub Actions runs automatically
# ✓ Vercel deploys your changes
# ✓ Live update in ~2-5 minutes
```

To disable auto-deploy, remove or disable the GitHub Actions workflow.

---

## 📊 Deployment Checklist

Use this before pushing to production:

- [ ] All tests pass: `npm run type-check && npm run lint`
- [ ] Build succeeds locally: `npm run build`
- [ ] `.env` variables correctly set on Vercel
- [ ] Database migrations applied to production Supabase
- [ ] Payment webhook URLs updated (Stripe, PayPal)
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate enabled (automatic on Vercel)
- [ ] Monitoring/analytics configured

---

## 🌐 Custom Domain Setup (Optional)

1. **Add Domain in Vercel**
   - Project Settings → **Domains**
   - Add domain: `atlasleather.ma`
   - Follow DNS configuration instructions

2. **Update DNS Provider**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add CNAME record:
     ```
     Name: www (or leave blank for root)
     Type: CNAME
     Value: cname.vercel-dns.com
     ```
   - Or add A records (shown in Vercel)

3. **Update `.env` Variable**
   ```
   NEXT_PUBLIC_SITE_URL=https://atlasleather.ma
   ```

4. **Redeploy** after DNS propagates (~24 hours)

---

## 📈 Monitor Deployments

### Real-Time Logs
```bash
vercel logs --prod
```

### Recent Deployments
```bash
vercel deployments
```

### Performance Analytics
- Vercel Dashboard → **Analytics** tab
- See page views, response times, errors

---

## ⚙️ Advanced: Manual Rollback

If deployment breaks:

```bash
# View deployment history
vercel deployments

# Rollback to previous
vercel rollback

# Or promote specific deployment
vercel promote <deployment-url>
```

---

## 🎉 Done!

Your project is now:
- ✅ Deployed to Vercel
- ✅ Auto-deploying on every `git push main`
- ✅ Using GitHub Actions CI/CD
- ✅ Running on production environment
- ✅ Scalable and monitored

**Next steps:**
1. Share live URL with team
2. Monitor first few deployments
3. Set up custom domain (optional)
4. Configure error tracking (Sentry, etc.)

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Supabase Vercel Integration](https://supabase.com/docs/guides/getting-started/databases/vercel)

---

**Questions?** Check [readme.md](readme.md) or [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

