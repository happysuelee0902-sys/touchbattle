const gallery = document.getElementById('gallery');

// 모든 이미지 리스트 (순서대로 표시하기 위해 정의)
const allImages = [
    'angry1.jpeg', 'angry2.png', 'angry3.jpeg', 'angry4.jpeg', 'angry5.jpeg',
    'tried1.jpeg', 'tried2.jpeg', 'tried3.jpeg', 'tried4.jpeg', 'tried5.jpeg',
    'happy1.png', 'happy2.jpeg', 'happy3.jpeg', 'happy4.jpeg', 'happy5.jpeg',
    'peace1.jpeg', 'peace2.jpeg'
];

// sessionStorage에서 해금된 목록 가져오기
const unlocked = JSON.parse(sessionStorage.getItem('unlockedMemes') || '[]');

// 갤러리 렌더링
allImages.forEach((filename, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    if (unlocked.includes(filename)) {
        // 해금된 경우 이미지 표시
        const img = document.createElement('img');
        img.src = `../mim/image/${filename}`;
        card.appendChild(img);

        // 클릭 시 흔들림 효과
        card.addEventListener('click', () => {
            // 이미 흔들리고 있으면 리셋
            img.classList.remove('shake');
            void img.offsetWidth; // 리플로우 강제 (애니메이션 재시작용)
            img.classList.add('shake');

            // 애니메이션 끝나면 클래스 제거 (선택사항, 위 로직으로 충분하지만 깔끔하게)
            setTimeout(() => {
                img.classList.remove('shake');
            }, 500);
        });
    } else {
        // 잠긴 경우
        card.className += ' card-locked';
        const span = document.createElement('span');
        span.innerText = '?';
        card.appendChild(span);
    }

    gallery.appendChild(card);
});
