import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { InputField } from "../components/InputField";

const NewPollPage: NextPage = () => {
  return (
    <Box maxW="xl" mx="auto" py={24}>
      <Heading as="h1">Create A Poll</Heading>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={() => {}}
      >
        <VStack align="start" spacing={4} mt={6} as={Form}>
          <InputField name="title" label="Title" required />
          <InputField
            name="description"
            label="Description"
            required
            textarea
          />
          <InputField name="deadline" label="Deadline" type="datetime-local" />
          <Button w="full" colorScheme="teal">
            Create Poll
          </Button>
        </VStack>
      </Formik>
    </Box>
  );
};

export default NewPollPage;
