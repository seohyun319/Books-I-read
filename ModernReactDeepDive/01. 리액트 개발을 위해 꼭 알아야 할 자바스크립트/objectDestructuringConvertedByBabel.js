// before
/**
const object = {
  a: 1,
  b: 1,
  c: 1, 
  d: 1,
  e: 1,
}

const {a, b, ...rest} = object
*/

// after
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var key, i;
  var target = _objectWithoutPropertiesLoose(source, excluded);
  // 객체 내부에서 심벌의 존재를 확인할 수 있는 경우 대비한 예외 처리
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

// source: 객체, excluded: 해당 객체에서 제외할 키가 포함된 배열
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var n in source) {
    if ({}.hasOwnProperty.call(source, n)) {
      if (excluded.indexOf(n) >= 0) continue;
      target[n] = source[n];
    }
  }
  return target;
}

var object = {
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  e: 1,
};

var a = object.a,
  b = object.b,
  rest = _objectWithoutProperties(object, ["a", "b"]);
