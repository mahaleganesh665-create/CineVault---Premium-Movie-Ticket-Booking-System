import { supabase, USE_MOCK_DATA } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('loginBtn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
            btn.disabled = true;

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if(USE_MOCK_DATA) {
                // Mock login
                setTimeout(() => {
                    localStorage.setItem('mockSession', JSON.stringify({ email }));
                    window.location.href = 'index.html';
                }, 1000);
                return;
            }

            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if(error) throw error;
                if(window.showToast) window.showToast("Signed in successfully!");
                setTimeout(() => window.location.href = 'index.html', 1000);
            } catch(error) {
                if(window.showToast) window.showToast(error.message, "error");
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    if(signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('signupBtn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating...';
            btn.disabled = true;

            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const fname = document.getElementById('fname').value;
            const lname = document.getElementById('lname').value;

            if(USE_MOCK_DATA) {
                // Mock signup
                setTimeout(() => {
                    localStorage.setItem('mockSession', JSON.stringify({ email, name: `${fname} ${lname}` }));
                    window.location.href = 'index.html';
                }, 1000);
                return;
            }

            try {
                const { data, error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    options: { data: { full_name: `${fname} ${lname}` } }
                });
                
                if(error) throw error;
                if(window.showToast) window.showToast("Account created successfully!");
                setTimeout(() => window.location.href = 'index.html', 1000);
            } catch(error) {
                if(window.showToast) window.showToast(error.message, "error");
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }
});
