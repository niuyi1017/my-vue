"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactive = exports.effect = void 0;
const targetMap = new WeakMap();
let activeEffect = null;
const track = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    if (activeEffect) {
        dep.add(activeEffect);
    }
};
const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
    if (!depsMap)
        return;
    const dep = depsMap.get(key);
    if (!dep)
        return;
    dep.forEach((effect) => {
        effect();
    });
};
const effect = (fn) => {
    activeEffect = fn;
    fn();
    activeEffect = null;
};
exports.effect = effect;
const reactive = (target) => {
    const handler = {
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
exports.reactive = reactive;
