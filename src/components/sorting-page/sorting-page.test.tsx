import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {SortingPage} from "./sorting-page";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export interface IArray {
    number: number;
    state: ElementStates;
}

const arrayWithOneEl = [{ number: 1, state: ElementStates.Default }];
const arrayWithOneElSorted = [{ number: 1, state: ElementStates.Modified }];
const arrayWithFewEl = [
    { number: 1, state: ElementStates.Default },
    { number: 2, state: ElementStates.Default },
    { number: 3, state: ElementStates.Default }
];
const arrayWithFewElSorted = [
    { number: 1, state: ElementStates.Modified },
    { number: 2, state: ElementStates.Modified },
    { number: 3, state: ElementStates.Modified }
];
describe('Алгоритм сортировки строки выбором по возрастанию: ', () => {
    const sortingAlgTestSelectAsc = (value: Array<IArray>, sortedValue: Array<IArray>) => {
        return async () => {
            render(<SortingPage />);
            const radioSelect = screen.getByTestId('radioInputSelect');
            const buttonAsc = screen.getByTestId('buttonAsc');
            const result = screen.getAllByTestId('column').forEach(el => result + (el.textContent || ''));

            await waitFor(() => {
                expect(screen.getByTestId("columnContainer").textContent).toBe("");
            }, { timeout: DELAY_IN_MS })

            fireEvent.click(radioSelect);           
            fireEvent.click(buttonAsc);          
            console.log(result);

        await waitFor(() => {
            expect(result).toBe(sortedValue);
        }, { timeout: DELAY_IN_MS })
    }
}
    it('Отсортирован пустой массив', () => {
        sortingAlgTestSelectAsc([], []);
    })

    it('Оотсортирован массив с одним элементом', () => {
        sortingAlgTestSelectAsc(arrayWithOneEl, arrayWithOneElSorted);
    })

    it('Отсортирован массив с несколькими элементами', () => {
        sortingAlgTestSelectAsc(arrayWithFewEl, arrayWithFewElSorted);
    })
})

describe('Алгоритм сортировки строки выбором по убыванию: ', () => {
    const sortingAlgTestSelectDesc = (value: Array<IArray>, sortedValue: Array<IArray>) => {
        return async () => {
            render(<SortingPage />);
            const radioSelect = screen.getByTestId('radioInputSelect');
            const buttonDesc = screen.getByTestId('buttonDesc');
            const result = screen.getAllByTestId('column').forEach(el => result + (el.textContent || ''));

            await waitFor(() => {
                expect(screen.getByTestId("columnContainer").textContent).toBe("");
            }, { timeout: DELAY_IN_MS })

            fireEvent.click(radioSelect);
            fireEvent.click(buttonDesc)

            await waitFor(() => {
                expect(result).toBe(sortedValue);
            }, { timeout: DELAY_IN_MS })
        }
    }
    it('Оотсортирован пустой массив', () => {
        sortingAlgTestSelectDesc([], []);
    })

    it('Отсортирован массив с одним элементом', () => {
        sortingAlgTestSelectDesc(arrayWithOneEl, arrayWithOneElSorted);
    })

    it('Отсортирован массив с несколькими элементами', () => {
        sortingAlgTestSelectDesc(arrayWithFewEl, arrayWithFewElSorted);
    })
})

describe('Алгоритм сортировки строки пузырьком по возрастанию: ', () => {
    const sortingAlgTestBubbleAsc = (value: Array<IArray>, sortedValue: Array<IArray>) => {
        return async () => {
            render(<SortingPage />);
            const radioBubble = screen.getByTestId('radioInputBubble');
            const buttonAsc = screen.getByTestId('buttonAsc');
            const result = screen.getAllByTestId('column').forEach(el => result + (el.textContent || ''));

            await waitFor(() => {
                expect(screen.getByTestId("columnContainer").textContent).toBe("");
            }, { timeout: DELAY_IN_MS })

            fireEvent.click(radioBubble);
            fireEvent.click(buttonAsc)

            await waitFor(() => {
                expect(result).toBe(sortedValue);
            }, { timeout: DELAY_IN_MS })
        }
    }
    it('Отсортирован пустой массив', () => {
        sortingAlgTestBubbleAsc([], []);
    })

    it('Отсортирован массив с одним элементом', () => {
        sortingAlgTestBubbleAsc(arrayWithOneEl, arrayWithOneElSorted);
    })

    it('Отсортирован массив с несколькими элементами', () => {
        sortingAlgTestBubbleAsc(arrayWithFewEl, arrayWithFewElSorted);
    })
})

describe('Алгоритм сортировки строки пузырьком по убыванию: ', () => {
    const sortingAlgTestBubbleDesc = (value: Array<IArray>, sortedValue: Array<IArray>) => {
        return async () => {
            render(<SortingPage />);
            const radioBubble = screen.getByTestId('radioInputBubble');
            const buttonDesc = screen.getByTestId('buttonDesc');
            const result = screen.getAllByTestId('column').forEach(el => result + (el.textContent || ''));

            await waitFor(() => {
                expect(screen.getByTestId("columnContainer").textContent).toBe("");
            }, { timeout: DELAY_IN_MS })

            fireEvent.click(radioBubble);
            fireEvent.click(buttonDesc)

            await waitFor(() => {
                expect(result).toBe(sortedValue);
            }, { timeout: DELAY_IN_MS })
        }
    }
    it('Отсортирован пустой массив', () => {
        sortingAlgTestBubbleDesc([], []);
    })

    it('Отсортирован массив с одним элементом', () => {
        sortingAlgTestBubbleDesc(arrayWithOneEl, arrayWithOneElSorted);
    })

    it('Отсортирован массив с несколькими элементами', () => {
        sortingAlgTestBubbleDesc(arrayWithFewEl, arrayWithFewElSorted);
    })
})