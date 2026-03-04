interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div
      style={{
        background: "rgba(124, 77, 255, 0.08)",
        border: "2px solid var(--arcade-shadow)",
        boxShadow: "3px 3px 0px #000",
        padding: "18px",
      }}
    >
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.55rem",
          color: "var(--arcade-accent)",
          marginBottom: "10px",
          letterSpacing: "0.05em",
        }}
      >
        {icon} {title}
      </div>
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          color: "var(--arcade-muted)",
          lineHeight: 2.2,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default FeatureCard;
