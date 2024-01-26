# **02장. 리액트 핵심 요소 깊게 살펴보기**

- [2.1. JSX란?](#21-jsx란)
  - [1) JSX의 정의](#1-jsx의-정의)
  - [2) JSX는 어떻게 자바스크립트에서 변환될까?](#2-jsx는-어떻게-자바스크립트에서-변환될까)
- [2.2. 가상 DOM과 리액트 파이버](#22-가상-dom과-리액트-파이버)
  - [1) DOM과 브라우저 렌더링 과정](#1-dom과-브라우저-렌더링-과정)
  - [2) 가상 DOM의 탄생 배경](#2-가상-dom의-탄생-배경)
  - [3) 가상 DOM을 위한 아키텍처, 리액트 파이버](#3-가상-dom을-위한-아키텍처-리액트-파이버)
- [2.3. 클래스형 컴포넌트와 함수형 컴포넌트](#23-클래스형-컴포넌트와-함수형-컴포넌트)
  - [1) 클래스형 컴포넌트](#1-클래스형-컴포넌트)
  - [2) 함수형 컴포넌트 vs 클래스형 컴포넌트](#2-함수형-컴포넌트-vs-클래스형-컴포넌트)

# 2.1. JSX란?

- XML과 유사한 내장형 구문.
- JS 표준인 ECMAScript의 일부가 아님 (== JS 엔진(V8, Deno 등)이나 브라우저에 의해 실행되거나 표현되도록 만들어진 구문이 아님.) 반드시 트랜스파일러 거쳐야 JS 런타임이 이해할 수 있는 JS 코드로 변환됨.
- 설계 목적: 다양한 트랜스파일러에서 다양한 속성 가진 트리 구조를 토큰화해 ECMAScript로 변환. (JSX 내부에 트리 구조로 작성한 것을 ECMAScript가 이해할 수 있는 코드로 트랜스파일)

## 1) JSX의 정의

- 구성
  - JSXElement: JSX를 구성하는 기본 요소. HTML의 element와 비슷한 역할
    - 이름으로 `:`, `.`을 이용해 여러 개 식별자 이어주는 것도 하나의 식별자로 취급함.
    - `$`와 `_` 외의 특수문자로는 시작 불가 <\$><\$/>
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

<br />

---

<br />

# 2.2. 가상 DOM과 리액트 파이버

## 1) DOM과 브라우저 렌더링 과정

- DOM(Document Object Model): 웹페이지에 대한 인터페이스. 브라우저가 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에 대한 정보 담음.
- 브라우저 렌더링 과정
  1. 브라우저가 사용자가 요청한 주소 방문, HTML 파일 다운로드
  2. 브라우저의 렌더링 엔진이 HTML 파싱 → DOM 노드로 구성된 트리(DOM) 만듦
  3. 2번 과정에서 CSS 파일 만나면 다운로드함
  4. 브라우저의 렌더링 엔진이 CSS 파싱 → CSS 노드로 구성된 트리(CSSOM) 만듦
  5. 2번에서 만든 DOM 노드 순회 - 사용자 눈에 보이는 노드만 방문(트리 분석 속도 향상 위해).
  6. 5에서 순회한 노드에 대한 CSSOM 정보 찾아 CSS 스타일 정보 적용.
     1. 레이아웃: 좌표 계산
     2. 페인팅: 색 등 실제 유효한 모습 그림

## 2) 가상 DOM의 탄생 배경

- 렌더링 완료 후에도 사용자 인터렉션으로 웹페이지 변경되는 상황 고려해야 할 필요성
- 가상 DOM:
  - 웹페이지가 표시해야 할 DOM을 일단 메모리에 저장하고 react-dom이 변경에 대한 준비가 되면 실제 브라우저의 DOM에 반영.
  - DOM 계산을 메모리에서 계산하는 과정을 거쳐 렌더링 과정 최소화, 브라우저와 개발자 부담 덞
  - 리액트의 가상 DOM이 일반적 DOM 관리하는 브라우저보다 무조건 빠른 건 아니고, 대부분 상황에서 합리적으로 빨라 채택

## 3) 가상 DOM을 위한 아키텍처, 리액트 파이버

### 🍭 **리액트 파이버(React Fiber)**

- : 리액트에서 관리하는 JS 객체. 리액트 컴포넌트 정보를 1:1로 가짐.
- 파이버 재조정자(가상 DOM과 실제 DOM 비교해 차이 있으면 렌더링 요청)가 관리.
- 할 수 있는 일 (비동기적 수행)
  - 작업 작은 단위로 분할, 우선순위 매김
  - 작업 일시 중지 및 재개
  - 이전 작업 재사용 혹은 폐기
- 작업 단계
  - 렌더 단계 - 비동기적. 사용자에게 노출되지 않는 모든 작업 수행 (위의 할 수 있는 일 수행). 작업 단위 하나씩 처리 후 finishedWork() 로 마무리.
  - 커밋 단계 - 동기적. 중단 불가. commitWork() 수행해 DOM에 실제 변경 사항 반영. (메모리상에서 먼저 수행한 최종적 결과물을 브라우저 DOM에 적용)
- 컴포넌트 최초 마운트 시점에 생성, 가급적 재사용함(업데이트된 prop 받아 내부적 처리).
- 리액트는 UI를 값으로 관리함

### 🍭 **리액트 파이버 트리**

- 종류 (더블 버퍼링을 위해 2종류 존재)
  1. current 트리: 현재 모습 담음. UI 렌더링 위해 존재함.
  2. workInProgress 트리: 작업 중 상태 나타냄
     - 작업 끝나면 포인터 바꿔 현재 트리로 변경함: ‘더블 버퍼링’
- 더블 버퍼링
  - 보이지 않는 곳에서 그다음에 그려야 할 그림 미리 그리고, 완성되면 현재 상태를 새 그림으로 바꿈
  - 불완전한 트리를 사용자에게 노출하지 않기 위해 쓰는 기법
  - 커밋 단계에서 수행
  - current 트리에서 업데이트(setState 등) 발생 시 workInProgress 트리 빌드 → 빌드 끝나면 다음 렌더링에 사용 → UI에 렌더링 완료되면 이걸 current로 변경

### 🍭 **파이버 작업 순서**

1. beginWork() 함수 실행해 파이버 작업 수행. 트리 형식으로 자식 없는 파이버 만날 때까지 수행.
2. completeWork() 함수 실행해 파이버 작업 완료.
3. 형제 있으면 형제로 넘어감
4. 2, 3 다 끝나면 return으로 돌아가 종료 알림

<br />

---

<br />

# 2.3. 클래스형 컴포넌트와 함수형 컴포넌트

## 1) 클래스형 컴포넌트

### 🍭 클래스형 컴포넌트의 생명주기 메서드

- 생명주기 메서드가 실행되는 시점
  - 마운트: 컴포넌트가 마운팅(생성)되는 시점
  - 업데이트: 이미 생성된 컴포넌트의 내용이 변경(업데이트)되는 시점
  - 언마운트: 컴포넌트가 더이상 존재하지 않는 시점
- 생명주기 메서드

  - 정상적 생명주기에서 실행되는 메서드
    - `render()`: 컴포넌트가 UI를 렌더링하기 위해 사용
      - 마운트, 업데이트 과정에서 발생
      - 항상 순수해야 함. 부수 효과 없어야. (내부에서 state 직접 변경 불가)
    - `componentDidMount()`
      - 컴포넌트가 마운트되고 준비되는 즉시 실행
      - 내부에서 state 변경 가능, 그 즉시 재렌더링 시도 (브라우저가 UI를 실제로 업데이트하기 전에 해서 사용자가 모름)
        - state 변경은 성능 문제 발생 가능하니 생성자에서 하는 게 좋음. API 호출 후 업데이트, DOM에 의존적인 작업 등을 위해 state 변경이 허용되는 것이지 권장이 아님
    - `componentDidUpdate()`: state, props의 변화에 따라 DOM 업데이트하는 거에 사용
      - 컴포넌트 업데이트가 일어난 이후 바로 실행
      - 내부에서 state 변경 가능하나 적절한 조건문으로 안 감싸면 this.setState 계속 호출될 가능성
    - `componentWillUnmount()`
      - 컴포넌트가 언마운트되거나 더 이상 사용되지 않기 직전에 호출
      - 메모리 누수나 불필요한 작동을 막기 위한 클린업 함수를 호출하기 위한 최적의 위치
      - 내부에서 this.setState 호출 불가능 (state 직접 변경 불가)
    - `shouldComponentUpdate()`: 컴포넌트가 state나 props의 변경으로 리렌더링되는 것을 막고싶을 때 사용
      - 특정한 성능 최적화 상황에서만 고려해야
      - Component와 달리 PureComponent는 state 값에 대해 얕은 비교를 수행해 결과가 다를 때만 렌더링을 수행
    - `static getDerivedStateFromProps()`: props에 따라 state 변경하고 싶을 때 사용
      - 모든 render() 실행 시, render() 호출 직전에 호출
      - static으로 선언되어 this에 접근 불가
    - `getSnapShotBeforeUpdate()`
      - DOM이 업데이트되기 직전에 호출
      - 반환 값은 componentDidUpdate로 전달
  - 에러 상황에서 실행되는 메서드
    - 주로 ErrorBoundary 만들기 위한 목적으로 사용. 에러가 발생한 컴포넌트 트리 영역만 별도 처리해 애플리케이션 전체에 에러가 전파돼 표시되는 것을 방지 가능
    - `getDerivedStateFromError()`: 자식 컴포넌트에서 에러 발생 시 호출
      - 렌더링 과정에서 호출 → 부수 효과 발생시키면 안 됨
      - static 메서드로, error(하위 컴포넌트에서 발생한 에러)를 인수로 받음
      - 하위 컴포넌트에서 에러 발생 시 자식 리액트 컴포넌트를 어떻게 렌더링할지 결정하는 용도 → 반드시 미리 정의해 둔 state 값을 반환해야
    - `componentDidCatch()` : 자식 컴포넌트에서 에러 발생 시 실행
      - getDerivedStateFromError에서 에러 잡고 state를 결정한 이후에 실행
      - 커밋 단계에서 실행 → 부수 효과 수행 가능
      - 인수
        - error: getDerivedStateFromError와 동일한 error
        - info: 어떤 컴포넌트가 에러를 발생시켰는지

- 리액트 생명주기 다이어그램  
  ![image](https://github.com/seohyun319/Books-I-read/assets/76686872/f290134d-40d1-40ea-a7cb-7873ac2dd528)
  https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

### 🍭 클래스형 컴포넌트의 한계

- 데이터 흐름 추적 어려움: 코드 읽는 과정에서 state 흐름 추적 어려움. 서로 다른 여러 메서드에서 state 업데이트 일어날 수도.
- 애플리케이션 내부 로직 재사용 어려움: 공통 로직 많아질 수록 wrapper 지옥 (감싸는 고차 컴포넌트나 props가 많아짐) 발생 가능성 커짐
- 기능 많아질수록 컴포넌트 크기 커짐
- 함수에 비해 상대적으로 어려운 클래스
- 코드 크기 최적화 어려움
- 핫 리로딩 상대적 불리: state를 클로저에 저장해두는 함수형 컴포넌트와 달리 클래스형 컴포넌트는 state를 instance 내부에서 관리. 이 instance 내부의 render를 수정한 걸 반영하려면 instance를 새로 만드는 수밖에 → 초기화됨

## 2) 함수형 컴포넌트 vs 클래스형 컴포넌트

- 생명주기 메서드
  - 클래스형 컴포넌트: render 메서드가 있는 React.Component를 상속받아 구현하는 JS 클래스 → React.Component에서 오는 생명주기 메서드 사용
  - 함수형 컴포넌트: props를 받아 단순히 리액트 요소반 반환하는 함수 → 생명주기 메서드 필요 없음. useEffect 훅 사용해 생명주기 메서드를 ‘비슷하게’ 구현 가능
- 렌더링된 값
  - 클래스형 컴포넌트: 렌더링된 값 고정 X.
    - props 값을 this에서 가져옴. this가 가리키는 객체(컴포넌트의 인스턴스의 멤버)는 변경 가능한(mutable) 값.
    - this 기준 렌더링. this는 시간 흐름에 따라 변화
  - 함수형 컴포넌트: 렌더링된 값 고정 O.
    - props를 인수로 받아 값 변경 불가.
    - props, state 기준 렌더링. props, state가 변경되면 함수 다시 호출
