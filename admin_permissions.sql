-- ==========================================
-- CINEVAULT ADMIN PERMISSIONS SQL
-- Run this in your Supabase SQL Editor to enable Admin Panel features
-- ==========================================

-- 1. Enable INSERT, UPDATE and DELETE for Movies (Allows adding, editing, and deleting movies)
DROP POLICY IF EXISTS "Enable insert for all users" ON public.movies;
DROP POLICY IF EXISTS "Enable update for all users" ON public.movies;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.movies;
CREATE POLICY "Enable insert for all users" ON public.movies FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.movies FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.movies FOR DELETE USING (true);

-- 2. Enable INSERT, UPDATE, and DELETE for Theatres
DROP POLICY IF EXISTS "Enable insert for all users" ON public.theatres;
DROP POLICY IF EXISTS "Enable update for all users" ON public.theatres;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.theatres;
CREATE POLICY "Enable insert for all users" ON public.theatres FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.theatres FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.theatres FOR DELETE USING (true);

-- 3. Enable DELETE and UPDATE for Bookings (For Admins to cancel/edit orders)
DROP POLICY IF EXISTS "Allow anonymous updates for demo" ON public.bookings;
DROP POLICY IF EXISTS "Allow anonymous deletes for demo" ON public.bookings;
CREATE POLICY "Allow anonymous updates for demo" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous deletes for demo" ON public.bookings FOR DELETE USING (true);

-- Done!
