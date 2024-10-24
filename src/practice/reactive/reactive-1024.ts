type Effect = () => void;
type DepsMap = Map<string | symbol, Set<Effect>>;
type TargetMap = WeakMap<object, DepsMap>;

const targetMap: TargetMap = new WeakMap<object, DepsMap>();
let activeEffect: Effect | null = null;

const track = (target: object, key: string | symbol): void => {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map<string | symbol, Set<Effect>>();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set<Effect>();
    depsMap.set(key, dep);
  }
  if (activeEffect) {
    dep.add(activeEffect);
  }
};

const trigger = (target: object, key: string | symbol): void => {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (!dep) return;
  dep.forEach((effect) => {
    effect();
  });
};

const effect = (fn: Effect): void => {
  activeEffect = fn;
  fn();
  activeEffect = null;
};

const reactive = <T extends object>(target: T): T => {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      console.log('get', key);
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log('set', key, value);
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return result;
    }
  };
  return new Proxy(target, handler);
};

export { effect, reactive };