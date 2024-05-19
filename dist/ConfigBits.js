/**
 * Author: Raphyah
 * Version: 1.0.0
 * License: MIT
 */
export class ArgumentError extends Error {
    constructor(...args) {
        super(...args);
        this.name = 'ArgumentError';
    }
}
export class TypeMismatchError extends Error {
    constructor(...args) {
        super(...args);
        this.name = 'TypeMismatchError';
    }
}
/**
 * Represents a bit map.
 *
 * ### Instance properties
 *
 * - BitMap.prototype.name (read-only)
 *   - The name used to identify this BitMap.
 * - BitMap.prototype.bits (read-only)
 *   - The number of bits that this BitMap needs.
 *
 * ### Example
 *
 * ```js
 * const AUTO_SAVE = new BitMap('auto_save', 1, Boolean); // 1 for true, 0 for false
 * const IDENTATION_TYPE = new BitMap('identation_type', 1); // 1 for tab, 0 for space
 * const IDENTATION_SIZE = new BitMap('identation_size', 2);
 *
 * const MY_SETTINGS = new ConfigBits(AUTO_SAVE, IDENTATION_TYPE, IDENTATION_SIZE);
 *
 * const TEMPLATE_OBJECT = {
 *   'auto_save': true,
 *   'identation_type': 0,
 *   'identation_size': 3,
 * }
 *
 * const VALUE = MY_SETTINGS.toInteger(TEMPLATE_OBJECT);
 *
 * console.log(`Identation size is set to ${MY_SETTINGS.toObject(VALUE).identation_size}`);
 * ```
 * @author Raphyah
 * @version 1.0.0
 * @license GPLv3
 */
export class BitMap {
    #name;
    #bits;
    #dataType;
    /**
     * Constructs a new BitMap instance.
     * @param {string} name - The name used to identify this BitMap.
     * @param {number} bits - The number of bits that this BitMap needs.
     * @param {NumberConstructor | BooleanConstructor} dataType - The type of the generated property of this BitMap.
     * @throws {TypeError} If name is not an instance of String.
     * @throws {TypeError} If bits is not an instance of Number.
     */
    constructor(name, bits, dataType = Number) {
        if (name?.constructor !== String) {
            throw new TypeError(`Name parameter must be a string, but received ${typeof name}.`);
        }
        if (bits?.constructor !== Number) {
            throw new TypeError(`Bits parameter must be a number, but received ${typeof bits}.`);
        }
        if (bits > 32) {
            throw new RangeError(`The value of bits in a bit map cannot exceed 32.`);
        }
        if (dataType !== Number && dataType !== Boolean) {
            throw new TypeError(`Data type parameter must be either a Number or a Boolean.`);
        }
        if (dataType === Boolean && bits !== 1) {
            throw new TypeMismatchError(`Data type is set to Boolean but the required amount of bits is not equal to one.`);
        }
        this.#name = name;
        this.#bits = String.fromCharCode(bits);
        this.#dataType = dataType;
    }
    /**
     * Gets the name of the BitMap.
     * @returns {string} The name of the BitMap.
     */
    get name() {
        return this.#name;
    }
    /**
     * Gets the number of bits used by this BitMap.
     * @returns {number} The number of bits.
     */
    get bits() {
        return this.#bits.charCodeAt(0);
    }
    /**
     * Gets the type of data represented by this BitMap.
     * @returns {Number | Boolean} A constructor representing the data type.
     */
    get dataType() {
        return this.#dataType;
    }
}
/**
 * Represents a configuration manager for working with bit maps.
 *
 * ### Instance methods
 *
 * - ConfigBits.prototype.toInteger(object: {[key: string]: number | boolean}): number
 *   - The name used to identify this BitMap.
 * - ConfigBits.prototype.toObject(interger: number): {[key: string]: number}
 *   - The number of bits that this BitMap needs.
 *
 * ### Example
 *
 * ```js
 * const AUTO_SAVE = new BitMap('auto_save', 1, Boolean); // 1 for true, 0 for false
 * const IDENTATION_TYPE = new BitMap('identation_type', 1); // 1 for tab, 0 for space
 * const IDENTATION_SIZE = new BitMap('identation_size', 2);
 *
 * const MY_SETTINGS = new ConfigBits(AUTO_SAVE, IDENTATION_TYPE, IDENTATION_SIZE);
 *
 * const TEMPLATE_OBJECT = {
 *   'auto_save': true,
 *   'identation_type': 0,
 *   'identation_size': 3,
 * }
 *
 * const VALUE = MY_SETTINGS.toInteger(TEMPLATE_OBJECT);
 *
 * console.log(`Identation size is set to ${MY_SETTINGS.toObject(VALUE).identation_size}`);
 * ```
 * @author Raphyah
 * @version 1.0.0
 * @license GPLv3
 */
