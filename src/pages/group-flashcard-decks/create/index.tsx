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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createGroupFlashcardDeck } from 'apiSdk/group-flashcard-decks';
import { Error } from 'components/error';
import { groupFlashcardDeckValidationSchema } from 'validationSchema/group-flashcard-decks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { GroupInterface } from 'interfaces/group';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { getGroups } from 'apiSdk/groups';
import { getFlashcardDecks } from 'apiSdk/flashcard-decks';
import { GroupFlashcardDeckInterface } from 'interfaces/group-flashcard-deck';

function GroupFlashcardDeckCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GroupFlashcardDeckInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGroupFlashcardDeck(values);
      resetForm();
      router.push('/group-flashcard-decks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GroupFlashcardDeckInterface>({
    initialValues: {
      group_id: (router.query.group_id as string) ?? null,
      flashcard_deck_id: (router.query.flashcard_deck_id as string) ?? null,
    },
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
            Create Group Flashcard Deck
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'group_flashcard_deck',
  operation: AccessOperationEnum.CREATE,
})(GroupFlashcardDeckCreatePage);
