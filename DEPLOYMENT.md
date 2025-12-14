# Sweet Shop Frontend

## Environment Variables

For deployment, set the following environment variable:

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

Replace `your-backend-url.com` with your actual backend deployment URL.

## Deployment Instructions

### Vercel Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.com/api`
5. Deploy

### Netlify Deployment

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.com/api`
6. Deploy

## Build Command

```bash
npm run build
```

## Start Command (for local)

```bash
npm start
```
