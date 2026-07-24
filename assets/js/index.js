import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const flashcardTemplate = document.querySelector("#flashcard-template");
const homeGalleryList = document.querySelector("#home .gallery__list");
const deckGalleryList = document.querySelector("#deck-view .gallery__list");
const deckViewSection = document.querySelector("#deck-view");
const deckViewTitle = document.querySelector("#deck-view .gallery__title");
const practiceBtn = document.querySelector(".gallery__practice-btn");
const mainContent = document.querySelector(".page__main-content");
const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
let currentDeck = null;

function createGalleryCardEl(item) {
  const templateClone = deckTemplate.content.cloneNode(true);
  const cardEl = templateClone.querySelector(".card");
  cardEl.querySelector(".card__title").textContent = item.name;
  cardEl.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;

  const colorName = hexToString(item.color);
  removeColorClasses(cardEl);
  cardEl.classList.add(`card_color_${colorName}`);

  const cardLink = cardEl.querySelector(".card__link");
  cardLink.href = `#deck/${item.id}`;

  const deleteBtn = cardEl.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  return cardEl;
}

function createDeckCardEl(card, deckColorClass) {
  const templateClone = flashcardTemplate.content.cloneNode(true);
  const cardEl = templateClone.querySelector(".card");
  cardEl.querySelector(".card__title").textContent = card.question;
  cardEl.querySelector(".card__answer").textContent = card.answer;

  removeColorClasses(cardEl);
  cardEl.classList.add(deckColorClass);

  const flipBtn = cardEl.querySelector(".card__btn_type_flip");
  flipBtn.addEventListener("click", () => {
    cardEl.classList.toggle("card_flipped");
  });

  const deleteBtn = cardEl.querySelector(".card__btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  return cardEl;
}

function renderGalleryCardEl(item) {
  const cardEl = createGalleryCardEl(item);
  homeGalleryList.prepend(cardEl);
}

function renderDeckCardEl(card, deckColorClass) {
  const cardEl = createDeckCardEl(card, deckColorClass);
  deckGalleryList.append(cardEl);
}

function renderHomeView() {
  mainContent.classList.remove("page__main-content_location_carousel");
  homeSection.style.display = "";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
}

function renderDeckView(deck) {
  currentDeck = deck;
  deckViewTitle.textContent = deck.name;
  deckGalleryList.innerHTML = "";

  const deckColorClass = `card_color_${hexToString(deck.color)}`;
  deck.cards.forEach((card) => renderDeckCardEl(card, deckColorClass));

  mainContent.classList.remove("page__main-content_location_carousel");
  homeSection.style.display = "none";
  deckViewSection.style.display = "flex";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
}

function renderNotFoundView() {
  mainContent.classList.remove("page__main-content_location_carousel");
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "";
}

function setView(route) {
  if (route === "#about") {
    mainContent.classList.remove("page__main-content_location_carousel");
    homeSection.style.display = "none";
    deckViewSection.style.display = "none";
    carouselSection.style.display = "none";
    notFoundSection.style.display = "none";
    // About view not implemented yet.
    return;
  }

  if (route === "#home" || route === "") {
    renderHomeView();
    return;
  }

  if (route.startsWith("#deck/")) {
    const deckID = route.split("/")[1];
    const deck = getDeckByID(deckID);
    if (!deck) {
      renderNotFoundView();
      return;
    }

    renderDeckView(deck);
    return;
  }

  if (route.startsWith("#carousel/")) {
    const deckID = route.split("/")[1];
    const deck = getDeckByID(deckID);
    if (!deck) {
      renderNotFoundView();
      return;
    }

    mainContent.classList.add("page__main-content_location_carousel");
    homeSection.style.display = "none";
    deckViewSection.style.display = "none";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "";

    renderCarouselView(deck);
    return;
  }

  renderNotFoundView();
}

practiceBtn.addEventListener("click", () => {
  if (currentDeck) {
    window.location.hash = `#carousel/${currentDeck.id}`;
  }
});

window.addEventListener("hashchange", () => {
  setView(window.location.hash);
});

setView(window.location.hash);

decks.forEach(renderGalleryCardEl);
