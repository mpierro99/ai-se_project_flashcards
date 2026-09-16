import { hexToString, removeColorClasses } from "./colors.js";

let currentCardIndex = 0;
let currentDeck = null;
let showingQuestion = true;

const carouselSection = document.querySelector("#carousel");
const titleEl = carouselSection.querySelector(".carousel__title");
const cardContainer = carouselSection.querySelector(".carousel__card");
const cardEl = carouselSection.querySelector(".carousel__card-text");
const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");
const flipBtn = carouselSection.querySelector(".carousel__btn_type_flip");

/**
 * Builds the display title for a deck card based on the deck name and index.
 * @param {Object} deck The deck being displayed.
 * @param {string} deck.name The name of the deck.
 * @param {object[]} deck.cards The list of cards in the deck.
 * @param {number} index The zero-based index of the current card.
 * @returns {string} A formatted title showing the deck name and card position.
 */
function getCarouselTitleString(deck, index) {
  return `${deck.name} • ${index + 1}/${deck.cards.length}`;
}

/**
 * Redraws the carousel for the current card, showing its question or answer,
 * and updates the title and the arrows' disabled state.
 * @returns {void}
 */
function updateCard() {
  const deck = currentDeck;
  removeColorClasses(cardContainer);

  if (deck.cards.length === 0) {
    titleEl.textContent = `${deck.name} • 0 cards`;
    cardEl.textContent = "This deck has no cards yet.";
    leftBtn.classList.add("carousel__btn_disabled");
    rightBtn.classList.add("carousel__btn_disabled");
    return;
  }

  const card = deck.cards[currentCardIndex];
  titleEl.textContent = getCarouselTitleString(deck, currentCardIndex);

  if (showingQuestion) {
    cardEl.textContent = card.question;
    cardContainer.classList.add(`card__carousel_color_${hexToString(deck.color)}`);
  } else {
    cardEl.textContent = card.answer;
    cardContainer.classList.add("card__carousel_color_white");
  }

  leftBtn.classList.toggle("carousel__btn_disabled", currentCardIndex === 0);
  rightBtn.classList.toggle(
    "carousel__btn_disabled",
    currentCardIndex === deck.cards.length - 1,
  );
}

leftBtn.addEventListener("click", () => {
  if (currentDeck && currentCardIndex > 0) {
    currentCardIndex--;
    showingQuestion = true;
    updateCard();
  }
});

rightBtn.addEventListener("click", () => {
  if (currentDeck && currentCardIndex < currentDeck.cards.length - 1) {
    currentCardIndex++;
    showingQuestion = true;
    updateCard();
  }
});

flipBtn.addEventListener("click", () => {
  if (currentDeck && currentDeck.cards.length > 0) {
    showingQuestion = !showingQuestion;
    updateCard();
  }
});

/**
 * Opens the carousel for a deck, starting on the first card's question.
 * @param {Object} deck The deck to display in the carousel.
 * @param {string} deck.name The name of the deck.
 * @param {string} deck.color The deck color in hex format.
 * @param {object[]} deck.cards The cards in the deck.
 * @returns {void}
 */
function renderCarouselView(deck) {
  currentDeck = deck;
  currentCardIndex = 0;
  showingQuestion = true;
  carouselSection.style.display = "flex";
  updateCard();
}

export { renderCarouselView };
