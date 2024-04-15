/**
 * Author: Raphyah
 * Version: 1.0.0
 * License: GNU GPL 3.0
 */
export declare class ArgumentError extends Error {
    constructor(...args: any[]);
}
export declare class TypeMismatchError extends Error {
    constructor(...args: any[]);
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
export declare class BitMap {
    #private;
    /**
     * Constructs a new BitMap instance.
     * @param {string} name - The name used to identify this BitMap.
     * @param {number} bits - The number of bits that this BitMap needs.
     * @param {NumberConstructor | BooleanConstructor} dataType - The type of the generated property of this BitMap.
     * @throws {TypeError} If name is not an instance of String.
     * @throws {TypeError} If bits is not an instance of Number.
     */
    constructor(name: string, bits: number, dataType?: (NumberConstructor | BooleanConstructor));
    /**
     * Gets the name of the BitMap.
     * @returns {string} The name of the BitMap.
     */
    get name(): string;
    /**
     * Gets the number of bits used by this BitMap.
     * @returns {number} The number of bits.
     */
    get bits(): number;
    /**
     * Gets the type of data represented by this BitMap.
     * @returns {Number | Boolean} A constructor representing the data type.
     */
    get dataType(): NumberConstructor | BooleanConstructor;
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
export declare class ConfigBits {
    #private;
    /**
     * Constructs a new ConfigBits instance.
     * @param {BitMap[]} bitMaps - The configurations for the bit maps.
     * @throws {ArgumentError} If no argument is present.
     * @throws {TypeError} If any bit map is not a BitMap instance.
     * @throws {RangeError} If the sum of all bits in bit maps is greater than 31.
     */
    constructor(...bitMaps: BitMap[]);
    /**
     * Converts an integer into an object representation based on the configured bit map.
     * @param {number} integer - The integer value to convert.
     * @returns {Object} An object representation of the integer with properties defined by the bit map.
     * @throws {TypeError} If the input integer is not a number.
     * @throws {RangeError} If the input is not a valid 32-bit integer.
     */
    toObject(integer: number): {
        [key: string]: number | boolean;
    };
    /**
     * Converts an integer into a Map representation based on the configured bit map.
     * @param {number} integer - The integer value to convert.
     * @returns {Map<string, number | boolean>} A Map representation of the integer with properties defined by the bit map.
     * @throws {TypeError} If the input integer is not a number.
     * @throws {RangeError} If the input is not a valid 32-bit integer.
     */
    toMap(integer: number): Map<string, number | boolean>;
    /**
     * Converts an object representation back to an integer based on the configured bit map.
     * @param {{[key: string]: number | boolean}} object - The object representation to convert.
     * @returns {number} The integer value generated from the object based on the bit map.
     * @throws {TypeError} If the input object is not an object.
     */
    fromObject(object: {
        [key: string]: number | boolean;
    }): number;
    fromMap(map: Map<string, number | boolean>): number;
}
