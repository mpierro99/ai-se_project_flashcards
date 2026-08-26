const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

const headers = {
  "Content-Type": "application/json",
  Authorization: "01a03563-808f-7426-8b95-1f020dd32277",
};

/**
 * Handles a fetch response and resolves or rejects based on HTTP status.
 * @param {Response} res The fetch response object to process.
 * @returns {Promise<object>} Resolves with the parsed JSON body, or rejects with a string containing the status code.
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches all decks from the API.
 * @returns {Promise<object[]>} Resolves with an array of deck objects.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

/**
 * Deletes a deck by its ID.
 * @param {string} deckId The unique identifier of the deck to delete.
 * @returns {Promise<any>} A promise that resolves when the deck is deleted.
 */
function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}

/**
 * Creates a new deck with the provided name, color, and cards.
 * @param {object[]} params.cards The cards to include in the deck, each with a question and an answer.
 * @param {string} params.name The name of the deck.
 * @param {string} params.color The color assigned to the deck.
 * @param {Array} params.cards The cards to include in the deck.
 * @returns {Promise<any>} A promise that resolves to the newly created deck.
 */
function addDeck({ name, color, cards }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, color, cards }),
  }).then(processResponse);
}

export { getDecks, deleteDeck, addDeck };
