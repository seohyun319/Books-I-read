# 3.1. 리액트의 모든 훅 파헤치기

## 1) useState

- 리액트에서는 렌더링이 실행될 때마다 함수형 컴포넌트의 함수가 다시 실행됨 → useState의 초기값을 함수로 설정해두면 ‘게으른 초기화’ 가능.
- 무거운 연산(localStorage 및 sessionStorage 접근, map, filter, find같은 배열 접근, 초깃값 계산 위해 함수 호출 필요한 상황 등)이 요구되거나 실행 비용이 많이 드는 경우 게으른 초기화를 사용하는 게 좋음.
- 클로저 내부에 useState 정보 저장해두는 방식으로 작동.

## 2) useEffect

- 렌더링할 때마다 의존성에 있는 값을 보면서 이 의존성의 값이 이전과 다른 게 하나라도 있으면 부수 효과를 실행하는 평범한 함수
- state와 props의 변화 속에서 일어나는 렌더링 과정에서 실행되는 부수 효과 함수
- 클린업 함수
  - useEffect는 그 콜백이 실행될 때마다 클린업 함수가 존재한다면 그 클린업 함수를 실행한 뒤에 콜백을 실행
  - 이벤트를 추가하기 전에 이전에 등록했던 이벤트 핸들러를 삭제하는 코드를 클린업 함수에 추가함으로써 특정 이벤트의 핸들러가 무한히 추가되는 것을 방지 가능
- 의존성 배열
  - Object.is 기반의 얕은 비교 수행. 이전 의존성 배열과 현재 의존성 배열의 값에 하나라도 변경 사항이 있다면 callback으로 선언한 부수 효과를 실행
  - 빈 배열 → 비교할 의존성이 없다 판단, 최초 렌더링 직후에 실행되고 더 실행되지 않음.
  - 값 넘김 X → 렌더링 발생할 때마다 실행. 컴포넌트가 렌더링됐는지 확인하기 위한 방법으로 사용하기도.
    - useEffect는 클라이언트 사이드에서 실행되는 것 보장됨.
    - 컴포넌트의 부수효과임 → 컴포넌트의 렌더링 완료된 이후에 실행됨.
      - 직접 실행(useEffect 없이 함수 바로 실행)은 컴포넌트 렌더링 도중에 실행되기에 SSR의 경우 서버에서도 실행됨. 무거운 작업일 경우 함수형 컴포넌트의 반환을 지연시키기에 렌더링 방해.
- useEffect 사용 시 주의점
  - eslint-disable-line react-hooks/exhaustive-deps 주석은 최대한 자제하라
    - 빈 배열 → 정말로 useEffect의 부수 효과가 컴포넌트의 상태와 별개로 작동해야만 하는지, 여기서 호출하는 게 최선인지 한 번 더 검토 필요
    - 특정 값을 사용하지만 해당 값의 변경 시점을 피할 목적 → 메모이제이션을 적절히 활용해 해당 값의 변화를 막거나 적당한 실행 위치를 다시 한번 고민해 봐야
  - useEffect의 첫 번째 인수에 함수명을 부여하라
  - 거대한 useEffect를 만들지 마라
  - 불필요한 외부 함수를 만들지 마라

## 3) useMemo

- 연산 결과를 저장해두고, 저장된 값을 반환
- 인수 - 어떠한 값을 반환하는 생성 함수, 해당 함수가 의존하는 값의 배열
- 의존성 배열 값
  - 변경 O → 첫 번째 인수의 함수를 실행한 후 그 값 반환하고 기억
  - 변경 X → 이전에 기억해둔 해당 값 반환

## 4) **useCallback**

- 인수로 넘겨받은 콜백을 기억. 특정 함수를 새로 만들지 않고 재사용
- 함수의 재생성을 막아 불필요한 리소스나 리렌더링을 방지하고 싶을 떄 사용

## 5) **useRef**

- useState와 비교
  - 공통점: 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장
  - 차이점:
    - 반환값인 객체 내부에 있는 current로 값에 접근 또는 변경 가능
    - 그 값이 변하더라도 렌더링을 발생시키지 않음
      - → 개발자가 원하는 시점의 값을 렌더링에 영향을 미치지 않고 보관해 두고 싶을 때 사용하면 좋음
- 컴포넌트가 렌더링될 때만 생성, 컴포넌트 인스턴스가 여러 개라도 각각 별개의 값을 바라봄
- 최초 기본값은 return 문에 정의해 둔 DOM이 아니고 useRef()로 넘겨받은 인수

## 6) u**seContext**

