const present = document.getElementById('present');
const resultImg = document.getElementById('result-img');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const progressText = document.getElementById('progress-text');

const MAX_CLICKS = 50;
let clickCount = 0;

// ---------- ① URL에서 mood 읽기 ----------
const params = new URLSearchParams(window.location.search);
const mood = params.get('mood') || 'angry'; // 기본값은 angry로

// ---------- ② 이미지 파일 배열 ----------
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

// mood에 맞는 이미지 하나 랜덤 선택
function getRandomImageSrcByMood(mood) {
    let list;

    // 너가 말한 분류:
    // - 인간종쓰레기, 9리터, 3잔, 인류 혐오중, 귀찮아, 나 왜 태어남, 빡침 → angry / tried 그룹
    // - 무야호, 감성충, 0잔, 1잔, 사랑충만, 나 외롭나, 좋은듯, 헤헤 사랑해, 행복 → happy 그룹
    // - 평온, 그냥저냥, 0잔, 1잔, 살아있긴함 → peace 그룹
    // 여기서는 이미 계산해서 ?mood=angry|happy|peace 로 넘겼다고 가정

    if (mood === 'happy') {
        list = happyImages;
    } else if (mood === 'peace') {
        list = peaceImages;
    } else {
        // 'angry', 'tried' 혹은 기타 값 → 화남/지침 그룹
        list = angryOrTriedImages;
    }

    const idx = Math.floor(Math.random() * list.length);
    // mim.html이 /mim 밖에 있을 때 기준으로 기존 경로 유지
    return `../mim/image/${list[idx]}`;
}

// ---------- ③ 클릭 로직 ----------
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

        // mood에 맞는 이미지 골라서 보여주기
        const imgSrc = getRandomImageSrcByMood(mood);
        resultImg.src = imgSrc;
        resultImg.style.display = 'block';

        // ✅ 결과 뜨면 버튼들도 나타나게
        buttonContainer.style.display = 'flex';
    }, 500);
}


present.addEventListener('click', handleClick);
present.addEventListener('touchstart', handleClick, { passive: false });

const buttonContainer = document.getElementById('button-container');
const retryBtn = document.getElementById('retry-btn');
// home-btn, dic-btn은 a 태그에 href 걸려 있으니 JS 안 써도 됨
retryBtn.addEventListener('click', () => {
    window.location.reload(); // 같은 mood에서 새로 랜덤 뽑기
});
