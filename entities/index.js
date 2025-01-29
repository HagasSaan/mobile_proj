import Ball from "../components/Ball";
import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Constants from "../Constants";
import Hole from "../components/Hole";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const borderSize = 30;
const ballRadius = 20;
const ballDistance = ballRadius * 3;
var colors = [
  "#013421",
  "#e88d07",
  "#aeafb6",
  "#a56120",
  "#266b12",
  "#c80f0a",
  "#7f38ec",
  "#ce1661",
  "#555866",
  "#446f91",
];

export default (world) => {
  function getBalls() {
    var result = {};

    let centerX = (screenWidth - 10) / 2;
    let centerY = (screenHeight - 10) / 2 - 50;

    for (let rowIdx = 1; rowIdx < 5; rowIdx++) {
      for (var colIdx = 0; colIdx < rowIdx; colIdx++) {
        let colorIdx = Math.floor(Math.random() * colors.length);
        let color = colors[colorIdx];
        colors.splice(colorIdx, 1);

        result[`ball_${rowIdx}_${colIdx}`] = Ball(
          world,
          color,
          {
            x:
              centerX - ballDistance / 2 + (rowIdx / 2 - colIdx) * ballDistance,
            y: centerY - ballDistance / 2 - ballDistance * rowIdx,
          },
          ballRadius,
          `Ball_${rowIdx}_${colIdx}`,
        );
      }
    }
    return result;
  }

  function getHoles() {
    let holesCoordinates = [
      { label: "leftTopHole", x: ballRadius, y: ballRadius },
      { label: "rightTopHole", x: screenWidth - ballRadius, y: ballRadius },
      // { label: "middleTopHole", x: screenWidth / 2, y: ballRadius },
      // {
      //   label: "middleBottomHole",
      //   x: screenWidth / 2,
      //   y: screenHeight - ballRadius,
      // },
      { label: "leftMiddleHole", x: ballRadius, y: screenHeight / 2 },
      {
        label: "rightMiddleHole",
        x: screenWidth - ballRadius,
        y: screenHeight / 2,
      },
      { label: "leftBottomHole", x: ballRadius, y: screenHeight - ballRadius },
      {
        label: "rightBottomHole",
        x: screenWidth - ballRadius,
        y: screenHeight - ballRadius,
      },
    ];
    var result = {};
    for (const coord of holesCoordinates) {
      result[coord.label] = Hole(
        world,
        "black",
        { x: coord.x, y: coord.y },
        ballRadius,
        "Hole",
        true,
      );
    }
    return result;
  }

  return {
    point: Ball(
      world,
      "red",
      { x: (screenWidth - 10) / 2, y: (screenHeight - 10) / 2 + 200 },
      ballRadius,
      "Ball",
      false,
    ),
    ...getBalls(),
    ...getHoles(),
    bottomBoundary: Boundary(
      world,
      "yellow",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: borderSize, width: Constants.WINDOW_WIDTH },
      Constants.BOUNDARY_LABEL,
    ),

    topBoundary: Boundary(
      world,
      "green",
      { x: Constants.WINDOW_WIDTH / 2, y: 0 },
      { height: borderSize, width: Constants.WINDOW_WIDTH },
      Constants.BOUNDARY_LABEL,
    ),

    leftBoundary: Boundary(
      world,
      "red",
      { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: borderSize },
      Constants.BOUNDARY_LABEL,
    ),

    rightBoundary: Boundary(
      world,
      "red",
      { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: borderSize },
      Constants.BOUNDARY_LABEL,
    ),
  };
};
