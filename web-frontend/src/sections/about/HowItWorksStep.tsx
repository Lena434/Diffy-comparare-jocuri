interface HowItWorksStepProps {
  num: string;
  title: string;
  desc: string;
}

function HowItWorksStep({ num, title, desc }: HowItWorksStepProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
      }}
    >
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.7rem",
          color: "var(--arcade-accent)",
          textShadow: "2px 2px 0px var(--arcade-accent-dark)",
          minWidth: "36px",
          lineHeight: 1,
          paddingTop: "2px",
        }}
      >
        {num}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.5rem",
            color: "var(--arcade-h)",
            marginBottom: "8px",
            letterSpacing: "0.05em",
          }}
        >
          {title}
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
    </div>
  );
}

export default HowItWorksStep;
