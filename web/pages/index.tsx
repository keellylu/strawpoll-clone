import { Box, Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { Navbar } from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <Box maxW="xl" mx="auto">
      <Navbar />
      <Box py={24}>
        <Heading as="h1">StrawPoll Clone</Heading>
        <Link href="/new-poll" passHref>
          <Button colorScheme="teal" mt={6} as="a">
            Create Poll
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
