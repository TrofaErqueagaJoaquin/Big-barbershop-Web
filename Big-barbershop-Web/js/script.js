const CONFIG = {
  whatsappNumber: "5491171320497",
  businessName: "BIG Barbershop",
  openHour: 9,
  closeHour: 20,
  slotIntervalMinutes: 30,
};

document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const logoImg = document.getElementById("logoImg");
logoImg.addEventListener("load", () => logoImg.setAttribute("data-loaded", "true"));
logoImg.addEventListener("error", () => logoImg.remove());

const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;
dateInput.value = today;

const timeSelect = document.getElementById("time");
(function populateTimeSlots() {
  const { openHour, closeHour, slotIntervalMinutes } = CONFIG;
  for (let minutes = openHour * 60; minutes < closeHour * 60; minutes += slotIntervalMinutes) {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    const option = document.createElement("option");
    option.value = `${h}:${m}`;
    option.textContent = `${h}:${m}`;
    timeSelect.appendChild(option);
  }
})();

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const notes = document.getElementById("notes").value.trim();

  const lines = [
    `Hola ${CONFIG.businessName}! Quiero consultar disponibilidad de turno.`,
    `Nombre: ${name}`,
    `Servicio: ${service}`,
    `Fecha: ${formatDate(date)}`,
    `Horario preferido: ${time}`,
  ];

  if (notes) lines.push(`Comentario: ${notes}`);

  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
  window.open(url, "_blank", "noopener");
});
