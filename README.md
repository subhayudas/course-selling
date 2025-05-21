# Course Selling Platform

A modern web application for selling and managing online courses, built with React, Vite, and Supabase.

## Features

- User authentication and profile management
- Course browsing and filtering
- Secure payment processing
- Learning management system
- Admin dashboard for course management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd course-selling
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file and add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Deployment

### Deploying to Netlify

#### Option 1: Using the Netlify UI

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)

2. Connect your GitHub repository to Netlify:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" > "Import an existing project"
   - Choose your Git provider and select your repository

3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Set environment variables in Netlify:
   - Go to Site settings > Build & deploy > Environment
   - Add the following environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL` (your Supabase project URL)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your Supabase anonymous key)

5. Deploy your site

#### Option 2: Using the Netlify CLI (Recommended)

1. Make sure your code is committed to your local repository

2. Run the deploy script:
   ```bash
   npm run deploy
   ```

3. Follow the prompts in the terminal to complete the deployment

4. After deployment, set up environment variables in the Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add the following environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL` (your Supabase project URL)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your Supabase anonymous key)

5. Trigger a new build after setting the environment variables

### Troubleshooting Deployment Issues

If your site is not visible after deployment, check the following:

1. **Environment Variables**: Ensure your Supabase credentials are correctly set in the Netlify dashboard.

2. **Build Logs**: Check the Netlify build logs for any errors.

3. **Redirects**: The project includes a `_redirects` file in the `public` directory and a `netlify.toml` configuration to handle client-side routing. Make sure these files are present.

4. **CORS Issues**: If you're experiencing API connection problems, check CORS settings in your Supabase project.

## Environment Variables

This project uses environment variables to manage sensitive configuration. These variables are stored in a `.env` file locally and should be set in your deployment platform (like Netlify).

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public API key |

### Environment File Setup

1. The project includes a `.env` file for local development
2. This file is listed in `.gitignore` to prevent it from being pushed to GitHub
3. For reference, there's a `.env.example` file that shows which variables are needed (without actual values)

### Security Best Practices

- **Never commit your `.env` file** to version control
- When deploying, set these environment variables in your hosting platform (Netlify, Vercel, etc.)
- Regularly rotate your Supabase keys for enhanced security
- Consider using different Supabase projects for development and production

## License

[MIT](LICENSE)