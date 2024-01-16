# **02장. 리액트 핵심 요소 깊게 살펴보기**

- [2.1. JSX란?](#21-jsx란)
  - [1) JSX의 정의](#1-jsx의-정의)
  - [2) JSX는 어떻게 자바스크립트에서 변환될까?](#2-jsx는-어떻게-자바스크립트에서-변환될까)

# 2.1. JSX란?

- XML과 유사한 내장형 구문.
- JS 표준인 ECMAScript의 일부가 아님 (== JS 엔진(V8, Deno 등)이나 브라우저에 의해 실행되거나 표현되도록 만들어진 구문이 아님.) 반드시 트랜스파일러 거쳐야 JS 런타임이 이해할 수 있는 JS 코드로 변환됨.
- 설계 목적: 다양한 트랜스파일러에서 다양한 속성 가진 트리 구조를 토큰화해 ECMAScript로 변환. (JSX 내부에 트리 구조로 작성한 것을 ECMAScript가 이해할 수 있는 코드로 트랜스파일)

## 1) JSX의 정의

- 구성
  - JSXElement: JSX를 구성하는 기본 요소. HTML의 element와 비슷한 역할
    - 이름으로 `:`, `.`을 이용해 여러 개 식별자 이어주는 것도 하나의 식별자로 취급함.
    - \$와 \_ 외의 특수문자로는 시작 불가 <\$><\$/>
  - JSXAttributes: JSXElement에 부여 가능한 속성
  - JSXChildren: JSXElement의 자식 값
  - JSXStrings: 따옴표로 구성된 문자열

## 2) JSX는 어떻게 자바스크립트에서 변환될까?

- JSX 코드를 @babel/plugin-transform-react-jsx로 변환한 결과
  ```jsx
  // JSX
  const ComponentA = (
    <div>
      <A required={true}>Hello World</A>;
    </div>
  );
  // 변환
  var ComponentA = React.createElement(
    "div",
    null,
    React.createElement(A, { required: true }, "Hello World")
  );
  ```
- JSXElement를 첫 번째 인수로 선언해 요소를 정의
- 옵셔널인 JSXChildren, JSXAttributes, JSXStrings는 이후 인수로 넘겨주어 처리
- JSX 반환값은 결국 React.createElement로 귀결

  ```jsx
  import { createElement, PropsWithChildren } from "react";

  // ❌ props 여부에 따라 children 요소만 달라지면 전체 내용을 삼항 연산자로 처리할 필요 없음
  function TextOrHeading({
    isHeading,
    children,
  }: PropsWithChildren<{ isHeading: boolean }>) {
    return isHeading ? (
      <h1 className="text">{children}</h1>
    ) : (
      <span className="text">{children}</span>
    );
  }

  // ⭕ JSX가 변환되는 특성 활용해 간결하게 처리 가능
  function TextOrHeading({
    isHeading,
    children,
  }: PropsWithChildren<{ isHeading: boolean }>) {
    return createElement(
      isHeading ? "h1" : "span",
      { className: "text" },
      children
    );
  }
  ```
