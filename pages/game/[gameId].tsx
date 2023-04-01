import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useUserId } from "@/hooks/useUserID";

const GamePage = () => {
  const router = useRouter();
  const { gameId } = router.query;
  const playerId = useUserId();
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const [wsReady, setWsReady] = useState<boolean>(false);
  // const [playerNumber, setPlayerNumber] = useState<number>(-1); // Player number (0 or 1)
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsUrl, {
    onOpen: () => {
      console.log("WebSocket opened");
      setWsReady(true);
    },
    onClose: () => {
      console.log("WebSocket closed");
      setWsReady(false);
    },
    onError: (event) => {
      console.error("WebSocket error:", event);
    },
    queryParams: {
      playerId: playerId ? playerId : "",
    },
  });

  useEffect(() => {
    if (gameId) {
      setWsUrl(`ws://localhost:4000/game/${gameId}`);
    }
  }, [gameId]);

  useEffect(() => {
    // Handle incoming messages from the websocket
    if (lastJsonMessage) {
      console.log("Received message:", lastJsonMessage);
      // TODO: Handle different types of messages from the server
    }
  }, [lastJsonMessage]);

  return (
    <div>
      <h1>Game {gameId}</h1>
      {wsReady ? <p>WebSocket ready</p> : <p>Connecting to WebSocket...</p>}
      {/* TODO: Render the game board */}
    </div>
  );
};

export default GamePage;
