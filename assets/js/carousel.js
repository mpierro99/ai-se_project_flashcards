import { hexToString, removeColorClasses } from "./colors.js";
let currentCardIndex = 0;
let currentDeck = null;
let showingQuestion = true;

/**
 * Builds the display title for a deck card based on the deck name and index.
 * @param {Object} deck The deck being displayed.
 * @param {string} deck.name The name of the deck.
 * @param {object[]} deck.cards The list of cards in the deck.
 * @param {number} index The zero-based index of the current card.
 * @returns {string} A formatted title string showing the deck name and card position.
 */
function getCarouselTitleString(deck, index) {
  return `${deck.name} • ${index + 1}/${deck.cards.length}`;
}

/**
 * Renders the carousel UI for a deck and attaches navigation behavior.
 * @param {Object} deck The deck to display in the carousel.
 * @param {string} deck.name The name of the deck.
 * @param {string} deck.color The deck color in hex format.
 * @param {object[]} deck.cards The cards in the deck.
 * @returns {void} This function does not return a value.
 */
function renderCarouselView(deck) {
  currentDeck = deck;
  currentCardIndex = 0;

  const carouselSection = document.querySelector("#carousel");
  carouselSection.style.display = "flex";

  const titleEl = carouselSection.querySelector(".carousel__title");
  const cardContainer = carouselSection.querySelector(".carousel__card");
  const cardEl = carouselSection.querySelector(".carousel__card-text");
  const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselSection.querySelector(".carousel__btn_type_flip");

  removeColorClasses(cardContainer);
  const colorName = hexToString(deck.color);
  cardContainer.classList.add(`card__carousel_color_${colorName}`);

  /**
   * Redraws the carousel with the current card, showing either its question or
   * its answer, and updates the title and the arrows' disabled state.
   * @returns {void}
   */
  function updateCard() {
    const card = deck.cards[currentCardIndex];
    titleEl.textContent = getCarouselTitleString(deck, currentCardIndex);

    if (showingQuestion) {
      cardEl.textContent = card.question;
      removeColorClasses(cardContainer);
      const colorName = hexToString(deck.color);
      cardContainer.classList.add(`card__carousel_color_${colorName}`);
    } else {
      cardEl.textContent = card.answer;
      removeColorClasses(cardContainer);
      cardContainer.classList.add("card__carousel_color_white");
    }

    leftBtn.classList.toggle("carousel__btn_disabled", currentCardIndex === 0);
    rightBtn.classList.toggle(
      "carousel__btn_disabled",
      currentCardIndex === deck.cards.length - 1,
    );
  }

  leftBtn.addEventListener("click", () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      showingQuestion = true;
      updateCard();
    }
  });

  rightBtn.addEventListener("click", () => {
    if (currentCardIndex < deck.cards.length - 1) {
      currentCardIndex++;
      showingQuestion = true;
      updateCard();
    }
  });

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateCard();
  });

  updateCard();
}

export { renderCarouselView };
