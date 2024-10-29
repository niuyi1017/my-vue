# TypeScript 内置类型工具（Utility Types）

TypeScript 提供了一些内置的类型工具（Utility Types），可以帮助我们在类型系统中进行各种操作。这些工具类型可以简化类型定义，提高代码的可读性和可维护性。本文将介绍一些常见的内置类型工具及其用法。

## 常见的内置类型工具

### 1. `Partial<T>`

`Partial` 类型将类型 `T` 的所有属性变为可选属性。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

const updateUser = (user: Partial<User>) => {
  // 可以只更新部分属性
  console.log(user);
};

updateUser({ name: "Alice" });
```

### 2. `Required<T>`

`Required` 类型将类型 `T` 的所有属性变为必选属性。

```typescript
interface User {
  id?: number;
  name?: string;
  age?: number;
}

const createUser = (user: Required<User>) => {
  // 所有属性都必须提供
  console.log(user);
};

createUser({ id: 1, name: "Alice", age: 30 });
```

### 3. `Readonly<T>`

`Readonly` 类型将类型 `T` 的所有属性变为只读属性。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

const user: Readonly<User> = {
  id: 1,
  name: "Alice",
  age: 30,
};

// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
```

### 4. `Record<K, T>`

`Record` 类型构造一个对象类型，其属性键为 `K`，属性值为 `T`。

```typescript
type Role = "admin" | "user" | "guest";

const roles: Record<Role, string> = {
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User",
};
```

### 5. `Pick<T, K>`

`Pick` 类型从类型 `T` 中选择一组属性 `K` 来构造新的类型。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserPreview = Pick<User, "id" | "name">;

const userPreview: UserPreview = {
  id: 1,
  name: "Alice",
};
```

### 6. `Omit<T, K>`

`Omit` 类型从类型 `T` 中排除一组属性 `K` 来构造新的类型。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserWithoutEmail = Omit<User, "email">;

const userWithoutEmail: UserWithoutEmail = {
  id: 1,
  name: "Alice",
  age: 30,
};
```

### 7. `ReturnType<T>`

`ReturnType` 类型获取函数类型 `T` 的返回值类型。

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

type GreetReturnType = ReturnType<typeof greet>;

const message: GreetReturnType = "Hello, Alice!";
```

### 8. `Parameters<T>`

`Parameters` 类型获取函数类型 `T` 的参数类型数组。

```typescript
function greet(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old.`;
}

type GreetParameters = Parameters<typeof greet>;

const [name, age]: GreetParameters = ["Alice", 30];
```

### 9. `InstanceType<T>`

`InstanceType` 类型获取构造函数类型 `T` 的实例类型。

```typescript
class User {
  constructor(public name: string, public age: number) {}
}

type UserInstance = InstanceType<typeof User>;

const user: UserInstance = new User("Alice", 30);
```

### 10. `Exclude<T, U>`

`Exclude` 类型从类型 `T` 中排除可以赋值给类型 `U` 的类型。

```typescript
type Role = "admin" | "user" | "guest";
type User = "admin" | "user";

type Guest = Exclude<Role, User>; // "guest"
```

## 结论

TypeScript 的内置类型工具为我们提供了强大的类型操作能力，使得我们可以更灵活地定义和操作类型。通过合理使用这些工具类型，可以大大提高代码的可读性和可维护性。

希望本文对你理解和使用 TypeScript 的内置类型工具有所帮助！
