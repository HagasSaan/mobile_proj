import Ball from "../components/Ball";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Constants from "../Constants";
import Hole from "../components/Hole";
import Pointer from "../components/Pointer";

const screenHeight = Constants.SCREEN_HEIGHT;
const screenWidth = Constants.SCREEN_WIDTH;
const borderSize = 10;
const ballRadius = 15;
const ballDistance = ballRadius * 2.3;
const marginWidth = 60;
const marginHeight = 38;
const borderThickness = borderSize + 24;
const rightHoleOffsetX = 30;
const leftHoleOffsetX = -29;
const holeVerticalOffsetTop = 63;
const holeVerticalOffsetMiddle = 10;
const holeVerticalOffsetBottom = 90;

export default (world, level, holesSizeModifier) => {
  function getBalls() {
    let result = {};
    let centerX = screenWidth / 2;
    let centerY = screenHeight * 0.3;

    let ballIndex = 0;
    const pyramid = [[0], [-0.5, 0.5], [-1, 0, 1], [-1.5, -0.5, 0.5, 1.5]];

    for (let row = 0; row < level; row++) {
      for (let i = 0; i < pyramid[row].length; i++) {
        const posX = centerX + pyramid[row][i] * ballDistance;
        const posY = centerY - row * ballDistance * 0.9;

        result[`ball_${ballIndex + 1}`] = Ball(
          world,
          ballIndex + 1,
          { x: posX, y: posY },
          ballRadius,
          `Ball_${ballIndex + 1}`,
        );

        ballIndex++;
      }
    }

    return result;
  }

  function getHoles() {
    let holeOffsetY = 15;
    let holeRadius = ballRadius * holesSizeModifier;

    let holesCoordinates = [
      {
        label: "leftTopHole",
        x: marginWidth + leftHoleOffsetX,
        y: marginHeight - holeOffsetY + holeVerticalOffsetTop,
      },
      {
        label: "rightTopHole",
        x: screenWidth - marginWidth + rightHoleOffsetX,
        y: marginHeight - holeOffsetY + holeVerticalOffsetTop,
      },
      {
        label: "leftMiddleHole",
        x: marginWidth + leftHoleOffsetX,
        y: screenHeight / 2 - holeVerticalOffsetMiddle,
      },
      {
        label: "rightMiddleHole",
        x: screenWidth - marginWidth + rightHoleOffsetX,
        y: screenHeight / 2 - holeVerticalOffsetMiddle,
      },
      {
        label: "leftBottomHole",
        x: marginWidth + leftHoleOffsetX,
        y: screenHeight - marginHeight + holeOffsetY - holeVerticalOffsetBottom,
      },
      {
        label: "rightBottomHole",
        x: screenWidth - marginWidth + rightHoleOffsetX,
        y: screenHeight - marginHeight + holeOffsetY - holeVerticalOffsetBottom,
      },
    ];

    var result = {};
    for (const coord of holesCoordinates) {
      result[coord.label] = Hole(
        world,
        Constants.HOLES_COLOR,
        { x: coord.x, y: coord.y },
        holeRadius,
        "Hole",
        true,
      );
    }
    return result;
  }

  return {
    point: Ball(
      world,
      0,
      { x: screenWidth / 2, y: screenHeight * 0.75 },
      ballRadius,
      "CueBall",
    ),

    pointer: Pointer(),

    ...getBalls(),
    ...getHoles(),

    bottomBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: screenWidth / 2 - 100, y: screenHeight - 90 },
      { height: borderThickness + 12, width: screenWidth + 200 },
      Constants.BOUNDARY_LABEL,
    ),

    topBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: screenWidth / 2 - 100, y: 67 },
      { height: borderThickness + 12, width: screenWidth + 200 },
      Constants.BOUNDARY_LABEL,
    ),

    leftBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: marginWidth / 2 - 15, y: screenHeight / 2 },
      { height: screenHeight - marginHeight * 1.02, width: borderSize + 26 },
      Constants.BOUNDARY_LABEL,
    ),

    rightBoundary: Boundary(
      world,
      Constants.BOUNDARY_COLOR,
      { x: screenWidth - marginWidth / 2 + 15, y: screenHeight / 2 },
      { height: screenHeight - marginHeight * 1.02, width: borderSize + 26 },
      Constants.BOUNDARY_LABEL,
    ),
  };
};
