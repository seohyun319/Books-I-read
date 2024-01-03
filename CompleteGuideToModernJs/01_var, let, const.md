# 01. var, let, const

- [1.1. var, let, const의 차이](#11-var-let-const의-차이)
- 1.2. TDZ
- [1.3. var, let, const를 적재적소에 쓰는 법](#13-var-let-const를-적재적소에-쓰는-법)

## 1.1. var, let, const의 차이

<table>
  <tr>
    <th></th>
    <th>var</th>
    <th>let</th>
    <th>const</th>
  </tr>
  <tr>
    <td>범위</td>
    <td>함수 스코프</td>
    <td>블록 스코프</td>
    <td>블록 스코프</td>
  </tr>
  <tr>
    <td>변수 재선언</td>
    <td>O</td>
    <td>X</td>
    <td>X</td>
  </tr>
    <tr>
    <td>변수값 재할당</td>
    <td>O</td>
    <td>O</td>
    <td>X (객체 속성 중 하나를 재할당은 가능)</td>
  </tr>
    <tr>
    <td>호이스팅</td>
    <td>O (정의 전 접근 가능. (그 값에는 접근 불가능해 undefined))</td>
    <td colspan="2">초기화 전 접근 시 Reference Error 발생. 변수 선언될 때까지 일시적으로 TDZ(Temporal Dead Zone. 일시적 비활성 구역)에 있음</td>    
  </tr>
</table>

기타

- var: for 루프 (블록 스코프) 내에서 var 키워드로 변수 선언하면 이 변수를 for 루프 밖에서도 사용 가능
- const: 객체 내용 변경할 수 없게 const 객체 고정할 수는 있음: Object.freeze(객체) (변경 시도 시 오류는 x)

> **호이스팅** : 변수의 정의나 함수의 선언이 scope에 따라 선언과 할당으로 분리되는 것. 변수의 선언문과 함수 선언식을 유효 범위의 최상단으로 끌어올리는 것. (선언 전에 그 변수를 참조해도 에러 안 나고 밑에서 가져옴) 근데 지양하는 게 좋음.
>
> - 변수의 선언 : var a;
> - 변수의 선언과 할당 : var b = 10;
> - 함수의 선언 : function f() { console.log("hi"); };

---

## 1.3. var, let, const를 적재적소에 쓰는 법

- 기본적으로 const를 사용하자.
- 재할당이 필요한 경우에만 let을 사용하자.
- var는 ES6에서 절대 사용하지 않는다.
