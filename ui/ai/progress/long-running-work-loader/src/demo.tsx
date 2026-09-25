import { useEffect, useState } from "react";
import { WorkLoader } from "./work-loader";

/* A simulated elapsed clock ticking every 100 ms. */
export default function Demo() {
  const [tenths, setTenths] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTenths((d) => d + 1), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-start gap-6">
      <WorkLoader variant="drive" elapsed={tenths / 10} />
      <WorkLoader variant="dots" label="Thinking" elapsed={tenths / 10} />
      <WorkLoader variant="orbit" label="Indexing files" elapsed={tenths / 10 + 62} />
    </div>
  );
}
