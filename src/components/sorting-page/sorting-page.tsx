import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { TSortItem } from "../../types/my-types";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { swap, delay } from "../../constants/my-constants";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState({ isLoading: false, isAscending: false, isDescending: false });
  const [arr, setArr] = useState<TSortItem[]>([]);
  const [radioInput, setRadioInput] = useState("Выбор");
  const randomArr = () => {
    const randLen = Math.floor(Math.random() * (17 - 3) + 3);
    const arr = [...new Array(randLen)].map(() => Math.round(Math.random() * 100));
    const newArr: TSortItem[] = arr.map((value) => ({
      value: value,
      color: ElementStates.Default
    }))
    setArr(newArr);
  };

  useEffect(() => {
    randomArr();
  }, []);

  const selectionMethod = async (arr: TSortItem[], sort: Direction) => {
    if (sort === Direction.Ascending) {
      setIsLoading({ isLoading: true, isAscending: true, isDescending: false });
    } else {
      setIsLoading({ isLoading: true, isAscending: false, isDescending: true });
    }

    for (let i = 0; i < arr.length; i++) {
      let temp = i;
      arr[i].color = ElementStates.Changing;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].color = ElementStates.Changing;

        setArr([...arr]);
        await delay(DELAY_IN_MS);

        if ((sort === Direction.Ascending) && (arr[j].value < arr[temp].value)) {
          temp = j;
          swap(arr, j, temp);
          setArr([...arr]);
        } else if ((sort === Direction.Descending) && (arr[j].value > arr[temp].value)) {
          temp = j;
          swap(arr, j, temp);
          setArr([...arr]);
        }
        arr[j].color = ElementStates.Default;
        setArr([...arr]);
      }
      arr[i].color = ElementStates.Default;
      arr[temp].color = ElementStates.Modified;
      swap(arr, i, temp);
      setArr([...arr]);

    }
    setIsLoading({ isLoading: false, isAscending: false, isDescending: false });
  };

  const bubbleMethod = async (arr: TSortItem[], sort: Direction) => {
    if (sort === Direction.Ascending) {
      setIsLoading({ isLoading: true, isAscending: true, isDescending: false });
    } else {
      setIsLoading({ isLoading: true, isAscending: false, isDescending: true });
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        await delay(DELAY_IN_MS);
        if ((sort === Direction.Ascending) && (arr[j].value > arr[j + 1].value)) {
          swap(arr, j, j + 1);
        } else if ((sort === Direction.Descending) && (arr[j].value < arr[j + 1].value)) {
          swap(arr, j, j + 1);
        }
        setArr([...arr]);
        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setIsLoading({ isLoading: false, isAscending: false, isDescending: false });
  };

  const onSortClick = (sort: Direction) => {
    if (radioInput === "Выбор") {
      selectionMethod(arr, sort);
    } else if (radioInput === "Пузырёк") {
      bubbleMethod(arr, sort);
    }
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRadioInput(evt.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    randomArr();
    await delay(DELAY_IN_MS)
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            checked={radioInput === "Выбор" ? true : false}
            value="Выбор"
            onChange={onChange}
          />
          <RadioInput
            label="Пузырёк"
            checked={radioInput === "Пузырёк" ? true : false}
            value="Пузырёк"
            onChange={onChange}
          />
        </div>
        <div className={styles.button}>
          <Button
            type="button"
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoading.isAscending}
            onClick={() => { onSortClick(Direction.Ascending) }}
            disabled={isLoading.isDescending}
          />
          <Button
            type="button"
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={isLoading.isDescending}
            onClick={() => { onSortClick(Direction.Descending) }}
            disabled={isLoading.isAscending}
          />
        </div>
        <Button
          type="submit"
          text="Новый массив"
          disabled={isLoading.isLoading}
        />
      </form>
      <div className={styles.container}>
        {arr.map((item, index) => (
          <Column index={Number(item.value)} key={index} state={item.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
