import { AppShell, Navbar, Button } from "@mantine/core";
import Link from "next/link";
import type { ReactNode } from "react";

const Default = ({ children }: { children: ReactNode }) => {
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
            <Button
              variant="filled"
              sx={{
                width: "100%",
              }}
            >
              Signout
            </Button>
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default Default;
