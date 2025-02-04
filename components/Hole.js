import Matter from "matter-js";
import React, { useState } from "react";
import { BallRenderer } from "./Ball";

export default (world, color, pos, radius, label) => {
  const hole = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: label,
    frictionAir: 0.005,
    friction: 0.005,
    inertia: Infinity,
    restitution: 1,
    isStatic: true,
  });
  Matter.World.add(world, [hole]);
  return {
    body: hole,
    color: color,
    pos: pos,
    radius: radius * 1.5,
    renderer: <BallRenderer />,
  };
};
