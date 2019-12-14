import { AsyncStorage } from "react-native";

export const FLASHCARD_STORAGE_KEY = "mobileflashCardsStorage";

export const saveDeck = deck => {
  return AsyncStorage.mergeItem(
    FLASHCARD_STORAGE_KEY,
    JSON.stringify({ [deck.id]: deck })
  );
};

export const retrieveDecks = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(result => {
    const data = JSON.parse(result);
    return data;
  });
};

export const clear = () => {
  return AsyncStorage.clear();
};

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results =>
    formatDecks(results)
  );
};

export const deleteDeckFromStorage = (id )=> {
  const decks =   getDecks();

  let newDecks = {};
  for (let [key, value] of Object.entries(decks)) {
    if (key !== id) {
      newDecks[key] = value;
    }
  }

    AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY);
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newDecks));
};

export const saveCard = (deckId, card) => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);

    data[deckId] = {
      ...data[deckId],
      cards: [
        ...data[deckId].cards,
        { question: card.question, answer: card.answer }
      ]
    };
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
  });
};