- context: props drilling 없이도 선언한 하위 컴포넌트 모두에서 원하는 값을 자유롭게 사용 가능
- context를 함수형 컴포넌트에서 사용할 수 있게 해주는 useContext 훅
  - 상위 컴포넌트 어딘가에서 선언된 <Context.Provider />에서 제공한 값을 사용 가능
  - Provider가 여러 개가 있다면 가장 가까운 Provider의 값을 가져옴
    ```tsx
    const MyContext = createContext<{ hello: string } | undefined>(undefined)

    function ContextProvider({
    	children,
    	text,
    }: PropsWithChildren<{ text: string }>) {
    	return (
    		<MyContext.Provider value={{ hello: text }}>{children}</MyContext.Provider〉
    	)
    }

    function useMyContext() {
    	const context = useContext(MyContext)
    	// 해당 콘텍스트가 존재하는 환경인지. 콘텍스트가 한 번이라도 초기화돼 값을 내려주고 있는지 체크
    	if (context === undefined) {
    		throw new Error(
    			’useMyContext는 Contextprovider 내부에서만 사용할 수 있습니다.`,
    		)
    	}
    	return context
    }

    function ChildComponent() {
    	// 타입이 명확히 설정돼 있어서 굳이 undefined 체크를 하지 않아도 됨
    	// 이 컴포넌트가 Provider 하위에 없다면 에러가 발생할 것
    	const { hello } = useMyContext()

    	return <>{hello}</>
    }

    function ParentComponent() {
    	return (
    		<ContextProvider text="react">
    			<ChildComponent />
    		</ContextProvider>
    	)
    }
    ```
- useContext 사용 시 주의점
  - 함수형 컴포넌트 내부에서 사용하면 컴포넌트 재활용이 어려워짐. Provider에 의존성을 가지고 있기 때문.
  - 상태를 주입해주는 API일 뿐, 상태 관리 라이브러리가 아님.
    > 상태 관리 라이브러리가 되기 위한 최소한의 조건
    >
    > 1. 어떠한 상태를 기반으로 다른 상태를 만들어 낼 수 있어야
    > 2. 필요에 따라 이러한 상태 변화를 최적화할 수 있어야

## 7) **useReducer**

- const [state, dispatcher] = useReducer(reducer, initialstate, init)
  - 반환값
    - `state`: useReducer가 현재 가지고 있는 값
    - `dispatcher`: state를 업데이트하는 함수. 인자로 state를 변경할 수 있는 action을 넘겨줌
  - 인수
    - `reducer`: useReducer의 기본 action을 정의하는 함수
    - `initialstate`: 초깃값
    - `init`: 초깃값 지연해서 생성하고 싶을 때 옵셔널하게 사용. 게으른 초기화 일어나며 initialstate를 인수로 init 함수가 실행됨
- 목적: state 값을 변경하는 시나리오를 제한적으로 두고 이에 대한 변경을 빠르게 확인할 수 있게끔 함.
  - state를 사전에 정의된 dispatcher로만 수정할 수 있게 만들어 state 값에 대한 접근은 컴포넌트에서만 가능하게 함
  - state를 업데이트하는 방법의 상세 정의는 컴포넌트 밖에다 둠. state 업데이트는 미리 정의해 둔 dispatcher로만 제한

## 8) useImperativeHandle

- forwardRef: ref 전달에 일관성 제공하기 위해 만들어짐. ref를 prop으로 전달 가능
- useImperativeHandle: 부모에게서 넘겨받은 ref를 원하는 대로 수정 가능

## 9) useLayoutEffect

- 모든 DOM의 변경 후에 useLayoutEffect의 콜백 함수 실행이 동기적으로 발생 (useLayoutEffect의 실행이 종료될 때까지 기다린 다음에 화면을 그림)(→성능에 영향 미칠 수 있음)
- 실행 순서
  1. 리액트가 DOM을 업데이트
  2. useLayoutEffect를 실행
  3. 브라우저에 변경 사항을 반영
  4. useEffect를실행
- DOM은 계산됐지만 이것이 화면에 반영되기 전에 하고 싶은 작업이 있을 때 사용하는 것이 좋음
  - DOM 요소를 기반으로 한 애니메이션, 스크롤 위치 제어 등. 화면에 반영되기 전에 하고 싶은 작업에 사용

## 10) useDebugValue

- 디버깅 정보 기록
- 다른 훅 내부에서만 실행 가능. 컴포넌트 레벨에서는 작동 안 함.

## 11) 훅의 규칙

1. 최상위에서만 훅 호출 가능. 반복문이나 조건문, 중첩된 함수 내에서 훅 실행 불가
2. 훅 호출할 수 있는 건 리액트 함수형 컴포넌트 혹은 사용자 정의 훅의 두 경우뿐. 일반 JS 함수에서는 사용 불가.
