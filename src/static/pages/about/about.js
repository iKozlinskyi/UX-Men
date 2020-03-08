import ParticleNetwork from  "../../shared/components/particle-network/particle-network";

let canvasDiv = document.getElementById("particle_canvas");
let options = {
  particleColor: "#006bff",
  background: "",
  interactive: true,
  speed: "medium",
  density: "high"
};

let particleCanvas = new ParticleNetwork(canvasDiv, options);

