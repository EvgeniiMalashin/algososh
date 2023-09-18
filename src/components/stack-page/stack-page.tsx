import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css"
import { TItem } from "../../types/my-types";
import { Stack } from "./stack-page-class";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../constants/my-constants";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [arr, setArr] = useState<TItem[]>([]);
  const [stack] = useState(new Stack<TItem>());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePushStack = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsAddLoading(true);

    stack.push({ value: inputValue, color: ElementStates.Changing });
    setInputValue('');
    setArr([...stack.getItems()]);
    await delay(SHORT_DELAY_IN_MS);

    const peak = stack.peak();
    if (peak) {
      peak.color = ElementStates.Default;
    }
    setArr([...stack.getItems()]);
    setIsAddLoading(false);
    setIsDisabled(false);
  };

  const handlePopStack = async () => {
    setIsDisabled(true);
    setIsDelLoading(true);
    arr[arr.length - 1].color = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArr([...stack.getItems()]);
    setIsDelLoading(false);
    setIsDisabled(false);
  };

  const handleClearStack = () => {
    stack.clear();
    setArr([]);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handlePushStack}>
        <div className={styles.container}>
          <Input
            type="text"
            placeholder="Введите значение"
            value={inputValue}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Button
            type="submit"
            text="Добавить"
            isLoader={isAddLoading}
            disabled={!inputValue || isDisabled}

          />
          <Button
            type="button"
            text="Удалить"
            isLoader={isDelLoading}
            onClick={handlePopStack}
            disabled={!arr.length || isDisabled}
          />
        </div>
        <Button
          type="reset"
          text="Очистить"
          onClick={handleClearStack}
          disabled={!arr.length || isDisabled}
        />
      </form>
      <div className={styles.circle}>
        {arr.map((item, index) => (
          <Circle
            letter={item.value}
            key={index}
            index={index}
            state={item.color}
            head={(arr.length - 1) === index ? 'top' : ''} />
        ))}
      </div>
    </SolutionLayout>
  );
};
