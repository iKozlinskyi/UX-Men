import ParticleNetwork from  "../../shared/components/particle-network/particle-network";
window.onload = function() {
  let canvasDiv = document.getElementById("particle_canvas");
  let canvasDivT = document.getElementById("particle_canvas_teamwork");
  let options = {
    particleColor: "#006bff",
    background: "",
    interactive: true,
    speed: "medium",
    density: "high"
  };

  let optionsTeamWork = {
    particleColor: "#724cc7",
    background: "",
    interactive: true,
    speed: "medium",
    density: 10000
  };
  
  new ParticleNetwork(canvasDiv, options);
  new ParticleNetwork(canvasDivT, optionsTeamWork);
}


