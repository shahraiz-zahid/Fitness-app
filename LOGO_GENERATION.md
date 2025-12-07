# Fitness App Logo Generation

This project includes automated logo generation scripts to create app icons and branding assets.

## Quick Start

### Option 1: Using Python (Recommended - No extra dependencies)

```powershell
# Install Pillow library
pip install pillow

# Run the logo generator
python scripts/generate-logo.py
```

### Option 2: Using Node.js

```powershell
# Install sharp library
npm install sharp

# Run the logo generator
node scripts/generate-logo.js
```

## Generated Assets

The scripts will create the following logo files in `assets/images/`:

- **icon.png** (192x192) - Main app icon
- **adaptive-icon.png** (1024x1024) - Adaptive icon
- **android-icon-foreground.png** (192x192) - Android foreground
- **android-icon-background.png** (512x512) - Android background
- **android-icon-monochrome.png** (512x512) - Android monochrome
- **favicon.png** (32x32) - Web favicon
- **splash-icon.png** (200x200) - Splash screen icon

## Logo Design

The logo features a **dumbbell** design symbolizing fitness and strength:
- **Primary color**: Teal/Blue (#45B7D1)
- **Accent color**: Red (#FF6B6B) for weights
- **Highlight color**: Yellow (#FFD93D) for bar

## Running the App with New Logo

After generating logos, rebuild and restart:

```powershell
npm install
npx expo start -c
```

The app will now display the new logo on splash screen, home screen, and device home screen.

## Custom Logo

To customize the logo, edit the color values in either script:
- Python: Lines in `create_logo()` function
- Node.js: SVG color values in `logoSVG` variable

Then re-run the generation script.
