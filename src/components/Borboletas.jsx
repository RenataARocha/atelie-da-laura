export default function Borboletas() {
  return (
    <>
      {/* Topo Esquerda (Original) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "4%",
          left: "3%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.1,
          "--rotate": "-15deg",
          "--opacity": 0.28,
          "--animation-duration": "25s, 10s",
        }}
      />
      {/* Topo Direita (Original) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "6%",
          right: "10%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 1,
          "--scale": 1.4,
          "--rotate": "2deg",
          "--opacity": 0.3,
          "--animation-duration": "30s, 8s",
        }}
      />
      {/* Topo Centro-Esquerda (Nova - Pequena e Sutil) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 0.9,
          "--rotate": "30deg",
          "--opacity": 0.2,
          "--animation-duration": "22s, 7s",
        }}
      />
      {/* Meio Esquerda (Original) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "45%",
          left: "6%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 1,
          "--scale": 1.2,
          "--rotate": "-8deg",
          "--opacity": 0.22,
          "--animation-duration": "38s, 11s",
        }}
      />
      {/* Meio Direita (Original) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "42%",
          right: "6%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.3,
          "--rotate": "10deg",
          "--opacity": 0.24,
          "--animation-duration": "40s, 11s",
        }}
      />
      {/* Meio Superior (Nova - Maior e Centralizada) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)" /* Centraliza horizontalmente */,
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.6,
          "--rotate": "5deg",
          "--opacity": 0.35,
          "--animation-duration": "45s, 15s",
        }}
      />
      {/* Centro diagonal (Original - borboleta de destaque suave) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "58%",
          left: "48%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.5,
          "--rotate": "-5deg",
          "--opacity": 0.2,
          "--animation-duration": "42s, 13s",
        }}
      />
      {/* Centro Inferior-Esquerda (Nova) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "65%",
          left: "25%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.0,
          "--rotate": "20deg",
          "--opacity": 0.26,
          "--animation-duration": "32s, 10s",
        }}
      />
      {/* Centro Superior-Direita (Nova - Menor Opacidade) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          top: "30%",
          right: "20%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.1,
          "--rotate": "-25deg",
          "--opacity": 0.18,
          "--animation-duration": "28s, 9s",
        }}
      />
      {/* Fundo Esquerda (Original) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.25,
          "--rotate": "12deg",
          "--opacity": 0.32,
          "--animation-duration": "34s, 9s",
        }}
      />
      {/* Fundo Direita (Original) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          bottom: "12%",
          right: "8%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.2,
          "--rotate": "-10deg",
          "--opacity": 0.25,
          "--animation-duration": "35s, 9s",
        }}
      />
      {/* Fundo Centro-Direita (Nova - Mais próxima do chão) */}{" "}
      <div
        className="borboleta"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "30%",
          backgroundImage: "url('/borboleta.png')",
          pointerEvents: "none",
          zIndex: 0,
          "--scale": 1.45,
          "--rotate": "8deg",
          "--opacity": 0.28,
          "--animation-duration": "36s, 10s",
        }}
      />
      {" "}
    </>
  );
}
