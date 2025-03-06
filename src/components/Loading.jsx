import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen({ text }) {
  return (
    <div
      className="flex flex-col gap-5 justify-center items-center h-dvh"
    >
      <CircularProgress style={{ color: "#3C82F6" }} size={60} />
      <p style={{ fontSize: "1.5rem", color: "grey" }}>
        {text}
      </p>
    </div>
  );
}
