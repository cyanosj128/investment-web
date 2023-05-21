import { Line, LineConfig } from '@ant-design/charts';

interface Props {
  xField: string;
  yField: string;
  data: Record<string, any>[];
}

const defaultConfig: Omit<LineConfig, 'data'> = {
  padding: 'auto',
  xAxis: {
    tickCount: 5,
  },
  slider: {
    start: 0.0,
    end: 1,
  },
};

function LineSlider(props: Props) {
  const config: LineConfig = {
    ...defaultConfig,
    data: props.data,
    xField: props.xField,
    yField: props.yField,
  };

  return <Line {...config} />;
}

export default LineSlider;
