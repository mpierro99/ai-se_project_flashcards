import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");

function createDeckEl(item) {
  const templateClone = deckTemplate.content.cloneNode(true);
  const deckEl = templateClone.querySelector(".deck");
  deckEl.querySelector(".deck__title").textContent = item.name;
  deckEl.querySelector(".deck__count").textContent =
    `${item.cards.length} cards`;

  const colorName = hexToString(item.color);
  removeColorClasses(deckEl);
  deckEl.classList.add(`deck_color_${colorName}`);

  const deckLink = deckEl.querySelector(".deck__link");
  deckLink.href = `#carousel/${item.id}`;

  const deleteBtn = deckEl.querySelector(".deck__delete-btn");
  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckList.prepend(deckEl);
}

function setView(route) {
  const mainContent = document.querySelector(".page__main-content");
  const homeSection = document.querySelector("#home");
  const carouselSection = document.querySelector("#carousel");
  const notFoundSection = document.querySelector("#not-found");

  if (route === "#about") {
    mainContent.classList.remove("page__main-content_location_carousel");
    homeSection.style.display = "none";
    carouselSection.style.display = "none";
    notFoundSection.style.display = "none";
    // About view not implemented yet.
    return;
  }

  if (route === "#home" || route === "") {
    mainContent.classList.remove("page__main-content_location_carousel");
    homeSection.style.display = "";
    carouselSection.style.display = "none";
    notFoundSection.style.display = "none";
    return;
  }

  if (route.startsWith("#carousel/")) {
    mainContent.classList.add("page__main-content_location_carousel");
    homeSection.style.display = "none";
    notFoundSection.style.display = "none";
    const deckID = route.split("/")[1];
    const deck = getDeckByID(deckID);
    renderCarouselView(deck);
    return;
  }

  mainContent.classList.remove("page__main-content_location_carousel");
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "";
}

window.addEventListener("hashchange", () => {
  setView(window.location.hash);
});

setView(window.location.hash);

decks.forEach(renderDeckEl);
