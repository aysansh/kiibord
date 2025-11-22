# KIIBORD - Project Structure

## Overview

KIIBORD is a gaming tournament management platform with OTP-based authentication.

## Directory Structure

```
/
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── LoginForm.tsx       # Login form with email input
│   │   ├── RegisterForm.tsx    # Registration form
│   │   └── OTPForm.tsx         # OTP verification form
│   │
│   ├── shared/                  # Shared/reusable components
│   │   ├── BackgroundEffects.tsx  # Animated background
│   │   ├── ControllerButton.tsx   # PlayStation-style button
│   │   └── ThemeToggle.tsx        # Dark/Light mode toggle
│   │
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (other shadcn components)
│   │
│   └── figma/                   # Figma integration components
│       └── ImageWithFallback.tsx
│
├── lib/                         # Utilities and configurations
│   ├── constants.ts            # App constants and configs
│   └── utils.ts                # Helper functions
│
├── hooks/                       # Custom React hooks
│   └── useTheme.ts             # Theme management hook
│
├── styles/
│   └── globals.css             # Global styles and CSS variables
│
└── App.tsx                      # Main application component
```

## Key Features

### Authentication Flow

- **OTP-Based**: No passwords - uses email verification codes
- **Login**: Email → OTP verification
- **Register**: Username + Email → OTP verification
- **No password recovery needed** (OTP-only system)

### Theme System

- Dark mode (default for gaming aesthetic)
- Light mode support
- Persistent theme preference (localStorage)
- Smooth theme transitions

### Component Architecture

#### Auth Components (`/components/auth`)

All authentication-related forms with:

- Email validation
- Form state management
- Animated transitions
- Light/Dark mode support

#### Shared Components (`/components/shared`)

- **ControllerButton**: PlayStation-inspired gaming button
- **ThemeToggle**: Moon/Sun icon toggle in top-right
- **BackgroundEffects**: Animated particles and gradients

#### Utilities (`/lib`)

- **constants.ts**: App configuration, routes, OTP settings
- **utils.ts**: Email validation, OTP validation, className utilities

#### Hooks (`/hooks`)

- **useTheme**: Custom hook for theme management

## Design System

### Color Palette

- **Primary**: Cyan/Blue (Login)
- **Secondary**: Orange/Yellow (Register)
- **Success**: Green/Emerald (OTP)
- **Dark**: Slate-900/950
- **Light**: Slate-50/100

### Animations

- Motion (Framer Motion) for smooth transitions
- Rotating icons, pulsing effects
- Scanning lines, radar sweeps
- Particle effects

### Typography

- Uppercase tracking for headers
- Gaming-themed language
- Military/tech terminology

## Next.js Compatibility

This project is **Next.js ready** with:

- No Next.js-specific imports (can be added)
- Clean separation of concerns
- Component-based architecture
- TypeScript support

## Adding New Features

### Add a new auth screen:

1. Create component in `/components/auth`
2. Add route constant in `/lib/constants.ts`
3. Update App.tsx routing logic

### Add a new shared component:

1. Create in `/components/shared`
2. Export and import where needed

### Add new utility functions:

1. Add to `/lib/utils.ts`
2. Export and import as needed

## Theme Customization

Edit `/styles/globals.css`:

- `:root` for light mode colors
- `.dark` for dark mode colors
- CSS variables for consistent theming

## Best Practices

1. **Type Safety**: All components use TypeScript interfaces
2. **Validation**: Email and OTP validation before submission
3. **Constants**: All magic numbers/strings in constants file
4. **Reusability**: Shared components for common patterns
5. **Accessibility**: Proper labels, ARIA attributes
6. **Performance**: Lazy loading, optimized animations

## Tech Stack

- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling (v4.0)
- **Motion**: Animations (Framer Motion)
- **shadcn/ui**: Component library
- **Lucide React**: Icons

## Future Enhancements

- [ ] Supabase integration for real authentication
- [ ] Tournament management dashboard
- [ ] User profile pages
- [ ] Leaderboards
- [ ] Match scheduling
- [ ] Real-time notifications
