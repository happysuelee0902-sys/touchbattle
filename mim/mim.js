const present = document.getElementById('present');
const angry1 = document.getElementById('angry1');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const progressText = document.getElementById('progress-text');

const MAX_CLICKS = 50;
let clickCount = 0;

function handleClick(e) {
    if (e) e.preventDefault(); // Prevent default touch behavior if needed

    if (clickCount >= MAX_CLICKS) return;

    clickCount++;

    // Update progress bar
    const percentage = (clickCount / MAX_CLICKS) * 100;
    progressBar.style.width = percentage + '%';
    progressText.innerText = `${clickCount} / ${MAX_CLICKS}`;

    // Add shake effect briefly
    present.classList.add('shake');
    setTimeout(() => {
        present.classList.remove('shake');
    }, 200);

    // Check if done
    if (clickCount >= MAX_CLICKS) {
        openPresent();
    }
}

function openPresent() {
    // 1. Light effect (optional, can be added to CSS class)
    present.classList.add('light-burst');

    // 2. Hide present and show angry1 after a short delay or immediately
    setTimeout(() => {
        present.style.display = 'none';
        progressContainer.style.display = 'none'; // Hide progress bar
        angry1.style.display = 'block';

        // Optional: Add text or other effects here
    }, 500);
}

present.addEventListener('click', handleClick);
present.addEventListener('touchstart', handleClick, { passive: false });
