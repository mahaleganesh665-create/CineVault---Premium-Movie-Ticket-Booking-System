-- ==========================================
-- CINEVAULT SUPABASE DATABASE SCHEMA
-- Copy and paste this entire file into the Supabase SQL Editor and click "Run"
-- ==========================================

-- 1. Create Movies Table
CREATE TABLE IF NOT EXISTS public.movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    duration TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    language TEXT NOT NULL,
    poster TEXT NOT NULL,
    banner TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Theatres Table
CREATE TABLE IF NOT EXISTS public.theatres (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    movie_title TEXT NOT NULL,
    theatre_name TEXT NOT NULL,
    show_date DATE NOT NULL,
    show_time TEXT NOT NULL,
    seats TEXT[] NOT NULL,
    total_amount NUMERIC NOT NULL,
    booking_reference TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Insert Dummy Movies Data
INSERT INTO public.movies (id, title, genre, duration, rating, language, poster, banner, description)
VALUES 
    (gen_random_uuid(), 'The Cosmic Void', 'Sci-Fi', '2h 30m', 4.8, 'English', 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop', 'An epic journey to the edge of the universe where time and space collapse.'),
    (gen_random_uuid(), 'Neon Shadows', 'Action', '2h 15m', 4.5, 'English', 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop', 'A cyberpunk thriller set in a dystopian future where hackers rule the underworld.'),
    (gen_random_uuid(), 'Desert Protocol', 'Thriller', '1h 50m', 4.2, 'Hindi', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop', 'A high-stakes espionage mission that goes wrong in the middle of nowhere.'),
    (gen_random_uuid(), 'Echoes of Time', 'Drama', '2h 05m', 4.6, 'English', 'https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1440407876336-62333a6f010f?q=80&w=2074&auto=format&fit=crop', 'A heart-wrenching story of love, loss, and the memories that bind us together.');

-- 5. Insert Dummy Theatres Data
INSERT INTO public.theatres (id, name, location)
VALUES
    (gen_random_uuid(), 'CineVault IMAX', 'Downtown Metro'),
    (gen_random_uuid(), 'Starlight Cinemas', 'Westside Mall'),
    (gen_random_uuid(), 'Galaxy Displays', 'North Avenue');

-- 6. Setup Row Level Security (RLS)
-- Movies and Theatres are readable by everyone
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.movies;
CREATE POLICY "Enable read access for all users" ON public.movies FOR SELECT USING (true);

ALTER TABLE public.theatres ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.theatres;
CREATE POLICY "Enable read access for all users" ON public.theatres FOR SELECT USING (true);

-- Bookings are only readable and insertable by the logged-in user
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can insert their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);

-- Optional: Create an admin role policy later if needed for the admin dashboard. 
-- For now, disable RLS on bookings entirely IF you want the site to work without logging in (Prototype Mode), 
-- OR keep it if authentication is strictly enforced.
-- We will allow anonymous inserts just for the sake of the college project demo if they don't log in:
DROP POLICY IF EXISTS "Allow anonymous inserts for demo" ON public.bookings;
DROP POLICY IF EXISTS "Allow anonymous selects for demo" ON public.bookings;
CREATE POLICY "Allow anonymous inserts for demo" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous selects for demo" ON public.bookings FOR SELECT USING (true);

-- Done!
