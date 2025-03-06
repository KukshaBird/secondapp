# React Native Project Structure

This document outlines the standard structure of our React Native application, providing a guide for where different types of files should be placed.

## Directory Structure

```
/src
├── /components        # Reusable UI components
│   ├── CharacterBoxes.tsx
│   ├── WordCard.tsx
│   ├── WordDisplay.tsx
│   └── index.ts       # Barrel file for easier imports
│
├── /screens           # Full application screens
│   └── HomeScreen.tsx
│
├── /navigation        # Navigation configuration
│
├── /services          # API calls, data fetching, business logic
│
├── /assets            # Static assets
│   ├── /images
│   └── /fonts
│
├── /constants         # App-wide constants and configuration
│
├── /hooks             # Custom React hooks
│
└── /types             # TypeScript type definitions
```

## Directory Descriptions

### `/components`
Reusable UI components that can be used across multiple screens. Each component should:
- Be focused on a specific UI element or functionality
- Accept props for customization
- Be well-documented with TypeScript types
- Maintain its own styling

### `/screens`
Complete screen components that are rendered by the navigation system. Screens:
- Compose multiple components together
- Handle screen-specific logic and state
- Connect to data services when needed

### `/navigation`
Navigation configuration using React Navigation or similar library:
- Route definitions
- Navigation stacks
- Tab configurations
- Navigation helpers

### `/services`
Business logic and data handling:
- API calls
- Data transformation
- Business logic
- State management (if using Redux, Context, etc.)

### `/assets`
Static resources:
- Images, icons, and media files
- Font files
- Other static resources

### `/constants`
Application-wide constants:
- Theme definitions (colors, spacing, etc.)
- API endpoints
- Feature flags
- Configuration values

### `/hooks`
Custom React hooks for reusable logic:
- Data fetching hooks
- UI behavior hooks
- Form handling hooks
- Other shared logic

### `/types`
TypeScript type definitions:
- Interface definitions
- Type aliases
- Shared types

## Best Practices

1. **Imports**: Use relative imports for closely related files and absolute imports for distant files
2. **Component Organization**: Keep component files small and focused on a single responsibility
3. **Naming Conventions**: Use PascalCase for components and camelCase for other files
4. **Barrel Files**: Use index.ts files to simplify imports from directories