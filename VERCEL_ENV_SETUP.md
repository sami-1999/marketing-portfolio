# Fix for Vercel 500 Error - Environment Variables Setup

## Problem
Your contact form API is failing on Vercel with a 500 error because the environment variables (`EMAIL_USER` and `EMAIL_PASS`) are not configured on Vercel.

## Solution Steps

### 1. Access Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in to your account
3. Navigate to your project: `muhammadsamidev`

### 2. Add Environment Variables
1. Click on your project name
2. Go to **Settings** tab
3. Click on **Environment Variables** in the left sidebar
4. Add the following variables:

#### Variable 1:
- **Name**: `EMAIL_USER`
- **Value**: `1999chrisaustin@gmail.com`
- **Environment**: Select all (Production, Preview, Development)

#### Variable 2:
- **Name**: `EMAIL_PASS`
- **Value**: `rvrxjutinpkqpsci`
- **Environment**: Select all (Production, Preview, Development)

#### Variable 3:
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Production only

### 3. Redeploy Your Application
After adding the environment variables:
1. Go to the **Deployments** tab
2. Click the three dots (...) on your latest deployment
3. Select **Redeploy**
4. Or simply push a new commit to trigger automatic redeployment

### 4. Test the Contact Form
Once redeployed, test your contact form at:
`https://muhammadsamidev.vercel.app/api/contact`

## Security Note
- Your Gmail App Password is correctly configured
- Environment variables on Vercel are encrypted and secure
- Never commit `.env` files to your repository

## Alternative: Using Vercel CLI (Optional)
If you have Vercel CLI installed, you can also add environment variables using:

```bash
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
vercel env add NODE_ENV
```

Then redeploy:
```bash
vercel --prod
