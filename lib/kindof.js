export var kindOf = function (val) {
  function isBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
  }

  var toString = Object.prototype.toString;

  if (typeof val === 'undefined') {
    return 'Undefined';
  }
  if (val === null) {
    return 'Null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'Boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'String';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'Number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'Function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'Array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'Regexp';
  }
  if (val instanceof Date) {
    return 'Date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'Regexp';
  }
  if (type === '[object Date]') {
    return 'Date';
  }
  if (type === '[object Arguments]') {
    return 'Arguments';
  }
  if (type === '[object Error]') {
    return 'Error';
  }

  // buffer
  if (typeof Buffer !== 'undefined' && isBuffer(val)) {
    return 'Buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'Set';
  }
  if (type === '[object WeakSet]') {
    return 'Weakset';
  }
  if (type === '[object Map]') {
    return 'Map';
  }
  if (type === '[object WeakMap]') {
    return 'Weakmap';
  }
  if (type === '[object Symbol]') {
    return 'Symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'Int8Array';
  }
  if (type === '[object Uint8Array]') {
    return 'Uint8Array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'Uint8ClampedArray';
  }
  if (type === '[object Int16Array]') {
    return 'Int16Array';
  }
  if (type === '[object Uint16Array]') {
    return 'Uint16Array';
  }
  if (type === '[object Int32Array]') {
    return 'Int32Array';
  }
  if (type === '[object Uint32Array]') {
    return 'Uint32Array';
  }
  if (type === '[object Float32Array]') {
    return 'Float32Array';
  }
  if (type === '[object Float64Array]') {
    return 'Float64Array';
  }

  // must be a plain object
  return 'Object';
};
