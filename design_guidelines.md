# AI Chatbox Design Guidelines for DTEC

## Design Approach: Hybrid Reference-Based

**Primary Reference**: DTEC's existing website aesthetic (professional tech hub branding)
**Chat Interface Reference**: Modern AI assistants (ChatGPT, Claude) with the provided screenshot as direct design inspiration
**Rationale**: Seamlessly integrate AI chat functionality while maintaining DTEC's established brand identity

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background: 15 8% 8% (deep charcoal)
- Surface: 15 8% 12% (elevated surfaces)
- Chat bubbles (User): 210 90% 48% (vibrant blue)
- Chat bubbles (AI): 0 0% 20% (light gray)
- Text primary: 0 0% 95%
- Text secondary: 0 0% 65%
- Accent (CTA): 210 90% 48% (matching user bubble)
- Border: 0 0% 25%

**Light Mode (Website sections)**
- Background: 0 0% 98%
- DTEC brand colors from existing site (orange accents, dark navy)

### B. Typography

**Font Stack**: 
- Primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
- Headings: 'Poppins', sans-serif (matching DTEC style)

**Scale**:
- Hero headline: text-5xl md:text-6xl font-bold
- Section headers: text-3xl md:text-4xl font-semibold
- Chat messages: text-base (16px)
- Timestamps: text-xs text-gray-500

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistency
- Chat container: px-4 py-6
- Message spacing: mb-4 gap-3
- Section padding: py-12 md:py-20
- Container max-width: max-w-7xl for website, max-w-4xl for chat area

### D. Component Library

**Homepage Replica Sections**:
1. **Hero Section**: Full-width image banner with DTEC branding, centered headline "Welcome to Dtec", subtitle about largest tech coworking campus
2. **Services Grid**: 3-column layout showcasing Coworking, Startup Programs, Events (with icons and descriptions)
3. **Stats Section**: Key metrics in a centered row (Startups, Nationalities, Events, Jobs)
4. **Awards Showcase**: Logo grid of achievements
5. **Testimonials**: Member quotes carousel

**Chat Interface Components**:
1. **Scroll Trigger Point**: Welcome message appears when user scrolls past 60vh
2. **Welcome Message**: 
   - AI avatar (left-aligned, circular, 40px)
   - Message bubble: bg-gray-800, rounded-2xl, p-4
   - Text: "How can I assist you today?"
   - Timestamp below in small gray text
3. **Chat Container**:
   - Fixed max-height: h-[500px]
   - Scrollable messages area
   - Sticky input at bottom
4. **Message Bubbles**:
   - User: bg-blue-600, text-white, rounded-2xl, ml-auto, max-w-[70%]
   - AI: bg-gray-800, text-gray-100, rounded-2xl, mr-auto, max-w-[70%]
   - Avatar for AI messages (32px circle)
   - Padding: px-4 py-3
5. **Input Area**:
   - Background: bg-gray-900/50 backdrop-blur-sm
   - Border: border border-gray-700
   - Icons: Attachment (paperclip), Voice (microphone), Send (paper plane)
   - Rounded: rounded-2xl
   - Focus state: ring-2 ring-blue-500

**Action Buttons**:
- "Clear Chat": Outlined button, border-gray-700, hover:bg-gray-800
- Send: Filled blue button, bg-blue-600, hover:bg-blue-700

### E. Interactions & Animations

**Scroll Behavior**:
- Smooth scroll throughout
- Chat welcome fades in with slide-up animation (translate-y-4 to 0, opacity 0 to 1)
- Duration: 500ms ease-out

**Chat Animations**:
- New messages: fade in from bottom (minimal, 200ms)
- Typing indicator: Subtle pulse animation for AI responses
- Input focus: Smooth border color transition

**Microinteractions**:
- Button hover states: scale-105 transform
- Icon hover: opacity-80
- Message sent: Brief scale animation on user bubble

## Images

**Hero Section**: 
- Source from DTEC website: Female wearing red/white headscarf at flexi-desk (https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2024/12/dtec-website-frontpage-picture-shared-desk-1-1.jpg)
- Treatment: Full-width, h-[60vh], object-cover with overlay gradient (from transparent to black 50%)

**Service Cards**:
- Coworking space image
- Workshop/events image
- Position: Alternating left/right in card layout

**AI Avatar**:
- Modern AI assistant icon or DTEC logo variant
- Size: 40px (welcome), 32px (chat messages)
- Style: Circular with subtle glow effect

## Layout Strategy

**Page Structure**:
1. Traditional DTEC homepage content (hero through awards) - 100% viewport width
2. Transition zone at 60vh scroll depth
3. Chat interface emerges in centered container (max-w-4xl)
4. Chat stays persistent once activated

**Responsive Breakpoints**:
- Mobile (<640px): Single column, full-width chat
- Tablet (640-1024px): Chat 90% width, centered
- Desktop (>1024px): Chat max-w-4xl, hero images full bleed

**Vertical Flow**:
- Website sections: py-16 to py-24
- Chat container: mt-12 mb-20 (breathing room)
- Natural content height, no forced viewport constraints