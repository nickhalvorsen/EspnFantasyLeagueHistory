import { useStore } from "./useData";

const Footer = () => {
  const date = useStore((s) => s.lastSuccessfulLoad);
  return (
    <footer className="opacity-40 text-sm">
      Data loaded on:&nbsp;
      {date?.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })}
    </footer>
  );
};

export { Footer };
