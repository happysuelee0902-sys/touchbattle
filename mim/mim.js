// mim.js — 선물 클릭해서 짤 뽑기 + localStorage 저장

const present = document.getElementById('present');
const resultImg = document.getElementById('result-img');
const resultTitle = document.getElementById('result-title'); // 없으면 null이라서 무시됨
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const progressText = document.getElementById('progress-text');
const buttonContainer = document.getElementById('button-container');
const retryBtn = document.getElementById('retry-btn');

const MAX_CLICKS = 50;
let clickCount = 0;

// URL에서 mood 읽기 (?mood=happy 이런 식으로)
const params = new URLSearchParams(window.location.search);
const mood = params.get('mood') || 'angry';

// 도감에서 "다시 뽑기"용으로 마지막 mood 저장
localStorage.setItem('lastMood', mood);

// 도감과 동일한 이미지 리스트
// 도감과 동일한 이미지 리스트
const angryImages = [
    'angry1.jpeg', 'angry2.png', 'angry3.jpeg', 'angry4.jpeg', 'angry5.jpeg'
];
const triedImages = [
    'tried1.jpeg', 'tried2.jpeg', 'tried3.jpeg', 'tried4.jpeg', 'tried5.jpeg'
];
const happyImages = [
    'happy1.png', 'happy2.jpeg', 'happy3.jpeg', 'happy4.jpeg', 'happy5.jpeg'
];
const peaceImages = [
    'peace1.jpeg', 'peace2.jpeg'
];

// mood에 맞게 파일 이름 하나 랜덤 선택
function getRandomFilenameByMood(mood) {
    let list;

    if (mood === 'happy') {
        list = happyImages;
    } else if (mood === 'peace') {
        list = peaceImages;
    } else if (mood === 'tried') {
        list = triedImages;
    } else if (mood === 'all') {
        // 모든 카테고리 합치기
        list = [...angryImages, ...triedImages, ...happyImages, ...peaceImages];
    } else {
        // default to angry
        list = angryImages;
    }

    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
}

// ... (middle parts unchanged) ...

// sessionStorage에 언락 기록 (새로고침/세션 종료 시 초기화... 되지는 않지만 탭 닫으면 초기화됨. 
// 사용자가 '새로고침하면 초기화'를 원했으므로 sessionStorage가 그나마 가까움. 
// 완전한 새로고침 초기화를 원하면 window.name이나 다른 트릭이 필요하지만 일단 sessionStorage 사용)
function unlockImage(filename) {
    const current = JSON.parse(sessionStorage.getItem('unlockedMemes') || '[]');
    if (!current.includes(filename)) {
        current.push(filename);
        sessionStorage.setItem('unlockedMemes', JSON.stringify(current));
    }
}

// 클릭 로직
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

        // 1) mood에 맞는 파일 이름 뽑기
        const filename = getRandomFilenameByMood(mood);

        // 2) 도감에 저장
        unlockImage(filename);

        // 3) 이미지 표시
        resultImg.src = `../mim/image/${filename}`;
        resultImg.style.display = 'block';

        // 4) "너를 위한 짤이야" 텍스트 있으면 보여주기
        if (resultTitle) {
            resultTitle.style.display = 'block';
        }

        // 5) 버튼들 보이기
        buttonContainer.style.display = 'flex';
    }, 500);
}

present.addEventListener('click', handleClick);
present.addEventListener('touchstart', handleClick, { passive: false });

// 다시 뽑기 (모든 카테고리 중 랜덤)
retryBtn.addEventListener('click', () => {
    // 현재 페이지를 다시 로드하되, mood를 'all'로 설정하여 모든 이미지 중 하나가 나오도록 함
    window.location.href = '../mim/mim.html?mood=all';
});
