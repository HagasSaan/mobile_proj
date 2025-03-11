import Matter from "matter-js";
import { View, Image } from "react-native";
import React from "react";

export const HoleRendeder = (props) => {
  const radius = props.radius * 2;
  const xPos = props.body.position.x - radius / 2;
  const yPos = props.body.position.y - radius / 2;

  return (
    <View
      style={{
        width: radius,
        height: radius,
        left: xPos,
        top: yPos,
        borderRadius: radius,
        backgroundColor: props.color,
        position: "absolute",
      }}
    >
    </View>
  );
};

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
    radius: radius,
    renderer: <HoleRendeder />,
  };
};
