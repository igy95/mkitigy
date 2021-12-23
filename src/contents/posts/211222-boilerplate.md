---
title: 'React + TypeScript + Webpack + Babel (2021)'
description: '환경설정 처음부터 시작하기'
date: '2021-12-22'
tags: ['etc']
---

그동안 학습하고 직접 적용해보았던 여러 환경설정들을 정리할 겸 포스팅을 남겨보려 한다.

## Spec

- Yarn
- ESLint
- Prettier
- Webpack
- Babel
- TypeScript
- React

## Package Manager(Yarn)

```bash
yarn init -y
yarn install
```

## TypeScript + ESLint

기존의 TSLint는 deprecated 되었기 때문에 ESLint에 TypeScript 지원 설정을 추가해주는 방향이 권장되고 있다. [관련 문서](https://typescript-eslint.io/docs/linting/)를 참고하여 설정을 그대로 진행하였다.

### 1. library, parser, plugin 설치

```bash
yarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. TypeScript 컴파일 환경설정

TypeScript 환경설정을 위한 다양한 옵션은 [여기서](https://www.typescriptlang.org/tsconfig) 찾아보고 직접 적용해보는 것을 추천 한다. 만약 어떤 것부터 설정해야할지 감이 오질 않는다면 `tsc --init` 커맨드를 통해 자동으로 생성되는 설정 파일의 주석을 참고해도 좋다.

```json
// tsconfig.json

{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "baseUrl": "src"
  }
}
```

- 나의 경우, 타입 체크를 위한 최소한의 옵션만 설정을 해주었다. ts를 js로 변환하는 트랜스파일링은 추후에 설정할 Babel을 통해 진행하기로 결정했기 때문에 관련 옵션은 배제했다.

### 3. ESLint 환경설정

```js
// .esilntrc.js

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
};
```

- `.eslint.js` 생성 시, `module is not defined` 메시지와 함께 에러가 발생한다면 `env` 객체의 `node` 속성을 `true`로 설정한다.
- `parserOptions.project` 속성을 설정할 때, 파싱 관련 에러가 뜰 수 있다. 이에 관한 이슈는 [stackoverflow](https://stackoverflow.com/questions/64271575/error-with-my-eslintrc-js-file-parsing-error-parseroptions-project-has/64283139#64283139)를 통해 해결할 수 있었다.

### 4. ESLint ignore 파일 작성

```json
// .eslintignore

node_modules
dist
```

## Prettier

ESLint의 style format 관련 rule과 충돌을 방지하기 위해, Prettier 외에도 약간의 설정이 필요하다.

```bash
yarn add -D prettier eslint-plugin-prettier eslint-config-prettier
```

- `eslint-plugin-prettier` - Prettier를 ESLint의 plugin으로 추가한다. 이렇게 하면, Prettier가 인식하는 포맷팅 오류를 ESLint에서 출력한다.
- `eslint-config-prettier` - ESLint의 format 관련 설정 중 Prettier와 충돌하는 부분을 비활성화 한다.
- `.prettierrc.js`를 폴더 최상위에 생성하여 커스텀하게 Prettier rule을 설정할 수 있다. 옵션에 관한 사항은 [여기](https://prettier.io/docs/en/configuration.html)에 자세히 나와 있다.

## Webpack + Babel

```bash
yarn add -D webpack webpack-cli webpack-dev-server webpack-merge
```

- `webpack-cli` - Webpack에 관한 기능을 터미널 환경에서 조작할 수 있다.
- `webpack-dev-server` - Webpack Project의 개발 환경을 위한 정적 페이지를 제공한다.
- `webpack-merge` - production, development 등 각 mode의 관심사에 맞게 환경설정을 할 수 있도록 돕는다.

### 1. Webpack 환경설정

환경설정은 주로 `webpack.config.js`를 생성하여 진행하지만, 하나의 파일에서 각 mode 별로 환경설정을 진행할 경우 설정이 많아짐에 따라 여러 분기 처리로 인해 가독성을 저해할 우려가 있다. 따라서 파일은 [공식 문서](https://webpack.js.org/guides/production/)의 권장 사항대로 다음과 같이 세 개의 파일로 나눈다.

`webpack.common.js`

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
```

