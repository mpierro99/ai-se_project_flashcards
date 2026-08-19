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

function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

// ── references ──────────────────────────────────
const form = document.querySelector("#new-deck-form");
const submitBtn = form.querySelector(".new-deck-view__submit");
const textarea = form.querySelector(".new-deck-view__textarea");

const errorModal = document.querySelector("#error-modal");
const errorModalCloseBtn = errorModal.querySelector(".modal__close");
const errorMessageEl = errorModal.querySelector(".modal__error");

// ── modal helpers ───────────────────────────────
function openModal(modal) {
  modal.classList.add("modal_visible");
}

function closeModal(modal) {
  modal.classList.remove("modal_visible");
}

function showError(message) {
  errorMessageEl.textContent = message;
  openModal(errorModal);
}

errorModalCloseBtn.addEventListener("click", () => {
  closeModal(errorModal);
});

// ── enable the submit button ────────────────────
function disableSubmitBtn() {
  submitBtn.disabled = false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  const colorValue = formData["deck-color"];

  const jsonData = parseJSON(formData["deck-json"]);
  if (jsonData === null) {
    showError(
      "That isn't valid JSON. Check for missing commas, quotes, or brackets.",
    );
    return;
  }

  if (validateName(jsonData.name) === null) {
    showError("The deck's name must be a string between 2 and 80 characters.");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError("The deck's cards must be an array.");
    return;
  }

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError(
      `The color in your JSON ("${jsonData.color}") doesn't match the color you picked ("${colorValue}"). Change one so they agree, or remove the color field from the JSON.`,
    );
    return;
  }

  const color = normalizeColor(colorValue);
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
