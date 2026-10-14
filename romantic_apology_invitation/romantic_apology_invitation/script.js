// PERSONALIZE THESE VALUES before sharing the website.
const HER_NAME = "Khusi";
const YOUR_NAME = "Dyuti";

document.querySelectorAll("[data-her-name]").forEach(el => el.textContent = HER_NAME);
document.querySelectorAll("[data-my-name]").forEach(el => el.textContent = YOUR_NAME);

const pages = [...document.querySelectorAll(".page")];
const count = document.getElementById("current-count");

function showPage(number) {
  pages.forEach((page, index) => {
    const active = index === number - 1;
    page.hidden = !active;
    page.classList.toggle("active", active);
  });
  count.textContent = String(number).padStart(2, "0");
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  if (number === 2) animateLetter();
}
window.showPage = showPage;

const envelope = document.getElementById("envelope-button");
const openInvitation = document.getElementById("open-invitation");
let envelopeOpened = false;

function openEnvelope() {
  if (!envelopeOpened) {
    envelopeOpened = true;
    envelope.classList.add("opened");
    openInvitation.innerHTML = 'Read your letter <span>♡</span>';
    openInvitation.classList.add("ready");
  } else {
    showPage(2);
  }
}
envelope.addEventListener("click", openEnvelope);
openInvitation.addEventListener("click", () => {
  if (!envelopeOpened) {
    openEnvelope();
    window.setTimeout(() => showPage(2), 750);
  } else {
    showPage(2);
  }
});

function animateLetter() {
  const paper = document.querySelector(".letter-paper");
  if (!paper || paper.dataset.seen === "true") return;
  paper.dataset.seen = "true";
  paper.animate(
    [{ opacity: 0, transform: "translateY(16px) scale(.99)" }, { opacity: 1, transform: "translateY(0) scale(1)" }],
    { duration: 650, easing: "cubic-bezier(.2,.75,.25,1)" }
  );
}

// Gift reveal
const giftBox = document.getElementById("gift-box");
const giftMessage = document.getElementById("gift-message");
giftBox.addEventListener("click", () => {
  const isOpen = giftBox.classList.toggle("opened");
  giftMessage.hidden = !isOpen;
  giftBox.setAttribute("aria-label", isOpen ? "Close your virtual gift" : "Open your virtual gift");
  giftBox.querySelector(".gift-tap").textContent = isOpen ? "your little promise" : "tap to open";
});

// Gentle, occasional floating hearts
const heartLayer = document.getElementById("floating-hearts");
const heartSymbols = ["♡", "♥", "✧", "♡"];
function makeHeart() {
  if (document.hidden) return;
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 16}px`;
  heart.style.animationDuration = `${9 + Math.random() * 8}s`;
  heartLayer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 18000);
}
for (let i = 0; i < 8; i++) window.setTimeout(makeHeart, i * 420);
window.setInterval(makeHeart, 1700);

// Gentle responses that leave the choice with her
document.getElementById("forgive-button").addEventListener("click", () => {
  document.getElementById("response-message").textContent =
    "Thank you for being willing to talk. I’ll listen with an open heart. ❤️";
  burstHearts();
});
document.getElementById("time-button").addEventListener("click", () => {
  document.getElementById("response-message").textContent =
    "Of course. Take all the time you need. I’ll respect your space. 🤍";
});

function burstHearts() {
  for (let i = 0; i < 14; i++) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = "♡";
    heart.style.left = `${35 + Math.random() * 30}%`;
    heart.style.bottom = "20%";
    heart.style.fontSize = `${16 + Math.random() * 18}px`;
    heart.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    heartLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 5000);
  }
}
