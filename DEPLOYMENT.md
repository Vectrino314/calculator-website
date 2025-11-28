# Deployment Instructions

## Deploy to Vercel

This project is configured to deploy to Vercel. Follow these steps:

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel --prod
   ```

4. Follow the prompts to complete the deployment.

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `Vectrino314/calculator-website`
4. Select the branch: `claude/stock-calculator-projections-01MNpfXaet4Ng9FY8HTho23a`
5. Configure the build settings:
   - Build Command: `NODE_OPTIONS=--openssl-legacy-provider yarn build`
   - Output Directory: `dist`
6. Click "Deploy"

### Build Configuration

The project includes a `vercel.json` configuration file that sets up:
- Build command with Node.js legacy OpenSSL provider (required for Vue CLI 4)
- Output directory set to `dist`
- Static file serving routes

### Environment Variables

No environment variables are required for this deployment.

## Local Development

To run the project locally:

```bash
# Install dependencies
yarn install

# Run development server
yarn serve

# Build for production
NODE_OPTIONS=--openssl-legacy-provider yarn build
```

## Project Features

- Single stock investment calculator
- Portfolio mixing (multiple stocks with percentage allocations)
- Stock comparison tool
- Interactive charts with Chart.js
- Detailed monthly and yearly projections
- Compound interest calculations with dividend reinvestment
