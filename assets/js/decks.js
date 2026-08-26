const fetchedDecks = [];

/**
 * Finds a deck in the fetched deck collection by its ID.
 * @param {string} deckId The unique identifier of the deck to search for.
 * @returns {Object|undefined} The matching deck object, or undefined if no deck matches.
 */
function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}

export { getDeckByID, fetchedDecks };
