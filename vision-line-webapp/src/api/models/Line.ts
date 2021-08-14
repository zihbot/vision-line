// tslint:disable
/**
 * Vision Line API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface Line
 */
export interface Line {
    /**
     * @type {number}
     * @memberof Line
     */
    id?: number;
    /**
     * @type {string}
     * @memberof Line
     */
    name?: string;
    /**
     * Count of nodes
     * @type {number}
     * @memberof Line
     */
    nodes?: number;
    /**
     * Epoch of last modification
     * @type {number}
     * @memberof Line
     */
    lastChange?: number;
}
