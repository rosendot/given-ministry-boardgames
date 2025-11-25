# Given Ministry LLC Boardgame Storefront

An e-commerce website for a family-owned board game store built with Next.js 15, TypeScript, Tailwind CSS, and Shopify Storefront API.

## 🎯 Project Overview

Headless e-commerce site for browsing and purchasing board games online. Features a warm earth-toned design with custom color palette, comprehensive UX/UI animations, and full Shopify integration for cart management and checkout.

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **E-Commerce:** Shopify Storefront API
- **Icons:** Lucide React
- **State Management:** React Hooks, LocalStorage

## 🎨 Design System

### Color Palette
**Religious Pastel Greens Theme:**
- **Primary:** `#7ba05b` (Soft olive green)
- **Primary Dark:** `#6a8f4a` (Deeper olive green for hover states)
- **Secondary:** `#a8c49a` (Lighter sage green)
- **Accent:** `#9bb88d` (Muted mint green)
- **Warm Cream:** `#f5f7f4` (Light green-tinted cream)
- **Sage Green:** `#b5c9a6` (True sage green)
- **Deep Brown:** `#4a5c4a` (Forest green-brown)
- **Mint Whisper:** `#e8f3e8` (Very light mint)
- **Forest Prayer:** `#5f7a47` (Deep prayer green)
- **Sanctuary Green:** `#8fa876` (Sanctuary green)

### Typography Hierarchy
- **Headlines:** `text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight`
- **Subheadings:** `text-2xl font-bold tracking-tight`
- **Body Text:** `text-lg font-light leading-relaxed`
- **Price Display:** `text-3xl` to `text-5xl font-bold`
- **Buttons:** `text-lg font-bold tracking-tight`

### Animation System
**fadeInUp Keyframe:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Staggered Animations:**
- Elements animate sequentially with 0.05s-0.1s delays
- Creates cascading effect as page loads
- Applied using inline styles: `animation: fadeInUp 0.4s ease-out ${delay}s both`

### Component Styling Patterns
**Cards:**
- Padding: `p-8 lg:p-10` for generous spacing
- Corners: `rounded-2xl` for modern aesthetic
- Borders: `border border-gray-100` for subtle separation
- Shadows: `shadow-sm` default, `hover:shadow-lg` on hover
- Gaps: `gap-8 xl:gap-12` for breathing room

**Buttons:**
- Primary CTA: `px-10 py-5 rounded-2xl`
- Hover effects: `hover:scale-105 hover:-translate-y-1`
- Icon animations: `group-hover:scale-110`
- Transitions: `transition-all duration-300`

**Images:**
- Corners: `rounded-xl` or `rounded-2xl`
- Hover scale: `group-hover:scale-105` or `group-hover:scale-110`
- Smooth transitions: `transition-transform duration-300`

### Interactive Elements
**Hover Effects:**
- Card lift: `hover:-translate-y-1` or `hover:-translate-y-2`
- Icon scale: `group-hover:scale-110`
- Arrow movement: `group-hover:translate-x-1`
- Color transitions: `transition-colors duration-300`

**Loading States:**
- Spinner: `Loader2` with `w-12 h-12 animate-spin`
- Text: `text-xl font-light`
- Centered layout with vertical spacing

## 📄 Pages

1. **Home (`/`)** - Hero with animated value propositions, trust badges, staggered card animations
2. **Games (`/games`)** - Product catalog with grid/list views, sorting, staggered product animations
3. **Game Detail (`/games/[handle]`)** - Individual product with image gallery, quantity controls, animated sections
4. **Cart (`/cart`)** - Shopping cart with staggered item animations, order summary, trust badges
5. **Help (`/help`)** - Animated FAQ accordion with rotating chevrons, policy sections

## 🧩 Components

- **Header** - Sticky navigation with dynamic cart counter, mobile hamburger menu
- **Footer** - Company info, links, newsletter signup
- **Product Cards** - Grid/list views with hover effects, stock indicators, price displays
- **Cart Management** - Add/remove items with scale animations, quantity controls with hover effects
- **Image Galleries** - Carousel navigation with fade transitions, thumbnail previews

## 🔌 API Routes

All routes integrate with Shopify Storefront API:

- `/api/inventory` - Fetch all products from Shopify
- `/api/product/[handle]` - Get individual product details
- `/api/cart/create` - Create new Shopify cart
- `/api/cart/get` - Retrieve existing cart
- `/api/cart/add` - Add items to cart
- `/api/cart/update` - Update item quantities
- `/api/cart/remove` - Remove items from cart

## ✨ Features

### Shopping Experience
- Real-time cart synchronization across browser tabs
- Dynamic product catalog from Shopify
- Product sorting (name, price) with ascending/descending order
- Grid and list view toggle with smooth transitions
- Stock availability indicators with status badges
- Responsive mobile-first design
- Image galleries with navigation arrows and thumbnails

### Cart Management
- Add/remove products with animated feedback
- Quantity controls with hover scale effects
- Subtotal and total calculations
- Shipping cost display
- Secure Shopify checkout redirect
- Cart persistence via LocalStorage
- Empty cart state with call-to-action

### UI/UX Enhancements
**Professional Iconography:**
- Lucide React icons throughout (no emojis)
- Consistent icon sizing: `w-5 h-5`, `w-6 h-6`, `w-7 h-7`, `w-8 h-8`
- Icon animations on hover

