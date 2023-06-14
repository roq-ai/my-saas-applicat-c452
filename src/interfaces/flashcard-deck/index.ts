import { GroupFlashcardDeckInterface } from 'interfaces/group-flashcard-deck';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FlashcardDeckInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  creator_id: string;
  created_at?: any;
  updated_at?: any;
  group_flashcard_deck?: GroupFlashcardDeckInterface[];
  user?: UserInterface;
  _count?: {
    group_flashcard_deck?: number;
  };
}

export interface FlashcardDeckGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  creator_id?: string;
}
