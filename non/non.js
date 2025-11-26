// non.js

// 최대 HP 설정 (원하면 숫자 바꿔도 됨)
const MAX_HP = 8;
let currentHp = MAX_HP;

const monster = document.getElementById('non-imge');
const hpBar = document.getElementById('hp-bar');
const backBtn = document.getElementById('back-btn');
const sorryText = document.getElementById('sorry');

// HP 바 업데이트 함수
function updateHpBar() {
  const percent = (currentHp / MAX_HP) * 100;
  hpBar.style.width = percent + '%';

  if (currentHp <= 0) {
    // 괴물 숨기고 뒤로가기 버튼 표시
    monster.style.display = 'none';
    backBtn.style.display = 'inline-block';
    sorryText.innerText = "알겠어 가라..";
  }
}

// 데미지 주는 함수
function damageMonster() {
  if (currentHp <= 0) return; // 이미 죽었으면 무시

  currentHp--;
  updateHpBar();
}

// 클릭 이벤트
monster.addEventListener('click', damageMonster);

// 모바일 터치 이벤트 (더블 트리거 방지용)
monster.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    damageMonster();
  },
  { passive: false }
);

// 처음 로딩 시 HP 바 세팅
updateHpBar();

// Interstitial Overlay Logic
const overlay = document.getElementById('interstitial-overlay');

backBtn.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

overlay.addEventListener('click', () => {
  window.location.href = '../qu1/qu1.html';
});
