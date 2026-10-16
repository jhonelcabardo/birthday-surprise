
/* ==========================================
   PURPLE BIRTHDAY SURPRISE
   Full Updated JavaScript with MP3 Music
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // GET ELEMENTS
  const screens = document.querySelectorAll(".screen");
  const petalsContainer = document.getElementById("petals");
  const particlesContainer = document.getElementById("particles");

  const cakeBtn = document.getElementById("cakeBtn");
  const wishMessage = document.getElementById("wishMessage");

  const musicBtn = document.getElementById("musicBtn");
  const birthdayMusic = document.getElementById("birthdayMusic");

  const loveBtn = document.getElementById("loveBtn");
  const replayBtn = document.getElementById("replayBtn");
  const finalMessage = document.getElementById("finalMessage");

  let wishMade = false;
  let petalTimer = null;
  let musicOn = false;

  // 1. SCREEN NAVIGATION
  function showScreen(screenId) {
    const target = document.getElementById(screenId);

    if (!target || !target.classList.contains("screen")) {
      return;
    }

    screens.forEach((screen) => {
      screen.classList.remove("active");
    });

    target.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (screenId === "garden" || screenId === "finale") {
      startPetals();
    }

    if (screenId === "cake" || screenId === "finale") {
      burstConfetti();
    }

    if (screenId === "garden") {
      replayFlowers();
    }
  }

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.go);
    });
  });

  // 2. FLOWER ANIMATION
  function replayFlowers() {
    document.querySelectorAll(".flower-head").forEach((flower) => {
      flower.style.animation = "none";
      void flower.offsetWidth;
      flower.style.animation = "";
    });
  }

  // 3. FALLING PETALS
  function createPetal() {
    if (!petalsContainer || document.hidden) return;
    if (petalsContainer.childElementCount >= 35) return;

    const petal = document.createElement("span");
    const flowers = ["🌸", "🌷", "💜", "✿", "❀"];

    petal.className = "petal";
    petal.textContent =
      flowers[Math.floor(Math.random() * flowers.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = 12 + Math.random() * 17 + "px";
    petal.style.animationDuration = 6 + Math.random() * 6 + "s";

    petal.style.setProperty(
      "--drift",
      Math.random() * 180 - 90 + "px"
    );

    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 13000);
  }

  function startPetals() {
    if (petalTimer) return;

    createPetal();
    petalTimer = setInterval(createPetal, 550);
  }

  // 4. FLOATING SPARKLES
  if (particlesContainer) {
    for (let i = 0; i < 22; i++) {
      const sparkle = document.createElement("span");

      sparkle.className = "sparkle";
      sparkle.textContent = "✦";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.fontSize = 8 + Math.random() * 12 + "px";
      sparkle.style.animationDelay = Math.random() * 4 + "s";

      particlesContainer.appendChild(sparkle);
    }
  }

  // 5. BIRTHDAY CAKE CANDLE
  if (cakeBtn && wishMessage) {
    cakeBtn.addEventListener("click", () => {
      if (wishMade) {
        wishMessage.textContent =
          "Your birthday wish is safe in the stars, my love. 💜✨";
        return;
      }

      wishMade = true;
      cakeBtn.classList.add("blown");

      wishMessage.textContent =
        "Yay! Make a wish, beautiful girl! May your dreams come true. 💜✨";

      cakeBtn.setAttribute(
        "aria-label",
        "Birthday candle blown out"
      );

      burstConfetti();
    });
  }

  // 6. CONFETTI
  function burstConfetti() {
    const colors = ["💜", "✨", "🌸", "💖", "✦"];

    for (let i = 0; i < 35; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti";
      piece.textContent =
        colors[Math.floor(Math.random() * colors.length)];

      piece.style.left = Math.random() * 100 + "vw";
      piece.style.fontSize = 10 + Math.random() * 15 + "px";

      piece.style.setProperty(
        "--drift",
        Math.random() * 220 - 110 + "px"
      );

      piece.style.animationDuration = 2.5 + Math.random() * 2 + "s";

      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }
  }

  // 7. MP3 BACKGROUND MUSIC
  async function stopMusic() {
    if (birthdayMusic) {
      birthdayMusic.pause();
      birthdayMusic.currentTime = 0;
    }

    musicOn = false;

    if (musicBtn) {
      musicBtn.textContent = "♫ Music: Off";
    }
  }

  if (musicBtn && birthdayMusic) {
    musicBtn.addEventListener("click", async () => {
      if (!musicOn) {
        try {
          await birthdayMusic.play();

          musicOn = true;
          musicBtn.textContent = "♫ Music: On";
        } catch (error) {
          console.error("Unable to play music:", error);

          musicBtn.textContent = "♫ Tap to Play Again";
          musicOn = false;
        }
      } else {
        birthdayMusic.pause();

        musicOn = false;
        musicBtn.textContent = "♫ Music: Off";
      }
    });
  } else {
    console.error(
      "Music elements not found. Check musicBtn and birthdayMusic IDs in index.html."
    );
  }

  // 8. FINAL I LOVE YOU BUTTON
  if (loveBtn && finalMessage) {
    loveBtn.addEventListener("click", () => {
      finalMessage.textContent =
        "And I'll keep choosing you, today and always. I love you! 💜";

      burstConfetti();
    });
  }

  // 9. REPLAY THE WHOLE SURPRISE
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      wishMade = false;

      if (cakeBtn) {
        cakeBtn.classList.remove("blown");

        cakeBtn.setAttribute(
          "aria-label",
          "Tap to blow out the birthday candle"
        );
      }

      if (wishMessage) {
        wishMessage.textContent =
          "Tap the cake to blow out the candle! 💜";
      }

      if (finalMessage) {
        finalMessage.textContent = "";
      }

      stopMusic();
      showScreen("welcome");
    });
  }

  // 10. INITIALIZE
  startPetals();

  console.log("💜 Purple Birthday Surprise is ready!");
});
