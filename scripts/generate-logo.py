#!/usr/bin/env python3
"""
Fitness App Logo Generator
Generates PNG logos from SVG design
Requires: pip install pillow
"""

from PIL import Image, ImageDraw
import os

# Create assets/images directory
assets_dir = os.path.join(os.path.dirname(__file__), '../assets/images')
os.makedirs(assets_dir, exist_ok=True)

def create_logo(size):
    """Create a fitness app logo with dumbbell design"""
    # Create image with gradient background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors
    primary_color = (69, 183, 209)  # Teal/Blue
    accent_color = (255, 107, 107)  # Red
    highlight_color = (255, 217, 61)  # Yellow
    
    # Background circle
    margin = 20
    draw.ellipse(
        [(margin, margin), (size-margin, size-margin)],
        fill=primary_color
    )
    
    # Center position
    cx, cy = size // 2, size // 2
    
    # Dumbbell left weight
    weight_size = size // 6
    draw.rectangle(
        [(cx - size//3 - weight_size//2, cy - weight_size//2),
         (cx - size//3 + weight_size//2, cy + weight_size//2)],
        fill=accent_color
    )
    
    # Dumbbell bar
    bar_height = size // 10
    draw.rectangle(
        [(cx - size//5, cy - bar_height//2),
         (cx + size//5, cy + bar_height//2)],
        fill=highlight_color
    )
    
    # Dumbbell right weight
    draw.rectangle(
        [(cx + size//3 - weight_size//2, cy - weight_size//2),
         (cx + size//3 + weight_size//2, cy + weight_size//2)],
        fill=accent_color
    )
    
    return img

def create_monochrome_logo(size):
    """Create monochrome logo for Android"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    weight_size = size // 6
    bar_height = size // 10
    
    # Left weight
    draw.rectangle(
        [(cx - size//3 - weight_size//2, cy - weight_size//2),
         (cx - size//3 + weight_size//2, cy + weight_size//2)],
        fill=(0, 0, 0)
    )
    
    # Bar
    draw.rectangle(
        [(cx - size//5, cy - bar_height//2),
         (cx + size//5, cy + bar_height//2)],
        fill=(0, 0, 0)
    )
    
    # Right weight
    draw.rectangle(
        [(cx + size//3 - weight_size//2, cy - weight_size//2),
         (cx + size//3 + weight_size//2, cy + weight_size//2)],
        fill=(0, 0, 0)
    )
    
    return img

def create_background():
    """Create background for Android adaptive icon"""
    img = Image.new('RGBA', (512, 512), (230, 244, 254, 255))
    return img

try:
    print("🎨 Generating app logos...")
    
    # Generate various sizes
    sizes = [
        (192, 'icon.png'),
        (1024, 'adaptive-icon.png'),
        (192, 'android-icon-foreground.png'),
        (512, 'android-icon-monochrome.png'),
        (32, 'favicon.png'),
        (200, 'splash-icon.png'),
    ]
    
    for size, filename in sizes:
        if 'monochrome' in filename:
            logo = create_monochrome_logo(size)
        else:
            logo = create_logo(size)
        
        logo.save(os.path.join(assets_dir, filename), 'PNG')
        print(f"✓ Created {filename} ({size}x{size})")
    
    # Create background
    bg = create_background()
    bg.save(os.path.join(assets_dir, 'android-icon-background.png'), 'PNG')
    print("✓ Created android-icon-background.png")
    
    print("\n✅ All logos generated successfully!")
    print(f"📁 Location: {assets_dir}")

except ImportError:
    print("❌ Error: 'pillow' is required. Install with: pip install pillow")
except Exception as e:
    print(f"❌ Error: {str(e)}")
