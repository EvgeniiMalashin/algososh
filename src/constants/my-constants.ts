import { TItem, TSortItem } from "../types/my-types";

export const delay = async(ms: number) => await new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
});

export const swap = (arr: TItem[] | TSortItem[], i: number, j: number) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};