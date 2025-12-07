#!/usr/bin/env node

/**
 * Logo Generator Script
 * Generates app logo PNG files from SVG
 * Requires: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create assets/images directory if it doesn't exist
const assetsDir = path.join(__dirname, '../assets/images');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// SVG Logo Design (Fitness themed)
const logoSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="512" height="512" fill="#45B7D1" rx="120"/>
  
  <!-- Dumbbell shape -->
  <g transform="translate(256, 256)">
    <!-- Left weight -->
    <rect x="-180" y="-40" width="80" height="80" fill="#FF6B6B" rx="10"/>
    
    <!-- Bar -->
    <rect x="-80" y="-20" width="160" height="40" fill="#FFD93D" rx="8"/>
    
    <!-- Right weight -->
    <rect x="100" y="-40" width="80" height="80" fill="#FF6B6B" rx="10"/>
    
    <!-- Highlight -->
    <circle cx="0" cy="-80" r="30" fill="rgba(255, 255, 255, 0.3)"/>
  </g>
  
  <!-- Shine effect -->
  <circle cx="100" cy="100" r="80" fill="rgba(255, 255, 255, 0.2)"/>
</svg>
`;

// Generate PNG files
async function generateLogos() {
  try {
    console.log('🎨 Generating app logos...');

    // Icon (192x192)
    await sharp(Buffer.from(logoSVG))
      .resize(192, 192)
      .png()
      .toFile(path.join(assetsDir, 'icon.png'));
    console.log('✓ Created icon.png (192x192)');

    // Larger icon (1024x1024)
    await sharp(Buffer.from(logoSVG))
      .resize(1024, 1024)
      .png()
      .toFile(path.join(assetsDir, 'adaptive-icon.png'));
    console.log('✓ Created adaptive-icon.png (1024x1024)');

    // Android foreground (192x192)
    await sharp(Buffer.from(logoSVG))
      .resize(192, 192)
      .png()
      .toFile(path.join(assetsDir, 'android-icon-foreground.png'));
    console.log('✓ Created android-icon-foreground.png');

    // Android background
    const bgSVG = '<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" fill="#E6F4FE"/></svg>';
    await sharp(Buffer.from(bgSVG))
      .resize(512, 512)
      .png()
      .toFile(path.join(assetsDir, 'android-icon-background.png'));
    console.log('✓ Created android-icon-background.png');

    // Android monochrome
    const monoSVG = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(256, 256)">
        <rect x="-180" y="-40" width="80" height="80" fill="black" rx="10"/>
        <rect x="-80" y="-20" width="160" height="40" fill="black" rx="8"/>
        <rect x="100" y="-40" width="80" height="80" fill="black" rx="10"/>
      </g>
    </svg>
    `;
    await sharp(Buffer.from(monoSVG))
      .resize(512, 512)
      .png()
      .toFile(path.join(assetsDir, 'android-icon-monochrome.png'));
    console.log('✓ Created android-icon-monochrome.png');

    // Favicon (32x32)
    await sharp(Buffer.from(logoSVG))
      .resize(32, 32)
      .png()
      .toFile(path.join(assetsDir, 'favicon.png'));
    console.log('✓ Created favicon.png');

    // Splash icon (200x200)
    await sharp(Buffer.from(logoSVG))
      .resize(200, 200)
      .png()
      .toFile(path.join(assetsDir, 'splash-icon.png'));
    console.log('✓ Created splash-icon.png');

    console.log('\n✅ All logos generated successfully!');
  } catch (error) {
    console.error('❌ Error generating logos:', error.message);
  }
}

generateLogos();
