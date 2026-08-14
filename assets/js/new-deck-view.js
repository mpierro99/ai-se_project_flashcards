import { decks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

// ── references ──────────────────────────────────
const form = document.querySelector("#new-deck-form");
const submitBtn = form.querySelector(".new-deck-view__submit");
const textarea = form.querySelector(".new-deck-view__textarea");

// ── enable the submit button ────────────────────
function disableSubmitBtn() {
  submitBtn.disabled = false;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form));

  const jsonData = JSON.parse(formData["deck-json"]);
  const color = normalizeColor(formData["deck-color"]);
  const name = jsonData.name;
  const id = `${slugify(name)}-${Date.now()}`;

  decks.push({
    id,
    color,
    name,
    cards: jsonData.cards,
  });

  window.location.hash = "deck/" + id;
});

export { disableSubmitBtn };
