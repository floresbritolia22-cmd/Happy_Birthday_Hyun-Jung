(() => {
  "use strict";

  /* A Little Birthday Garden
     Traducciones, menú y efectos de la página.
     El minijuego funciona por separado en su propio iframe.
  */

  const translations = {
    en: {
languageLabel: "Language",
navHome: "Home",
navGame: "Game",
navLetter: "A little letter",
navGallery: "Gallery",

eyebrow: "A little celebration made especially for you",
heroTitle: "Happy 22nd Birthday,<br><em>Hyun-jung!</em>",
heroText: "A little corner of the internet filled with flowers, wishes, and 22 little cakes waiting to be collected.",
heroLink: "♡ Read a little letter",
heroButton: "Collect your cakes ✿",
photoPlaceholder: "A",
scrollHint: "♡",

wishOneTitle: "A day full of joy",
wishOneText: "May you find a hundred reasons to smile.",
wishTwoTitle: "Room to bloom",
wishTwoText: "May life give you the space to grow at your own pace.",
wishThreeTitle: "Always appreciated",
wishThreeText: "Your work brings little moments of happiness to others.",

letterEyebrow: "A note from afar",
letterTitle: "Dear <em>Hyun-jung,</em>",

letterP1: "It makes me so happy to celebrate another year of your life with you, even from afar. There is something special about connecting with someone through the things they create, and I am grateful that your work has brought me so many little moments of happiness.",

letterP2: "Thank you for the time, effort, and heart you put into your work. I want you to know that we also see and appreciate everything that happens behind the scenes. It is lovely to watch you grow, try new things, and take on new challenges.",

letterP3: "I hope today is filled with laughter, delicious food, warm hugs, and the biggest smiles. In this new chapter, I hope you can take your time, learn, change, make mistakes, and enjoy wherever life takes you. May you collect memories that will warm your heart for many years to come.",

letterP4: "I made this little gift while learning something new in my studies. This time, I wanted to try something different; it felt meaningful to create something with my own hands using something that is also beginning to become part of my life. I hope you can feel the sincerity and care I put into it. Thank you for sharing your talent and time with the people who support you.",

letterP5: "Please take good care of yourself, and I hope this new year of your life brings you countless reasons to smile. I will keep cheering you on and wishing you happiness in everything you do.",

signoff: "With lots of love and my warmest wishes,",

galleryEyebrow: "✦",
galleryTitle: "Little moments, lovely memories",
galleryIntro: "✦",
galleryPlaceholder1: "A favorite moment",
galleryPlaceholder2: "A lovely smile",
galleryPlaceholder3: "A beautiful scene",
galleryCaption1: "little moments worth keeping ♡",
galleryCaption2: "a smile that brightens the day ♡",
galleryCaption3: "a lovely memory in bloom ♡",

finalEyebrow: "one last wish before you go",
finalTitle: "May your next chapter<br><em>be full of lovely things.</em>",
finalText: "Happy 22nd birthday, Hyun-jung. Keep blooming in your own special way.",
backToTop: "Back ↑",

footerText: "A little handmade birthday gift for Hwang Hyun-jung."
},

    es: {
      languageLabel: "Idioma",
      navHome: "Inicio",
      navGame: "Juego",
      navLetter: "Una cartita",
      navGallery: "Galería",

      eyebrow: "Una pequeña celebración hecha especialmente para ti",
      heroTitle: "¡Felices 22 años,<br><em>Hyun-jung!</em>",
      heroText: "Un rinconcito de internet lleno de flores, buenos deseos y 22 pastelitos esperando ser recogidos.",
      heroLink: "♡ Lee una pequeña carta",
      heroButton: "Recoge tus pastelitos ✿",
      photoPlaceholder: "A",
      scrollHint: "♡",

      wishOneTitle: "Un día lleno de alegría",
      wishOneText: "Que encuentres cien razones para sonreír.",
      wishTwoTitle: "Espacio para florecer",
      wishTwoText: "Que la vida te permita crecer a tu propio ritmo.",
      wishThreeTitle: "Siempre apreciada",
      wishThreeText: "Tu trabajo regala pequeños momentos de felicidad.",

      letterEyebrow: "Una nota desde la distancia",
      letterTitle: "Querida <em>Hyun-jung:</em>",

      letterP1: "Me hace muy feliz celebrar otro año de tu vida contigo, incluso desde lejos. Hay algo especial en conectar con alguien a través de lo que crea, y agradezco que tu trabajo me haya regalado tantos pequeños momentos felices.",

      letterP2: "Gracias por el tiempo, el esfuerzo y el corazón que pones en tu trabajo. Quiero que sepas que también vemos y apreciamos todo lo que sucede detrás de cámaras. Es bonito verte crecer, probar cosas nuevas y aceptar nuevos retos.",

      letterP3: "Espero que hoy esté lleno de risas, comida deliciosa, abrazos cálidos y sonrisas enormes. En esta nueva etapa, ojalá puedas tomarte tu tiempo, aprender, cambiar, equivocarte y disfrutar del camino que te toque vivir. Que guardes recuerdos que te calienten el corazón durante muchos años.",

      letterP4: "Este pequeño regalo lo hice mientras aprendo algo nuevo en mis estudios. Esta vez, quise hacer algo diferente; me pareció significativo crear algo con mis propias manos, utilizando algo que, a su vez, está empezando a formar parte de mi vida. Espero que puedas sentir la sinceridad y el cariño que puse en él. Gracias por compartir tu talento y tu tiempo con quienes te apoyan.",

      letterP5: "Cuídate mucho, y ojalá este nuevo año te dé incontables razones para sonreír. Seguiré animándote y deseándote felicidad en todo lo que hagas.",

      signoff: "Con mucho cariño y los mejores deseos,",

      galleryEyebrow: "✦",
      galleryTitle: "Pequeños momentos, recuerdos bonitos",
      galleryIntro: "✦",
      galleryPlaceholder1: "Un momento favorito",
      galleryPlaceholder2: "Una sonrisa preciosa",
      galleryPlaceholder3: "Una escena bonita",
      galleryCaption1: "pequeños momentos que vale la pena guardar ♡",
      galleryCaption2: "una sonrisa que alegra el día ♡",
      galleryCaption3: "un recuerdo bonito que florece ♡",

      finalEyebrow: "un último deseo antes de irte",
      finalTitle: "Que tu próxima etapa<br><em>esté llena de cosas bonitas.</em>",
      finalText: "Felices 22 años, Hyun-jung. Sigue floreciendo a tu manera, tan especial.",
      backToTop: "Volver",

      footerText: "Un pequeño regalo de cumpleaños hecho a mano para Hwang Hyun-jung."
    },

    ko: {
languageLabel: "언어",
navHome: "홈",
navGame: "게임",
navLetter: "작은 편지",
navGallery: "갤러리",

eyebrow: "현정님을 위해 특별히 준비한 작은 축하",
heroTitle: "현정님의 22번째<br><em>생일을 축하해요!</em>",
heroText: "꽃과 소원, 그리고 모으기를 기다리는 작은 케이크 22개가 있는 인터넷 속 작은 정원이에요.",
heroLink: "♡ 작은 편지 읽기",
heroButton: "케이크 모으기 ✿",
photoPlaceholder: "A",
scrollHint: "♡",

wishOneTitle: "기쁨으로 가득한 하루",
wishOneText: "웃을 수 있는 이유가 백 가지나 생기길 바라요.",
wishTwoTitle: "자신만의 속도로 피어나기",
wishTwoText: "자신만의 속도로 성장할 여유가 있기를 바라요.",
wishThreeTitle: "언제나 소중한 사람",
wishThreeText: "현정님의 작품이 누군가에게 작은 행복을 선물해요.",

letterEyebrow: "멀리서 보내는 편지",
letterTitle: "현정님께,",

letterP1: "멀리서나마 현정님의 또 한 해를 함께 축하할 수 있어 정말 기뻐요. 누군가가 만든 작품을 통해 마음이 이어진다는 건 참 특별한 일 같아요. 현정님의 작품이 제게 많은 작은 행복을 선물해 주어 고마워요.",

letterP2: "작품에 쏟는 시간과 노력, 그리고 마음에 감사해요. 무대 뒤에서 이루어지는 노력도 많은 사람들이 알아보고 소중히 여기고 있다는 걸 알아주셨으면 해요. 새로운 것을 시도하고 도전하며 성장하는 모습을 보는 것도 참 기뻐요.",

letterP3: "오늘 하루가 웃음과 맛있는 음식, 따뜻한 포옹과 환한 미소로 가득하길 바라요. 새로운 시작 속에서도 서두르지 않고 배우고, 변화하고, 실수하면서 삶이 데려가는 곳을 즐길 수 있기를 바라요. 오랫동안 마음을 따뜻하게 해줄 소중한 추억도 많이 쌓길 바라요.",

letterP4: "이 작은 선물은 제가 공부하면서 새로운 것을 배우는 과정에서 만들었어요. 이번에는 조금 색다른 것을 해보고 싶었어요. 제 손으로 무언가를 직접 만들어 보는 일이 의미 있게 느껴졌고, 그때 사용한 기술도 조금씩 제 삶의 일부가 되어 가고 있어요. 완벽하지 않을 수도 있지만, 그 안에 담은 진심과 정성을 느껴주면 좋겠어요. 현정님의 재능과 시간을 응원하는 사람들과 나눠주셔서 고마워요.",

letterP5: "늘 건강 잘 챙기시고, 앞으로의 한 해에 웃을 이유가 셀 수 없이 많기를 바라요. 무엇을 하시든 계속 응원하고 행복을 빌게요.",

signoff: "따뜻한 마음과 진심 어린 축하를 담아,",

galleryEyebrow: "작은 순간, 소중한 추억",
galleryTitle: "좋아하는 순간들의 갤러리",
galleryIntro: "✦",
galleryPlaceholder1: "좋아하는 순간",
galleryPlaceholder2: "사랑스러운 미소",
galleryPlaceholder3: "아름다운 장면",
galleryCaption1: "간직하고 싶은 작은 순간들 ♡",
galleryCaption2: "하루를 환하게 밝혀 주는 미소 ♡",
galleryCaption3: "꽃처럼 피어나는 소중한 추억 ♡",

finalEyebrow: "떠나기 전 마지막 소원",
finalTitle: "앞으로의 이야기가<br><em>아름다운 일들로 가득하길.</em>",
finalText: "현정님의 22번째 생일을 축하해요. 현정님만의 특별하고 아름다운 방식으로 계속 피어나길 바라요.",
backToTop: "뒤로 가기",

footerText: "황현정님을 위해 정성껏 손으로 만든 작은 생일 선물이에요."
}
  };


  // Funciones para seleccionar elementos del HTML.
  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


  // Cambiar los textos de la página.
  function applyLanguage(language) {
    const selectedLanguage = translations[language]
      ? language
      : "en";

    document.documentElement.lang = selectedLanguage;

    const dictionary = translations[selectedLanguage];

    // Textos normales.
    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });

    // Textos que necesitan conservar etiquetas HTML, como <em> y <br>.
    $$("[data-i18n-html]").forEach((element) => {
      const key = element.dataset.i18nHtml;

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.innerHTML = dictionary[key];
      }
    });

    // El selector puede no existir en otras versiones del HTML.
    const languageSelect = $("#languageSelect");

    if (languageSelect) {
      languageSelect.value = selectedLanguage;
    }
  }


  // Menú para teléfonos y pantallas pequeñas.
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    // Cerrar el menú cuando se selecciona una sección.
    $$(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

        menuToggle.textContent = "☰";
      });
    });
  }


  // Selector de idioma: inglés, español y coreano.
  const languageSelect = $("#languageSelect");

  if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
      applyLanguage(event.target.value);
    });
  }


  // Efecto suave de movimiento en las tarjetas.
  if (
    window.matchMedia &&
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) {
    $$(".float-card").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        if (!rect.width || !rect.height) {
          return;
        }

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        const tiltX = Math.max(
          -2.5,
          Math.min(2.5, y * -4)
        );

        const tiltY = Math.max(
          -2.5,
          Math.min(2.5, x * 4)
        );

        card.style.transform =
          `perspective(900px) translateY(-4px) ` +
          `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }


  // Iniciar la página en inglés.
  applyLanguage("en");

})();