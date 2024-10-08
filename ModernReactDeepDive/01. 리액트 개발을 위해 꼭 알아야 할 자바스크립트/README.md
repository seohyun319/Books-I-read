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
- [1.4. 클로저](#14-클로저)
  - [1) 클로저의 정의](#1-클로저의-정의)
  - [2) 변수의 유효 범위, 스코프](#2-변수의-유효-범위-스코프)
  - [3) 주의할 점](#3-주의할-점)
- [1.5. 이벤트 루프와 비동기 통신의 이해](#15-이벤트-루프와-비동기-통신의-이해)
  - [1) 싱글 스레드 자바스크립트](#1-싱글-스레드-자바스크립트)
  - [2) 이벤트 루프란?](#2-이벤트-루프란)
  - [3) 태스크 큐와 마이크로 태스크 큐](#3-태스크-큐와-마이크로-태스크-큐)
- [1.6. 리액트에서 자주 사용하는 자바스크립트 문법](#16-리액트에서-자주-사용하는-자바스크립트-문법)
  - [1) 구조 분해 할당(Destructuring assignment)](#1-구조-분해-할당destructuring-assignment)
  - [2) 전개 구문](#2-전개-구문)
  - [3) 객체 초기자](#3-객체-초기자)
  - [4) Array 프로토타입의 메서드: map, filter, reduce, forEach](#4-array-프로토타입의-메서드-map-filter-reduce-foreach)
  - [5) 삼항 조건 연산자](#5-삼항-조건-연산자)
- [1.7. 선택이 아닌 필수, 타입스크립트](#17-선택이-아닌-필수-타입스크립트)
  - [1) 타입스크립트란](#1-타입스크립트란)
  - [2) 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법](#2-리액트-코드를-효과적으로-작성하기-위한-타입스크립트-활용법)
  - [3) 타입스크립트 전환 가이드](#3-타입스크립트-전환-가이드)

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

---

# 1.4. 클로저

## 1) 클로저의 정의

- 함수와 함수가 선언된 어휘적 환경(Lexical Scope)의 조합
  > 선언된 어휘적 환경: 변수가 코드 내부 어디에 선언됐는지.
- 코드가 작성된 순간에 정적으로 결정
  - cf) 호출되는 방식에 따라 동적으로 결정되는 this
- 리액트에서의 사용 예시: useState
  - 외부 함수(useState)가 반환한 내부함수(setState)는 외부 함수(useState) 호출이 끝났음에도 자신이 선언된 외부 함수가 선언된 환경을 기억하기에 state값 계속 사용 가능

## 2) 변수의 유효 범위, 스코프

- 전역 스코프(global scope): 어디서든 호출 가능
  - 브라우저 환경 - 전역 객체: window
  - node.js 환경 - 전역 객체: gloabl
- 함수 스코프: JS가 기본적으로 따르는 스코프

## 3) 주의할 점

- 비용 발생: 클로저가 생성될 때마다 그 선언적 환경을 기억해야 하는 추가 비용 발생
- → 메모리, 성능에의 악영향 주의

<br />

```markdown
# summary 💡

클로저 - Lexical scope의 조합.
함수 스코프 기억하는 비용 발생
```

---

# 1.5. 이벤트 루프와 비동기 통신의 이해

## 1) 싱글 스레드 자바스크립트

- 프로세스: 프로그램을 구동해 프로그램의 상태가 메모리상에서 실행되는 작업 단위
- 스레드: 더 작은 실행 단위. 하나의 프로세스 안에 여러 개의 스레드 만들 수 있고, 스레드끼리는 메모리 공유 가능해 여러 작업 동시 처리 가능.
  - 멀티 스레드 단점 - 동시성 처리 복잡, 하나의 스레드에 문제 생기면 같은 자원 공유하는 다른 스레드에도 동시에 문제 발생 가능
  - 싱글 스레드: 코드 실행이 하나의 스레드에서 순차적으로 이루어짐. 한 번에 하나의 작업 수행
    - Run-to-completion. 모든 코드는 동기식으로 한 번에 하나씩 순차적으로 처리됨.
      - 장점: 동시성 고민할 필요 없음
      - 단점: 하나의 작업 끝나기 전까지는 다른 작업 실행되지 않기에 특정 작업이 오래 걸린다면 웹페이지가 멈춘 듯한 느낌을 줌.
        > 최근 Node.js에서 새로 추가된 Worker나 브라우저에서 제공하는 WebWorker를 활용하면 동시에 여러 작업 처리 가능

## 2) 이벤트 루프란?

- JS 런타임 외부에서 JS의 비동기 실행을 돕기 위해 만들어진 장치
- 호출 스택이 비어있는지 여부 확인. 호출 스택에 수행해야 할 코드가 있다면 자바스크립트 엔진을 이용해 실행.
  > 호출 스택: JS에서 수행해야 할 코드나 함수를 순차적으로 담아두는 스택
- ‘코드 실행’과 ‘호출 스택이 비어있는지 확인’하는 작업 모두 단일 스레드에서 실행. 동시에 일어날 수 없고, 순차적으로 일어남.
- 호출 스택에 함수를 담음 → 함수 및 코드 실행 → 다음 코드 실행 → 실행 다 하면 호출 스택에서 제거 → 다음 함수를 호출 스택에 담음
- 비동기 이벤트는 태스크 큐로 들어가고, 호출 스택에서 바로 제거됨. 호출 스택이 완전히 비었을 때 태스크 큐에서 호출 스택으로 들여보냄.
  > 태스크 큐: 실행해야 할 태스크의 집합. set 형태. 선택된 큐 중에서 실행 가능한 가장 오래된 태스크 가져옴.
  - 비동기 함수는 메인 스레드 말고 태스크 큐가 할당되는 별도의 스레드에서 수행됨. 브라우저나 Node.js가 태스크 큐에 작업 할당해 처리. JS 코드 외부에서 실행되고 콜백이 태스크 큐로 들어감.
- → 호출 스택에 실행중인 코드가 있는지, 태스크 큐에 대기 중인 함수가 있는지 반복 확인.

## 3) 태스크 큐와 마이크로 태스크 큐

- 태스크 큐: setTimeOut, setInterval, setImmediate
- 마이크로 태스크 큐: Promises, MutationObserver, process.nextTick, queueMicroTask
  - 태스크 큐보다 우선권 지님.
  - Promise의 then에 전달된 콜백이 마이크로 태스크 큐에 담기고 setTimeout 콜백보다 먼저 실행. Promises 자체라기보다는 then에 전달된 콜백임.
- 렌더링 실행 시기: 마이크로 태스크 큐 실행 → 렌더링 → 태스크 큐 실행.
  - 각 마이크로 태스크 큐 작업이 끝날 때마다 한 번씩 렌더링할 기회를 얻음

<br />

```markdown
# summary 💡

싱글 스레드 자바스크립트는 태스크 큐, 이벤트 루프, 마이크로 태스크 큐로 이벤트 처리
```

---

# 1.6. 리액트에서 자주 사용하는 자바스크립트 문법

## 1) 구조 분해 할당(Destructuring assignment)

- 배열 또는 객체의 값을 분해해 개별 변수에 즉시 할당
- 배열 구조 분해 할당

  ```tsx
  // before
  const array = [undefined, 2, 3, 4, 5];
  const [first = 6, , third, ...arrayRest] = array;
  // 기본값 선언은 undefined인 경우에만 적용. first는 6이 됨.

  // after transfiled by Babel
  var array = [undefined, 2, 3, 4, 5];
  var _array$ = array[0],
    first = _array$ === void 0 ? 6 : _array$,
    third = array[2],
    arrayRest = array.slice(3);
  ```

- 객체 구조 분해 할당

  - 내부 이름으로 꺼내온다는 차이점.
  - 변수에 있는 값으로 꺼내오는 방식(계산된 속성 이름 방식)도 가능

    ```tsx
    const key = "a";
    const object = {
      a: 1,
      b: 1,
    };

    const { [key]: a } = object;
    // a = 1
    ```

  - [바벨 트랜스파일링 전후 코드 보러 가기](./objectDestructuringConvertedByBabel.js)
  - 트랜스파일링 거치면 번들링 크기가 상대적으로 크기에 개발 환경이 ES5를 고려해야 하고 객체 구조 분해 할당을 자주 쓰지 않는 경우 꼭 써야 하는지 고려 필요
  - 객체 구조 분해 할당 통한 …rest 함수 필요하다면 [lodash.omit](https://lodash.com/docs/4.17.15#omit)이나 [ramda.omit](https://github.com/ramda/ramda/blob/v0.28.0/source/omit.js)같은 라이브러리를 고려해보는 게 나음.

## 2) 전개 구문

- 배열이나 객체, 문자열과 같이 순회할 수 있는 값을 전개해 간결하게 사용할 수 있는 구문
- 배열의 전개 구문
  ```tsx
  const arr1 = ["a", "b"];
  const arr2 = [...arr1];
  arr1 === arr2; // false. 값만 복사하고 참조는 다름.
  const arr3 = [...arr1, "c", "d"]; //["a", "b", "c", "d"]
  ```
  - 트랜스파일링 → 값 단순 복사
- 객체의 전개 구문
  ```tsx
  const obj1 = { a: 1, b: 2 };
  const obj2 = { b: 4, c: 3 };
  const newObj = { ...obj1, ...obj2 };
  // 값 덮어쓰기 되기에 순서 주의
  // { "a": 1, "b": 4, "c": 3 }
  ```
  - 트랜스파일링 → 객체의 속성값 및 설명자 확인, 심벌 체크 등
    - [트랜파일링 전후 코드 보러 가기](./objectSpreadConvertedByBabel.js)

## 3) 객체 초기자

- 객체 선언할 때 객체에 넣고자 하는 키와 값을 가지고 있는 변수가 이미 존재한다면 해당 값을 간결하게 넣어줄 수 있는 방식
- 객체를 좀 더 간편하게 선언할 수 있어 유용함. 트랜스파일 이후에도 큰 부담이 없음.

```tsx
// before
const a = 1;
const b = 2;
// 객체 초기자. a: a 방식 말고 a로 넣을 수 있음.
const obj = {
  a,
  b,
};

// after
var a = 1;
var b = 2;
var obj = {
  a: a,
  b: b,
};
```

## 4) Array 프로토타입의 메서드: map, filter, reduce, forEach

- ES5부터 사용한 문법이라 별도의 트랜스파일이나 폴리필이 없어도 부담 없이 사용 가능
- Array.prototype.`map`: 배열의 각 아이템을 순회하며 각 아이템을 콜백으로 연산한 결과로 구성된 새로운 배열 반환
- Array.prototype.`filter`: 기존 배열에 대해 어떤 조건을 만족하는 새로운 배열 반환. 콜백 함수의 truthy 조건 만족하는 경우에만 해당 원소 반환. 필터링.
- Array.prototype.`reduce`: reducer 콜백 함수를 실행하고, 이를 초깃값에 누적해 결과 반환.
  ```tsx
  const arr = [1, 2, 3, 4, 5];
  // reducer 콜백함수의 첫 번째 인수: 앞서 선언한 초깃값의 현재값.
  // 두 번째 인수: 현재 배열의 아이템
  const sum = arr.reduce((result, item) => {
    return result + item;
  }, 0);
  ```
- Array.prototype.`forEach`: 배열 순회하며 콜백 함수를 실행하기만 하는 메서드. 반환값 없음. 에러를 던지거나 프로세스를 종료하지 않는 이상 break, return 등 뭘 사용해도 멈출 수 없음. return이 함수의 return이 아닌 콜백 함수의 return으로 간주되기 때문.

## 5) 삼항 조건 연산자

- 조건문 ? 참일*때*값 : 거짓일*때*값

<br />

```markdown
# summary 💡

...: 구조 분해 할당, 전개 구문
객체 초기자
map, filter, reduce, forEach
```

---

# 1.7. 선택이 아닌 필수, 타입스크립트

## 1) 타입스크립트란

- 기존 자바스크립트 문법에 타입을 가미한 자바스크립트의 슈퍼셋

## 2) 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법

- any 대신 unknown을 사용하자 - 불가피하게 타입을 단정할 수 없는 경우에 사용.
  - unknown: 모든 값을 할당할 수 있음. top type. 근데 any와 다르게 이 값을 바로 사용하는 것은 불가. 타입을 좁혀야 함. if (typeof callback === ‘function’) 이런 식으로.
  - never: 어떠한 타입도 들어올 수 없음. bottom type.
- 타입 가드를 적극 활용하자
  - instanceof: 지정한 인스턴스가 특정 클래스의 인스턴스인지 확인
  - typeof: 특정 요소에 대한 자료형 확인
  - in: 어떤 객체에 키가 존재하는지 확인. property in object 형태로 사용. if (’age’ in person) 이런 식.
- 제네릭(generic)

  - 함수나 클래스 내부에서 다양한 타입에 대응할 수 있도록 도와줌. 타입만 다른 비슷한 작업을 하는 컴포넌트를 단일 제네릭 컴포넌트로 선언해 간결하게 작성 가능.

  ```tsx
  const [state, useState] = useState<string>("");

  function multipleGeneric<First, Last>(a1: First, a2: Last): [First, Last] {
    return [a1, a2];
  }
  const [a, b] = multipleGeneric<string, boolean>("true", true);
  ```

- 인덱스 시그니처: 객체의 키를 정의하는 방식. 키에 원하는 타입 부여 가능해 동적인 객체 정의할 때 유용.

  - 객체의 키 타입을 좁히는 법

    ```tsx
    // record를 사용
    type Hello = Record<"hello" | "hi", string>;

    const hello: Hello = {
      hello: "hello",
      hi: "hi",
    };

    // 타입을 사용한 인덱스 시그니처
    type Hello = { [key in "hello | hi"]: string };

    const hello: Hello = {
      hello: "hello",
      hi: "hi",
    };
    ```

## 3) 타입스크립트 전환 가이드

- tsconfig.json 먼저 작성하기
- JSDoc과 @ts-check를 활용해 점진적으로 전환하기
- 타입 기반 라이브러리 사용을 위해 @types 모듈 설치하기
- 파일 단위로 조금씩 전환하기
