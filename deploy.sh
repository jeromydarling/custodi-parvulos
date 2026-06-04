#!/bin/bash
set -e

echo "═══════════════════════════════════════════"
echo "  Custodi Parvulos — Cloudflare Deploy"
echo "═══════════════════════════════════════════"
echo ""

# Step 1: Login if needed
echo "Step 1: Checking Cloudflare auth..."
npx wrangler whoami 2>/dev/null || npx wrangler login

# Step 2: Create D1 database if it doesn't exist
echo ""
echo "Step 2: Creating D1 database..."
DB_OUTPUT=$(npx wrangler d1 create custodi-parvulos-db 2>&1 || true)
echo "$DB_OUTPUT"

# Extract database_id if it was just created
DB_ID=$(echo "$DB_OUTPUT" | grep -oP 'database_id\s*=\s*"\K[^"]+' || true)
if [ -n "$DB_ID" ]; then
  echo "Database created! ID: $DB_ID"
  echo "Updating wrangler.toml..."
  sed -i "s/database_id = \"\"/database_id = \"$DB_ID\"/" wrangler.toml
else
  echo "Database may already exist. Check wrangler.toml has the database_id filled in."
fi

# Step 3: Run migrations
echo ""
echo "Step 3: Running D1 migrations..."
npx wrangler d1 migrations apply custodi-parvulos-db --remote

# Step 4: Build frontend
echo ""
echo "Step 4: Building frontend..."
npm run build

# Step 5: Deploy Worker + Assets
echo ""
echo "Step 5: Deploying to Cloudflare..."
npx wrangler deploy

echo ""
echo "═══════════════════════════════════════════"
echo "  ✓ Deployed! Check your Cloudflare dashboard"
echo "═══════════════════════════════════════════"
