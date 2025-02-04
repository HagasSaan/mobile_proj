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

export default (world) => {
  function getBalls(linesCount) {
    var result = {};

    let centerX = (screenWidth - 10) / 2;
    let centerY = (screenHeight - 10) / 2 - 50;

    for (let rowIdx = 1; rowIdx < linesCount + 1; rowIdx++) {
      for (var colIdx = 0; colIdx < rowIdx; colIdx++) {
        result[`ball_${rowIdx}_${colIdx}`] = Ball(
          world,
          "gray",
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
      {
        label: "leftTopHole",
        x: ballRadius,
        y: ballRadius + Constants.BAR_HEIGHT / 2,
      },
      {
        label: "rightTopHole",
        x: screenWidth - ballRadius,
        y: ballRadius + Constants.BAR_HEIGHT / 2,
      },
      // { label: "middleTopHole", x: screenWidth / 2, y: ballRadius },
      // {
      //   label: "middleBottomHole",
      //   x: screenWidth / 2,
      //   y: screenHeight - ballRadius,
      // },
      {
        label: "leftMiddleHole",
        x: ballRadius,
        y: screenHeight / 2 + Constants.BAR_HEIGHT / 2,
      },
      {
        label: "rightMiddleHole",
        x: screenWidth - ballRadius,
        y: screenHeight / 2 + Constants.BAR_HEIGHT / 2,
      },
      {
        label: "leftBottomHole",
        x: ballRadius,
        y: screenHeight - ballRadius + Constants.BAR_HEIGHT,
      },
      {
        label: "rightBottomHole",
        x: screenWidth - ballRadius,
        y: screenHeight - ballRadius + Constants.BAR_HEIGHT,
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
    ...getBalls(4),
    ...getHoles(),
    bottomBoundary: Boundary(
      world,
      "brown",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: borderSize, width: Constants.WINDOW_WIDTH },
      Constants.BOUNDARY_LABEL,
    ),

    topBoundary: Boundary(
      world,
      "brown",
      { x: Constants.WINDOW_WIDTH / 2, y: 0 },
      {
        height: borderSize + Constants.BAR_HEIGHT,
        width: Constants.WINDOW_WIDTH,
      },
      Constants.BOUNDARY_LABEL,
    ),

    leftBoundary: Boundary(
      world,
      "brown",
      { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: borderSize },
      Constants.BOUNDARY_LABEL,
    ),

    rightBoundary: Boundary(
      world,
      "brown",
      { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: borderSize },
      Constants.BOUNDARY_LABEL,
    ),
  };
};
