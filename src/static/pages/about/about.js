import {activeLink} from "../../shared/utils/active-link-style";
import { scrollTop } from "../../shared/components/scroll-top/scroll-top";
activeLink();
scrollTop();

import ParticleNetwork from  "../../shared/components/particle-network/particle-network";
window.onload = function() {
  const canvasDiv = document.getElementById("particle_canvas");
  const canvasDivT = document.getElementById("particle_canvas_teamwork");
  const options = {
    particleColor: "#006bff",
    background: "",
    interactive: false,
    speed: "medium",
    density: "high"
  };

  const optionsTeamWork = {
    particleColor: "#724cc7",
    background: "",
    interactive: true,
    speed: "medium",
    density: "medium"
  };
  
  new ParticleNetwork(canvasDiv, options);
  new ParticleNetwork(canvasDivT, optionsTeamWork);
};


