import type { NextPage } from "next";
import {
  Button,
  Stack,
  Paper,
  Text,
  Textarea,
  Container,
  Box,
} from "@mantine/core";
import { io, Socket } from "socket.io-client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { messageT } from "../types";
import useUser from "../hooks/useUser";

const Home: NextPage = () => {
  const socket = useRef<Socket>(null!);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageT[]>([]);
  const { user } = useUser();

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("newMessage", (data: messageT) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.current.emit("newMessage", {
      text: message,
    });
    setMessage("");
  };

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Container>
      <Stack
        justify="flex-end"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Stack px={15}>
          {messages.map((message) => {
            return (
              <Paper
                key={message.id}
                shadow="xs"
                radius="lg"
                px="lg"
                py="xs"
                withBorder
                sx={{
                  maxWidth: "250px",
                  width: "min-content",
                }}
              >
                <Text>{message.text}</Text>
              </Paper>
            );
          })}
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <Textarea
            placeholder="Message..."
            value={message}
            onChange={onInput}
            sx={{
              flexGrow: 1,
            }}
            autosize
            minRows={2}
            maxRows={4}
          />
          <Button onClick={sendMessage}>send</Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
