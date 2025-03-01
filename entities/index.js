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
const marginWidth = 60;
const marginHeight = 38;
const tableOffsetY = 70;
const tableOffsetX = 22;
const borderThickness = borderSize + 24;
const rightHoleOffsetX = 60;
const leftHoleOffsetX = -35;
const holeVerticalOffsetTop = 52;
const holeVerticalOffsetBottom = 64;

export default (world) => {
  function getBalls(linesCount) {
    var result = {};

    let centerX = screenWidth / 2 + tableOffsetX / 1.5;
    let centerY = screenHeight / 2 - 92;

    for (let rowIdx = 1; rowIdx < linesCount + 1; rowIdx++) {
      for (var colIdx = 0; colIdx < rowIdx; colIdx++) {
        result[`ball_${rowIdx}_${colIdx}`] = Ball(
          world,
          "gray",
          {
            x: centerX - ballDistance / 2 + (rowIdx / 2 - colIdx) * ballDistance,
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
    let holeOffsetY = 15;
    let holeRadius = ballRadius * 1.35;

    let holesCoordinates = [
      { label: "leftTopHole", x: marginWidth + leftHoleOffsetX, y: marginHeight - holeOffsetY + holeVerticalOffsetTop },
      { label: "rightTopHole", x: screenWidth - marginWidth + rightHoleOffsetX, y: marginHeight - holeOffsetY + holeVerticalOffsetTop },
      { label: "leftMiddleHole", x: marginWidth + leftHoleOffsetX, y: screenHeight / 2 },
      { label: "rightMiddleHole", x: screenWidth - marginWidth + rightHoleOffsetX, y: screenHeight / 2 },
      { label: "leftBottomHole", x: marginWidth + leftHoleOffsetX, y: screenHeight - marginHeight + holeOffsetY - holeVerticalOffsetBottom },
      { label: "rightBottomHole", x: screenWidth - marginWidth + rightHoleOffsetX, y: screenHeight - marginHeight + holeOffsetY - holeVerticalOffsetBottom },
    ];

    var result = {};
    for (const coord of holesCoordinates) {
      result[coord.label] = Hole(
        world,
        "transparent",
        { x: coord.x, y: coord.y },
        holeRadius,
        "Hole",
        true
      );
    }
    return result;
  }

  return {
    point: Ball(
      world,
      "red",
      { x: screenWidth / 2 + tableOffsetX / 1.5, y: screenHeight / 2 + 200 },
      ballRadius,
      "Ball",
      false,
    ),
    ...getBalls(4),
    ...getHoles(),

    bottomBoundary: Boundary(
      world,
      "transparent",
      { x: screenWidth / 2 + tableOffsetX, y: screenHeight - marginHeight / 2 - tableOffsetY + 28 },
      { height: borderThickness + 12, width: screenWidth - marginWidth * 1.55 },
      Constants.BOUNDARY_LABEL
    ),

    topBoundary: Boundary(
      world,
      "transparent",
      { x: screenWidth / 2 + tableOffsetX, y: marginHeight / 2 + tableOffsetY - 2 },
      { height: borderThickness + 12, width: screenWidth - marginWidth * 1.55 },
      Constants.BOUNDARY_LABEL
    ),

    leftBoundary: Boundary(
      world,
      "transparent",
      { x: marginWidth / 2 - 18, y: screenHeight / 2 },
      { height: screenHeight - marginHeight * 1.02, width: borderSize + 26 },
      Constants.BOUNDARY_LABEL
    ),

    rightBoundary: Boundary(
      world,
      "transparent",
      { x: screenWidth - marginWidth / 2 + 32, y: screenHeight / 2 },
      { height: screenHeight - marginHeight * 1.02, width: borderSize + 26 },
      Constants.BOUNDARY_LABEL
    ),
  };
};

