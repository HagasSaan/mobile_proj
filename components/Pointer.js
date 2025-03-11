import { Line, Svg } from "react-native-svg";

function PointerRenderer(props) {
  const start = props.start;
  const end = props.end;
  const pointPosition = props.pointPosition || { x: 0, y: 0 };

  if (!start || !end) {
    return null;
  }

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
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    pointPosition: { x: 0, y: 0 },
    renderer: <PointerRenderer />,
  };
};
