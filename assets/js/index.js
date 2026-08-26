import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { disableSubmitBtn, showError } from "./new-deck-view.js";
import { getDecks, deleteDeck } from "./api.js";
import { getDeckByID, fetchedDecks } from "./decks.js";

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
const pageEl = document.querySelector(".page");
const newDeckSection = document.querySelector("#new-deck-view");
const aboutSection = document.querySelector("#about-view");

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
  cardLink.href = `#deck/${item._id}`;

  const deleteBtn = cardEl.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteDeck(item._id)
      .then(() => {
        cardEl.remove();
        const index = fetchedDecks.findIndex((deck) => deck._id === item._id);
        if (index !== -1) {
          fetchedDecks.splice(index, 1);
        }
      })
      .catch(() => {
        showError("Couldn't delete that deck");
      });
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
  pageEl.classList.remove("page_no-mobile-bar");
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
  newDeckSection.style.display = "none";
  aboutSection.style.display = "none";
}

function renderDeckView(deck) {
  currentDeck = deck;
  deckViewTitle.textContent = deck.name;
  deckGalleryList.innerHTML = "";
  pageEl.classList.remove("page_no-mobile-bar");

  const deckColorClass = `card_color_${hexToString(deck.color)}`;
  deck.cards.forEach((card) => renderDeckCardEl(card, deckColorClass));

  mainContent.classList.remove("page__main-content_location_carousel");
  homeSection.style.display = "none";
  deckViewSection.style.display = "flex";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
  newDeckSection.style.display = "none";
  aboutSection.style.display = "none";
}

function renderNotFoundView() {
  mainContent.classList.remove("page__main-content_location_carousel");
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "";
  pageEl.classList.add("page_no-mobile-bar");
  newDeckSection.style.display = "none";
  aboutSection.style.display = "none";
}

function renderNewDeckView() {
  mainContent.classList.remove("page__main-content_location_carousel");
  pageEl.classList.remove("page_no-mobile-bar");
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
  newDeckSection.style.display = "";
  aboutSection.style.display = "none";
}

function renderAboutView() {
  mainContent.classList.remove("page__main-content_location_carousel");
  pageEl.classList.remove("page_no-mobile-bar");
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
  newDeckSection.style.display = "none";
  aboutSection.style.display = "";
}

function setView(route) {
  if (route === "#about") {
    renderAboutView();
    return;
  }

  if (route === "#home" || route === "") {
    renderHomeView();
    return;
  }

  if (route === "#new-deck-view") {
    renderNewDeckView();
    disableSubmitBtn();
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
    newDeckSection.style.display = "none";
    aboutSection.style.display = "none";
    pageEl.classList.add("page_no-mobile-bar");
    renderCarouselView(deck);
    return;
  }

  renderNotFoundView();
}

practiceBtn.addEventListener("click", () => {
  if (currentDeck) {
    window.location.hash = `#carousel/${currentDeck._id}`;
  }
});

const newDeckBtn = document.querySelector("#home .gallery__new-card-btn");
newDeckBtn.addEventListener("click", () => {
  window.location.hash = "#new-deck-view";
});

window.addEventListener("hashchange", () => {
  setView(window.location.hash);
});

document.addEventListener("DOMContentLoaded", () => {
  getDecks()
    .then((decks) => {
      fetchedDecks.push(...decks);
      decks.forEach(renderGalleryCardEl);
    })
    .catch(() => {
      showError("Can't fetch decks");
    })
    .finally(() => {
      setView(window.location.hash);
    });
});
