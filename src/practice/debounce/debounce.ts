type Timer = ReturnType<typeof setTimeout> | null;
type DebounceFn = (...args: any[]) => void;

const debounce = <T extends DebounceFn>(fn: T, delay: number) => {
  let timer: Timer = null;
  return function (...args:  Parameters<T>) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};


type GroupFn<T> = (item: T) => any;
type Grouped<T> = Record<string, T[]>;

const groupBy = <T>(arr: T[], fn: GroupFn<T>): Grouped<T> => {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Grouped<T>);
};

export { debounce, groupBy };

