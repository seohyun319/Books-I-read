// https://bit.ly/42pQp9H에서 바벨로 변환한 결과

function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}

// 클래스가 함수처럼 호출되는 것을 방지
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// 프로퍼티를 할당하는 코드
function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}

// 프로토타입 메서드와 정적 메서드를 선언하는 코드
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

function _toPropertyKey(t) {
  const i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  const e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    const i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

var Car = /*#__PURE__*/ (function () {
  function Car(name) {
    _classCallCheck(this, Car);
    this.name = name;
  }
  return _createClass(
    // Constructor
    Car,
    // protoProps
    [
      {
        // 인스턴스 메서드.
        // Car.prototype.honk = function () { ... }
        key: "honk",
        value: function honk() {
          console.log(
            "".concat(
              this.name,
              "\uC774 \uACBD\uC801\uC744 \uC6B8\uB9BD\uB2C8\uB2E4!"
            )
          );
        },
      },
      {
        // Car 객체에 속성 직접 정의
        // Object.defineProperty(Car, 'age', {
        //   get: function() { return this.carAge },
        //   set: function(value) { this.carAge = value },
        // })
        key: "age",
        get: function get() {
          return this.carAge;
        },
        set: function set(value) {
          this.carAge = value;
        },
      },
    ],
    // StaticProps
    [
      {
        // 정적 메서드.
        // Car.hello = function() { ... }
        key: "hello",
        value: function hello() {
          console.log("저는 자동차입니다");
        },
      },
    ]
  );
})();
