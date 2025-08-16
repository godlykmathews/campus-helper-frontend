# Campus Helper Frontend

A modern Next.js frontend application for the Campus Helper system, providing students with easy access to class timetables, bus schedules, and canteen menus.

## Features

- **🏠 Homepage**: Modern landing page with feature overview
- **📅 Timetable**: View class schedules by day with room information
- **🚌 Bus Schedule**: Check bus timings and routes for campus commute
- **🍽️ Canteen Menu**: Browse daily menu items with prices and categories
- **👤 User Authentication**: Login and registration system
- **⚙️ Admin Panel**: Administrative interface for data management
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Authentication**: JWT with cookies
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see Campus Helper backend)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/campus-helper-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── bus/               # Bus schedule page
│   ├── canteen/           # Canteen menu page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── timetable/         # Timetable page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── LoadingSpinner.tsx
│   └── Navbar.tsx
├── contexts/              # React contexts
│   └── AuthContext.tsx
├── lib/                   # Utility libraries
│   └── api.ts            # Axios configuration
├── services/              # API service functions
│   ├── auth.ts
│   ├── bus.ts
│   ├── canteen.ts
│   └── timetable.ts
└── types/                 # TypeScript type definitions
    └── index.ts
```

## API Integration

The frontend communicates with the FastAPI backend through RESTful endpoints:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/me`
- **Timetable**: `/timetable/`, `/timetable/{day}`
- **Bus Schedule**: `/bus/`, `/bus/{route}`
- **Canteen Menu**: `/canteen/`, `/canteen/{day}`

## Features Overview

### User Features

1. **View Timetables**: Browse class schedules by day
2. **Check Bus Schedules**: Find bus timings and routes
3. **Browse Canteen Menu**: View menu items with prices and categories
4. **User Authentication**: Secure login and registration

### Admin Features

1. **Dashboard Access**: Administrative interface for data management
2. **Data Management**: Add, edit, and delete timetables, bus schedules, and menu items
3. **User Management**: View and manage user accounts

## Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling
- Component-based architecture

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL

## Deployment

The application can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- Any hosting platform that supports Node.js

For Vercel deployment:
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the Campus Helper system.
