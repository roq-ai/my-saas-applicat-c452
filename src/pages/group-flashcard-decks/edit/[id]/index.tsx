import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getGroupFlashcardDeckById, updateGroupFlashcardDeckById } from 'apiSdk/group-flashcard-decks';
import { Error } from 'components/error';
import { groupFlashcardDeckValidationSchema } from 'validationSchema/group-flashcard-decks';
import { GroupFlashcardDeckInterface } from 'interfaces/group-flashcard-deck';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { GroupInterface } from 'interfaces/group';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { getGroups } from 'apiSdk/groups';
import { getFlashcardDecks } from 'apiSdk/flashcard-decks';

function GroupFlashcardDeckEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GroupFlashcardDeckInterface>(
    () => (id ? `/group-flashcard-decks/${id}` : null),
    () => getGroupFlashcardDeckById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GroupFlashcardDeckInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGroupFlashcardDeckById(id, values);
      mutate(updated);
      resetForm();
      router.push('/group-flashcard-decks');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GroupFlashcardDeckInterface>({
    initialValues: data,
    validationSchema: groupFlashcardDeckValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Group Flashcard Deck
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<GroupInterface>
              formik={formik}
              name={'group_id'}
              label={'Select Group'}
              placeholder={'Select Group'}
              fetcher={getGroups}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<FlashcardDeckInterface>
              formik={formik}
              name={'flashcard_deck_id'}
              label={'Select Flashcard Deck'}
              placeholder={'Select Flashcard Deck'}
              fetcher={getFlashcardDecks}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'group_flashcard_deck',
  operation: AccessOperationEnum.UPDATE,
})(GroupFlashcardDeckEditPage);
