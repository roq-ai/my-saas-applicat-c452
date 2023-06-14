import * as yup from 'yup';
import { groupFlashcardDeckValidationSchema } from 'validationSchema/group-flashcard-decks';
import { groupMemberValidationSchema } from 'validationSchema/group-members';

export const groupValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  admin_id: yup.string().nullable().required(),
  group_flashcard_deck: yup.array().of(groupFlashcardDeckValidationSchema),
  group_member: yup.array().of(groupMemberValidationSchema),
});
