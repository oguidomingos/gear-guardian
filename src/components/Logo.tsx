import logo from "@/assets/logo.png";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="FV — Inventário Audiovisual"
      className={className + " rounded-sm"}
      loading="eager"
    />
  );
}
