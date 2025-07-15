
# 🏪 My Shop – Strapi Backend

Hi! 👋
This is my personal **Strapi v5** project that powers the backend for **My Shop**.
It includes custom APIs, user permissions, logging, and automated testing setup.

---

## ✨ Features

✅ Built with **Strapi 5.4**
✅ SQLite by default (`better-sqlite3`), can also work with **PostgreSQL** (`pg`)
✅ Integrated **user permissions** plugin
✅ **Cloud plugin** ready for deployment
✅ Server‑side **logging with Winston**
✅ Configurable via `config/env`
✅ **Testing setup** with Jest & Supertest (see `tests/` folder)

---

## 📂 Project Structure

```
📦 my-shop
├── config/           # Strapi configuration (admin, API, DB, plugins, env-specific)
├── coverage/         # Jest test coverage reports
├── database/         # Database migrations
├── dist/             # Build output
├── logs/             # Winston log files (combined/error/exceptions)
├── public/           # Static assets (robots.txt, uploads, sample JSON)
├── src/              # Core source (admin, APIs, components, utils)
├── tests/            # Jest & Supertest tests
├── types/            # TypeScript generated types
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 2️⃣ Run in development

```bash
npm run develop
# or
yarn develop
```

Admin panel: [http://localhost:1337/admin](http://localhost:1337/admin)

---

## 📦 Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run develop` | Run Strapi in development mode       |
| `npm run build`   | Build admin UI and backend           |
| `npm run start`   | Start Strapi in production mode      |
| `npm run deploy`  | Deploy using Strapi cloud plugin     |
| `npm run test`    | Run Jest test suite (with Supertest) |

---

## ⚙️ Configuration

All configuration files live in `config/`:

* `admin.ts` – Admin panel settings
* `api.ts` – API defaults
* `database.ts` – Database connection (SQLite or PostgreSQL)
* `plugins.ts` – Plugin configs (Cloud, Users & Permissions)
* `middlewares.ts` – Custom middlewares
* `env/` – Environment-specific overrides
* `server.ts` – Host/port and server-level settings

---

## 🧩 Plugins Used

* **Users & Permissions** – Manage roles and authentication
* **Cloud** – Deploy easily with Strapi Cloud

---

## 🛠 Testing

This project is set up with **Jest** and **Supertest**.

* Tests live in the `tests/` folder:

  * `tests/api` for API tests
  * `tests/admin` for admin panel tests
  * `tests/helpers` for utilities
  * `tests/index.test.ts` as an entry test

Run tests with:

```bash
npm run test
```

Coverage reports will be saved in the `coverage/` folder.

---

## 📌 Requirements

* **Node.js:** `>=18.0.0 <=22.x.x`
* **npm:** `>=6.0.0` (or Yarn)

---

## ✨ Notes

* **Logs** are saved in the `logs/` folder (`combined.log`, `error.log`, `exceptions.log`).
* TypeScript support is enabled (`tsconfig.json` & `types/generated`).
* PostgreSQL support is ready — just update `config/database.ts`.

---

If you want, I can also add:
✅ Example `.env` setup,
✅ Deployment instructions (Render, Strapi Cloud, Docker),
✅ Or a quick start guide for API consumers.

Let me know! 🚀🔥
