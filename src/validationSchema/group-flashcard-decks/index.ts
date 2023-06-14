import * as yup from 'yup';

export const groupFlashcardDeckValidationSchema = yup.object().shape({
  group_id: yup.string().nullable().required(),
  flashcard_deck_id: yup.string().nullable().required(),
});
