import * as yup from 'yup';
import { groupFlashcardDeckValidationSchema } from 'validationSchema/group-flashcard-decks';

export const flashcardDeckValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  creator_id: yup.string().nullable().required(),
  group_flashcard_deck: yup.array().of(groupFlashcardDeckValidationSchema),
});
