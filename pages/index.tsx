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
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { messageT } from "../types";
import { useGetUserQuery } from "../store/api";
import Default from "../layout/default";
import type { NextPageWithLayout } from "../types";

const Home: NextPageWithLayout = () => {
  const socket = useRef<Socket>(null!);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageT[]>([]);
  const { data: user, error, isLoading } = useGetUserQuery();

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
    <Container
      sx={{
        height: "100%",
      }}
    >
      <Stack
        justify="flex-end"
        sx={{
          height: "100%",
        }}
      >
        <Stack
          px={15}
          sx={{
            height: "100%",
          }}
        >
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

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>;
};

export default Home;
