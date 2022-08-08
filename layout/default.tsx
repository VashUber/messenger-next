import { AppShell, Navbar, Button, Avatar, Stack } from "@mantine/core";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useGetUserQuery } from "../store/api";

const Default = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { data: user, isLoading, refetch } = useGetUserQuery();

  const handleSignout = async () => {
    await axios.get("http://localhost:3000/api/signout");
    await router.push("/signin");
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <AppShell
      navbar={
        <Navbar p="xs" width={{ base: 300 }}>
          <Navbar.Section grow mt="md">
            <Link href="/signin" passHref>
              <Button
                variant="light"
                color="gray"
                sx={{
                  width: "100%",
                }}
              >
                Some chat
              </Button>
            </Link>
          </Navbar.Section>
          <Navbar.Section>
            <Stack
              sx={{
                flexDirection: "row",
              }}
            >
              <Avatar color="blue" radius="xl">
                {user && user.name.slice(0, 1)}
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
    </AppShell>
  );
};

export default Default;
