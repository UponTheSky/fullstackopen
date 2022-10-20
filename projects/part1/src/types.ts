import { MouseEvent } from "react";

export interface ButtonType<T> {
  text: string;
  onClickHandler: (arg: MouseEvent) => void;
}

export interface StatType {
  text: string;
  stat: number;
}
