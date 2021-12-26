import { Box, Heading } from "@chakra-ui/react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const PollPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  return (
    <Box maxW="xl" mx="auto" py={24}>
      <Heading as="h1"></Heading>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  return { props: { id } };
};

export default PollPage;
