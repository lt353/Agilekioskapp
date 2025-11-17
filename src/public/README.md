# Public Assets for UHMC Digital Signage System

This folder contains all static assets for the UHMC Ka Lama Building Digital Signage system.

## Folder Structure

### `/images`
All image assets organized by category:

#### `/images/attract-mode`
Slideshow images for the attract mode (13 slides)
- Campus photos
- Student life images
- Facility images
- Program highlights

#### `/images/programs`
Images for the four business programs:
- Business
- Hospitality
- Accounting
- ABIT (Applied Business & Information Technology)

#### `/images/events`
Event promotion images and thumbnails

#### `/images/jobs`
Job opportunity related images

#### `/images/logos`
UHMC logos and branding assets:
- Main UHMC logo
- Program logos
- Partner logos

#### `/images/directory`
Floor maps and directory-related images:
- Floor 1 map
- Floor 2 map
- Building exterior
- Wayfinding images

### `/fonts` (optional)
Custom fonts if needed:
- Gotham (Sans serif - primary)
- Shelby Script (Decorative)
- Trajan (Serif)

## Usage

All images should be referenced using the `/images/...` path structure in the application.

Example:
```tsx
<img src="/images/logos/uhmc-logo.png" alt="UHMC Logo" />
```

## Image Guidelines

- Optimize all images for 4K portrait displays (9:16 aspect ratio)
- Use WebP format for photos when possible for better compression
- Keep file sizes reasonable for kiosk deployment
- Maintain aspect ratios appropriate for the portrait display
- Use descriptive filenames (e.g., `hospitality-program-hero.jpg`)

## Notes

This folder structure is ready for deployment. Assets will be migrated from existing sources in a future update.
