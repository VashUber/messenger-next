import type { NextPage } from "next";
import { Button, TextInput, Stack } from "@mantine/core";
import { io, Socket } from "socket.io-client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type message = {
  text: string;
};

const Home: NextPage = () => {
  const socket = useRef<Socket>(null!);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<message[]>([]);

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("newMessage", (data: message) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.current.emit("newMessage", {
      text: message,
    });
    setMessage("");
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <Stack
        dir="row"
        justify="flex-end"
        sx={{
          minHeight: "100vh",
        }}
      >
        {JSON.stringify(messages)}

        <TextInput
          placeholder="Message..."
          value={message}
          onChange={onInput}
        />
        <Button onClick={sendMessage}>send</Button>
      </Stack>
    </div>
  );
};

export default Home;
