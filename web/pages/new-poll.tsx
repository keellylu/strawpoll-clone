import axios from "axios";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon } from "@chakra-ui/icons";
import { FieldArray, Form, Formik } from "formik";
import type { NextPage } from "next";
import { InputField } from "../components/InputField";
import { Footer } from "../components/Footer";
import { API_URL } from "../constants";

const NewPollPage: NextPage = () => {
  return (
    <Box maxW="xl" mx="auto" py={24}>
      <Heading as="h1">New Poll</Heading>
      <Formik
        initialValues={{
          title: "",
          description: "",
          choices: new Array(3).fill(new String()),
        }}
        onSubmit={async (values) => {
          const { id } = (await axios.post(API_URL, values)).data;
          console.log(id);
        }}
      >
        {({ values, isSubmitting }) => (
          <VStack align="start" spacing={4} mt={6} as={Form}>
            <InputField name="title" label="Title" required />
            <InputField
              name="description"
              label="Description"
              required
              textarea
            />
            <InputField
              name="deadline"
              label="Deadline"
              type="datetime-local"
            />
            <Divider display="block" pt={6} />
            <Box w="full" pt={6}>
              <Heading as="h2" fontSize="md" fontWeight="medium" mb={4}>
                Answer Options
              </Heading>
              <FieldArray
                name="choices"
                render={({ push, remove }) => (
                  <VStack spacing={4} w="full">
                    {values.choices.map((choice, index) => (
                      <Flex key={index} w="full">
                        <InputField
                          name={`choices.${index}`}
                          placeholder="Choose an answer..."
                        />
                        <IconButton
                          ml={2}
                          type="button"
                          aria-label="delete choice"
                          onClick={() => {
                            if (values.choices.length > 2) {
                              remove(index);
                            } else {
                              alert("You must have at least two choices.");
                            }
                          }}
                          icon={<DeleteIcon boxSize={4} />}
                        />
                      </Flex>
                    ))}
                    <Button
                      w="full"
                      type="button"
                      onClick={() => push("")}
                      leftIcon={<AddIcon boxSize={4} />}
                    >
                      Another One
                    </Button>
                  </VStack>
                )}
              />
            </Box>
            <Button
              type="submit"
              isLoading={isSubmitting}
              w="full"
              colorScheme="teal"
            >
              Create Poll
            </Button>
          </VStack>
        )}
      </Formik>
      <Footer />
    </Box>
  );
};

export default NewPollPage;
