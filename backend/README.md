# Zanshin Python backend and studio

FastAPI replaces the legacy Express runtime. The legacy `server/` remains as an archive; new startup commands use `backend/`. No existing MongoDB customer/order data is automatically migrated.

## Local setup (Python 3.12+)

From the repository root, on Windows:

```powershell
py -3.12 -m venv backend/.venv
backend/.venv/Scripts/python.exe -m pip install -r backend/requirements.txt
backend/.venv/Scripts/python.exe backend/manage.py create-admin --email you@example.com
npm install
npm run dev
```

The admin command prompts privately for a password (minimum 12 characters). There are no shared default credentials. `--generate-local` instead generates credentials into ignored `backend/.local-admin.txt` for a local demo. Keep this file private. Linux/macOS use `python3` and `.venv/bin/python`.

- Website: Vite's printed local URL (normally port 5173).
- Team login: `/admin/login`; studio: `/admin`.
- Customer login: `/login`; registration: `/register`; profile: `/account`.
- API: `http://127.0.0.1:8001`; OpenAPI: `/docs`.
- Backend tests: `backend/.venv/Scripts/python.exe -m unittest discover -s backend/tests -v`.
- Recover an account: `backend/.venv/Scripts/python.exe backend/manage.py reset-password --email you@example.com`.

## What is connected

- Hero image/video slides, duration, publication and ordering.
- Intention-card photos/copy, Zanshin Circle media, creator stories.
- Four fragrance records: image, label, copy, price, stock and publication.
- Community and journal content (plain text, no executable HTML).
- Customer profiles, order histories, reviews with optional photo/video and consent.
- Moderation: only approved customer reviews/media appear publicly.
- Orders with server-calculated prices, stock reservation, idempotent creation and controlled fulfilment transitions. Cancelling before shipment restores stock once.
- Contact enquiries and read/resolved status.
- Admin-created employees with server-enforced per-area permissions; account deactivation revokes sessions.
- Audit history for administrative changes.

Content is seeded only once on an empty database. Refresh the website after publication; focusing the storefront also refreshes content. Uploaded photos are re-encoded as WebP; MP4/WebM videos have format signatures checked and a 64 MB limit. Review uploads remain private until approved. Users cannot set their own roles or access another customer's order.

## Persistence and deployment

SQLite (WAL mode) and media live in `backend/data/`, excluded from Git. This is a **single-instance deployment**: use one API instance with a persistent disk; do not deploy on ephemeral serverless storage or multiple independent replicas. Back up the SQLite database with SQLite's backup API and the media directory together. A PostgreSQL/object-storage migration is a separate deployment task if scaling beyond this model.

Netlify hosts the React frontend, not this Python server. Deploy FastAPI on a Python-capable host with persistent storage. Start from `backend` with:

```sh
uvicorn app.main:app --host 0.0.0.0 --port 8001
```

Use HTTPS, set `COOKIE_SECURE=true`, and set `CORS_ORIGINS` to the exact storefront domain(s). Sessions use HTTP-only, SameSite=Lax cookies. Use a **same-origin `/api/*` reverse proxy** from the storefront to the API; leave `VITE_API_URL` empty. Do not point a Netlify storefront at an unrelated API domain and expect Lax cookies to work cross-site.

Add a Netlify proxy rule **before** the SPA fallback after the real backend URL is available:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-PYTHON-HOST/api/:splat"
  status = 200
  force = true
```

The backend checks mutating-request origins plus a custom request header. The proxy must preserve cookies and the original Origin header. Configure request/body limits and rate limits at the reverse proxy as well. Admin/customer account APIs are never cached.

## Commercial boundaries

Payment gateway, transactional email, email verification, automated forgot-password delivery, courier integration, tax/shipping calculation and live commercial policies are **not configured**. Checkout clearly submits an unpaid order request, not a paid transaction. The dashboard reports order value, not revenue. Prices remain illustrative until approved. Password recovery is currently operator-assisted via the CLI. Production infrastructure and legacy-data migration must be configured before accepting live customer orders.

Auth implementation and uploads reference the official [FastAPI security](https://fastapi.tiangolo.com/tutorial/security/) and [file upload](https://fastapi.tiangolo.com/tutorial/request-files/) documentation.
