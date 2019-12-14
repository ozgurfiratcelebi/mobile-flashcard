
import { RECEIVE_ALL_DECKS, ADD_DECK, CREATE_CARD, DELETE_DECK ,RECEIVE_DECK} from "./actionTypes";


export const addDeck=(id, name) =>{
  return {
    type: ADD_DECK,
    id,
    name
  };
}

 
export const receiveAllDecks =decks=>{
  return {
    type: RECEIVE_ALL_DECKS,
    decks
  };
}

export const receiveDeck =deck=>{
  return {
    type: RECEIVE_DECK,
    deck
  };
}

export const deleteDeck =id=>{
  return {
    type: DELETE_DECK,
    id
  };
};

export const createCard = (deckId, question, answer) =>{
  return {
    type: CREATE_CARD,
    deckId,
    question,
    answer
  };
}