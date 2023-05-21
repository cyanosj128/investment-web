export interface Indicator {
  id: number;
  code: string;
  description: string;
  name: string;
}

export interface IndicatorHistory {
  id: number;
  indicatorId: number;
  value: string;
  historyAt: number;
}

export interface FullIndicatorHistory {
  id: number;
  indicatorId: number;
  indicator: Indicator;
  value: string;
  historyAt: number;
}
