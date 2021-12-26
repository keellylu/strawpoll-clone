import { Box, Button, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Box maxW="3xl" mx="auto" py={24}>
      <Heading as="h1">StrawPoll Clone</Heading>
      <Link href="/new-poll" passHref>
        <Button colorScheme="teal" mt={4} as="a">
          Create Poll
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
