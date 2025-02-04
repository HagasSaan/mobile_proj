import Constants from "expo-constants";
import { Dimensions } from "react-native";

const ScreenConstants = {
  SCREEN_WIDTH: Dimensions.get("screen").width,
  SCREEN_HEIGHT: Dimensions.get("screen").height + Constants.statusBarHeight,
  WINDOW_WIDTH: Dimensions.get("window").width,
  WINDOW_HEIGHT: Dimensions.get("window").height + Constants.statusBarHeight,
  BAR_HEIGHT: Constants.statusBarHeight,
  BOUNDARY_LABEL: "Boundary",
};

export default ScreenConstants;
