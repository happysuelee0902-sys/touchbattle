// dic.js

// mim.js와 동일한 순서로 17장 리스트
const allImages = [
    'angry1.jpeg', 'angry2.png', 'angry3.jpeg', 'angry4.jpeg', 'angry5.jpeg',
    'tried1.jpeg', 'tried2.jpeg', 'tried3.jpeg', 'tried4.jpeg', 'tried5.jpeg',
    'happy1.png', 'happy2.jpeg', 'happy3.jpeg', 'happy4.jpeg', 'happy5.jpeg',
    'peace1.jpeg', 'peace2.jpeg'
];

const gallery = document.getElementById('gallery');
const retryLink = document.getElementById('dic-retry-btn');

// 🔐 이미 뽑은 짤 목록(localStorage에서 읽기)
const unlocked = new Set(
    JSON.parse(localStorage.getItem('unlockedMemes') || '[]')
);

// 마지막 mood 기억해뒀으면, 다시 뽑기 버튼에 mood 붙여주기
const lastMood = localStorage.getItem('lastMood');
if (lastMood) {
    retryLink.href = `../mim/mim.html?mood=${lastMood}`;
}

// 도감 칸 생성
allImages.forEach((filename) => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (unlocked.has(filename)) {
        // 이미 뽑은 짤이면 이미지 보여주기
        const img = document.createElement('img');
        img.src = `../mim/image/${filename}`;
        img.alt = filename;
        card.appendChild(img);
    } else {
        // 아직 못 뽑은 칸은 ? 표시
        card.classList.add('card-locked');
        const span = document.createElement('span');
        span.textContent = '?';
        card.appendChild(span);
    }

    gallery.appendChild(card);
});
const present = document.getElementById('present');
const resultImg = document.getElementById('result-img');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const progressText = document.getElementById('progress-text');
const buttonContainer = document.getElementById('button-container');
const retryBtn = document.getElementById('retry-btn');

const MAX_CLICKS = 50;
let clickCount = 0;

// URL에서 mood 읽기
const params = new URLSearchParams(window.location.search);
const mood = params.get('mood') || 'angry';
// 마지막 mood 저장 (도감에서 다시뽑기 쓸 용도)
localStorage.setItem('lastMood', mood);

// 도감과 동일한 이미지 리스트
const angryOrTriedImages = [
    'angry1.jpeg', 'angry2.png', 'angry3.jpeg', 'angry4.jpeg', 'angry5.jpeg',
    'tried1.jpeg', 'tried2.jpeg', 'tried3.jpeg', 'tried4.jpeg', 'tried5.jpeg'
];
const happyImages = [
    'happy1.png', 'happy2.jpeg', 'happy3.jpeg', 'happy4.jpeg', 'happy5.jpeg'
];
const peaceImages = [
    'peace1.jpeg', 'peace2.jpeg'
];

// 랜덤으로 파일 이름 하나 골라서 반환
function getRandomFilenameByMood(mood) {
    let list;

    if (mood === 'happy') {
        list = happyImages;
    } else if (mood === 'peace') {
        list = peaceImages;
    } else {
        list = angryOrTriedImages;
    }

    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
}

// localStorage에 언락 기록
function unlockImage(filename) {
    const current = JSON.parse(localStorage.getItem('unlockedMemes') || '[]');
    if (!current.includes(filename)) {
        current.push(filename);
        localStorage.setItem('unlockedMemes', JSON.stringify(current));
    }
}

function handleClick(e) {
    if (e) e.preventDefault();
    if (clickCount >= MAX_CLICKS) return;

    clickCount++;

    const percentage = (clickCount / MAX_CLICKS) * 100;
    progressBar.style.width = percentage + '%';
    progressText.innerText = `${clickCount} / ${MAX_CLICKS}`;

    present.classList.add('shake');
    setTimeout(() => {
        present.classList.remove('shake');
    }, 200);

    if (clickCount >= MAX_CLICKS) {
        openPresent();
    }
}

function openPresent() {
    present.classList.add('light-burst');

    setTimeout(() => {
        present.style.display = 'none';
        progressContainer.style.display = 'none';

        // 🔥 mood에 맞는 파일 이름 뽑기
        const filename = getRandomFilenameByMood(mood);

        // 도감에 저장
        unlockImage(filename);

        // 이미지 표시
        resultImg.src = `../mim/image/${filename}`;
        resultImg.style.display = 'block';

        // 결과 버튼 보이기
        buttonContainer.style.display = 'flex';
    }, 500);
}

// 다시 뽑기(같은 mood에서 재랜덤)
retryBtn.addEventListener('click', () => {
    window.location.reload();
});

present.addEventListener('click', handleClick);
present.addEventListener('touchstart', handleClick, { passive: false });
