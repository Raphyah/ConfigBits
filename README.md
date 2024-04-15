# ConfigBits

Tool used to map bits and convert integers to objects, or objects to integer.

## About

`ConfigBits` is a tool used to split a single 32-bit integer into multiple values. It uses `BitMap`s to define the name and the length of each property.
By passing a `BitMap` instance to the `ConfigBits` constructor you're telling it that this property should have name `x` and a length of `y` bits.

## Usage

```ts
const BIT_MAP = new BitMap(name: string, bits: number, dataType: BooleanConstructor | NumberConstructor);
const CONFIG_BITS = new ConfigBits(...bitMaps: BitMap[]);
```

```js
const AUTO_SAVE = new BitMap('auto_save', 1, Boolean); // 1 for true, 0 for false
const IDENTATION_TYPE = new BitMap('identation_type', 1); // 1 for tab, 0 for space
const IDENTATION_SIZE = new BitMap('identation_size', 2);

const MY_SETTINGS = new ConfigBits(AUTO_SAVE, IDENTATION_TYPE, IDENTATION_SIZE);

const TEMPLATE_OBJECT = {
  'auto_save': true,
  'identation_type': 0,
  'identation_size': 3,
}

const VALUE = MY_SETTINGS.toInteger(TEMPLATE_OBJECT);

console.log(`Identation size is set to ${MY_SETTINGS.toObject(VALUE).identation_size}`);
```
