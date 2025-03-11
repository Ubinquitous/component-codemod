## component-codemod

단 하나의 스크립트로 프로젝트 내부의 모든 컴포넌트를 치환해주는 라이브러리입니다.

## Installation

```bash
$ npm install component-codemod

$ yarn add component-codemod

$ pnpm add component-codemod
```

## Example

```js
const { runCodemod } = generateCodemod({
  targetPath: "src/**",
  // life cycle에 맞게 plugin을 등록해주세요.
  plugins: [
    convertImportPathPlugin({
      before: "@/components/v3/Legacy/Legacy",
      after: "@/components/v3/New/New",
    }),
    convertImportNamePlugin({
      importPath: "@/components/v3/New/New",
      before: "Legacy",
      after: "New",
    }),
    convertComponentNamePlugin({
      before: "Legacy",
      after: "New",
    }),
    convertPropsNamePlugin({
      componentName: "New",
      target: [{ before: "sssss", after: "prop2" }],
    }),
  ],
});

runCodemod();
```

### before

```jsx
import Legacy from "@/components/v3/Legacy/Legacy";

const Page2 = () => {
  return (
    <div>
      <Legacy prop1="test" sssss={999} />
    </div>
  );
};

export default Page2;
```

### after

```jsx
import New from "@/components/v3/New/New";

const Page2 = () => {
  return (
    <div>
      <New prop1="test" prop2={999} />
    </div>
  );
};

export default Page2;
```
