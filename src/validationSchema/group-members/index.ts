import * as yup from 'yup';

export const groupMemberValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  group_id: yup.string().nullable().required(),
});
