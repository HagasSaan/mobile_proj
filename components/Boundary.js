import Matter from "matter-js";
import React from "react";
import { Dimensions, View } from "react-native";

const BoundaryRenderer = (props) => {
  const width = props.size.width;
  const height = props.size.height;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        backgroundColor: props.color,
      }}
    />
  );
};

export default (world, color, pos, size, label) => {
  const boundary = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: label,
      isStatic: true,
      inertia: Infinity,
      restitution: 1,
    },
  );
  Matter.World.add(world, [boundary]);
  return {
    body: boundary,
    color: color,
    pos: pos,
    size: size,
    renderer: <BoundaryRenderer />,
  };
};
