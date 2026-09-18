import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";
import { stringToHex } from "./colors.js";

/**
 * Validates that a deck name is a string with the required length.
 * @param {*} name The proposed deck name, which may be any type.
 * @returns {string|null} The original name if valid, otherwise null.
 */
function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

/**
 * Parses a JSON string and returns the resulting value, or null if parsing fails.
 * @param {string} jsonString The JSON text to parse.
 * @returns {object|null} The parsed object, or null if the input is invalid.
 */
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
/**
 * Shows a modal by adding the visible class.
 * @param {HTMLElement} modal The modal element to display.
 * @returns {void} This function does not return a value.
 */
function openModal(modal) {
  modal.classList.add("modal_visible");
}

/**
 * Hides a modal by removing the visible class.
 * @param {HTMLElement} modal The modal element to hide.
 * @returns {void} This function does not return a value.
 */
function closeModal(modal) {
  modal.classList.remove("modal_visible");
}

/**
 * Displays an error message in the shared error modal.
 * @param {string} message The error message to show.
 * @returns {void} This function does not return a value.
 */
function showError(message) {
  errorMessageEl.textContent = message;
  openModal(errorModal);
}

errorModalCloseBtn.addEventListener("click", () => {
  closeModal(errorModal);
});

// ── enable the submit button ────────────────────
/**
 * Enables the submit button for the new deck form.
 * @returns {void} This function does not return a value.
 */
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

  const color = stringToHex(colorValue);

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== color
  ) {
    showError(
      `The color in your JSON ("${jsonData.color}") doesn't match the color you picked ("${color}"). Change one so they agree, or remove the color field from the JSON.`,
    );
    return;
  }

  addDeck({
    name: jsonData.name,
    color,
    cards: jsonData.cards,
  })
    .then((newDeck) => {
      const cards =
        newDeck.cards && newDeck.cards.length > 0
          ? newDeck.cards
          : jsonData.cards;
      fetchedDecks.push({ ...newDeck, cards });
      window.location.hash = "deck/" + newDeck._id;
    })
    .catch(() => {
      showError("Couldn't create that deck");
    });
});

export { disableSubmitBtn, showError };
