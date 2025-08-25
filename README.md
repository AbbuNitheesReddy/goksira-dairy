# Goksira - Dairy Products Website

This is a NextJS application for a dairy products business.

To get started, take a look at src/app/page.tsx.

## Deployment

### Automatic Deployment to Netlify

This project is configured for automatic deployment to Netlify using GitHub Actions.

#### Prerequisites

1. Push this project to a GitHub repository
2. Create a Netlify account and site
3. Set up the following secrets in your GitHub repository:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: The API ID of your Netlify site

#### How it works

- When you push to the `main` branch, GitHub Actions will automatically build and deploy your site to Netlify
- Pull requests will generate preview deployments
- The workflow configuration is in `.github/workflows/netlify-deploy.yml`
- Netlify-specific configuration is in `netlify.toml`

#### Manual Deployment

You can also deploy manually using the Netlify CLI:

```bash
# Install Netlify CLI
npm install netlify-cli -g

# Login to Netlify
netlify login

# Initialize your site (first time only)
netlify init

# Deploy to production
netlify deploy --prod
```
# Goksira-dairy
