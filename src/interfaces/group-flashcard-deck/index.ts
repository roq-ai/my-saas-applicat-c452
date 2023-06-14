import { GroupInterface } from 'interfaces/group';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { GetQueryInterface } from 'interfaces';

export interface GroupFlashcardDeckInterface {
  id?: string;
  group_id: string;
  flashcard_deck_id: string;
  created_at?: any;
  updated_at?: any;

  group?: GroupInterface;
  flashcard_deck?: FlashcardDeckInterface;
  _count?: {};
}

export interface GroupFlashcardDeckGetQueryInterface extends GetQueryInterface {
  id?: string;
  group_id?: string;
  flashcard_deck_id?: string;
}
