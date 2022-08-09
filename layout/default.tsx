import {
  AppShell,
  Navbar,
  Button,
  Avatar,
  Stack,
  Modal,
  Text,
  Input,
  Loader,
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
  const { data: chats, isLoading } = useGetChatsQuery(user?.email || "");

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignout = async () => {
    await axios.get("http://localhost:3000/api/signout");
    await router.push("/signin");
  };

  const avatarIcon = useMemo(() => {
    return user?.name.slice(0, 1) ?? "";
  }, [user]);

  const chatMenu = useMemo(() => {
    return chats?.map((elem) => {
      return {
        id: elem.id,
        title: elem.users.filter((u) => u.name !== user?.name)[0].name,
      };
    });
  }, [chats, user]);

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
              sx={{
                width: "100%",
              }}
              onClick={toggleModal}
            >
              Create chat
            </Button>

            <Stack
              py={20}
              spacing={10}
              sx={{
                alignItems: "center",
              }}
            >
              {isLoading && <Loader variant="dots" />}

              {chatMenu?.map((elem) => {
                return (
                  <Link
                    key={elem.id}
                    href={{
                      pathname: "/",
                      query: { chat: elem.id },
                    }}
                  >
                    <Button
                      sx={{
                        width: "100%",
                        fontWeight: "normal",
                      }}
                      color="gray"
                      variant={
                        +(router.query?.chat as string) === elem.id
                          ? "filled"
                          : "light"
                      }
                    >
                      {elem.title}
                    </Button>
                  </Link>
                );
              })}
            </Stack>
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
