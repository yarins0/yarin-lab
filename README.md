# yarin-lab — Personal Portfolio

Personal portfolio site for Yarin Solomon, a full-stack software developer specialising in API development, microservices, and AI-integrated systems.

**Live:** [yarin-lab.vercel.app](https://yarin-lab.vercel.app)

## What's in it

- **Portfolio sections** — About, Projects, Skills, Contact
- **Contact form** — sends email via [Resend](https://resend.com); handled server-side so the API key never reaches the browser
- **Backgammon AI demo** — project page with download options for a Python + PyTorch desktop game

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env.local` file (see `.env.local.example`):

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key from resend.com — used by the contact form |
| `CONTACT_TO_EMAIL` | No | Address contact emails are sent to (defaults to `yarinso39@gmail.com`) |

The contact API route (`/api/contact`) returns `500` if `RESEND_API_KEY` is missing.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Watch mode |

## Project structure

```
src/
  app/
    api/contact/   # POST handler — sends email via Resend
    backgammon/    # Backgammon AI project demo page
  components/
    layout/        # Navbar
    sections/      # Hero, Projects, Skills, Contact sections
    ui/            # ContactForm, ProjectCard, Badge
  hooks/           # useAnimatedLabel
public/
  backgammon/      # BackgammonAI.exe and demo GIF
```

## Tech stack

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · Vercel Analytics · Resend · Vitest
