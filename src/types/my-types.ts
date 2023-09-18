import { ElementStates } from "./element-states";

export type TItem = {
  value: string;
  color: ElementStates;
}

export type TSortItem = {
  value: number;
  color: ElementStates;
}

export type TListItem = {
  value: string;
  index?: number | null;
  color: ElementStates;
  upCircle?: boolean;
  downCircle?: boolean;
  arrow?: boolean;
  smallCircle?: {
    value: string,
    color: ElementStates
  };
}
