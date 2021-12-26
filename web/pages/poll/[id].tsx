import {
  Text,
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState } from "react";
import useSWR from "swr";
import { API_URL } from "../../constants";

const PollPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data } = useSWR(`/polls/${id}`, (url) =>
    axios.get(API_URL + url).then((res) => res.data)
  );
  const [value, setValue] = useState(data?.choices[0].value);

  return (
    <Box maxW="xl" mx="auto" py={24}>
      <Heading as="h1">{data?.title}</Heading>
      <Text mt={4}>
        Created{" "}
        {data
          ? formatDistanceToNow(new Date(data?.createdAt), { addSuffix: true })
          : null}{" "}
        · {data?.description}
      </Text>
      <Divider mt={8} />
      <RadioGroup colorScheme="teal" onChange={setValue} value={value} my={8}>
        <Stack direction="column">
          {data?.choices.map(({ value, id }: any) => (
            <Radio value={value} key={id}>
              {value}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Button colorScheme="teal">Cast Vote</Button>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  return { props: { id } };
};

export default PollPage;
