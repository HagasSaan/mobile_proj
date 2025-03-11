import { Line, Svg } from "react-native-svg";

function PointerRenderer(props) {
  const start = props.start;
  const end = props.end;
  if (!start || !end) {
    return null;
  }

  const pointPosition = props.pointPosition || { x: 0, y: 0 };

  return (
    <Svg>
      <Line
        x1={pointPosition.x}
        y1={pointPosition.y}
        x2={pointPosition.x - (start.x - end.x)}
        y2={pointPosition.y - (start.y - end.y)}
        stroke="brown"
        strokeWidth="4"
      />
    </Svg>
  );
}

export default () => {
  return {
    renderer: <PointerRenderer />,
  };
};