export class ConfigBits {
    #bitMap = [];
    /**
     * Constructs a new ConfigBits instance.
     * @param {BitMap[]} bitMaps - The configurations for the bit maps.
     * @throws {ArgumentError} If no argument is present.
     * @throws {TypeError} If any bit map is not a BitMap instance.
     * @throws {RangeError} If the sum of all bits in bit maps is greater than 31.
     */
    constructor(...bitMaps) {
        if (bitMaps.length === 0) {
            throw new ArgumentError(`At least one bit map must be provided.`);
        }
        let totalBits = 0;
        for (let index = 0; index < bitMaps.length; index++) {
            const bitMap = bitMaps[index];
            if (bitMap?.constructor !== BitMap) {
                throw new TypeError(`Expected a 'BitMap' instance, but received ${bitMap?.constructor.name} instead.`);
            }
            totalBits += bitMap.bits;
            if (totalBits > 32) {
                throw new RangeError(`The total number of bits in all bit maps cannot exceed 32.`);
            }
            this.#bitMap.push(bitMap);
        }
    }
    /**
     * Converts an integer into an object representation based on the configured bit map.
     * @param {number} integer - The integer value to convert.
     * @returns {Object} An object representation of the integer with properties defined by the bit map.
     * @throws {TypeError} If the input integer is not a number.
     * @throws {RangeError} If the input is not a valid 32-bit integer.
     */
    toObject(integer) {
        if (integer?.constructor !== Number) {
            throw new TypeError(`Input value must be a number, but received ${typeof integer}.`);
        }
        if (integer > 4294967295 || integer < -2147483648) {
            throw new RangeError(`Input value must be a 32-bit integer.`);
        }
        const result = {};
        let position = 0;
        for (let index = 0; index < this.#bitMap.length; index++) {
            const bitMap = this.#bitMap[index];
            const value = (integer >> position) & (2 ** bitMap.bits - 1);
            result[bitMap.name] = bitMap.dataType === Boolean ? !!value : value;
            position += bitMap.bits;
        }
        return result;
    }
    /**
     * Converts an integer into a Map representation based on the configured bit map.
     * @param {number} integer - The integer value to convert.
     * @returns {Map<string, number | boolean>} A Map representation of the integer with properties defined by the bit map.
     * @throws {TypeError} If the input integer is not a number.
     * @throws {RangeError} If the input is not a valid 32-bit integer.
     */
    toMap(integer) {
        if (integer?.constructor !== Number) {
            throw new TypeError(`Input value must be a number, but received ${typeof integer}.`);
        }
        if (integer > 4294967295 || integer < -2147483648) {
            throw new RangeError(`Input value must be a 32-bit integer.`);
        }
        const result = new Map();
        let position = 0;
        for (let index = 0; index < this.#bitMap.length; index++) {
            const bitMap = this.#bitMap[index];
            const value = (integer >> position) & (2 ** bitMap.bits - 1);
            result.set(bitMap.name, bitMap.dataType === Boolean ? !!value : value);
            position += bitMap.bits;
        }
        return result;
    }
    /**
     * Converts an object representation back to an integer based on the configured bit map.
     * @param {{[key: string]: number | boolean}} object - The object representation to convert.
     * @returns {number} The integer value generated from the object based on the bit map.
     * @throws {TypeError} If the input object is not an object.
     */
    fromObject(object) {
        if (object?.constructor !== Object) {
            throw new TypeError(`Input value must be an object, but received ${typeof object}.`);
        }
        let result = 0;
        let position = 0;
        for (let index = 0; index < this.#bitMap.length; index++) {
            const bitMap = this.#bitMap[index];
            const value = object[bitMap.name] || 0;
            result |= (+value << position);
            position += bitMap.bits;
        }
        return result;
    }
    fromMap(map) {
        if (map?.constructor !== Map) {
            throw new TypeError(`Input value must be a Map, but received ${map?.constructor.name}.`);
        }
        let result = 0;
        let position = 0;
        for (let index = 0; index < this.#bitMap.length; index++) {
            const bitMap = this.#bitMap[index];
            const value = map.get(bitMap.name) || 0;
            result |= (+value << position);
            position += bitMap.bits;
        }
        return result;
    }
}
