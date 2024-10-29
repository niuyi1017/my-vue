
type debounceFn = (...args: any[]) => void;
function debounce<T extends debounceFn>(func: T, wait: number = 300) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function(...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}


type GroupFn<T> = (item: T) => any;
type Grouped<T> = Record<string, T[]>;
function groupBy<T>(arr: T[], fn: GroupFn<T> ): Grouped<T> {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as { [key: string]: T[] });
}



// 编写一个简单的前端路由函数 simpleRouter，根据 URL 的变化加载不同的内容。
type Route = Record<string, () => void>;
const simpleRouter = (routes: Route) => {
  const handleHashChange = () => {
    const hash = location.hash.slice(1);
    if (routes[hash]) {
      routes[hash]();
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
};

export { debounce, groupBy, simpleRouter };