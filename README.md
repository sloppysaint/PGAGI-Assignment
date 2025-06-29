# FeedHub – Personalized News & Movie Dashboard

![FeedHub Banner](https://github.com/user-attachments/assets/c183a517-cfe0-4bbf-8ec4-46e151eb3060)


A modern, fully-responsive dashboard that combines personalized news, trending content, and AI-powered movie recommendations—integrated with robust authentication, internationalization, and persistent favorites storage.

---

## 🚀 Features

- **Modern UI:** Sleek, mobile-friendly, and dark-mode compatible interface using Tailwind CSS & React.
- **Authentication:** Secure sign up/sign in using [NextAuth.js](https://next-auth.js.org/), with protected routes.
- **Personalized Feed:** Aggregates news and movie recommendations based on user-selected preferences (including drag-and-drop reorderable feed).
- **Favorites:** Save, view, and manage favorite articles and movies (persisted to Supabase/Postgres with Prisma).
- **Search:** Global search across news & movies with instant filter-as-you-type results.
- **Responsive Layout:** Optimized for all screens—desktop, tablet, and mobile.
- **Theme Toggle:** Light/dark mode switch with user preference persistence.
- **Unit, Integration, and E2E Testing:** Codebase covered with Jest, React Testing Library, and Cypress.
- **Production Ready:** Deployable to Vercel (recommended) or Netlify, with correct database pooler support.
- **Prisma ORM:** Typed database access and migrations for PostgreSQL/Supabase.
- **API-First:** Clean Next.js API routes for all backend logic.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, Redux Toolkit, Tailwind CSS, shadcn/ui, Lucide icons
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** Supabase PostgreSQL (with connection pooler for production)
- **Authentication:** NextAuth.js (email/password, can be extended to OAuth)
- **Testing:** Jest, React Testing Library, Cypress (E2E)
- **Deployment:** Vercel (recommended), also works with Netlify

---

## ⚡️ Quick Start

1. **Clone the repository**
    ```bash
    git clone https://github.com/sloppysaint/PGAGI-Assignment.git
    cd PGAGI-Assignment
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file at the root:

    ```env
    DATABASE_URL=postgresql://postgres:yourpassword@db.yourproject.supabase.co:5432/postgres
    # For production/serverless:
    # DATABASE_URL=postgresql://postgres:yourpassword@db.yourproject.supabase.co:6543/postgres
    NEXTAUTH_SECRET=your_secret_here
    NEXTAUTH_URL=http://localhost:3000
    ```

4. **Prisma: Setup and Migrate**
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

5. **Start the development server**
    ```bash
    npm run dev
    ```

6. **Run Tests (Optional)**
    - **Unit/Integration:**
        ```bash
        npm run test
        ```
    - **E2E:**
        ```bash
        npx cypress open
        # or with Playwright:
        npx playwright test
        ```

---

## 🌍 Deployment

### **Vercel**
- Set your environment variables (including `DATABASE_URL`—use Supabase pooler port `6543` for production!)
- Vercel will build and deploy automatically.

### **Netlify**
- Add the same environment variables.
- Use the Next.js adapter plugin if needed.

> **Important:**  
> Always use the Supabase connection pooler for `DATABASE_URL` on production/serverless platforms.

---

## 📝 Developer Notes

- **Database:** Uses Prisma ORM with Supabase PostgreSQL. Migrations are handled via `prisma migrate`.
- **Prisma on Vercel:** Make sure you run `prisma generate` at build time (Vercel auto-runs it from `postinstall`).
- **Favorites Storage:** User favorites (news & movies) are stored in the `Favorite` model, linked to `User`.
- **Authentication:** Only authenticated users can view protected routes (Favorites, etc).
- **Testing:**  
    - Unit and integration tests use Jest + React Testing Library.
    - E2E uses Cypress (with tests for authentication, drag-and-drop, and search).
- **Internationalization:** Easily add new languages in `/locales`.

---

---

## 🧑‍💻 Contributing

PRs and issues welcome!  
Please open an issue for feature requests or bug reports.

---


## 💬 Acknowledgements

- News API 
- TMDB for movie recommendations
- Supabase for managed Postgres
- Next.js, Tailwind, Prisma, Vercel, shadcn/ui, etc.

---

**Made with ❤️ by Piyush**



