import { supabase, USE_MOCK_DATA } from './supabase.js';
import { getMovieById } from './movies.js';

/*=============================================
=            Booking Flow Shared Logic        =
=============================================*/
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const movieContent = document.getElementById('movieContent');

// State Storage for Booking Flow
export const bookingState = {
    movie: null,
    date: null,
    theatre: null,
    showTime: null,
    showId: null,
    seats: [],
    seatCost: 0,
    type: 'Regular', // or Premium / VIP
    totalAmount: 0
};

/* Mock Theatres and Shows */
const DUMMY_THEATRES = [
    { id: 1, name: "CineVault IMAX Downtown", location: "123 Main St, City" },
    { id: 2, name: "Starlight Premium Cinemas", location: "45 West Ave, City" }
];

document.addEventListener('DOMContentLoaded', () => {
    // If on movie details page
    if (movieContent) {
        if (!movieId) {
            window.location.href = 'movies.html';
            return;
        }
        renderMovieDetailsPage();
    }
});

async function renderMovieDetailsPage() {
    try {
        const movie = await getMovieById(movieId);
        if (!movie) throw new Error("Movie not found");
        
        // Save to state
        bookingState.movie = movie;
        
        // Generate dummy dates
        const datesHMTL = generateDatesHTML();
        
        const bannerImg = movie.banner || movie.banner_url || movie.poster || movie.poster_url;
        const posterImg = movie.poster || movie.poster_url;

        movieContent.innerHTML = `
            <header class="movie-banner reveal">
                <img src="${bannerImg}" alt="Banner" class="banner-img" onerror="this.src='https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop'">
                <div class="banner-gradient"></div>
                <div class="container details-grid">
                    <div class="poster-card reveal stagger-1">
                        <img src="${posterImg}" alt="${movie.title}" style="width: 100%; display: block;" onerror="this.src='https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600&auto=format&fit=crop'">
                    </div>
                    <div class="banner-info reveal stagger-2">
                        <div class="genre-tags">
                            <span class="tag">${movie.genre}</span>
                            <span class="tag">IMAX 3D</span>
                            <span class="tag text-gold" style="border-color: var(--accent-gold);"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                        </div>
                        <h1 class="detail-title">${movie.title}</h1>
                        <div class="detail-meta">
                            <span><i class="fa-regular fa-clock"></i> ${movie.duration}</span>
                            <span><i class="fa-solid fa-language"></i> ${movie.language}</span>
                            <span><i class="fa-regular fa-calendar"></i> ${new Date(movie.release_date).getFullYear()}</span>
                        </div>
                        <p class="detail-desc">${movie.description}</p>
                        <div class="actions" style="display: flex; gap: 1rem;">
                            <button class="btn btn-outline" onclick="document.getElementById('trailerModal').classList.add('active')">
                                <i class="fa-solid fa-play"></i> Watch Trailer
                            </button>
                            <a href="#showtimes" class="btn btn-primary">Book Tickets</a>
                        </div>
                    </div>
                </div>
            </header>

            <section id="showtimes" class="booking-section container reveal">
                <h2 style="font-size: 2rem; margin-bottom: 2rem;">Select Date</h2>
                <div class="date-selector" id="dateSelector">
                    ${datesHMTL}
                </div>

                <h2 style="font-size: 2rem; margin-bottom: 2rem;">Available Theatres</h2>
                <div id="theatresContainer">
                    <!-- Injected below -->
                </div>
            </section>
        `;

        // Render Theatre cards
        renderTheatres(DUMMY_THEATRES);
        
        // Setup Date Click Logic
        const dateCards = document.querySelectorAll('.date-card');
        dateCards.forEach(card => {
            card.addEventListener('click', () => {
                dateCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                bookingState.date = card.dataset.date;
                // Re-animate theatres to simulate loading specific date
                const container = document.getElementById('theatresContainer');
                container.style.opacity = '0';
                setTimeout(() => {
                    renderTheatres(DUMMY_THEATRES);
                    container.style.opacity = '1';
                }, 300);
            });
        });
        
        // Select first date by default
        if(dateCards.length > 0) dateCards[0].click();

        // Trigger reveal animations for newly injected DOM elements
        setTimeout(() => {
            if (window.triggerReveal) window.triggerReveal();
        }, 100);

    } catch (error) {
        movieContent.innerHTML = `<div class="container" style="padding: 10rem 0; text-align: center;"><h2>Error loading movie.</h2><a href="movies.html" class="btn btn-outline mt-4">Go Back</a></div>`;
    }
}

function generateDatesHTML() {
    let html = '';
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        
        html += `
            <div class="date-card" data-date="${dateStr}">
                <div class="day">${i === 0 ? 'Today' : i === 1 ? 'Tmrw' : days[d.getDay()]}</div>
                <div class="date">${d.getDate()}</div>
                <div class="day" style="font-size: 0.8rem;">${months[d.getMonth()]}</div>
            </div>
        `;
    }
    return html;
}

function renderTheatres(theatres) {
    const container = document.getElementById('theatresContainer');
    let html = '';
    
    const times1 = ["10:30 AM", "01:15 PM", "04:30 PM", "08:00 PM", "10:45 PM"];
    const times2 = ["11:00 AM", "03:00 PM", "07:30 PM", "11:15 PM"];

    theatres.forEach((th, index) => {
        const times = index % 2 === 0 ? times1 : times2;
        let timesHtml = times.map(t => 
            `<button class="time-btn" onclick="selectShow(${th.id}, '${th.name}', '${t}')">${t}</button>`
        ).join('');

        html += `
            <div class="theatre-card reveal active stagger-${index + 1}">
                <div class="theatre-header">
                    <div>
                        <h3 class="theatre-name"><i class="fa-solid fa-building" style="color: var(--accent-red);"></i> ${th.name}</h3>
                        <p class="theatre-location">${th.location}</p>
                    </div>
                    <div style="text-align: right; color: var(--text-secondary); font-size: 0.9rem;">
                        <span style="color:#22c55e;"><i class="fa-solid fa-pizza-slice"></i> F&B Available</span><br>
                        <span><i class="fa-solid fa-parking"></i> Parking</span>
                    </div>
                </div>
                <div class="times-grid">
                    ${timesHtml}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Make globally available to inline onclick
window.selectShow = function(theatreId, theatreName, time) {
    // Determine state
    const params = new URLSearchParams();
    params.set('movieId', bookingState.movie.id);
    params.set('date', bookingState.date);
    params.set('time', time);
    params.set('theatre', theatreName); // Should use ID ideally, simplified for demo
    
    // Save to localStorage so next page can read it safely
    localStorage.setItem('bookingParams', params.toString());
    
    // Transition out and navigate
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.2s ease';
    
    setTimeout(() => {
        window.location.href = `seat-selection.html`;
    }, 200);
}
