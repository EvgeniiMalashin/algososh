interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    getItems: () => T[];
    clear: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        this.container.pop();
    };

    peak = (): T | null => {
        if (this.container.length > 0) {
            return this.container[this.container.length - 1];
        } else {
            return null;
        }
    };

    getSize = () => this.container.length;

    getItems = (): T[] => {
        const arr: T[] = [];
        this.container.forEach((item) => {
            arr.push(item);
        })
        return arr;
    };

    clear = (): void => {
        this.container = [];
    };
}
