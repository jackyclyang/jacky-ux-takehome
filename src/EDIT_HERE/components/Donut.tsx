import React from "react";
import _ from "lodash";
import styled, { keyframes } from "styled-components";

import { Event } from "../types";

type Props = {
  width: number;
  height: number;
  currentArc: number;
  currentRadius: number;
  parties: Event[];
  selectedEventId?: string;
};

const OUTER = 0.95;
const INNER = 0.25;

const meKeyFrames = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
`;

const Me = styled.div`
  position: absolute;
  width: 16px;
  border-radius: 50%;
  border: 4px solid #0092d6;
  background-color: rgba(0, 146, 214, 0.3);
  height: 16px;
  animation: ${meKeyFrames} 2s ease-in-out infinite;
`;

export default function Donut({
  width = 320,
  height = 320,
  currentArc = 0,
  currentRadius = 0,
  parties = [],
  selectedEventId,
}: Props) {
  const c = width / 2;
  const getPoint = ({ arc = 0, radius = 0 }) => {
    const normalizedR = c * (radius * (OUTER - INNER) + INNER);
    return {
      x: c + normalizedR * Math.cos(arc),
      y: c + normalizedR * Math.sin(arc),
    };
  };
  const pos = getPoint({ arc: currentArc, radius: currentRadius });

  return (
    <div style={{ width, height, position: "relative" }}>
      <svg width={width} height={height} style={{ position: "relative" }}>
        {_.range(5).map((i) => {
          const radius = INNER + ((OUTER - INNER) * (1 + i)) / 5;
          return (
            <circle
              cx={c}
              cy={c}
              r={c * radius}
              fill="none"
              stroke={(i + 1) % 5 === 0 ? "#000" : "#161616"}
            />
          );
        })}
        {_.range(24).map((i) => {
          const innerP = getPoint({ radius: 0, arc: (Math.PI * 30 * i) / 360 });
          const outerP = getPoint({ radius: 1, arc: (Math.PI * 30 * i) / 360 });
          return (
            <line
              x1={innerP.x}
              y1={innerP.y}
              x2={outerP.x}
              y2={outerP.y}
              stroke={i % 3 === 0 ? "#000" : "#161616"}
            />
          );
        })}

        {parties.map((p) => {
          const { x, y } = getPoint({ arc: p.arc, radius: p.radius });
          return (
            <circle
              cx={x}
              cy={y}
              strokeWidth={2}
              r={12}
              stroke={selectedEventId === p.id ? "#af7f4c" : "#000"}
            />
          );
        })}
      </svg>
      <div
        style={{
          width,
          height,
          position: "absolute",
          display: "grid",
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            width: width * INNER,
            height: height * INNER,
            borderRadius: "50%",
            backgroundColor: "#111",
            boxShadow: "inset 0px 0px 10px 4px rgba(0, 0, 0, 0.4)",
            alignSelf: "center",
            justifySelf: "center",
          }}
        />
        <Me style={{ left: pos.x - 8, top: pos.y - 8 }} />
      </div>
    </div>
  );
}
