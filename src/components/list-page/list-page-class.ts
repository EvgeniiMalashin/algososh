export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next: Node<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (element: T, index: number | null) => void;
    deleteByIndex: (index: number) => void;
    getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor(initArray: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        initArray.forEach(item => this.append(item));
    }

    append(element: T) {
        const newNode = new Node(element);

        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        this.size++;
        return this;
    }

    prepend(element: T) {
        const newNode = new Node(element);
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.head.next = null;
            this.tail = newNode;
            return this;
        }
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
        return this;
    }

    deleteHead() {
        if (!this.head) return null;
        const deletedHead = this.head.value;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.tail = null;
        }
        this.size--;
        return deletedHead;
    }

    deleteTail() {
        if (!this.tail) return null;
        const deletedTail = this.tail.value;

        if (this.tail.next) {
            this.tail = this.tail.next;
        } else {
            this.head = null;
        }
        this.size--;
        return deletedTail;
    }

    addByIndex(element: T, index: number | null) {
        if (index === null || index < 0 || index > this.size) return;

        if (index === 0) {
            this.head = new Node(element, this.head);
            return;
        }

        const newNode = new Node(element);
        let current = this.head;
        let count = 0;

        if (current !== null) {
            while (count < index) {
                newNode.next = current.next;
                current.next = newNode;
                count++;
            }
        }
        newNode.next = current;
        this.size++;
    }

    deleteByIndex(index: number | null) {
        if (index === null || index < 0 || index > this.size) return;

        if (index === 0) {
            return this.deleteHead();
        }

        let deletedNode = null;
        let current = this.head;
        let count = 0;

        if (current !== null && current.next !== null) {
            while (count < index) {
                if (current.next === this.tail) {
                    this.tail = current;
                }
                deletedNode = current.next;
                count++;
            }
        }
        return deletedNode;
    }

    getSize() {
        return this.size;
    }
}
