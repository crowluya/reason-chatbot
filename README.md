<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="app/(chat)/opengraph-image.png">
  <h1 align="center">AI Reasoning Chat</h1>
</a>

<p align="center">
    An advanced AI chatbot built with Next.js and the AI SDK featuring OpenRouter models, kie.ai image generation, and Cloudflare R2 storage.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - **OpenRouter integration** for access to multiple AI models
- **AI Models**
  - [Claude 3.5 Sonnet](https://www.anthropic.com/claude) - Advanced multimodal model with vision capabilities
  - [OpenAI o1-mini](https://openai.com/o1/) - Advanced reasoning model with chain-of-thought capabilities
  - **kie.ai nano-banana** - Image generation capabilities
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - **[Cloudflare R2](https://www.cloudflare.com/products/r2/)** for efficient and cost-effective file storage
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication
- **Modern Landing Page**
  - Feature showcase with hero section
  - Clear call-to-action for new users

## Model Providers

This template uses [OpenRouter](https://openrouter.ai/) to access multiple AI models through a unified interface. The default configuration includes:

- **Claude 3.5 Sonnet** - For general chat with vision capabilities
- **OpenAI o1-mini** - For advanced reasoning tasks
- **kie.ai nano-banana** - For image generation

### OpenRouter Configuration

OpenRouter provides access to various AI models with a single API key. To use OpenRouter:

### OpenRouter Configuration

OpenRouter provides access to various AI models with a single API key. To use OpenRouter:

1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Get your API key from the dashboard
3. Add `OPENROUTER_API_KEY` to your environment variables

### Storage Configuration

This project uses **Cloudflare R2** for file storage instead of Vercel Blob. R2 is S3-compatible and offers cost-effective storage:

1. Create a Cloudflare account and set up R2
2. Create an R2 bucket
3. Generate API tokens with R2 read/write permissions
4. Add the following to your environment variables:
   - `R2_ENDPOINT`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
   - `R2_PUBLIC_DOMAIN`

### Image Generation

Image generation is powered by **kie.ai nano-banana** model:

1. Get your kie.ai API key
2. Add `KIE_AI_API_KEY` to your environment variables
3. Request image generation through natural language in chat

## Deploy Your Own

You can deploy your own version of the AI Reasoning Chat to Vercel or any Node.js hosting platform.

**Note**: When deploying, ensure all required environment variables are set:
- `AUTH_SECRET`
- `OPENROUTER_API_KEY`
- `KIE_AI_API_KEY`
- `POSTGRES_URL`
- `REDIS_URL` (optional, for resumable streams)
- R2 configuration variables

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run the chatbot.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm db:migrate # Setup database or apply latest database changes
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000).
