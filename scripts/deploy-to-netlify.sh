#!/bin/bash

# Script to deploy the course-selling app to Netlify
# This script helps with the deployment process and environment variable setup

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for course-selling app...${NC}"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
fi

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Check if the user is logged in to Netlify
echo -e "${YELLOW}Checking Netlify login status...${NC}"
netlify status

# Deploy to Netlify
echo -e "${YELLOW}Deploying to Netlify...${NC}"
echo -e "${YELLOW}Note: You'll need to set up environment variables in the Netlify dashboard after deployment.${NC}"
echo -e "${YELLOW}Required environment variables:${NC}"
echo -e "${YELLOW}- NEXT_PUBLIC_SUPABASE_URL${NC}"
echo -e "${YELLOW}- NEXT_PUBLIC_SUPABASE_ANON_KEY${NC}"

# Deploy with the --prod flag to deploy to production
netlify deploy --prod

echo -e "${GREEN}Deployment process completed!${NC}"
echo -e "${YELLOW}Don't forget to set up your environment variables in the Netlify dashboard.${NC}"
echo -e "${YELLOW}Go to Site settings > Build & deploy > Environment to add your Supabase credentials.${NC}"
