# **01장. 리액트 개발을 위해 꼭 알아야 할 자바스크립트**

- [1.1. 자바스크립트의 동등 비교](#11-자바스크립트의-동등-비교)
  - [1) 자바스크립트의 데이터 타입](#1-자바스크립트의-데이터-타입)
  - [2) 값을 저장하는 방식의 차이](#2-값을-저장하는-방식의-차이)
  - [3) 자바스크립트의 또 다른 비교 공식, Object.is](#3-자바스크립트의-또-다른-비교-공식-objectis)
  - [4) 리액트에서의 동등 비교](#4-리액트에서의-동등-비교)

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

<aside>
💡 <br />값을 저장하는 원시타입, 참조를 저장하는 객체타입<br />
리액트에서는 객체의 첫 번째 깊이까지만 값 동등 비교함.

</aside>

<br />
