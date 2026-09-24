# Deploy the Zanshin frontend to Netlify

The React frontend is ready for Netlify. The Express/MongoDB server must be deployed separately because this frontend build does not run a persistent Node server or MongoDB on Netlify.

## Recommended Git deployment

1. Push the `zanshin-mern` project to GitHub, GitLab or Bitbucket.
2. In Netlify choose **Add new project → Import an existing project** and select the repository.
3. Netlify will read the included `netlify.toml`:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist` (the TOML value is `dist` relative to the base)
   - Node version: 22
4. In **Project configuration → Environment variables**, add:
   - Key: `VITE_API_URL`
   - Value: the public HTTPS URL of the separately deployed Express server, for example `https://api.zanshin.example.com`
5. Deploy the site.

The included SPA rewrite sends clean React routes such as `/collection/focused` to `index.html`, preventing refresh-time 404 responses.

## Backend setting required

On the deployed Express server set:

```env
CLIENT_ORIGIN=https://your-site-name.netlify.app
MONGO_URI=mongodb+srv://...
NODE_ENV=production
```

After connecting a custom frontend domain, add that HTTPS origin to `CLIENT_ORIGIN` and restart/redeploy the backend. If both Netlify and the custom domain must work, use a comma-separated value:

```env
CLIENT_ORIGIN=https://your-site-name.netlify.app,https://www.yourdomain.com
```

## Manual frontend deployment

For a frontend preview without Git:

1. Create `client/.env.production` containing the public API URL:

   ```env
   VITE_API_URL=https://your-public-api.example.com
   ```

2. From the project root run `npm install` and `npm run build`.
3. Drag the generated `client/dist` folder into Netlify Drop.

Use the Git workflow for normal updates because every push can trigger a new frontend deployment.

## If the backend is not deployed yet

The catalogue falls back to bundled product data so the design remains visible, but the API status reads `CONNECTING`. Moment mapping, contact submission, demo order creation and order tracking require the public Express/MongoDB API.
