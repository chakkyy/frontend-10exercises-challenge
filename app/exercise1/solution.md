# Exercise 1 Solution: SCSS & Responsive Navigation

## Implementation Overview

This solution demonstrates a professional approach to styling a responsive navigation bar using **SCSS with BEM methodology**. The navbar displays horizontally on desktop and vertically on mobile (<600px), with active link highlighting.

## Architecture

### File Structure

```
exercise1/
├── components/
│   ├── Navbar.tsx          # React component
│   └── Navbar.module.scss  # SCSS module with BEM
├── styles/
│   └── _variables.scss     # Centralized SCSS variables
├── page.tsx                # Exercise page
├── solution.md             # This file
└── README.md               # Exercise instructions
```

## Key Features

### 1. **Responsive Design**

- **Desktop (≥600px)**: Horizontal layout using flexbox
- **Mobile (<600px)**: Vertical stacked layout
- Smooth transitions between breakpoints

### 2. **Active Link Highlighting**

- Uses Next.js `usePathname` hook to detect current route
- BEM modifier class (`navbar__link--active`) for active state
- Visual indicators: bold text, colored background, underline on desktop
- Semantic `aria-current="page"` for accessibility

### 3. **SCSS Organization with BEM**

#### BEM (Block, Element, Modifier) Methodology

```scss
// Block
.navbar {
}

// Element
.navbar__list {
}
.navbar__link {
}

// Modifier
.navbar__link--active {
}
```

**Why BEM?**

- Clear component structure
- Avoids specificity issues
- Self-documenting class names
- Easy to maintain and scale

## SCSS Organization for Large Projects

### ❌ Traditional SCSS Guideline Approach: 7-1 Pattern (Not Recommended)

The old centralized approach has major drawbacks:

- Style conflicts
- Hard to track unused styles
- No component isolation
- Team collaboration issues

### ✅ Modern Approach: Component-Level Modules (Recommended)

```
components/
├── Navbar/
│   ├── Navbar.tsx
│   ├── Navbar.module.scss    # Component-specific styles
│   └── Navbar.test.tsx
├── Button/
│   ├── Button.tsx
│   ├── Button.module.scss
│   └── Button.test.tsx
└── Card/
    ├── Card.tsx
    ├── Card.module.scss
    └── Card.test.tsx

styles/
├── _variables.scss           # Shared design tokens
├── _mixins.scss             # Reusable mixins
└── globals.css              # Global resets only
```

### Best Practices

#### 1. **Use Variables for Consistency**

```scss
// Bad
color: #3b82f6;
padding: 16px;

// Good
color: $primary-color;
padding: $spacing-md;
```

#### 2. **Leverage Mixins for Reusability**

```scss
// Truncate text with ellipsis
@mixin truncate($max-width: 100%) {
  max-width: $max-width;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Usage
.card-title {
  @include truncate(200px);
}
.sidebar-link {
  @include truncate();
}
```

#### 3. **Use Nesting Wisely (Max 3-4 levels)**

```scss
// Bad - too nested
.navbar {
  .navbar__list {
    .navbar__item {
      .navbar__link {
        &:hover {
          &::after {
          }
        }
      }
    }
  }
}

// Good - flat and clear
.navbar__link {
  &:hover {
    color: $primary-color;
  }

  &--active {
    font-weight: bold;
  }
}
```

#### 4. **Component-Scoped Styles (SCSS Modules)**

```scss
// Navbar.module.scss
.navbar {
  // Styles here are scoped to this component
  // Prevents global namespace pollution
}
```

## Modern Approach: CSS Custom Properties

As I discussed in my article [A Modern Approach to Styling in React](https://cramirez.is-a.dev/articles/modern-styling-in-react/), modern CSS has evolved to provide powerful alternatives to traditional SCSS approaches.

### Evolution of Styling

**Traditional SCSS (2015-2020)**

```scss
.button {
  background-color: $primary-color;

  &--large {
    padding: $spacing-lg;
  }
}
```

**CSS-in-JS (2018-2022)**

```jsx
const Button = styled.button`
  background-color: ${(props) => props.color};
  padding: ${(props) => (props.size === 'large' ? '2rem' : '1rem')};
`
```

**Modern Vanilla CSS (2023+)**

```css
.button {
  background-color: var(--button-color);
  padding: var(--button-padding);

  &[data-size='large'] {
    --button-padding: 2rem;
  }
}
```

### Why This Matters

#### CSS Custom Properties Benefits:

1. **Dynamic Values**: Can be changed at runtime
2. **Inheritance**: Cascade down the DOM tree
3. **No Build Step**: Native browser support
4. **Type Safety**: Can be validated with TypeScript

#### Data Attributes for States:

```tsx
// Instead of className concatenation
<button data-variant="primary" data-size="large">
  Click me
</button>
```

```css
.button {
  &[data-variant='primary'] {
    background-color: var(--primary-color);
  }

  &[data-size='large'] {
    padding: 2rem;
  }
}
```

## When to Use Each Approach

### Use SCSS When:

- Working on large, established codebases with SCSS
- Need powerful preprocessing (mixins, functions, loops)
- Team is familiar with SCSS/SASS
- Building design systems with complex theming

### Use Modern CSS When:

- Starting new projects
- Need dynamic theming (dark mode, user preferences)
- Want faster build times
- Prefer native browser features

### Use CSS-in-JS When:

- Need tight coupling between JS logic and styles
- Building component libraries
- Require runtime dynamic styles based on complex state

## Hybrid Approach (This Project)

This project uses **TailwindCSS for most styling** but demonstrates SCSS for Exercise 1 to show proficiency in both approaches. This is a pragmatic choice because:

1. **TailwindCSS**: Utility-first, fast development, great for modern apps
2. **SCSS**: Still widely used in enterprise, shows classical CSS knowledge
3. **shadcn/ui**: Pre-built accessible components, best practices

## Accessibility Considerations

The navbar implementation includes:

- Semantic HTML (`<nav>`, `<ul>`, `<li>`)
- `aria-current="page"` for screen readers
- Keyboard focus styles (`:focus-visible`)
- Sufficient color contrast ratios
- Touch-friendly tap targets (minimum 44x44px)

## References

- [My Article: Modern Styling in React](https://cramirez.is-a.dev/articles/modern-styling-in-react/)
- [BEM Methodology](http://getbem.com/)
- [Sass Guidelines (7-1 Pattern)](https://sass-guidelin.es/#the-7-1-pattern)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
