import { ReactElement, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { Stack, Text } from "@mantine/core";
import type { NextPageWithLayout } from "../types";
import type { messageT } from "../types";
import Default from "../layout/default";
import Chat from "../components/Chat";
import { useGetChatByIdQuery, useGetUserQuery } from "../store/api";

const Home: NextPageWithLayout = () => {
  const socket = useRef<Socket>(null!);
  const router = useRouter();

  const [messages, setMessages] = useState<messageT[]>([]);
  const { data: user } = useGetUserQuery();
  const {
    data: chat,
    isLoading,
    refetch: refetchChat,
  } = useGetChatByIdQuery(+(router.query.chat as string), {
    skip: router.query.chat === undefined,
  });

  useEffect(() => {
    if (user) {
      socket.current = io("ws://localhost:3000", {
        auth: {
          email: user.email,
          name: user.name,
        },
      });
      socket.current.on("newMessage", (data: messageT) => {
        setMessages((prev) => [...prev, data]);
      });
    }
  }, [user]);

  const sendMessage = (message: string) => {
    const data = {
      text: message,
      sender: user!.email,
      receiver: chat!.users.find((u) => u.email !== user!.email)?.email,
    };

    socket.current.emit("newMessage", data);
  };

  return (
    <>
      <Head>
        <title>MessengerNext</title>
      </Head>

      {router.query.chat ? (
        <Chat messages={messages} onSend={sendMessage} />
      ) : (
        <Stack
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text size="md">Select or create chat</Text>
        </Stack>
      )}
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>;
};

export default Home;
