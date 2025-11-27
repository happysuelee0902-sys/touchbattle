const buttons = document.querySelectorAll('.emotion-btn');
const overlay = document.getElementById('interstitial-overlay');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // 링크 이동 막기

        // 오버레이 표시
        overlay.style.display = 'flex';

        // 버튼 ID에 따라 mood 결정
        let mood = 'angry';
        if (btn.id === 'start-button1') mood = 'angry';
        else if (btn.id === 'start-button2') mood = 'tried';
        else if (btn.id === 'start-button3') mood = 'peace';
        else if (btn.id === 'start-button4') mood = 'happy';

        // 오버레이 클릭 시 이동할 URL 설정 (클로저 변수나 data 속성 활용 가능하지만, 여기서는 전역 변수나 직접 설정)
        // 오버레이 클릭 이벤트 리스너에서 참조할 수 있도록 전역 변수나 속성에 저장
        overlay.dataset.mood = mood;
    });
});

// 오버레이 클릭 시 이동
overlay.addEventListener('click', () => {
    const mood = overlay.dataset.mood || 'angry';
    window.location.href = `../mim/mim.html?mood=${mood}`;
});


const balloons = document.querySelectorAll('.balloon');

balloons.forEach((balloon) => {
    const pop = (event) => {
        // 모바일에서 스크롤 대신 터치 한번만 인식하도록

        event.preventDefault();

        // 부드럽게 사라지는 효과
        balloon.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        balloon.style.opacity = '0';
        balloon.style.transform += ' scale(0.5)';

        setTimeout(() => {
            balloon.remove();
        }, 300);
    };

    balloon.addEventListener('click', pop);
    balloon.addEventListener('touchstart', pop, { passive: false });
});


