import { getMovieById } from './movies.js';

const PRICES = {
    regular: 12,
    premium: 18,
    vip: 25
};

let bookingData = {};
let selectedSeats = [];
let totalAmount = 0;

document.addEventListener('DOMContentLoaded', async () => {
    // Read params from localStorage
    const paramsStr = localStorage.getItem('bookingParams');
    if (!paramsStr) {
        window.location.href = 'movies.html';
        return;
    }
    
    const params = new URLSearchParams(paramsStr);
    bookingData = {
        movieId: params.get('movieId'),
        date: params.get('date'),
        time: params.get('time'),
        theatre: params.get('theatre')
    };

    // Load movie details for header
    const movie = await getMovieById(bookingData.movieId);
    if(movie) {
        document.getElementById('metaTitle').innerText = movie.title;
        bookingData.movieTitle = movie.title;
        bookingData.poster = movie.poster_url;
    }
    
    // Format Date and Time
    const d = new Date(bookingData.date);
    const dateStr = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}, ${d.getFullYear()}`;
    document.getElementById('metaDetails').innerText = `${bookingData.theatre} | ${dateStr} | ${bookingData.time}`;

    generateSeatMap();
    initSeatLogic();
    
    document.getElementById('proceedBtn').addEventListener('click', proceedToCheckout);
});

function generateSeatMap() {
    const container = document.getElementById('seatMap');
    let html = '';

    // VIP (Rows A-B)
    html += `<div class="cat-title">VIP Recliners - <span>$${PRICES.vip}</span></div><div class="cat-vip">`;
    html += generateRows(['A', 'B'], 6, 2); // rows, seatsPerSide, aisleWidth(1) -> 6 left, aisle, 6 right
    html += `</div>`;

    // Premium (Rows C-E)
    html += `<div class="cat-title">Premium - <span>$${PRICES.premium}</span></div><div class="cat-premium">`;
    html += generateRows(['C', 'D', 'E'], 8, 2);
    html += `</div>`;

    // Regular (Rows F-J)
    html += `<div class="cat-title">Regular - <span>$${PRICES.regular}</span></div><div class="cat-regular">`;
    html += generateRows(['F', 'G', 'H', 'I', 'J'], 10, 2);
    html += `</div>`;

    container.innerHTML = html;
}

function generateRows(rowLetters, seatsPerHalf, space) {
    let html = '';
    rowLetters.forEach(row => {
        html += `<div class="seat-row">`;
        html += `<div class="row-label">${row}</div>`;
        
        // Left Block
        for(let i=1; i<=seatsPerHalf; i++) {
            const isOccupied = Math.random() > 0.85 ? 'occupied' : ''; // Simulate random booking
            html += `<div class="seat ${isOccupied}" data-id="${row}${i}">${row}${i}</div>`;
        }
        
        // Aisle
        html += `<div class="aisle" style="width:${space*20}px"></div>`;
        
        // Right Block
        for(let i=seatsPerHalf+1; i<=seatsPerHalf*2; i++) {
            const isOccupied = Math.random() > 0.85 ? 'occupied' : '';
            html += `<div class="seat ${isOccupied}" data-id="${row}${i}">${row}${i}</div>`;
        }
        
        html += `</div>`;
    });
    return html;
}

function initSeatLogic() {
    const seats = document.querySelectorAll('.seat:not(.occupied)');
    
    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            if (seat.classList.contains('selected')) {
                // Deselect
                seat.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s !== seat.dataset.id);
            } else {
                // Maximum 10 seats
                if(selectedSeats.length >= 10) {
                    if(window.showToast) window.showToast("Maximum 10 seats per booking", "warning");
                    return;
                }
                // Select
                seat.classList.add('selected');
                selectedSeats.push(seat.dataset.id);
            }
            updateFooter();
        });
    });
}

function updateFooter() {
    const footer = document.getElementById('bookingFooter');
    const seatsLabel = document.getElementById('selectedSeatsLabel');
    const priceLabel = document.getElementById('totalPriceLabel');
    
    if (selectedSeats.length > 0) {
        footer.classList.add('active');
        seatsLabel.innerText = selectedSeats.join(', ');
        
        // Calculate Total
        totalAmount = 0;
        selectedSeats.forEach(id => {
            const row = id.charAt(0);
            if(row === 'A' || row === 'B') totalAmount += PRICES.vip;
            else if(row === 'C' || row === 'D' || row === 'E') totalAmount += PRICES.premium;
            else totalAmount += PRICES.regular;
        });
        
        priceLabel.innerText = totalAmount.toFixed(2);
    } else {
        footer.classList.remove('active');
    }
}

function proceedToCheckout() {
    if(selectedSeats.length === 0) return;
    
    // Save selection to local storage
    bookingData.seats = selectedSeats;
    bookingData.amount = totalAmount;
    localStorage.setItem('checkoutData', JSON.stringify(bookingData));
    
    window.location.href = 'checkout.html';
}
