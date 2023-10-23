import React, { useState, FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../constants/my-constants";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [arr, setArr] = useState<number[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
    setArr([]);
  };

  const fibonacci = (n: number, record: Record<number, number> = {}): number => {
    if (n in record) {
      return record[n];
    }
    if (n <= 2) {
      return 1;
    }
    record[n] = fibonacci(n - 1, record) + fibonacci(n - 2, record);
    return record[n];
  };

  const record: Record<number, number> = {};

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    for (let i = 1; i <= inputValue + 1; i++) {
      if (inputValue >= 1 && inputValue <= 19) {
        setArr((newArr) => [...newArr, fibonacci(i, record)])
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    setIsLoading(false);
    await delay(SHORT_DELAY_IN_MS);
    setInputValue(0);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="number"
          isLimitText={true}
          max={19}
          onChange={handleChange}
        />
        <Button
          type="submit"
          text="Расcчитать"
          isLoader={isLoading}
          disabled={inputValue >= 1 && inputValue <= 19 ? false : true}
        />
      </form>
      <div className={styles.container}>
        {arr.map((item, index) => (
          <Circle
            letter={String(item)}
            key={index}
            index={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
