# KIIBORD 🎮

> کی برد؟ - WHO WON?

A modern gaming tournament management platform with OTP-based authentication, built with React, TypeScript, and Tailwind CSS.

![Theme Support](https://img.shields.io/badge/Theme-Dark%20%7C%20Light-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Mobile First](https://img.shields.io/badge/Mobile-First-green)

## ✨ Features

### 🔐 Authentication System

- **OTP-Only Authentication** - No passwords needed
- Email verification with 6-digit codes
- Separate flows for login and registration
- Form validation and error handling

### 🎨 Design System

- **Dark/Light Mode** - Persistent theme switching
- **Gaming Aesthetic** - Military/tech inspired UI
- **PlayStation-Style Buttons** - Controller-inspired CTAs
- **Smooth Animations** - Motion-powered transitions
- **Mobile-First Design** - Optimized for all devices

### 🎯 User Experience

- Animated background effects
- Floating particles and glowing orbs
- Radar scanning effects on OTP screen
- Hexagonal badges and tech corners
- Real-time form validation
- Auto-focus OTP inputs

## 🚀 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Motion (Framer Motion)** - Smooth animations
- **shadcn/ui** - Component library
- **Lucide React** - Icon system

## 📁 Project Structure

```
/
├── components/
│   ├── auth/              # Authentication components
│   ├── shared/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   └── figma/             # Figma integration
├── lib/                   # Utilities and constants
├── hooks/                 # Custom React hooks
├── styles/                # Global styles
└── App.tsx                # Main app component
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation.

## 🎮 Components

### Auth Components

- **LoginForm** - Email-based login with OTP request
- **RegisterForm** - User registration with battle tag
- **OTPForm** - 6-digit verification code input

### Shared Components

- **ControllerButton** - PlayStation-inspired button with D-pad and action buttons
- **ThemeToggle** - Dark/light mode switcher
- **BackgroundEffects** - Animated particles and gradients

## 🎨 Theme System

### Dark Mode (Default)

Perfect for gaming with slate backgrounds and vibrant accents.

### Light Mode

Clean and professional for daytime use.

### Color Scheme

- **Login**: Cyan/Blue (#06B6D4)
- **Register**: Orange/Yellow (#F97316)
- **OTP**: Green/Emerald (#10B981)

## 🔧 Configuration

### Constants (`/lib/constants.ts`)

```typescript
export const APP_CONFIG = {
  name: "KIIBORD",
  tagline: "WHO WON",
  description: "Gaming Tournament Management Platform",
};

export const OTP_CONFIG = {
  length: 6,
  resendDelay: 2000, // milliseconds
};
```

### Utilities (`/lib/utils.ts`)

- `cn()` - Tailwind class merging
- `isValidEmail()` - Email validation
- `isValidOTP()` - OTP validation

## 🎯 Usage

### Basic Flow

1. **Login/Register** → User enters email
2. **OTP Sent** → 6-digit code sent to email
3. **Verification** → User enters OTP code
4. **Success** → Access granted

### Theme Toggle

Click the moon/sun icon in the top-right corner to switch themes. Preference is saved to localStorage.

## 🔮 Future Features

- [ ] **Supabase Integration** - Real authentication backend
- [ ] **Tournament Dashboard** - View and manage tournaments
- [ ] **Match Scheduling** - Schedule and track matches
- [ ] **Leaderboards** - Real-time rankings
- [ ] **User Profiles** - Player stats and achievements
- [ ] **Live Chat** - Real-time communication
- [ ] **Notifications** - Push notifications for matches

## 🎨 Customization

### Update Theme Colors

Edit `/styles/globals.css`:

```css
:root {
  /* Light mode colors */
}

.dark {
  /* Dark mode colors */
}
```

### Add New Routes

1. Add to `/lib/constants.ts`:

```typescript
export const ROUTES = {
  DASHBOARD: "dashboard",
  // ...
};
```

2. Update `/App.tsx` routing logic

### Create New Components

Follow the established patterns:

- Auth components → `/components/auth`
- Shared components → `/components/shared`
- Add TypeScript interfaces
- Include JSDoc comments
- Support light/dark modes

## 📱 Responsive Design

- **Mobile First** - Base styles for mobile (max-width: 384px)
- **Tablet** - Optimized layouts for tablets
- **Desktop** - Enhanced experience on larger screens

## ⚡ Performance

- Lazy loading for components
- Optimized animations (GPU-accelerated)
- Minimal bundle size
- CSS-in-Tailwind (no runtime overhead)

## 🛠️ Development

### Best Practices

1. **Type Safety** - Always use TypeScript types
2. **Validation** - Validate all user inputs
3. **Constants** - No magic numbers/strings
4. **Comments** - JSDoc for all functions
5. **Clean Code** - Follow established patterns

### File Naming

- Components: PascalCase (e.g., `LoginForm.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useTheme.ts`)

## 🤝 Contributing

We welcome contributions! Follow these guidelines:

1. Follow the existing code style
2. Add TypeScript types
3. Include comments
4. Test on both themes
5. Ensure mobile responsiveness

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

- **shadcn/ui** - Component library
- **Lucide** - Icon system
- **Motion** - Animation library
- **Tailwind CSS** - Styling framework

---

Made with ⚡ for gamers, by gamers.
