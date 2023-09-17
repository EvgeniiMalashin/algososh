import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TItem } from "../../types/my-types";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue-page-class";
import { delay } from "../../constants/my-constants";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [arr, setArr] = useState<TItem[]>([]);
  const [queue] = useState(new Queue<TItem>(7));

  useEffect(() => {
    setArr(Array(7).fill({ value: '', color: ElementStates.Default }));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleQueue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsAddLoading(true);
    queue.enqueue({ value: inputValue, color: ElementStates.Default });
    arr[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Changing }
    setInputValue('');
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Default };
    setArr([...arr]);
    setIsAddLoading(false);
    setIsDisabled(false);
  };

  const handleDequeue = async () => {
    setIsDisabled(true);
    setIsDelLoading(true);
    arr[queue.getHead()].color = ElementStates.Changing
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[queue.getHead()].value = '';
    arr[queue.getHead()].color = ElementStates.Default;
    setArr([...arr]);
    queue.dequeue();
    setIsDelLoading(false);
    setIsDisabled(false);
  };

  const handleClearQueue = () => {
    queue.clear();
    setArr(Array(7).fill({ value: '', color: ElementStates.Default }));
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleQueue}>
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
            disabled={!inputValue || queue.getTail() === 7 || isDisabled}
          />
          <Button
            type="button"
            text="Удалить"
            isLoader={isDelLoading}
            onClick={handleDequeue}
            disabled={queue.isEmpty() || isDisabled}
          />
        </div>
        <Button
          type="reset"
          text="Очистить"
          onClick={handleClearQueue}
          disabled={queue.isEmpty() || isDisabled}
        />
      </form>
      <div className={styles.circle}>
        {arr.map((item, index) => (
          <Circle
            letter={item.value}
            key={index}
            index={index}
            state={item?.color}
            head={index === queue.getHead() && !queue.isEmpty() ? HEAD : ''}
            tail={index === queue.getTail() - 1 && !queue.isEmpty() ? TAIL : ''}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
