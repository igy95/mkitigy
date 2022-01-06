---
title: 'JS의 Map vs Object'
description: 'JS 내에서 비슷하게 쓰이는 자료구조 비교해보기'
date: '2022-01-06'
featuredImage: ''
imgSrc: ''
tags: ['javascript']
---

최근에 알고리즘과 자료구조를 공부하면서 `Set`, `Map`을 의식적으로 자주 사용하려 했다. 그 결과, 어떠한 상황에서 이러한 자료구조가 어울리는지 조금 더 알게 되었다. 하지만 `Map`은 기본 객체와 비교해보았을 때 어떤 부분이 다른지 이해가 잘 되질 않았다. 이번 글을 통해 각 차이점을 살펴보고 각 자료구조를 어떻게 사용하면 좋을지 알아보려 한다.

## 1. Default Keys

**Map** - default key가 없다. `Map` 내부의 중복만 방지한다면 어떤 값을 key로 선언하든 상관이 없다.
**Object** - built-in prototype을 가지고 있기 때문에 prototype 객체의 default key와 충돌 가능성이 있는 네이밍은 피해야 한다. (e.g. `toString`, `hasOwnProperty` etc.)

> ES5 시기에는 `Map` 출현 전이었기에 이러한 이슈를 방지하고자 `Object.create(null)` 구문을 사용하기도 했다.

## 2. 키의 타입

**Map** - 타입을 가리지 않는다. 즉 함수, 객체, 원시값 등 어떠한 데이터 타입이든 key로 선언이 가능하다.
**Object** - `string`, `symbol`이라는 제한된 타입만을 key로 받는다.

## 3. 요소의 순서, 반복

**Map** - key, value pair의 순서가 보장되어있다. 따라서 `for..of` 구문과 함께 `keys`, `values`, `entries` 속성을 사용하여 값을 순회할 수 있다.  
**Object** - 현재는 `Map`과 비슷한 방식으로 순회 방식을 사용할 수는 있지만, 케이스에 상관없이 항상 순서가 보장되는 것은 아니다. 역사적인 흐름에 따라 매번 데이터를 나열하는 순서가 달라져 왔기 때문에 이것을 무조건 신뢰하는 것은 지양하는 게 좋다.

## 4. JSON

**Map** - serialization, parsing을 지원하지 않는다.  
**Object** - `JSON.stringify()`, `JSON.parse()`를 통해 JSON을 다루는 방식을 지원한다.

## 5. 성능

이 글을 작성하게 된 주된 이유이기도 하다. MDN의 `Map` 관련 문서를 살펴보면, 성능에 대해서 다음과 같이 적혀있다.

> Map: Performs better in scenarios involving frequent additions and removals of key-value pairs.

간단히 요약하자면, 데이터를 동적으로 추가하거나 삭제하는 일이 빈번히 발생할 때는 `Map`의 성능이 낫다는 이야기다. 정말 그런지 알고 싶어 몇가지 실험을 해봤지만 기대와는 다른 결과가 나왔다.

```jsx
const MAX = 1e7;
const map = new Map();
const obj = {};

// 0 ~ 1e7 - 1까지 할당
for (let i = 0; i < MAX; i++) {
  map.set(i, i);
  obj[i] = i;
}

// 새로운 데이터 할당
console.time('Map');
map.set(MAX, MAX);
console.timeEnd('Map');

console.time('Object');
obj[MAX] = MAX;
console.timeEnd('Object');

/*
Map: 0.073ms
Object: 0.007ms
- Map이 Object보다 느리다.
*/
```

이러한 양상은 반복문 안에서도 동일하게 작용한다.

```jsx
const MAX = 1e7;
const map = new Map();
const obj = {};

console.time('Map');
for (let i = 0; i < MAX; i++) {
  map.set(i, i);
}
console.timeEnd('Map');

console.time('Object');
for (let i = 0; i < MAX; i++) {
  obj[i] = i;
}
console.timeEnd('Object');

/*
Map: 1.857s
Object: 771.328ms
- Map이 Object보다 느리다.
*/
```

## Summary

키의 타입이 제한되어 있거나 JSON을 다루는 일이 잦다면 `Object`를, 동적으로 데이터를 다루는 등 기능을 더 다양하게 써야 할 필요가 있으면 `Map`을 적극적으로 사용해보자. 다만 데이터를 다루는 상황에서 성능 이슈가 발생한다면, 특정 자료 구조에 치우치기보다는 실제 측정을 통해서 적절한 답을 찾는 것을 권장한다.
