import { hexToString, removeColorClasses } from "./colors.js";
let currentCardIndex = 0;
let currentDeck = null;
let showingQuestion = true;

function getCarouselTitleString(deck, index) {
  return `${deck.name} • ${index + 1}/${deck.cards.length}`;
}

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
