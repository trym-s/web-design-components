import { useEffect, useState } from "react";
import { BY_ID } from "./registry";
import { Grid } from "./Grid";
import { Detail } from "./Detail";

function useHash() {
  const [hash, setHash] = useState(() => location.hash);
  useEffect(() => {
    const on = () => setHash(location.hash);
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return hash;
}

export function App() {
  const hash = useHash();
  const match = hash.match(/^#\/c\/(.+)$/);
  const entry = match ? BY_ID.get(decodeURIComponent(match[1])) : undefined;
  return entry ? <Detail entry={entry} /> : <Grid />;
}
