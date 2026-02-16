
function CompareHeader() {
  return (
    <div style={{ marginBottom: "32px", marginTop: "24px" }}>
      <h1
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(1rem, 3vw, 1.8rem)",
          color: "var(--arcade-h)",
          textShadow: "3px 3px 0px var(--arcade-h-shadow), 6px 6px 0px #000",
          letterSpacing: "0.1em",
          margin: "0 0 12px",
        }}
      >
        ⚔ COMPARE GAMES
      </h1>
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.4rem",
          color: "var(--arcade-muted)",
          letterSpacing: "0.06em",
          margin: 0,
        }}
      >
        SELECT{" "}
        <span style={{ color: "var(--arcade-accent)" }}>2–3 GAMES</span>
        {" "}TO COMPARE SIDE-BY-SIDE
      </p>
    </div>
  );
}

export default CompareHeader;
