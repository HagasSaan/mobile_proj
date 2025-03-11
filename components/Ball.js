import React from "react";
import { View, Image } from "react-native";
import Matter from "matter-js";

const ballImages = {
  0: require("../assets/cue_ball.png"),
  1: require("../assets/ball_1.png"),
  2: require("../assets/ball_2.png"),
  3: require("../assets/ball_3.png"),
  4: require("../assets/ball_4.png"),
  5: require("../assets/ball_5.png"),
  6: require("../assets/ball_6.png"),
  7: require("../assets/ball_7.png"),
  8: require("../assets/ball_8.png"),
  9: require("../assets/ball_9.png"),
  10: require("../assets/ball_10.png"),
};

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
        position: "absolute",
      }}
    >
      <Image
        source={ballImages[props.number]}
        style={{
          width: radius,
          height: radius,
          borderRadius: radius / 2,
        }}
      />
    </View>
  );
};

export default (world, number, pos, radius, label) => {
  const ball = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: label,
    frictionAir: 0.01,
    friction: 0.001,
    frictionStatic: 0,
    inertia: Infinity,
    restitution: 1,
  });

  Matter.World.add(world, [ball]);

  return {
    body: ball,
    number: number,
    pos: pos,
    radius: radius,
    renderer: <BallRenderer />,
  };
};
