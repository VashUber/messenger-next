import type { NextPage } from "next";
import { Button } from "@mantine/core";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

const Home: NextPage = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
  }, []);

  return (
    <div>
      <Button>ckick</Button>
    </div>
  );
};

export default Home;