**Micro-Animations:**
- Staggered fadeInUp on page load
- Smooth hover transitions (300ms duration)
- Scale effects on buttons and icons
- Translate effects for lift and movement
- Rotate effects for accordions (180° on ChevronDown)

**Enhanced Typography:**
- Extrabold headlines with tight tracking
- Light body text for readability
- Bold tracking-tight for emphasis
- Consistent hierarchy across pages

**Card & Layout Improvements:**
- Modern rounded-2xl corners
- Generous padding (p-8, p-10)
- Subtle borders and shadows
- Gradient backgrounds for depth
- Responsive gaps and spacing

**Loading & Empty States:**
- Professional loading spinners
- Informative empty state messages
- Animated state transitions
- Clear call-to-action buttons

**Trust & Security:**
- SSL encryption badges
- Shipping policy indicators
- Return policy highlights
- Secure checkout messaging

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Add environment variables
# Create .env.local with:
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token

# Run development server
npm run dev
# Open http://localhost:3000

# Production build
npm run build
npm run start

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── cart/
│   │   │   ├── add/route.ts
│   │   │   ├── create/route.ts
│   │   │   ├── get/route.ts
│   │   │   ├── remove/route.ts
│   │   │   └── update/route.ts
│   │   ├── inventory/route.ts
│   │   └── product/[handle]/route.ts
│   ├── cart/page.tsx
│   ├── games/
│   │   ├── [handle]/page.tsx
│   │   └── page.tsx
│   ├── help/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   └── Header.tsx
├── config/
│   └── company.ts
└── context/
    └── (context files)
```

## 🔧 Configuration

### Company Settings
Update company information in `src/config/company.ts`:
- Business name, contact info
- Business hours
- Shipping rates and policies
- Return policy details

### Shopify Setup
1. Create a Shopify store
2. Generate Storefront API access token
3. Add products to Shopify inventory
4. Configure environment variables

## 📦 Dependencies

**Core:**
- `next@15.4.6`
- `react@19.1.0`
- `react-dom@19.1.0`
- `typescript@^5`

**Shopify:**
- `@shopify/storefront-api-client@^1.0.9`

**UI:**
- `tailwindcss@^4`
- `lucide-react@^0.469.0`

**Dev Tools:**
- `eslint@^9`
- `eslint-config-next@15.4.6`

## 🎨 Design System Implementation

### Complete UX/UI Transformation
All pages feature comprehensive design improvements including:

**1. Professional Iconography**
- Replaced all emojis with Lucide React icons
- Semantic icon selection matching content
- Consistent sizing and spacing

**2. Typography Enhancement**
- Extrabold headlines: `font-extrabold tracking-tight`
- Light body text: `font-light leading-relaxed`
- Responsive sizing: `text-5xl md:text-6xl lg:text-7xl`
- Clear visual hierarchy

**3. Micro-Animations**
- fadeInUp keyframe in globals.css
- Staggered delays for cascading effect
- Client-side mounted state prevents flash
- Smooth 300ms transitions throughout

**4. Card Improvements**
- Modern rounded-2xl corners
- Generous p-8 lg:p-10 padding
- Subtle border-gray-100 borders
- Shadow progression: shadow-sm → hover:shadow-lg

**5. Hover Effects**
- Card lift: hover:-translate-y-1
- Icon scale: group-hover:scale-110
- Button lift: hover:scale-105
- Smooth color transitions

**6. Spacing System**
- Consistent gaps: gap-8 xl:gap-12
- Vertical rhythm: space-y-6, space-y-8
- Container padding: py-12 lg:py-16
- Responsive breakpoints

## 🎯 Current Status

**✅ Completed:**
- Full Shopify integration
- Real-time cart management
- Product catalog with images from Shopify CDN
- Comprehensive UX/UI design system
- Professional animations and transitions
- Responsive mobile-first design
- Mobile navigation with hamburger menu
- Help page with animated FAQs
- Secure checkout flow
- Trust badges and security indicators
- Loading and empty states
- Image galleries with navigation

**🎨 Design Improvements Applied:**
- ✅ Professional Lucide React iconography
- ✅ Enhanced typography hierarchy
- ✅ Staggered fadeInUp animations
- ✅ Modern card styling (rounded-2xl, better padding)
- ✅ Comprehensive hover effects
- ✅ Smooth transitions (300ms duration)
- ✅ Client-side animation mounting
- ✅ Consistent spacing system
- ✅ Gradient backgrounds and accents

## 📝 Development

### Code Standards
- TypeScript strict mode
- Tailwind utility classes
- Functional React components with hooks
- Next.js 15 App Router conventions
- ESLint for code quality
- Client-side mounting for animations
- Semantic HTML and accessibility

### Animation Guidelines
1. Add `mounted` state with `useEffect` to all pages
2. Apply `fadeInUp` with staggered delays
3. Use `transition-all duration-300` for hover effects
4. Implement `group-hover` for icon animations
5. Maintain consistent timing (300ms transitions)

### Git Workflow
- `feat:` New features
- `fix:` Bug fixes
- `style:` Design/styling updates
- `chore:` Maintenance tasks

---

**Status:** ✅ Production Ready
**Version:** 3.0.0 (Comprehensive UX/UI Design System)
**Design System:** Complete with professional animations, typography, and interactions
