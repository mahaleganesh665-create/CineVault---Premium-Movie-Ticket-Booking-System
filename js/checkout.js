import { supabase, USE_MOCK_DATA } from './supabase.js';

let bookingData = {};
const CONVENIENCE_FEE = 4.00;
let discount = 0;

document.addEventListener('DOMContentLoaded', async () => {
    // Read params from localStorage
    const dataStr = localStorage.getItem('checkoutData');
    if (!dataStr) {
        window.location.href = 'movies.html';
        return;
    }
    
    bookingData = JSON.parse(dataStr);
    renderSummary();

    // Pre-fill email if logged in
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if(session && session.user) {
            document.getElementById('userEmail').value = session.user.email;
        }
    } catch(e) {}

    // Form submission
    document.getElementById('paymentForm').addEventListener('submit', handlePayment);
    // Promo
    document.getElementById('applyPromoBtn').addEventListener('click', handlePromo);
});

function renderSummary() {
    document.getElementById('sumPoster').src = bookingData.poster;
    document.getElementById('sumTitle').innerText = bookingData.movieTitle;
    document.getElementById('sumTheatre').innerText = bookingData.theatre;
    
    const d = new Date(bookingData.date);
    const dateStr = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}, ${d.getFullYear()}`;
    document.getElementById('sumDateTime').innerText = `${dateStr} | ${bookingData.time}`;

    document.getElementById('sumSeatCount').innerText = bookingData.seats.length;
    document.getElementById('sumSeats').innerText = bookingData.seats.join(', ');

    const subTotal = bookingData.amount;
    document.getElementById('sumSubTotal').innerText = subTotal.toFixed(2);
    
    updateTotal();
}

function handlePromo() {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();
    if(code === 'CINEVIP20') {
        discount = bookingData.amount * 0.20;
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('sumDiscount').innerText = discount.toFixed(2);
        if(window.showToast) window.showToast("Promo code applied! 20% off tickets.");
    } else {
        discount = 0;
        document.getElementById('discountRow').style.display = 'none';
        if(window.showToast) window.showToast("Invalid or expired promo code", "error");
    }
    updateTotal();
}

function updateTotal() {
    const finalTotal = (bookingData.amount + CONVENIENCE_FEE) - discount;
    document.getElementById('sumTotal').innerText = finalTotal.toFixed(2);
    bookingData.finalTotal = finalTotal;
}

async function handlePayment(e) {
    e.preventDefault();
    
    const overlay = document.getElementById('processingOverlay');
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';

    // Simulate payment processing delay to look cool
    await new Promise(r => setTimeout(r, 2000));

    // Save final booking to Supabase if config available
    const userEmail = document.getElementById('userEmail').value;
    bookingData.email = userEmail;
    bookingData.bookingId = 'CV' + Math.random().toString(36).substr(2, 8).toUpperCase();
    bookingData.bookingDate = new Date().toISOString();

    if (!USE_MOCK_DATA) {
        try {
            // Assume user if logged in, else null
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session ? session.user.id : null;
            
            // Insert logic (assuming tables exist, failure silently falls back to local success)
            const { error } = await supabase.from('bookings').insert([{
                user_id: userId,
                movie_title: bookingData.movieTitle,
                theatre_name: bookingData.theatre,
                show_date: bookingData.date,
                show_time: bookingData.time,
                seats: bookingData.seats, // Array passed correctly for TEXT[]
                total_amount: bookingData.finalTotal,
                booking_reference: bookingData.bookingId
            }]);
            
            if(error) console.warn("Could not save to Supabase. This might be due to missing tables or RLS.");
        } catch (error) {
            console.error(error);
        }
    }

    // Pass data to success page
    localStorage.setItem('finalTicket', JSON.stringify(bookingData));
    window.location.href = 'success.html';
}
