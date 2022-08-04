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
import { NextPage } from "next";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email && password && name) {
      await axios.post("http://localhost:3000/api/signup", {
        email,
        password,
        name,
      });

      router.push("/signin");
    }
  };

  return (
    <Center
      sx={{
        height: "100vh",
      }}
    >
      <Stack align="center">
        <Text size="lg">Signup</Text>
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
            <Input
              placeholder="Name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
            <Button type="submit">Signup</Button>
          </Paper>
        </form>
        <Text>
          Already registered?{" "}
          <Link href="/signin" passHref>
            <Anchor component="a">Signin</Anchor>
          </Link>
        </Text>
      </Stack>
    </Center>
  );
};

export default Signup;
