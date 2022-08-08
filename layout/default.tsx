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
import { useGetUserQuery } from "../store/api";

const Default = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { data: user, isLoading, refetch } = useGetUserQuery();
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

  useEffect(() => {
    refetch();
  }, [refetch]);

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
          <Button variant="filled">Create</Button>
        </Stack>
      </Modal>
    </AppShell>
  );
};

export default Default;
