import Ball from "../components/Ball";
import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Constants from "../Constants";
import Hole from "../components/Hole";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const borderSize = 10;
const ballRadius = 15;
const ballDistance = ballRadius * 3;
const marginWidth = 50;
const marginHeight = 100;

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
        x: ballRadius + marginWidth,
        y: ballRadius  + marginHeight + 40, //+ Constants.BAR_HEIGHT / 2
      },
      {
        label: "rightTopHole",
        x: screenWidth - ballRadius - marginWidth,
        y: ballRadius  + marginHeight + 40, //+ Constants.BAR_HEIGHT / 2
      },
      // { label: "middleTopHole", x: screenWidth / 2, y: ballRadius },
      // {
      //   label: "middleBottomHole",
      //   x: screenWidth / 2,
      //   y: screenHeight - ballRadius,
      // },
      {
        label: "leftMiddleHole",
        x: ballRadius + marginWidth,
        y: screenHeight / 2,// + Constants.BAR_HEIGHT / 2
      },
      {
        label: "rightMiddleHole",
        x: screenWidth - ballRadius - marginWidth,
        y: screenHeight / 2,  //+ Constants.BAR_HEIGHT / 2
      },
      {
        label: "leftBottomHole",
        x: ballRadius + marginWidth,
        y: screenHeight - ballRadius - marginHeight - 10, //+ Constants.BAR_HEIGHT
      },
      {
        label: "rightBottomHole",
        x: screenWidth - ballRadius - marginWidth,
        y: screenHeight - ballRadius  - marginHeight - 10, //+ Constants.BAR_HEIGHT
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
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - marginHeight - 35},
      { height: borderSize, width: Constants.WINDOW_WIDTH - marginWidth * 2 },
      Constants.BOUNDARY_LABEL,
    ),

    topBoundary: Boundary(
      world,
      "brown",
      { x: Constants.WINDOW_WIDTH / 2, y: marginHeight + 35},
      {
        height: borderSize, // + Constants.BAR_HEIGHT
        width: Constants.WINDOW_WIDTH - marginWidth * 2,
      },
      Constants.BOUNDARY_LABEL,
    ),

    leftBoundary: Boundary(
      world,
      "brown",
      { x: marginWidth, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT - marginHeight * 2 - 70 , width: borderSize },
      Constants.BOUNDARY_LABEL,
    ),

    rightBoundary: Boundary(
      world,
      "brown",
      { x: Constants.WINDOW_WIDTH - marginWidth, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT - marginHeight * 2 - 70, width: borderSize },
      Constants.BOUNDARY_LABEL,
    ),
  };
};
