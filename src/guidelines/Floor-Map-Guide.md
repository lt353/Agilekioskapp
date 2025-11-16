# Interactive Floor Map Guide

## Overview
The interactive floor map system provides touch-friendly navigation for both floors of the UHMC Ka Lama building, with clickable room hotspots overlaid on the actual color-coded floor plan images.

## Features

### 1. Dual Floor Navigation
- **Floor 1 & Floor 2 Views**: Users can toggle between floors using prominent buttons
- **Actual Floor Plan Images**: Clean, professionally designed floor plans with color-coded rooms already visible
- **Smooth Transitions**: Animated transitions when switching between floors

### 2. Interactive Room Hotspots
Each room on the floor plan has a clickable overlay with:
- **Semi-Transparent Overlays**: Clickable areas match the underlying floor plan colors
- **Hover Effects**: Rooms highlight and show room number + name when hovered/touched
- **Click Navigation**: Tapping any room navigates to detailed room information
- **Visual Feedback**: Enhanced glow and opacity on hover

### 3. Room Categories & Colors
The floor plans already show color-coded rooms matching this legend:
- **Faculty Offices** (Blue): Individual faculty office spaces (Rooms 111-126, 130, 134 on Floor 1; 214, 218-219, 230-231, 234 on Floor 2)
- **Student Services** (Green): Student support and advising centers (Rooms 101, 106, 127, 131 on Floor 1; 233 on Floor 2)
- **Administrative Offices** (Yellow): Department administration (Rooms 201, 203, 232 on Floor 2)
- **Restrooms** (Cyan): Men's (M) and Women's (W) facilities on both floors
- **Stairs** (Light Blue): Stairwell locations at corners
- **Elevators** (Pink): Elevator (E) access points
- **Classrooms** (Beige/Light): Teaching spaces (Rooms 102, 103, 108, 109 on Floor 1; 202, 204, 207, 208 on Floor 2)
- **General Offices** (Beige/Light): Other office spaces

### 4. Room Detail View
When a room is selected, users see:
- **Room Number & Name**
- **Type Badge**: Color-coded category
- **Occupant Information**: Faculty/staff name (if applicable)
- **Department**: Which department uses the room
- **Hours of Operation**
- **Contact Info**: Phone and email (if applicable)
- **Directions**: Step-by-step guidance to find the room
- **Quick Actions**: View on map, search another room

## Data Structure

### Room Database (`/data/roomData.ts`)
Comprehensive data for all rooms including:
- Room number, name, and type
- Floor location
- Occupant and department information
- Contact details
- Descriptions

### Notable Rooms
- **Room 234**: Dr. Vincent Domingo (Business Department Chair)
- **Room 101**: Student Services Center
- **Room 201/203**: Administrative Offices

## User Flow

1. **Access Directory**: From main menu → "Find a Room"
2. **Choose Search Method**:
   - Enter room number directly
   - Browse Floor 1 or Floor 2 interactive map
3. **Interact with Map**:
   - Hover over rooms to see basic info
   - Click/tap any room for full details
4. **View Room Details**:
   - See comprehensive information
   - Get step-by-step directions
   - Return to map or search again
5. **Switch Floors**: Toggle between Floor 1 and Floor 2 as needed

## Technical Implementation

### Components
- **FloorMap.tsx**: Main interactive map with hotspots
- **RoomDetail.tsx**: Detailed room information display
- **DirectoryLanding.tsx**: Entry point with search options

### Hotspot Positioning
- Uses SVG overlays with percentage-based positioning
- Responsive to different screen sizes
- Touch-optimized for 43" touchscreens

### Color System
Matches UHMC branding with Deep Teal Blue (#004f71) as primary color throughout the interface.

## Accessibility
- Large touch targets for 43" touchscreen displays
- High contrast colors
- Clear visual feedback on hover/touch
- Descriptive labels and instructions
- Auto-return to home after 60 seconds of inactivity