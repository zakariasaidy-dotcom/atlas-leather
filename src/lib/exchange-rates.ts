/**
 * PayPal Exchange Rate Service
 * 
 * PROBLEM: Current implementation uses hardcoded exchange rate (1 MAD = 10.8 USD)
 * which becomes inaccurate over time and causes pricing issues.
 * 
 * SOLUTION: Implement real-time exchange rate fetching
 * 
 * Cost estimate: Free tier options available for low-volume apps
 */

import { cache } from "react";

// ============================================================
// Option 1: Using Open Exchange Rates (Recommended)
// Free tier: 1,000 requests/month (sufficient for most shops)
// https://openexchangerates.org/
// ============================================================

interface ExchangeRateCache {
  rate: number;
  timestamp: number;
  ttl: number; // milliseconds
}

const cache_store: Map<string, ExchangeRateCache> = new Map();

export async function getExchangeRate(
  from: string = "MAD",
  to: string = "USD"
): Promise<number> {
  const cacheKey = `${from}_${to}`;
  const cached = cache_store.get(cacheKey);
  const now = Date.now();

  // Return cached rate if still valid (cache for 1 hour)
  if (cached && now - cached.timestamp < cached.ttl) {
    return cached.rate;
  }

  try {
    // Example using Open Exchange Rates API
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.EXCHANGE_RATE_API_KEY}&base=${from}&symbols=${to}`,
      { next: { revalidate: 3600 } } // ISR - revalidate every hour
    );

    if (!response.ok) {
      throw new Error(`Exchange rate API returned ${response.status}`);
    }

    const data = await response.json();
    const rate = data.rates[to];

    if (!rate) {
      throw new Error(`Rate for ${to} not found`);
    }

    // Cache the result
    cache_store.set(cacheKey, {
      rate,
      timestamp: now,
      ttl: 3600000, // 1 hour
    });

    return rate;
  } catch (error) {
    console.error("[getExchangeRate] Error:", error);
    // Fallback to default rate if API fails
    return getDefaultExchangeRate(from, to);
  }
}

export function getDefaultExchangeRate(
  from: string = "MAD",
  to: string = "USD"
): number {
  const rates: Record<string, number> = {
    MAD_USD: 0.1, // Conservative estimate
    MAD_EUR: 0.095,
  };

  return rates[`${from}_${to}`] ?? 1;
}

// ============================================================
// Updated PayPal Checkout Route
// ============================================================

/**
 * Replace the hardcoded conversion in src/app/api/checkout/paypal/route.ts
 * 
 * OLD:
 * const conversionRate = 10.8; // WRONG - hardcoded
 * value: (total / conversionRate).toFixed(2),
 * 
 * NEW:
 * const conversionRate = await getExchangeRate("MAD", "USD");
 * value: (total * conversionRate).toFixed(2),
 */

// ============================================================
// Alternative Options (Free)
// ============================================================

/**
 * Option 2: Using Fixer.io (Free tier: 100 requests/month)
 * https://fixer.io/
 * 
 * export async function getExchangeRateFixer(
 *   from: string,
 *   to: string
 * ): Promise<number> {
 *   const response = await fetch(
 *     `https://api.fixer.io/latest?base=${from}&symbols=${to}`
 *   );
 *   const data = await response.json();
 *   return data.rates[to];
 * }
 */

/**
 * Option 3: Using Exchangerate-api.com (Free: 1500 requests/month)
 * https://www.exchangerate-api.com/
 * 
 * export async function getExchangeRateExchangeApi(
 *   from: string,
 *   to: string
 * ): Promise<number> {
 *   const response = await fetch(
 *     `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${from}`
 *   );
 *   const data = await response.json();
 *   return data.conversion_rates[to];
 * }
 */

/**
 * Option 4: Using CurrencyAPI (Free: 300 requests/month)
 * https://currencyapi.com/
 * Note: Limited free tier
 */

// ============================================================
// .env Variables Needed
// ============================================================

/**
 * Add to .env.example:
 * 
 * # Exchange Rate Service
 * EXCHANGE_RATE_API_KEY=your_api_key_here
 * EXCHANGE_RATE_PROVIDER=openexchangerates  # or fixer, exchangeapi
 * 
 * Sign up at: https://openexchangerates.org/signup/free
 */

// ============================================================
// Implementation Checklist
// ============================================================

/**
 * 1. [ ] Choose exchange rate provider (recommended: Open Exchange Rates)
 * 2. [ ] Sign up and get API key
 * 3. [ ] Add API key to .env and .env.example
 * 4. [ ] Import getExchangeRate in checkout/paypal/route.ts
 * 5. [ ] Replace hardcoded rate with dynamic rate
 * 6. [ ] Test with real PayPal checkout
 * 7. [ ] Monitor rate changes
 * 8. [ ] Consider rate limiting/caching strategy
 */

// ============================================================
// Testing
// ============================================================

/**
 * Test locally:
 * 
 * import { getExchangeRate } from "@/lib/exchange-rates";
 * 
 * const rate = await getExchangeRate("MAD", "USD");
 * console.log("Current MAD → USD rate:", rate);
 * 
 * // Example: 1000 MAD in USD
 * const usdAmount = (1000 * rate).toFixed(2);
 * console.log(`1000 MAD = ${usdAmount} USD`);
 */

export default getExchangeRate;