`webpack.prod.js`

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});
```

- 각 번들을 특정 단위로 쪼개어 [캐싱을 용이하게 하기 위해](https://webpack.js.org/guides/caching/) `optimization` 설정을 해주었다.

`webpack.dev.js`

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: true,
    },
  },
});
```

### 2. HTML 파일 연결

번들된 결과물이 들어갈 `dist` 폴더에 매번 html 파일을 직접 넣지 않고 최신화를 하고 싶다면, Webpack에서 지원하는 플러그인이 별도로 필요하다.

```bash
yarn add -D html-webpack-plugin
```

```js
// webpack.common.js

// ...
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

`public` 폴더 생성 후 번들된 결과물을 연결할 `index.html`를 작성한다.

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>boiler plate</title>
  </head>
  <body>
    <div id="root">hi</div>
  </body>
</html>
```

### 3. Babel 설정

React, TypeScript, ES6+ 등 최신 문법을 그대로 사용하면서도 구형 브라우저의 하위 호환성을 지원하기 위해 Babel을 함께 사용하는 것이 좋다.

```bash
yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-typescript
```

ES6 이후 새로 추가된 문법(`Promise`, `Map`, `Set` etc.)에 대한 폴리필을 지원하기 위해서는 별도의 플러그인이 필요하다. `babel-polyfill`을 사용할 수도 있겠지만 전역 오염의 발생, 불필요한 번들 사이즈가 증가한다는 단점이 있기 때문에 아래와 같이 설치하였다.

```bash
yarn add @babel/runtime
yarn add -D @babel/plugin-transform-runtime
```

- `@babel/runtime` - 실제 실행 환경에서 helper 함수들이 참조하는 폴리필을 내장한 모듈로써 동작할 수 있도록 돕는다.
- `@babel/plugin-transform-runtime` - 트랜스파일링 과정에서 `@babel/runtime` 모듈이 helper 함수를 참조하도록 변경하는 역할을 한다.

Babel 관련 로더, 플러그인을 Webpack이 인식할 수 있도록 환경설정을 추가로 진행한다.

```js
// webpack.common.js

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
```

### 4. script 작성

```json
// package.json

{
  //...
  "scripts": {
    // --config 옵션으로 각 스크립트에서 사용할 환경을 선택할 수 있다.
    "start": "webpack serve --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

여기까지 설정을 마쳤다면, `scripts`의 명령어를 통해 빌드된 결과물과 개발 환경을 확인할 수 있다.

## React

React 설치와 함께 지금까지 설정해준 여러 환경들에 대한 호환성 측면의 플러그인도 같이 설치해준다.

```bash
yarn add react react-dom
yarn add -D eslint-plugin-react @types/react @types/react-dom @babel/preset-react
```

```js
// .eslintrc.js

module.exports = {
  // ...
  extends: [
    // ...
    'plugin:react/recommended',
  ],
};
```

```json
// tsconfig.json

{
  "compilerOptions": {
    // ...
    "jsx": "react",
    "esModuleInterop": true
  }
}
```

- `jsx`: TypeScript 컴파일러가 jsx 문법을 인식한다.
- `esModuleInterop` CommonJS 모듈을 ES6 import 구문을 통해 가져올 수 있도록 한다. React를 import 해오는 과정에서 편의성을 위해 설정해주었다.

`src` 폴더의 `index.ts` 파일을 `index.tsx`로 바꾼 뒤 다음과 같은 스크립트를 작성해보자.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>hi</div>, document.getElementById('root'));
```

최종적으로 React를 사용한다는 사실을 Webpack에 알려주어야 하기 때문에, Webpack 설정이 필요하다.

```js
// webpack.common.js

module.exports = {
  // entry 파일을 tsx 파일로 치환
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              // preset-react 추가
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  resolve: {
    // Webpack이 resolve할 파일 확장명 추가
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
};
```
