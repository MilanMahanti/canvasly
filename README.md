# Canvasly

Canvasly is a powerful, user-friendly SaaS application designed to help users create stunning designs effortlessly. Whether you're a professional designer or a beginner, Canvasly offers tools and templates to suit your needs. With features like image uploads, integration with Unsplash, text editing, shape manipulation, and AI-powered enhancements, Canvasly is your one-stop design solution.

---

## Features

### Core Features
- **Image Uploads**: Add your own images to designs effortlessly.
- **Unsplash Integration**: Search and add high-quality images from Unsplash directly.
- **Shapes and Text**: Insert shapes and text, customize fonts, colors, and styles.
- **Pre-Made Templates**: Choose from a wide range of templates, including premium and free options.

### Premium Features
- **AI Image Generation**: Generate unique images using Hugging Face’s serverless inference API.
- **AI Background Removal**: Automatically remove image backgrounds with ease.
- **Premium Templates**: Access exclusive premium design templates.

---

## Tech Stack

### Frontend
- **Next.js**: For a scalable, performant, and feature-rich React-based frontend.
- **Tailwind CSS**: To ensure modern, responsive, and visually appealing UI.
- **Radix UI**: For accessible and reusable UI components.
- **ShadCN Components**: Pre-built, customizable components for enhanced UI/UX.

### Backend
- **Hono.js**: Fast and lightweight web framework for API request management.
- **Drizzle ORM with PostgreSQL**: Efficient and scalable database management.

### Authentication
- **Auth.js**: Provides Google, GitHub, and credentials-based login.

### Payment Integration
- **Stripe**: Seamless subscription and payment management.

### AI Features
- **Hugging Face Inference API**: Powers the AI image generation and background removal capabilities.

---

## Setup Instructions

### Prerequisites
1. Node.js (>= 18)
2. PostgreSQL Database
3. Stripe Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/canvasly.git
   cd canvasly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following keys:
     ```env
     DATABASE_URL=your_database_url
     NEXTAUTH_URL=your_nextauth_url
     NEXTAUTH_SECRET=your_nextauth_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     GITHUB_CLIENT_ID=your_github_client_id
     GITHUB_CLIENT_SECRET=your_github_client_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     UNSPLASH_ACCESS_KEY=your_unsplash_access_key
     HUGGINGFACE_API_KEY=your_huggingface_api_key
     ```

4. Generate database schema and apply migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Run the production server.
- `npm run lint`: Lint the codebase.
- Database management:
  - `npm run db:generate`: Generate database schema.
  - `npm run db:migrate`: Apply database migrations.
  - `npm run db:studio`: Open Drizzle Studio for database inspection.

---

## Key Dependencies

### Core Libraries
- [Next.js](https://nextjs.org/): Frontend framework.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- [Radix UI](https://www.radix-ui.com/): Accessible UI components.
- [ShadCN Components](https://shadcn.dev/): Pre-built, customizable components.

### AI Features
- [Hugging Face](https://huggingface.co/): For AI-powered image generation and background removal.

### Authentication
- [Auth.js](https://authjs.dev/): Flexible authentication system.

### Database
- [Drizzle ORM](https://orm.drizzle.team/): Type-safe database ORM.
- [PostgreSQL](https://www.postgresql.org/): Database management system.

### Payment
- [Stripe](https://stripe.com/): Payment processing.

---

## License
This project is licensed under the MIT License.

---

## Contact
For inquiries or contributions, feel free to contact:
- **Email**: milanmahanti16@gmail.com

---

## Special thanks to Code With Antonio for the amazing course

