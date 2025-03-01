import { View, Text } from "react-native";
import Matter from "matter-js";
import React, { useState } from "react";

export const BallRenderer = (props) => {
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
      <Text style={{
        textAlign: 'center'
      }}>{props.renderLabel}</Text>
    </View>
  );
};

export default (world, color, pos, radius, label, renderLabel) => {
  const ball = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: label,
    frictionAir: 0.01,
    friction: 0.01,
    inertia: Infinity,
    restitution: 1,
  });
  Matter.World.add(world, [ball]);
  return {
    body: ball,
    color: color,
    pos: pos,
    radius: radius,
    renderLabel: renderLabel,
    renderer: <BallRenderer />,
  };
};
