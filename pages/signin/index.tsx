import {
  Center,
  Input,
  Stack,
  Paper,
  Button,
  Text,
  Anchor,
  PasswordInput,
} from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useState } from "react";

const Signin: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email && password) {
      const { data } = await axios.post<{ token: string }>(
        "http://localhost:3000/api/signin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>MessengerNext - signin</title>
      </Head>
      <Center
        sx={{
          height: "100vh",
        }}
      >
        <Stack align="center">
          <Text size="lg">Signin</Text>
          <form onSubmit={handleSubmit}>
            <Paper
              component={Stack}
              spacing={10}
              withBorder
              p={10}
              radius="md"
              sx={{
                display: "flex",
              }}
            >
              <Input
                placeholder="Email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              <Button type="submit">Signin</Button>
            </Paper>
          </form>
          <Text>
            Not registered yet?{" "}
            <Link href="/signup" passHref>
              <Anchor component="a">Signup</Anchor>
            </Link>
          </Text>
        </Stack>
      </Center>
    </>
  );
};

export default Signin;
