import {
  AppShell,
  Navbar,
  Button,
  Avatar,
  Stack,
  Modal,
  Text,
  Input,
} from "@mantine/core";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useGetUserQuery, userApi } from "../store/api/user";
import { useGetChatsQuery } from "../store/api/chat";
import { useDispatch } from "react-redux";

const Default = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: user, refetch: refetchUser } = useGetUserQuery();
  const { data: chats } = useGetChatsQuery(user?.email || "");

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignout = async () => {
    await axios.get("http://localhost:3000/api/signout");
    await router.push("/signin");
  };

  const avatarIcon = useMemo(() => {
    return user?.name.slice(0, 1) ?? "";
  }, [user]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const toggleModal = () => {
    setIsVisible((prev) => !prev);
    setEmail("");
  };
  const createChat = async () => {
    await axios.post("http://localhost:3000/api/chat", {
      email1: user?.email,
      email2: email,
    });
  };

  useEffect(() => {
    return () => {
      dispatch(userApi.util.resetApiState());
    };
  }, [dispatch]);

  return (
    <AppShell
      navbar={
        <Navbar p="xs" width={{ base: 300 }}>
          <Navbar.Section grow mt="md">
            <Button
              variant="light"
              color="gray"
              sx={{
                width: "100%",
              }}
              onClick={toggleModal}
            >
              Create chat
            </Button>

            {JSON.stringify(chats)}
          </Navbar.Section>
          <Navbar.Section>
            <Stack
              sx={{
                flexDirection: "row",
              }}
            >
              <Avatar color="blue" radius="xl">
                {avatarIcon}
              </Avatar>
              <Button
                variant="filled"
                sx={{
                  width: "100%",
                }}
                onClick={handleSignout}
              >
                Signout
              </Button>
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
      <Modal
        opened={isVisible}
        onClose={toggleModal}
        centered
        withCloseButton={false}
        size="xs"
      >
        <Stack>
          <Text size="md">Create chat with...</Text>
          <Input placeholder="Email" value={email} onChange={onChange} />
          <Button variant="filled" onClick={createChat}>
            Create
          </Button>
        </Stack>
      </Modal>
    </AppShell>
  );
};

export default Default;
