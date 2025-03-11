import Constants from "expo-constants";
import { Dimensions } from "react-native";

const ScreenConstants = {
  SCREEN_WIDTH: Dimensions.get("screen").width,
  SCREEN_HEIGHT: Dimensions.get("screen").height,
  WINDOW_WIDTH: Dimensions.get("window").width,
  WINDOW_HEIGHT: Dimensions.get("window").height,
  BOUNDARY_LABEL: "Boundary",
  BOUNDARY_COLOR: "transparent", // change to any color, for example, "red" to see rendered borders
  HOLES_COLOR: "transparent", // change to any color, for example, "blue" to see rendered holes
};

export default ScreenConstants;
