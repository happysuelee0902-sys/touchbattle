
const balloons = document.querySelectorAll('.balloon');

balloons.forEach((balloon) => {
  const pop = (event) => {
    // 모바일에서 스크롤 대신 터치 한번만 인식하도록
    ClickBattle.recordClick();
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


