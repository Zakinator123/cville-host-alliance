#!/usr/bin/env node

/**
 * Script to convert SVG icon to multiple favicon formats
 * Generates PNG icons at various sizes and Apple touch icon
 * Requires: sharp (npm install sharp)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgPath = path.join(__dirname, '../app/icon.svg');
const appDir = path.join(__dirname, '../app');

const iconSizes = [
  // Note: icon.png removed due to Next.js 16 Turbopack bug
  // Having both icon.svg and icon.png causes build errors
  // See: https://github.com/vercel/next.js/discussions/85232
  { file: 'apple-icon.png', size: 180 },    // Apple touch icon
];

async function convertSvgToIcons() {
  try {
    // Read SVG file
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate each icon size
    for (const { file, size } of iconSizes) {
      const outputPath = path.join(appDir, file);
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✅ Generated ${file} (${size}x${size})`);
    }
    
    console.log('\n🎉 All icon formats generated successfully!');
    console.log('📁 Next.js will automatically detect and use these icons.');
  } catch (error) {
    console.error('❌ Error converting icons:', error.message);
    process.exit(1);
  }
}

convertSvgToIcons();
