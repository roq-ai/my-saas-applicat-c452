import { GroupFlashcardDeckInterface } from 'interfaces/group-flashcard-deck';
import { GroupMemberInterface } from 'interfaces/group-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GroupInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  admin_id: string;
  created_at?: any;
  updated_at?: any;
  group_flashcard_deck?: GroupFlashcardDeckInterface[];
  group_member?: GroupMemberInterface[];
  user?: UserInterface;
  _count?: {
    group_flashcard_deck?: number;
    group_member?: number;
  };
}

export interface GroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  admin_id?: string;
}
