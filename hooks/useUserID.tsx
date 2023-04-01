import {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";

const MyContext = createContext<string | null>(null);

export const UserIDProvider = (props: PropsWithChildren) => {
  const url = "http://127.0.0.1:4000/playerId";
  const key = "playerId";

  const [userId, setUserId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? item : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && !userId) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const id = data.playerId as string;
          if (id) {
            setUserId(id);
            window.localStorage.setItem(key, id);
          }
        });
    }
  }, [key, url, userId]);

  return (
    <MyContext.Provider value={userId}>{props.children}</MyContext.Provider>
  );
};

export const useUserId = () => {
  return useContext(MyContext);
};
