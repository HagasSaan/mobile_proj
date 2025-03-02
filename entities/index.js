import Ball from "../components/Ball";
import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Constants from "../Constants";
import Hole from "../components/Hole";
import Pointer from "../components/Pointer";

const screenHeight = Constants.SCREEN_HEIGHT;
const screenWidth = Constants.SCREEN_WIDTH;
const borderSize = 10;
const ballRadius = 15;
const ballDistance = ballRadius * 3;
const marginWidth = 60;
const marginHeight = 38;
const tableOffsetX = 22;
const borderThickness = borderSize + 24;
const rightHoleOffsetX = 23;
const leftHoleOffsetX = -29;
const holeVerticalOffsetTop = 63;
const holeVerticalOffsetMiddle = 10;
const holeVerticalOffsetBottom = 90;

export default (world) => {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F1C40F",
    "#8E44AD", "#E74C3C", "#2ECC71", "#1ABC9C",
    "#D35400", "#C0392B", "#3498DB", "#9B59B6"
  ];

  function getBalls(linesCount) {
    var result = {};

    let centerX = screenWidth / 2;
    let centerY = screenHeight / 2 - 92;

    var ballIndex = 0;
    for (let rowIdx = 1; rowIdx < linesCount + 1; rowIdx++) {
      for (var colIdx = 0; colIdx < rowIdx; colIdx++) {
        result[`ball_${rowIdx}_${colIdx}`] = Ball(
          world,
          colors[ballIndex],
          {
            x: centerX - ballDistance / 2 + (rowIdx / 2 - colIdx) * ballDistance,
            y: centerY - ballDistance / 2 - ballDistance * rowIdx,
          },
          ballRadius,
          `Ball_${rowIdx}_${colIdx}`,
          `${ballIndex + 1}`,
        );
        ballIndex += 1;
      }
    }
    return result;
  }

  function getHoles() {
    let holeOffsetY = 15;
    let holeRadius = ballRadius * 1.45;

    let holesCoordinates = [
      { label: "leftTopHole", x: marginWidth + leftHoleOffsetX, y: marginHeight - holeOffsetY + holeVerticalOffsetTop },
      { label: "rightTopHole", x: screenWidth - marginWidth + rightHoleOffsetX, y: marginHeight - holeOffsetY + holeVerticalOffsetTop },
      { label: "leftMiddleHole", x: marginWidth + leftHoleOffsetX, y: screenHeight / 2 - holeVerticalOffsetMiddle },
      { label: "rightMiddleHole", x: screenWidth - marginWidth + rightHoleOffsetX, y: screenHeight / 2 - holeVerticalOffsetMiddle },
      { label: "leftBottomHole", x: marginWidth + leftHoleOffsetX, y: screenHeight - marginHeight + holeOffsetY - holeVerticalOffsetBottom },
      { label: "rightBottomHole", x: screenWidth - marginWidth + rightHoleOffsetX, y: screenHeight - marginHeight + holeOffsetY - holeVerticalOffsetBottom },
    ];

    var result = {};
    for (const coord of holesCoordinates) {
      result[coord.label] = Hole(
        world,
        Constants.HOLES_COLOR,
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
      "white",
      { x: screenWidth / 2, y: screenHeight / 2 + 200 },
      ballRadius,
      "Ball",
      "",
      false,
    ),

    pointer: Pointer(),

    ...getBalls(4),
    ...getHoles(),

    bottomBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: screenWidth / 2 - 100, y: screenHeight - 90},
      { height: borderThickness + 12, width: screenWidth + 200 },
      Constants.BOUNDARY_LABEL
    ),

    topBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: screenWidth / 2 - 100, y: 67 },
      { height: borderThickness + 12, width: screenWidth + 200 },
      Constants.BOUNDARY_LABEL
    ),

    leftBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: marginWidth / 2 - 15, y: screenHeight / 2 },
      { height: screenHeight - marginHeight * 1.02, width: borderSize + 26 },
      Constants.BOUNDARY_LABEL
    ),

    rightBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: screenWidth - marginWidth / 2 + 15, y: screenHeight / 2 },
      { height: screenHeight - marginHeight * 1.02, width: borderSize + 26 },
      Constants.BOUNDARY_LABEL
    ),
  };
};
