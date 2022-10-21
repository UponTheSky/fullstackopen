import { MouseEvent } from "react";

export interface ButtonType<T> {
  text: string;
  onClickHandler: (arg: MouseEvent) => void;
}

export interface StatisticsLineType {
  text: string;
  value: number;
}
