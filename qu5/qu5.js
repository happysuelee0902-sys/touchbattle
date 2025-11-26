const buttons = document.querySelectorAll('.emotion-btn');
const overlay = document.getElementById('interstitial-overlay');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default if any (though we removed <a> tags)

        // Show overlay
        overlay.style.display = 'flex';

        // Navigate after 2 seconds
        setTimeout(() => {
            window.location.href = '../mim/mim.html';
        }, 2000);
    });
});
