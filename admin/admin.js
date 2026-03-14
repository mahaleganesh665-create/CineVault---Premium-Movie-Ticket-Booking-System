import { supabase, USE_MOCK_DATA } from '/js/supabase.js';

// --- Auth Check ---
const sessionData = localStorage.getItem('adminSession');
if (!sessionData) {
    window.location.href = 'login.html';
}

// --- Tab Navigation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const sideLinks = document.querySelectorAll('.side-link[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    sideLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active from all
            sideLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            // Add active to clicked
            link.classList.add('active');
            const targetId = link.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Initial Load Data
    loadDashboardData();
    loadMoviesData();
    loadTheatresData();
    loadAllBookingsData();
});

// --- Modal Logic ---
const addMovieModal = document.getElementById('addMovieModal');

window.openMovieModal = function() {
    addMovieModal.classList.add('active');
}

window.closeMovieModal = function() {
    addMovieModal.classList.remove('active');
    document.getElementById('addMovieForm').reset();
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == addMovieModal) {
        window.closeMovieModal();
    }
    if (event.target == editMovieModal) {
        window.closeEditMovieModal();
    }
}

const editMovieModal = document.getElementById('editMovieModal');

// Need to safely escape quotes for inline HTML onclick attributes
function escapeHtmlQuotes(str) {
    if(!str) return "";
    return str.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

window.openEditMovieModal = function(m_json) {
    const m = JSON.parse(decodeURIComponent(m_json));
    
    document.getElementById('edit_m_id').value = m.id;
    document.getElementById('edit_m_title').value = m.title || '';
    document.getElementById('edit_m_genre').value = m.genre || '';
    document.getElementById('edit_m_lang').value = m.language || '';
    document.getElementById('edit_m_dur').value = m.duration || '';
    document.getElementById('edit_m_rate').value = m.rating || '';
    document.getElementById('edit_m_poster').value = m.poster || '';
    document.getElementById('edit_m_desc').value = m.description || '';
    
    editMovieModal.classList.add('active');
}

window.closeEditMovieModal = function() {
    editMovieModal.classList.remove('active');
    document.getElementById('editMovieForm').reset();
}


/*=============================================
=            Dashboard Logic                  =
=============================================*/
async function loadDashboardData() {
    if (USE_MOCK_DATA) {
        document.getElementById('statRevenue').innerText = '$12,450';
        document.getElementById('statBookings').innerText = '842';
        document.getElementById('statMovies').innerText = '14';
        document.getElementById('statTheatres').innerText = '5';
        document.getElementById('adminBookingsTableContent').innerHTML = `
            <tr>
                <td>#CV1049</td><td>The Cosmic Void</td><td>Jan 01, 2026</td><td>$50.00</td>
                <td><span style="color: #22c55e;">Confirmed</span></td>
            </tr>
        `;
        return;
    }

    try {
        const { data: bookings, error: bErr } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (bErr) throw bErr;

        let revenue = 0;
        bookings.forEach(b => revenue += Number(b.total_amount || 0));
        document.getElementById('statRevenue').innerText = '$' + revenue.toFixed(2);
        document.getElementById('statBookings').innerText = bookings.length;

        const { count: moviesCount } = await supabase.from('movies').select('*', { count: 'exact', head: true });
        const statMovies = document.getElementById('statMovies');
        if (statMovies) statMovies.innerText = moviesCount || 0;

        const { count: tCount } = await supabase.from('theatres').select('*', { count: 'exact', head: true });
        const statTheatres = document.getElementById('statTheatres');
        if (statTheatres) statTheatres.innerText = tCount || 0;

        const tbody = document.getElementById('adminBookingsTableContent');
        const recent = bookings.slice(0, 5); // Just 5 for dashboard
        if (recent.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No bookings yet.</td></tr>';
        } else {
            let html = '';
            recent.forEach(b => {
                const d = new Date(b.show_date);
                html += `
                    <tr>
                        <td style="font-family: monospace;">${b.booking_reference}</td>
                        <td>${b.movie_title}</td>
                        <td>${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}, ${d.getFullYear()}</td>
                        <td>$${Number(b.total_amount).toFixed(2)}</td>
                        <td><span style="color: #22c55e;">Confirmed</span></td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }
    } catch (e) {
        console.error(e);
        document.getElementById('adminBookingsTableContent').innerHTML = '<tr><td colspan="5" style="color: red; text-align:center;">Failed to load.</td></tr>';
    }
}

/*=============================================
=            Movies Tab Logic                 =
=============================================*/
async function loadMoviesData() {
    const tbody = document.getElementById('moviesTableBody');
    if (USE_MOCK_DATA) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Mock Mode: Cannot edit database</td></tr>';
        return;
    }

    try {
        const { data, error } = await supabase.from('movies').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No movies found.</td></tr>';
            return;
        }

        let html = '';
        data.forEach(m => {
            html += `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <img src="${m.poster}" alt="poster" style="width: 40px; height: 60px; object-fit: cover; border-radius: 4px;">
                            <strong>${m.title}</strong>
                        </div>
                    </td>
                    <td>${m.genre}</td>
                    <td><i class="fa-solid fa-star text-gold"></i> ${m.rating}</td>
                    <td>${m.language}</td>
                    <td>
                        <button class="action-btn btn-edit" onclick="window.openEditMovieModal('${encodeURIComponent(JSON.stringify(m))}')" title="Edit Movie" style="margin-right: 0.5rem;"><i class="fa-solid fa-pen"></i></button>
                        <button class="action-btn btn-del" onclick="window.deleteMovie('${m.id}')" title="Delete Movie"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    } catch (e) {
        console.error(e);
        tbody.innerHTML = '<tr><td colspan="5" style="color: red; text-align:center;">Failed to load movies.</td></tr>';
    }
}

/*=============================================
=            Theatres Tab Logic               =
=============================================*/
async function loadTheatresData() {
    const tbody = document.getElementById('theatresTableBody');
    if (!tbody) return; // Guard clause if HTML missing
    
    if (USE_MOCK_DATA) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Mock Mode: Cannot edit database</td></tr>';
        return;
    }

    try {
        const { data, error } = await supabase.from('theatres').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No theatres found.</td></tr>';
            return;
        }

        let html = '';
        data.forEach(t => {
            html += `
                <tr>
                    <td><strong>${t.name || 'Unknown'}</strong></td>
                    <td><i class="fa-solid fa-location-dot" style="color: var(--accent-red); margin-right: 5px;"></i> ${t.location || 'N/A'}</td>
                    <td>${t.total_screens || 0}</td>
                    <td>${(t.amenities || []).join(', ')}</td>
                    <td>
                        <button class="action-btn btn-del" onclick="window.deleteTheatre('${t.id}')" title="Delete Theatre"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    } catch(e) {
        console.error(e);
        tbody.innerHTML = '<tr><td colspan="5" style="color: red; text-align:center;">Failed to load theatres.</td></tr>';
    }
}

/*=============================================
=            Bookings Tab Logic               =
=============================================*/
async function loadAllBookingsData() {
    const tbody = document.getElementById('allBookingsTableBody');
    if (USE_MOCK_DATA) {
         tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Mock Mode: Cannot view global bookings</td></tr>';
         return;
    }

    try {
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No bookings found.</td></tr>';
            return;
        }

        let html = '';
        data.forEach(b => {
            const d = new Date(b.show_date);
            html += `
                <tr>
                    <td style="font-family: monospace;">${b.booking_reference}</td>
                    <td>${b.movie_title}</td>
                    <td>${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}</td>
                    <td>${(b.seats || []).join(', ')}</td>
                    <td>${b.user_id ? 'Authenticated' : 'Guest'}</td>
                    <td>
                        <button class="action-btn btn-del" onclick="window.deleteBooking('${b.id}')" title="Cancel Booking"><i class="fa-solid fa-ban"></i> Cancel</button>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    } catch(e) {
        console.error(e);
        tbody.innerHTML = '<tr><td colspan="6" style="color: red; text-align:center;">Failed to load bookings.</td></tr>';
    }
}

/*=============================================
=            Database Mutations               =
=============================================*/
window.deleteMovie = async function(id) {
    if(!confirm('Are you sure you want to delete this movie? This cannot be undone.')) return;
    try {
        const { error } = await supabase.from('movies').delete().eq('id', id);
        if (error) throw error;
        alert('Movie deleted successfully!');
        loadMoviesData();
        loadDashboardData();
    } catch (e) {
        console.error(e);
        alert('Error deleting movie: ' + e.message + '\n(Make sure you ran the admin_permissions.sql query in Supabase!)');
    }
}

window.deleteTheatre = async function(id) {
    if(!confirm('Are you sure you want to delete this theatre?')) return;
    try {
        const { error } = await supabase.from('theatres').delete().eq('id', id);
        if (error) throw error;
        alert('Theatre deleted successfully!');
        loadTheatresData();
        loadDashboardData();
    } catch (e) {
        console.error(e);
        alert('Error deleting theatre: ' + e.message);
    }
}

window.deleteBooking = async function(id) {
    if(!confirm('Are you sure you want to cancel and delete this booking?')) return;
    try {
        const { error } = await supabase.from('bookings').delete().eq('id', id);
        if (error) throw error;
        alert('Booking cancelled successfully!');
        loadAllBookingsData();
        loadDashboardData();
    } catch (e) {
        console.error(e);
        alert('Error cancelling booking: ' + e.message + '\\n(Make sure you ran the admin_permissions.sql query in Supabase!)');
    }
}

window.submitNewMovie = async function(e) {
    e.preventDefault();
    if(USE_MOCK_DATA) {
        alert("Cannot add movie in Mock Mode. Please connect Supabase first.");
        return;
    }

    const title = document.getElementById('m_title').value;
    const genre = document.getElementById('m_genre').value;
    const lang = document.getElementById('m_lang').value;
    const dur = document.getElementById('m_dur').value;
    const rate = document.getElementById('m_rate').value;
    const poster = document.getElementById('m_poster').value;
    const desc = document.getElementById('m_desc').value;

    try {
        const { error } = await supabase.from('movies').insert([
            {
                title: title, 
                genre: genre, 
                language: lang, 
                duration: dur, 
                rating: rate, 
                poster: poster, 
                banner: poster, 
                description: desc
            }
        ]);

        if (error) throw error;
        
        alert("Movie successfully added to database!");
        window.closeMovieModal();
        loadMoviesData();
        loadDashboardData();
    } catch (err) {
        console.error(err);
        alert('Failed to insert movie: ' + err.message);
    }
}

window.submitEditMovie = async function(e) {
    e.preventDefault();
    if(USE_MOCK_DATA) {
        alert("Cannot edit in Mock Mode. Please connect Supabase first.");
        return;
    }

    const id = document.getElementById('edit_m_id').value;
    const title = document.getElementById('edit_m_title').value;
    const genre = document.getElementById('edit_m_genre').value;
    const lang = document.getElementById('edit_m_lang').value;
    const dur = document.getElementById('edit_m_dur').value;
    const rate = document.getElementById('edit_m_rate').value;
    const poster = document.getElementById('edit_m_poster').value;
    const desc = document.getElementById('edit_m_desc').value;

    try {
        const { error } = await supabase.from('movies').update({
            title: title,
            genre: genre,
            language: lang,
            duration: dur,
            rating: rate,
            poster: poster,
            banner: poster,
            description: desc
        }).eq('id', id);

        if (error) throw error;
        
        alert("Movie details updated successfully!");
        window.closeEditMovieModal();
        loadMoviesData();
    } catch (err) {
        console.error(err);
        alert('Failed to update movie details: ' + err.message);
    }
}
