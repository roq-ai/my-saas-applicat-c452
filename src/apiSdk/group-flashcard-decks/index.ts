import axios from 'axios';
import queryString from 'query-string';
import { GroupFlashcardDeckInterface, GroupFlashcardDeckGetQueryInterface } from 'interfaces/group-flashcard-deck';
import { GetQueryInterface } from '../../interfaces';

export const getGroupFlashcardDecks = async (query?: GroupFlashcardDeckGetQueryInterface) => {
  const response = await axios.get(`/api/group-flashcard-decks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGroupFlashcardDeck = async (groupFlashcardDeck: GroupFlashcardDeckInterface) => {
  const response = await axios.post('/api/group-flashcard-decks', groupFlashcardDeck);
  return response.data;
};

export const updateGroupFlashcardDeckById = async (id: string, groupFlashcardDeck: GroupFlashcardDeckInterface) => {
  const response = await axios.put(`/api/group-flashcard-decks/${id}`, groupFlashcardDeck);
  return response.data;
};

export const getGroupFlashcardDeckById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/group-flashcard-decks/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteGroupFlashcardDeckById = async (id: string) => {
  const response = await axios.delete(`/api/group-flashcard-decks/${id}`);
  return response.data;
};
