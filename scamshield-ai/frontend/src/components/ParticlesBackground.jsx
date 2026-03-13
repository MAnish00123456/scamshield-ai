import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: -1
    },

    background: {
      color: "#020617"
    },

    fpsLimit: 60,

    particles: {
      number: {
        value: 80,
        density: {
          enable: true
        }
      },

      color: {
        value: "#22c1ff"
      },

      shape: {
        type: "circle"
      },

      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 0.8
        }
      },

      size: {
        value: { min: 1.5, max: 4 },
        animation: {
          enable: true,
          speed: 1.5
        }
      },

      links: {
        enable: true,
        distance: 140,
        color: "#22c1ff",
        opacity: 0.15,
        width: 1
      },

      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        outModes: {
          default: "out"
        }
      }
    },

    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "repulse"]
        }
      },

      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.5
          }
        },

        repulse: {
          distance: 100,
          duration: 0.4
        }
      }
    },

    detectRetina: true
  }), []);

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
}