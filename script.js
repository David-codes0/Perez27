const WEDDING = new Date("2027-01-23T00:00:00");

const bridesmaids = [
  { name: "Omolade", role: "Maid of Honor", bio: "", imagepath: "images/Omolade.jpeg" },
  { name: "Cynthia", role: "Bridesmaid", bio: "", imagepath: "images/Cynthia.jpeg" },
  { name: "Oluwafayokunmi", role: "Bridesmaid", bio: "", imagepath: "images/Oluwafayokunmi.jpeg" },
  { name: "Precious", role: "Bridesmaid", bio: "", imagepath: "images/Precious.jpeg" },
  { name: "Abigail", role: "Bridesmaid", bio: "", imagepath: "images/Abigail.jpeg" },
  { name: "Global Deborah", role: "Bridesmaid", bio: "", imagepath: "images/Global_Deborah.jpeg" },
  { name: "Oluwasola", role: "Bridesmaid", bio: "", imagepath: "images/Oluwasola.jpeg" },
  { name: "Peace", role: "Bridesmaid", bio: "", imagepath: "images/Peace.jpeg" },
  { name: "Esele", role: "Bridesmaid", bio: "", imagepath: "images/Esele.jpeg" },
  { name: "Olayinka", role: "Bridesmaid", bio: "", imagepath: "images/Olayinka.jpeg" },
  { name: "Oyinlola", role: "Bridesmaid", bio: "", imagepath: "images/Oyinlola.jpeg" },
  { name: "Itunuoluwa", role: "Bridesmaid", bio: "", imagepath: "images/itunuoluwa.jpeg" },
  { name: "BMO", role: "Bridesmaid", bio: "", imagepath: "images/BMO.jpeg" }
];

const groomsmen = [
  { name: "Ifeoluwa", role: "Best Man", bio: "", imagepath: "images/Ifeoluwa.jpeg" },
  { name: "Freedo", role: "Groomsman", bio: "", imagepath: "images/Freedo.jpeg" },
  { name: "Vicky_B", role: "Groomsman", bio: "", imagepath: "images/Vicky_B.jpeg" },
  { name: "Oluwatobi", role: "Groomsman", bio: "", imagepath: "images/Oluwatobi.jpeg" },
  { name: "Iyanu", role: "Groomsman", bio: "", imagepath: "images/Iyanu.jpeg" },
  { name: "FM", role: "Groomsman", bio: "", imagepath: "images/FM.jpeg" },
  { name: "Calabead", role: "Groomsman", bio: "", imagepath: "images/Calabead.jpeg" },
  { name: "Dedot", role: "Groomsman", bio: "", imagepath: "images/Dedot.jpeg" },
  { name: "Emmanuel", role: "Groomsman", bio: "", imagepath: "images/Emmanuel.jpeg" },
  { name: "Unique", role: "Groomsman", bio: "", imagepath: "images/Unique.jpeg" }
];

const squads = { bridesmaids, groomsmen };
const squadGrid = document.getElementById("squadGrid");

function pad(n) {
  return String(n).padStart(2, "0");
}

function renderSquad(key) {
  squadGrid.innerHTML = squads[key].map((person) => {
    const bio = (person.bio || "").trim();
    const bioMarkup = bio
      ? `<div class="tap-hint"><span>Tap to view bio</span></div><p class="bio">${bio}</p>`
      : "";
    return `
      <article class="person">
        <div class="portrait${bio ? "" : " no-bio"}" ${bio ? `tabindex="0" role="button" aria-label="${person.name}. Tap to view bio"` : ""}>
          <img src="${person.imagepath}" alt="${person.name}" />
          ${bioMarkup}
        </div>
        <h3>${person.name}</h3>
        <p class="role">${person.role}</p>
      </article>`;
  }).join("");
}

renderSquad("bridesmaids");

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    const key = tab.dataset.tab;
    renderSquad(key);
    squadGrid.setAttribute("aria-labelledby", tab.id);
  });
});

squadGrid.addEventListener("click", (event) => {
  const portrait = event.target.closest(".portrait");
  if (!portrait) return;
  portrait.classList.toggle("is-open");
});

function tick() {
  const diff = Math.max(0, WEDDING.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  document.getElementById("days").textContent = pad(Math.floor(totalSeconds / 86400));
  document.getElementById("hours").textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  document.getElementById("minutes").textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  document.getElementById("seconds").textContent = pad(totalSeconds % 60);
}
tick();
setInterval(tick, 1000);

const menuToggle = document.getElementById("menuToggle");
const mobilePanel = document.getElementById("mobilePanel");
menuToggle.addEventListener("click", () => {
  const open = mobilePanel.hasAttribute("hidden");
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  if (open) mobilePanel.removeAttribute("hidden");
  else mobilePanel.setAttribute("hidden", "");
});
mobilePanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobilePanel.setAttribute("hidden", "");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const nav = document.getElementById("nav");
const sections = [...document.querySelectorAll("main section")];
const desktopLinks = [...document.querySelectorAll(".nav-desktop a")];

function onScroll() {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
  const marker = window.scrollY + 140;
  let current = "home";
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });
  desktopLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll(".copy").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast("Account number copied");
    } catch {
      showToast("Copy this number: " + value);
    }
  });
});

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const attending = data.get("attending");
  const note = document.getElementById("formNote");
  const saved = JSON.parse(localStorage.getItem("mb-rsvps") || "[]");
  saved.push({ name, attending, at: new Date().toISOString() });
  localStorage.setItem("mb-rsvps", JSON.stringify(saved));
  note.hidden = false;
  note.textContent = attending === "yes"
    ? `Thank you, ${name}. We can't wait to celebrate with you.`
    : `Thank you, ${name}. We'll miss you, and we're grateful you let us know.`;
  event.currentTarget.reset();
});
