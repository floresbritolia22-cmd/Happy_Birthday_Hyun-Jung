(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreLabel = document.querySelector('#score strong');
  const scoreWord = document.querySelector('#score [data-i18n="score"]');
  const livesLabel = document.getElementById('lives');
  const startScreen = document.getElementById('startScreen');
  const winScreen = document.getElementById('winScreen');
  const gameOverScreen = document.getElementById('gameOver');
  const languageSelect = document.getElementById('languageSelect');

  const backgroundImage = new Image();
  backgroundImage.src = 'fondo-paisaje.png';

  // Add your cut-out character here. A transparent PNG keeps the background removed.
  // Place gameavatar.png inside the birthday-catcher folder.
  const avatarImages = Array.from({ length: 5 }, () => {
    const img = new Image();
    img.src = 'gameavatar.png';
    img.addEventListener('load', () => { if (!running) renderStill(); });
    return img;
  });

  const W = canvas.width;
  const H = canvas.height;
  const TARGET = 22;

  const translations = {
    en: {
      eyebrow: 'A LITTLE BIRTHDAY GAME',
      subtitle: 'Catch 22 little cakes and make a birthday wish.',
      score: 'Cakes', languageLabel: 'Language',
      sheetKicker: 'A LITTLE BIRTHDAY CHALLENGE',
      sheetTitle: 'Birthday Catcher',
      sheetIntro: 'A tiny birthday mission, made just for you.',
      ruleCakeTitle: 'Catch the cakes', ruleCakeText: 'Each cake gives you 1 point.',
      ruleAvoidTitle: 'Avoid everyday items', ruleAvoidText: 'Touching them costs one heart.',
      ruleGoalTitle: 'Collect all 22 cakes', ruleGoalText: 'Flowers and sparkles appear every 5 cakes.',
      controls: 'Use ← → or A / D. On mobile, use the buttons or drag the character.',
      startButton: "Let's play ♡", sheetFoot: 'good luck, birthday girl ♡',
      winTitle: 'Happy 22nd Birthday!', winText: 'Wishing you a day full of lovely little things. ♡',
      replayButton: 'Play again', loseTitle: 'One more try? ♡',
      loseText: 'Your hearts ran out, but there are still cakes to catch.',
      retryButton: 'Try again', keyboardHint: '← → or A / D',
      dragHint: 'You can also drag the character', move: 'MOVE',
      tinyNote: '♡ Made with a little love and a lot of cake.',
      canvasLabel: 'Birthday Catcher game', livesLabel: 'Lives'
    },
    es: {
      eyebrow: 'UN PEQUEÑO JUEGO DE CUMPLEAÑOS',
      subtitle: 'Atrapa 22 pastelitos y pide un deseo.',
      score: 'Pastelitos', languageLabel: 'Idioma',
      sheetKicker: 'UN PEQUEÑO RETO DE CUMPLEAÑOS',
      sheetTitle: 'Birthday Catcher',
      sheetIntro: 'Una pequeña misión de cumpleaños hecha para ti.',
      ruleCakeTitle: 'Atrapa los pastelitos', ruleCakeText: 'Cada pastelito suma 1 punto.',
      ruleAvoidTitle: 'Esquiva los objetos', ruleAvoidText: 'Si los tocas, pierdes un corazón.',
      ruleGoalTitle: 'Consigue los 22 pastelitos', ruleGoalText: 'Cada 5 pastelitos aparecen flores y destellos.',
      controls: 'Usa ← → o A / D. En móvil, usa los botones o arrastra al personaje.',
      startButton: '¡Vamos a jugar! ♡', sheetFoot: 'buena suerte, cumpleañera ♡',
      winTitle: '¡Felices 22 años!', winText: 'Que tu día esté lleno de pequeñas cosas bonitas. ♡',
      replayButton: 'Jugar otra vez', loseTitle: '¿Lo intentamos otra vez? ♡',
      loseText: 'Te quedaste sin corazones, pero aún quedan pastelitos.',
      retryButton: 'Volver a jugar', keyboardHint: '← → o A / D',
      dragHint: 'También puedes arrastrar al personaje', move: 'MUÉVETE',
      tinyNote: '♡ Hecho con cariño y muchos pastelitos.',
      canvasLabel: 'Juego Birthday Catcher', livesLabel: 'Vidas'
    },
    ko: {
      eyebrow: '작은 생일 게임',
      subtitle: '케이크 22개를 모으고 소원을 빌어 보세요.',
      score: '케이크', languageLabel: '언어',
      sheetKicker: '작은 생일 도전',
      sheetTitle: 'Birthday Catcher',
      sheetIntro: '당신을 위해 준비한 작은 생일 미션이에요.',
      ruleCakeTitle: '케이크를 잡으세요', ruleCakeText: '케이크 하나당 1점이에요.',
      ruleAvoidTitle: '생활용품은 피하세요', ruleAvoidText: '부딪히면 하트가 하나 줄어요.',
      ruleGoalTitle: '케이크 22개 모으기', ruleGoalText: '케이크 5개마다 꽃과 반짝임이 나타나요.',
      controls: '← → 또는 A / D 키를 사용하세요. 모바일에서는 버튼을 누르거나 캐릭터를 드래그하세요.',
      startButton: '게임 시작 ♡', sheetFoot: '행운을 빌어요, 생일 주인공 ♡',
      winTitle: '22번째 생일을 축하해요!', winText: '예쁜 순간들로 가득한 하루가 되길 바라요. ♡',
      replayButton: '다시 하기', loseTitle: '한 번 더 해 볼까요? ♡',
      loseText: '하트를 모두 잃었어요. 아직 케이크가 남아 있어요.',
      retryButton: '다시 도전하기', keyboardHint: '← → 또는 A / D',
      dragHint: '캐릭터를 드래그해도 돼요', move: '이동',
      tinyNote: '♡ 사랑과 케이크를 담아 만들었어요.',
      canvasLabel: 'Birthday Catcher 게임', livesLabel: '남은 하트'
    }
  };

  let player, items, particles, score, lives, running = false, lastTime, spawnTimer;
  let keys = { left: false, right: false };
  let pointerDown = false;
  let currentLanguage = 'en';

  function t(key) {
    return (translations[currentLanguage] && translations[currentLanguage][key]) || translations.en[key] || key;
  }

  function applyLanguage(language) {
    currentLanguage = translations[language] ? language : 'en';
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (translations[currentLanguage][key]) el.textContent = translations[currentLanguage][key];
    });
    canvas.setAttribute('aria-label', t('canvasLabel'));
    livesLabel.setAttribute('aria-label', t('livesLabel'));
    languageSelect.setAttribute('aria-label', t('languageLabel'));
    updateHUD();
  }

  function resetGame() {
    player = { x: W / 2, y: H - 78, w: 92, h: 105, speed: 330, frame: 0, frameTimer: 0 };
    items = [];
    particles = [];
    score = 0;
    lives = 4;
    running = true;
    lastTime = 0;
    spawnTimer = 0;
    updateHUD();
    startScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    requestAnimationFrame(loop);
  }

  function updateHUD() {
    scoreLabel.textContent = `${String(score).padStart(2, '0')}/${TARGET}`;
    livesLabel.textContent = `${'♥ '.repeat(lives)}${'♡ '.repeat(4 - lives)}`.trim();
  }

  function spawnItem() {
  const isCake = Math.random() < 0.72;

  // Un solo emoji de pastel; los demás objetos son obstáculos.
  const everydayEmojis = ['📚', '🎈', '🎁', '🌷', '⭐', '🧸', '💐'];

  items.push({
    x: 38 + Math.random() * (W - 76),
    y: -45,
    size: isCake ? 42 : 38,
    speed: 78 + Math.random() * 32 + score * 0.35,
    type: isCake ? 'cake' : 'obstacle',
    emoji: isCake
      ? '🎂'
      : everydayEmojis[Math.floor(Math.random() * everydayEmojis.length)],
    wobble: Math.random() * Math.PI * 2
  });
}

  function burst(x, y, kind = 'flower') {
    const symbols = kind === 'flower' ? ['✿', '✧', '❀', '♡', '✦'] : ['✧', '♡', '✦'];
    for (let i = 0; i < 13; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 115,
        vy: -25 - Math.random() * 95,
        life: 0.7 + Math.random() * 0.65,
        maxLife: 1.35,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: 10 + Math.random() * 10
      });
    }
  }

  function drawBackground() {
    ctx.clearRect(0, 0, W, H);
    if (backgroundImage.complete && backgroundImage.naturalWidth > 0) {
      // "Cover" crop: fills the vertical playfield without stretching the artwork.
      const scale = Math.max(W / backgroundImage.naturalWidth, H / backgroundImage.naturalHeight);
      const drawW = backgroundImage.naturalWidth * scale;
      const drawH = backgroundImage.naturalHeight * scale;
      const dx = (W - drawW) / 2;
      const dy = (H - drawH) / 2;
      ctx.drawImage(backgroundImage, dx, dy, drawW, drawH);
      // A very light veil keeps the cakes and character readable over the scenery.
      ctx.fillStyle = 'rgba(255, 246, 248, 0.08)';
      ctx.fillRect(0, 0, W, H);
    } else {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#fff6f7');
      grad.addColorStop(1, '#eadfe7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function drawPlayer(dt) {
    if (!player) return;
    if (keys.left || keys.right) {
      player.frameTimer += dt;
      if (player.frameTimer > 0.17) {
        player.frame = (player.frame + 1) % 5;
        player.frameTimer = 0;
      }
    } else {
      player.frame = 0;
    }

    const avatar = avatarImages[player.frame] || avatarImages[0];

if (avatar.complete && avatar.naturalWidth > 0) {
  // Avatar más grande, conservando las proporciones originales.
  const drawH = 145;
  const ratio = avatar.naturalWidth / avatar.naturalHeight;
  const drawW = drawH * ratio;

  ctx.drawImage(
    avatar,
    player.x - drawW / 2,
    player.y - drawH + 28,
    drawW,
    drawH
  );
} else {
  ctx.font = '50px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('👧🏻', player.x, player.y + 8);
}

    // Basket is drawn AFTER the avatar, so it sits in front of her, at waist level.
    ctx.save();
    ctx.translate(player.x, player.y + 17);
    ctx.font = '27px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧺', 0, 0);
    ctx.restore();
  }

  function hit(a, b) {
    // The catch zone is at the basket, rather than around the avatar's feet.
    const basketY = a.y + 17;
    return Math.abs(a.x - b.x) < (25 + b.size * 0.34) &&
      Math.abs(basketY - b.y) < (15 + b.size * 0.32);
  }

  function finish(won) {
    running = false;
    if (won) {
      winScreen.classList.remove('hidden');
      for (let i = 0; i < 10; i++) burst(30 + Math.random() * (W - 60), 70 + Math.random() * 350);
    } else {
      gameOverScreen.classList.remove('hidden');
    }
  }

  function drawParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 70 * dt;
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = '#c87591';
      ctx.font = `${p.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.globalAlpha = 1;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function loop(time) {
    if (!running) return;
    const dt = Math.min((time - (lastTime || time)) / 1000, 0.035);
    lastTime = time;
    drawBackground();

    if (keys.left) player.x -= player.speed * dt;
    if (keys.right) player.x += player.speed * dt;
    player.x = Math.max(player.w / 2, Math.min(W - player.w / 2, player.x));

    spawnTimer += dt;
    // Slow, spaced-out drops make the game relaxed and beginner-friendly.
    const spawnEvery = Math.max(0.62, 0.92 - score * 0.006);
    if (spawnTimer >= spawnEvery) {
      spawnItem();
      spawnTimer = 0;
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.y += item.speed * dt;
      item.wobble += dt * 2;
      item.x += Math.sin(item.wobble) * 7 * dt;

      if (hit(player, item)) {
        if (item.type === 'cake') {
          score++;
          burst(item.x, item.y, score % 5 === 0 ? 'flower' : 'sparkle');
          if (score % 5 === 0) {
            burst(player.x - 24, player.y + 22, 'flower');
            burst(player.x + 24, player.y + 22, 'flower');
          }
          updateHUD();
          items.splice(i, 1);
          if (score >= TARGET) {
            finish(true);
            break;
          }
          continue;
        } else {
          lives--;
          burst(item.x, item.y, 'sparkle');
          updateHUD();
          items.splice(i, 1);
          if (lives <= 0) {
            finish(false);
            break;
          }
          continue;
        }
      }
      if (item.y > H + 35) items.splice(i, 1);
    }

    items.forEach(drawItem);
    drawParticles(dt);
    drawPlayer(dt);
    if (running) requestAnimationFrame(loop);
  }

  function drawItem(item) {
  ctx.save();

  ctx.translate(item.x, item.y);

  // Movimiento lateral muy suave, sin inclinaciones exageradas.
  ctx.rotate(Math.sin(item.wobble) * 0.02);

  ctx.globalAlpha = 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Fondo sólido para que los objetos no se pierdan en el paisaje.
  const radius = item.size * 0.68;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);

  ctx.fillStyle = item.type === 'cake'
    ? '#FFB7D5'
    : '#FFF0B8';

  ctx.fill();

  // Borde visible.
  ctx.lineWidth = 3;
  ctx.strokeStyle = item.type === 'cake'
    ? '#E75C99'
    : '#E6A84B';

  ctx.stroke();

  // Sombra para destacar los objetos.
  ctx.shadowColor = 'rgba(100, 45, 70, 0.25)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 2;

  // Emoji grande y completamente opaco.
  ctx.font = `bold ${Math.round(item.size * 1.25)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
  ctx.fillStyle = '#222222';
  ctx.fillText(item.emoji, 0, 0);

  ctx.restore();
}

  function renderStill() {
    drawBackground();
    if (player) drawPlayer(0);
  }

  function setPointerPosition(event) {
    if (!player) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    player.x = Math.max(player.w / 2, Math.min(W - player.w / 2, (event.clientX - rect.left) * scaleX));
    if (!running) renderStill();
  }

  canvas.addEventListener('pointerdown', (event) => {
    if (!running) return;
    pointerDown = true;
    canvas.setPointerCapture?.(event.pointerId);
    setPointerPosition(event);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (pointerDown && running) setPointerPosition(event);
  });
  canvas.addEventListener('pointerup', () => { pointerDown = false; });
  canvas.addEventListener('pointercancel', () => { pointerDown = false; });

  window.addEventListener('keydown', (event) => {
    if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(event.key)) event.preventDefault();
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') keys.left = true;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') keys.right = true;
  });
  window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') keys.left = false;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') keys.right = false;
  });

  function bindHold(buttonId, direction) {
    const button = document.getElementById(buttonId);
    button.addEventListener('pointerdown', (e) => { e.preventDefault(); keys[direction] = true; });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(type =>
      button.addEventListener(type, () => { keys[direction] = false; })
    );
  }
  bindHold('leftButton', 'left');
  bindHold('rightButton', 'right');

  languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));
  document.getElementById('startButton').addEventListener('click', resetGame);
  document.getElementById('replayButton').addEventListener('click', resetGame);
  document.getElementById('retryButton').addEventListener('click', resetGame);

  backgroundImage.addEventListener('load', () => {
    if (!running) renderStill();
  });

  applyLanguage('en');
  player = { x: W / 2, y: H - 78, w: 92, h: 105, speed: 330, frame: 0, frameTimer: 0 };
  items = [];
  particles = [];
  score = 0;
  lives = 4;
  updateHUD();
  renderStill();
})();
