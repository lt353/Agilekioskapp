# Supabase Database Setup Guide

This guide will help you set up the required Supabase tables for the UHMC Ka Lama digital signage system.

## Required Tables

The system requires 4 tables to be created in your Supabase database:

### 1. `attract_content` Table
For dynamic announcements, events, and promotions in the attract mode slideshow.

```sql
CREATE TABLE attract_content (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'event', 'announcement', or 'promotion'
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  event_date TIMESTAMP,
  event_time TEXT,
  location TEXT,
  learn_more_url TEXT,
  gradient_colors TEXT,
  template_variant INTEGER,
  display_order INTEGER NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. `events` Table
For the Events landing page.

```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  event_time TEXT,
  location TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. `jobs` Table
For the Career Opportunities page.

```sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  job_type TEXT, -- 'Full-time', 'Part-time', 'Student Position', etc.
  wage TEXT,
  description TEXT,
  is_new BOOLEAN DEFAULT false,
  posted_date TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. `rooms` Table
For the building directory and room information.

```sql
CREATE TABLE rooms (
  number TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'faculty', 'student-services', 'administrative', 'restroom', 'elevator', etc.
  floor INTEGER NOT NULL, -- 1 or 2
  occupant TEXT,
  department TEXT,
  category TEXT, -- For list view grouping
  hours TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  position TEXT, -- JSON string for map coordinates (optional)
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Sample Data

### Sample Attract Content
```sql
INSERT INTO attract_content (id, type, title, subtitle, description, image_url, event_date, template_variant, display_order, active)
VALUES 
  ('event-1', 'event', 'Business Career Fair', 'Connect with Top Employers', 'Meet hiring managers from leading Maui businesses', 'https://media.mauinow.com/file/mauinow/2024/04/UHMC-Open-House-Fair-program-booth--1024x682.jpg', '2025-11-15 10:00:00', 1, 1, true),
  ('announcement-1', 'announcement', 'Spring Registration Open', 'Enroll Now for Spring 2026', 'Register early to secure your classes', NULL, NULL, 1, 2, true);
```

### Sample Event
```sql
INSERT INTO events (title, description, event_date, event_time, location, image_url, is_featured, active)
VALUES 
  ('Business Career Fair 2025', 'Meet with 20+ local employers and explore career opportunities', '2025-03-15', '10:00 AM - 2:00 PM', 'Ka Lama Building Courtyard', 'https://images.unsplash.com/photo-1676276374429-3902f2666824', true, true);
```

### Sample Job
```sql
INSERT INTO jobs (title, company, location, job_type, wage, description, is_new, posted_date, active)
VALUES 
  ('Marketing Intern', 'Maui Marketing Group', 'Kahului, Maui', 'Part-time', '$18/hr', 'Seeking motivated marketing intern for social media and content creation', true, '2 days ago', true);
```

### Sample Room
```sql
INSERT INTO rooms (number, name, type, floor, occupant, department, category, hours, phone, email, description, active)
VALUES 
  ('203', 'Financial Aid Office', 'student-services', 2, 'Financial Aid Team', 'Student Services', 'Student Services / Resource Centers', 'Mon-Fri 8:00 AM - 4:30 PM', '(808) 984-3277', 'finaid@hawaii.edu', 'Get help with FAFSA, scholarships, and financial planning', true);
```

## Setup Instructions

1. **Connect to Supabase**: Click the "Connect Supabase" button in your development environment
2. **Create Tables**: Run the SQL commands above in the Supabase SQL Editor
3. **Add Sample Data**: Insert some sample data to test the system
4. **Enable Row Level Security** (optional but recommended for production):
   ```sql
   ALTER TABLE attract_content ENABLE ROW LEVEL SECURITY;
   ALTER TABLE events ENABLE ROW LEVEL SECURITY;
   ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
   ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
   
   -- Allow public read access
   CREATE POLICY "Allow public read" ON attract_content FOR SELECT USING (true);
   CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);
   CREATE POLICY "Allow public read" ON jobs FOR SELECT USING (true);
   CREATE POLICY "Allow public read" ON rooms FOR SELECT USING (true);
   ```

## Current Status

The system is currently using **mock data** for all content. Once you set up the Supabase tables and add data, the system will automatically fetch and display real content from your database.

The system gracefully falls back to mock data if:
- Supabase is not connected
- Tables don't exist
- There are any database errors
- No data is found in the tables

This ensures the kiosk continues to function even if there are database issues.
