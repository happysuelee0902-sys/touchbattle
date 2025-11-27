
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
const DESIGN_WIDTH = 390;   // 기준 너비(px)
const DESIGN_HEIGHT = 844;  // 기준 높이(px)

function resizeGame() {
  const game = document.getElementById('game');
  if (!game) return;

  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT
  );

  game.style.transform = `scale(${scale})`;
}

// 처음 로드 + 리사이즈마다 다시 계산
window.addEventListener('load', resizeGame);
window.addEventListener('resize', resizeGame);


