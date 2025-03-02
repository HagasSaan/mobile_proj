import { Line, Svg } from "react-native-svg";


function PointerRenderer(props) {
  const start = props.start;
  const end = props.end;
  if (!start || !end) {
    return null;
  }

  return (
    <Svg>
      <Line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="red"
        strokeWidth="2"
      />
    </Svg>
  );
};

export default () => {
  return {
    start: null,
    end: null,
    renderer: <PointerRenderer />,
  };
};
