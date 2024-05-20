# **01장. 리액트 개발을 위해 꼭 알아야 할 자바스크립트**

- [1.1. 자바스크립트의 동등 비교](#11-자바스크립트의-동등-비교)
  - [1) 자바스크립트의 데이터 타입](#1-자바스크립트의-데이터-타입)
  - [2) 값을 저장하는 방식의 차이](#2-값을-저장하는-방식의-차이)
  - [3) 자바스크립트의 또 다른 비교 공식, Object.is](#3-자바스크립트의-또-다른-비교-공식-objectis)
  - [4) 리액트에서의 동등 비교](#4-리액트에서의-동등-비교)
- [1.2. 함수](#12-함수)
  - [1) 함수란 무엇인가](#1-함수란-무엇인가)
  - [2) 함수를 정의하는 4가지 방법](#2-함수를-정의하는-4가지-방법)
  - [3) 다양한 함수 살펴보기](#3-다양한-함수-살펴보기)
  - [4) 함수 만들 때 주의사항](#4-함수-만들-때-주의사항)
- [1.3. 클래스](#13-클래스)
  - [1) 클래스란 무엇인가](#1-클래스란-무엇인가)
  - [2) 클래스와 함수의 관계](#2-클래스와-함수의-관계)

# 1.1. 자바스크립트의 동등 비교

## 1) 자바스크립트의 데이터 타입

- 원시 타입: 객체가 아닌 모든 타입
  - `undefined`: 선언했지만 할당되지 않은 값
  - `null`: 명시적으로 비어 있음을 나타내는 값
    ```tsx
    // 버그이나 breaking change라 변경 X
    typeof null === "object";
    ```
  - `boolean`: 참이나 거짓
    - falsy한 값
      | 값 | 타입 |
      | ------------------- | -------------- |
      | false | Boolean |
      | 0, -0, 0n, 0x, 0x0n | Number, BigInt |
      | NaN (Not a Number) | Number |
      | '’, “”, `` | String |
      | null | null |
      | undefined | undefined |
    - truty한 값
      - 위의 표 이외의 값.
      - 객체, 배열 ({}, [])
  - `number`: 수.
  - `bigint`: 크기 한계 때문에 BigInt 등장
  - `string`: 백틱 사용한 문자열을 템플릿 리터럴이라고 함.
  - `symbol`: 중복되지 않는 고유한 값 나타냄. Symbol()로 생성.
    ```tsx
    // 심벌 함수 내부에 넘겨주는 값은 Symbol 생성에 영향 안 미침
    // -> 같은 인수 넘겨줘도 동일한 값으로 인정 안 됨
    Symbol("key") === Symbol("key"); // false
    // Symbol.for를 활용하면 동일한 값 사용 가능
    Symbol.for("hello") === Symbol.for("hello"); // true
    Symbol.for("hello") === Symbol.for("hi"); // false
    ```
- 객체 타입: 참조를 전달해 참조 타입(reference type)이라 불림. `object`

## 2) 값을 저장하는 방식의 차이

- 원시 타입
  - 불변 형태. 값을 저장. 값은 변수 할당 시점에 메모리 영역 차지하고 저장.
  - 동등 비교 시 값 비교
- 객체 타입
  - 가변 형태. 참조를 저장. 프로퍼티 삭제, 추가, 수정 가능.
  - 동등 비교 시 참조 비교

## 3) 자바스크립트의 또 다른 비교 공식, Object.is

- `==`: 동등 비교 전 강제 형변환(type casting) 수행해 타입 달라도 값 같으면 true
- `===`: 형변환 없이 타입과 값 비교
- `Object.is`: ===의 한계 극복하기 위해 만들어짐

  ```tsx
  -0 === +0; // true
  Object.is(-0, +0); // false

  Number.NaN === NaN; // false
  Object.is(Number.NaN, NaN); // true

  NaN === 0 / 0; // false
  Object.is(NaN, 0 / 0); // true
  ```

## 4) 리액트에서의 동등 비교

- [리액트 shallowEqual.js 코드](https://github.com/facebook/react/blob/main/packages/shared/shallowEqual.js)
- 주어진 객체의 키 순회하며 두 값이 엄격한 동등성 가지는지 확인, 전부 동일하면 true 반환
- Object.is로 비교 → Object.is에서 수행 못하는 객체 간 얕은 비교(첫 번째 깊이의 값만 비교) 수행
  - 1 depth만 비교하는 이유
    - JSX props는 객체이고, 이 props만 일차적으로 비교하면 되기 때문.
    - → props에 또 다른 객체 넣어주면 얕은 비교까지만 하기 때문에 의도한 대로 작동하지 않음 유의하기

<br />

```markdown
# summary 💡

값을 저장하는 원시타입, 참조를 저장하는 객체타입
리액트에서는 객체의 첫 번째 깊이까지만 값 동등 비교함.
```

---

# 1.2. 함수

## 1) 함수란 무엇인가

- 작업을 수행하거나 값을 계산하는 등의 과정을 표현하고, 이를 하나의 블록으로 감싸 실행 단위로 만들어 놓은 것
  ```tsx
  function 함수명(매개변수) {
    return 반환값;
  } // 함수 정의
  함수명(인수); // 함수 호출
  ```
- 일급 객체(다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체)
  - 다른 함수의 매개변수, 반환값, 할당값으로 사용 가능

## 2) 함수를 정의하는 4가지 방법

- **함수 선언문**: `function 함수명(매개변수) { return 반환값 }`
  - 함수가 호이스팅됨 → 함수 선언 위치와 상관 없이 어디서든 호출 가능. 선언 전 호출 가능
    > 호이스팅: 함수 선언을 실행 전에 메모리에 미리 등록. 선언문이 코드 맨 앞에 작성된 것처럼 작동함.
- **함수 표현식**: `var 함수명 = function(매개변수) { return 반환값 }`
  - 변수가 호이스팅됨 → 호이스팅 시점에서는 undefined로 초기화. 런타임 시점(할당문이 실행되는 시점)에야 함수 할당돼 작동.
- **Function 생성자**: `const add = new Function(’a’, ‘b’, ‘return a + b’)` 권장 X
- **화살표 함수**: `const add = (a, b) => {return a + b}`
  - 생성자 함수로 사용 X
  - arguments 존재 X
  - this 바인딩
    - 함수 선언 시점에 정적으로 결정 - 화살표 함수 내부에서 this 참조 시 상위 스코프의 this를 따름
    - cf) 일반함수: 함수 호출에 따라 동적으로 결정. - 호출하는 런타임 시점에 결정되는 this 따름

## 3) 다양한 함수 살펴보기

- **즉시 실행 함수**(IIFE, Immediately Invoked Function Expression): 정의 즉시 실행되는 함수
  - 한 번만 호출되고 다시 호출 불가
  - 글로벌 스코프 오염시키지 않는 독립적인 함수 스코프 운용 가능
  ```tsx
  (
  	(a, b) => { return a + b },
  )(10, 24) // 34
  ```
- **고차 함수**(Higher Order Function): 함수를 인수로 받거나 결과로 새로운 함수를 반환시키는 함수. (함수의 일급 객체 특성 활용)

  - 고차 함수 특징 활용해 고차 컴포넌트(HOC, Higher Order Component. 함수형 컴포넌트를 인수로 받아 새로운 함수형 컴포넌트 반환) 만들 수 있음.

  ```tsx
  // map은 함수를 매개변수로 받는 대표적인 고차 함수임.
  const doubledArray = [1, 2, 3].map((item) => item * 2);

  // 함수를 반환하는 고차 함수의 예
  const add = function (a) {
    // a가 존재하는 클로저 생성
    return function (b) {
      // b를 인수로 받아 두 합을 반환하는 또 다른 함수 생성
      return a + b;
    };
  };
  add(1)(3); // 4
  ```

## 4) 함수 만들 때 주의사항

- 함수의 부수 효과(side effect) 최대한 억제. 동일한 인수 받으면 동일한 결과 반환해야만. useEffect 최소화
- 함수를 가능한 한 작게 만들기
- 누구나 이해 가능한 이름 붙이기

<br />

```markdown
# summary 💡

함수는 일급 객체
화살표 함수, 즉시 실행 함수, 고차 함수 등 존재
```

---

<br />

# 1.3. 클래스

## 1) 클래스란 무엇인가

- : 특정한 객체를 만들기 위한 일종의 템플릿
- 클래스 내부 특징
  - `constructor`: 생성자. 객체 생성하는 데 사용하는 메서드.
    - 단 하나만 존재 가능.
    - 생략 가능
    - 최초 생성 시 어떤 인수 받을지 결정 가능
    - 객체를 초기화하는 용도로 사용하기도
  - `property`: 클래스로 인스턴스 생성할 때 내부에 정의할 수 있는 속성값
    - #을 붙여 private 선언 가능
    - 타입스크립트 사용 시 private, protected, public 다 사용 가능하나 JS에서는 기본적으로 모든 프로퍼티가 public임
  - `instance method`: 클래스 내부에서 선언한 메서드.
    - JS의 prototype에 선언돼 프로토타입 메서드로도 불림.
    - 프로토타입 체이닝: 객체에서 직접 선언하지 않았음에도 프로토타입에 있는 메서드를 찾아 실행을 도와줌.
      > e.g.) toSting - 객체 어디에서도 선언하는 경우가 없지만 대부분의 객체에서 모두 사용 가능
  - `static method`: 정적 메서드. 클래스의 인스턴스가 아닌 이름으로 호출할 수 있는 메서드.
    - this 사용 불가: 정적 메서드 내부의 this는 클래스로 생성된 인스턴스가 아닌 클래스 자신을 가리키기 때문.
      - 리액트 클래스형 컴포넌트 생명주기 메서드인 static getDerivedStateFromProps(props, state)에서는 this.state에 접근 불가
    - 인스턴스를 생성하지 않아도 사용 가능
    - 객체를 생성하지 않더라도 여러 곳에서 재사용 가능
    - → 애플리케이션 전역에서 사용하는 유틸 함수를 정적 메서드로 활용하는 편
  - `setter`: 클래스 필드에 값 할당할 때 사용.
  - `getter`: 클래스에서 값 가져올 때 사용.
  - `extends`: 상속. 기존 클래스를 상속받아 자식 클래스에서 확장
  ```tsx
  class Car {
    // 생성자.
    // const myCar = new Car(’자동차’)
    constructor(name) {
  		// 프로퍼티
      this.name = name;
    }
    // 인스턴스 메서드.
    // myCar.honk()로 사용
    honk() {
      console.log(`${this.name}이 경적을 울립니다!`);
    }
    // 정적 메서드.
    // 클래스에서 직접 호출: Car.hello()
    // 클래스로 만든 객체에서는 호출 불가: myCar.hello()하면 오류
    static hello() {
      console.log("저는 자동차입니다");
    }
    // setter.
    // 값 할당 가능. myCar.age = 32
    set age(value) {
      this.carAge = value;
    }
    // getter.
    // console.log(myCar.age, myCar.name)
    get age() {
      return this.carAge;
    }
  }
  // 상속
  class Truck extends Car{ ... }
  ```

## 2) 클래스와 함수의 관계

- 클래스는 프로토타입을 기반으로 작동.
- 클래스는 객체지향 언어를 사용하던 프로그래머가 JS에 쉽게 접근하도록 만들어주는 문법적 설탕 역할.
- [위의 클래스 코드를 babel로 변환한 결과 코드](./classConvertedByBabel.js)

<br/>

```markdown
# summary 💡

클래스는 프로토타입을 기반으로 작동하는 문법적 설탕
constructor, property,
instance method(프로토타입 메서드), static method(인스턴스 생성 안 해도 돼서 재사용 용이, this 사용 불가),
setter, getter, extends
```
