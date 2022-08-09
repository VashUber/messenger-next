import { io, Socket } from "socket.io-client";
import { ReactElement, useEffect, useRef, useState } from "react";
import { messageT } from "../types";
import Default from "../layout/default";
import type { NextPageWithLayout } from "../types";
import Chat from "../components/Chat";
import Head from "next/head";

const Home: NextPageWithLayout = () => {
  const socket = useRef<Socket>(null!);

  const [messages, setMessages] = useState<messageT[]>([]);

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("newMessage", (data: messageT) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = (message: string) => {
    socket.current.emit("newMessage", {
      text: message,
    });
  };

  return (
    <>
      <Head>
        <title>MessengerNext</title>
      </Head>

      <Chat messages={messages} onSend={sendMessage} />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>;
};

export default Home;
