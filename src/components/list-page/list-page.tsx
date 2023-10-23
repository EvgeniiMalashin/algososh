import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TListItem } from "../../types/my-types";
import styles from "./list-page.module.css"
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list-page-class";
import { delay } from "../../constants/my-constants";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number | null>(null);
  const [isLoadingAddHead, setIsLoadingAddHead] = useState(false);
  const [isLoadingAddTail, setIsLoadingAddTail] = useState(false);
  const [isLoadingAddIndex, setIsLoadingAddIndex] = useState(false);
  const [isLoadingDeleteHead, setIsLoadingDeleteHead] = useState(false);
  const [isLoadingDeleteTail, setIsLoadingDeleteTail] = useState(false);
  const [isLoadingDeleteIndex, setIsLoadingDeleteIndex] = useState(false);
  const [arr, setArr] = useState<TListItem[]>([
    { value: '0', color: ElementStates.Default },
    { value: '34', color: ElementStates.Default },
    { value: '8', color: ElementStates.Default },
    { value: '1', color: ElementStates.Default }
  ]);
  const [isDisabled, setIsDisabled] = useState(false);
  const list = new LinkedList<string>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.target.value));
  };

  const handleAddHead = async () => {
    setIsDisabled(true);
    setIsLoadingAddHead(true);
    list.prepend(inputValue);
    arr[0] = {
      ...arr[0],
      upCircle: true,
      smallCircle: {
        value: inputValue,
        color: ElementStates.Changing
      }
    };
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[0] = { ...arr[0], upCircle: false };
    arr.unshift({
      value: inputValue,
      color: ElementStates.Modified
    });
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[0] = { ...arr[0], color: ElementStates.Default };
    setArr([...arr]);

    setInputValue('');
    setIsLoadingAddHead(false);
    setIsDisabled(false);
  };

  const handleAddTail = async () => {
    setIsDisabled(true);
    setIsLoadingAddTail(true);
    list.append(inputValue);

    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      upCircle: true,
      smallCircle: {
        value: inputValue,
        color: ElementStates.Changing
      }
    };
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[arr.length - 1] = { ...arr[arr.length - 1], upCircle: false };
    arr.push({
      value: inputValue,
      color: ElementStates.Modified
    });
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    arr[arr.length - 1] = { ...arr[arr.length - 1], color: ElementStates.Default };
    setArr([...arr]);

    setInputValue('');
    setIsLoadingAddTail(false);
    setIsDisabled(false);
  };

  const handleDeleteHead = async () => {
    setIsDisabled(true);
    setIsLoadingDeleteHead(true);
    list.deleteHead();

    arr[0] = {
      ...arr[0],
      downCircle: true,
      value: '',
      smallCircle: {
        value: arr[0].value,
        color: ElementStates.Changing
      }
    };
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[0] = { ...arr[0], downCircle: false };
    arr.shift();
    setArr([...arr]);
    setIsLoadingDeleteHead(false);
    setIsDisabled(false);
  };

  const handleDeleteTail = async () => {
    setIsDisabled(true);
    setIsLoadingDeleteTail(true);
    list.deleteHead();

    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      downCircle: true, value: '',
      smallCircle: {
        value: arr[arr.length - 1].value,
        color: ElementStates.Changing
      }
    };
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[arr.length - 1] = { ...arr[arr.length - 1], downCircle: false };
    arr.pop();
    setArr([...arr]);
    setIsLoadingDeleteTail(false);
    setIsDisabled(false);
  };

  const handleAddByIndex = async () => {
    setIsDisabled(true);
    setIsLoadingAddIndex(true);
    if (inputIndex !== null) {
      list.addByIndex(inputValue, inputIndex);
      arr[0] = {
        ...arr[0],
        upCircle: true,
        smallCircle: {
          value: inputValue,
          color: ElementStates.Changing
        }
      };
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      let currentIndex = 0;
      while (currentIndex <= inputIndex) {
        arr[currentIndex] = {
          ...arr[currentIndex],
          upCircle: true,
          smallCircle: {
            value: inputValue,
            color: ElementStates.Changing
          }
        };

        arr[currentIndex - 1] = {
          ...arr[currentIndex - 1],
          upCircle: false,
          color: ElementStates.Changing,
          arrow: true
        };
        currentIndex++;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
      }

      arr[inputIndex] = { ...arr[inputIndex], upCircle: false };
      arr.splice(inputIndex, 0, { value: inputValue, color: ElementStates.Modified });
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }

    arr.forEach(item => {
      return (
        item.color = ElementStates.Default, item.arrow = false
      );
    }
    );
    setArr([...arr]);
    setInputIndex(null);
    setInputValue('');
    setIsLoadingAddIndex(false);
    setIsDisabled(false);
  };

  const handleDeleteByIndex = async () => {
    setIsDisabled(true);
    setIsLoadingDeleteIndex(true);
    list.deleteByIndex(inputIndex);
    if (inputIndex !== null) {
      let currentIndex = 0;
      while (currentIndex <= inputIndex) {
        arr[currentIndex] = {
          ...arr[currentIndex],
          color: ElementStates.Changing,
          arrow: true
        };
        currentIndex++;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
      }

      arr[inputIndex] = {
        ...arr[inputIndex],
        value: '',
        downCircle: true,
        color: ElementStates.Changing,
        arrow: false,
        smallCircle: {
          value: arr[inputIndex].value,
          color: ElementStates.Changing
        }
      };
      setArr([...arr]);
      arr.splice(inputIndex, 1);
      await delay(SHORT_DELAY_IN_MS);
    }

    arr.forEach(item => {
      return (
        item.color = ElementStates.Default, item.arrow = false
      );
    }
    );
    setArr([...arr]);
    setInputValue('');
    setInputIndex(null);
    setIsLoadingDeleteIndex(false);
    setIsDisabled(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input
            type="text"
            placeholder="Введите значение"
            value={inputValue}
            extraClass={styles.input}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
            disabled={isDisabled}
            data-testid='textInput'
          />
          <Button
            type="button"
            text="Добавить в head"
            onClick={handleAddHead}
            linkedList="small"
            isLoader={isLoadingAddHead}
            disabled={!inputValue || isDisabled}
            data-testid='addHeadButton'
          />
          <Button
            type="button"
            text="Добавить в tail"
            onClick={handleAddTail}
            linkedList="small"
            isLoader={isLoadingAddTail}
            disabled={!inputValue || isDisabled}
            data-testid='addTailButton'
          />
          <Button
            type="button"
            text="Удалить из head"
            onClick={handleDeleteHead}
            linkedList="small"
            isLoader={isLoadingDeleteHead}
            disabled={!arr.length || isDisabled}
            data-testid='deleteHeadButton'
          />
          <Button
            type="button"
            text="Удалить из tail"
            onClick={handleDeleteTail}
            linkedList="small"
            isLoader={isLoadingDeleteTail}
            disabled={!arr.length || isDisabled}
            data-testid='deleteTailButton'
          />
        </div>
        <div className={styles.container}>
          <Input
            type="number"
            placeholder="Введите индекс"
            value={inputIndex ? inputIndex : ''}
            extraClass={styles.input}
            min={0}
            max={arr.length - 1}
            onChange={handleChangeIndex}
            disabled={isDisabled}
            data-testid='indexInput'
          />
          <Button
            type="button"
            text="Добавить по индексу"
            onClick={handleAddByIndex}
            linkedList="big"
            isLoader={isLoadingAddIndex}
            disabled={!inputIndex || !inputValue || isDisabled || inputIndex > arr.length - 1 || inputIndex < 0}
            data-testid='addIndexButton'
          />
          <Button
            type="button"
            text="Удалить по индексу"
            onClick={handleDeleteByIndex}
            linkedList="big"
            isLoader={isLoadingDeleteIndex}
            disabled={!inputIndex || isDisabled || inputIndex > arr.length - 1 || inputIndex < 0}
            data-testid='deleteIndexButton'
          />
        </div>
      </form>
      <div className={styles.linkedList}>
        {arr.map((item, index) => (
          <div className={styles.circle} key={index}>
            <div className={styles.circleItem}>
              {item.upCircle &&
                <Circle
                  letter={item.smallCircle?.value}
                  state={item.smallCircle?.color}
                  isSmall={true}
                  extraClass={styles.upCircle}
                />
              }
              <Circle
                letter={item.value}
                index={index}
                state={item?.color}
                head={(index === 0) && !item.upCircle ? HEAD : ''}
                tail={(index === arr.length - 1) && !item.downCircle ? TAIL : ''}
              />
              {item.downCircle &&
                <Circle
                  letter={item.smallCircle?.value}
                  state={item.smallCircle?.color}
                  isSmall={true}
                  extraClass={styles.downCircle}
                />
              }
            </div>
            {index !== arr.length - 1 &&
              <ArrowIcon fill={item.arrow ? ElementStates.Changing : ElementStates.Default} />
            }
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};

