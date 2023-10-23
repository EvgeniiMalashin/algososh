import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input, } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { TItem } from "../../types/my-types";
import { swap, delay } from "../../constants/my-constants";


export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [arr, setArr] = useState<TItem[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const reverseString = async (inputArr: TItem[]) => {
    setIsLoading(true);
    setArr([...inputArr]);

    await delay(DELAY_IN_MS);

    let start = 0;
    let end = inputValue.length - 1;

    while (start <= end) {
      if (start === end) {
        inputArr[start].color = ElementStates.Modified;
        setArr([...inputArr]);
      } else {
        inputArr[start].color = ElementStates.Changing;
        inputArr[end].color = ElementStates.Changing;
        setArr([...inputArr]);

        await delay(DELAY_IN_MS);
        swap(inputArr, start, end);

        inputArr[start].color = ElementStates.Modified;
        inputArr[end].color = ElementStates.Modified;
        setArr([...inputArr]);

        await delay(DELAY_IN_MS);
      }
      start++;
      end--;
    }
    setIsLoading(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.length > 0) {
      const inputArr = inputValue.split("").map((value) => ({ value, color: ElementStates.Default }));
      reverseString(inputArr);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="text"
          value={inputValue}
          isLimitText={true}
          maxLength={12}
          onChange={handleChange}
          data-testid='textInput'
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={isLoading}
          disabled={inputValue ? false : true}
          data-testid='button'
        />
      </form>
      <div className={styles.container}>
        {arr.map((item, index) => (
          <Circle letter={item.value} key={index} state={item.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
