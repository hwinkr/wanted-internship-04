# 주어진 데이터를 사용해서 시계열 차트 구현하기

## TODO

- [x] 주어진 mock 데이터를 기반으로 시계열 차트를 구현한다
- [x] key 값(시간)을 기반으로 시계열 차트를 만든다
- [x] 하나의 차트 안에 Area, Bar 형태가 모두 존재하는 복합 그래프를 만든다
- [x] 호버 기능 구현 : 특정 구역에 hover 이벤트가 발생하면 id, area, value를 툴팁 형태로 제공한다
- [x] 필터링 기능 구현 : 특정 지역 클릭 시, 특정 데이터 영역 클릭시 동일한 지역의 데이터르 하이라이트 처리한다.
- [x] loader 도입해보기 : react-router-dom의 loader는 컴포넌트가 렌더링 되기 전 컴포넌트에 데이터를 전달하는 역할을 한다.

## 어떻게 구현 했는가?

### `react-router-dom`의 loader 사용

> 컴포넌트가 렌더링 되기 전 실행 되거나 렌더링 되는 컴포넌트를 loader 속성을 통해서 사용할 수 있다.

이번 프로젝트는 json 데이터를 기반으로 차트를 그려주는 것이였고, json 데이터를 어떻게 가져올까 생각하다가 `react-router-dom`을 사용하면서 한번도 사용해보지 않은 `loader` 속성을 사용해봐야 겠다고 판단했다. 사용해보면서 UI를 그리기 위해서 필요한 비동기 데이터가 loader 함수에 의해서 미리 가져올 수 있어서, 컴포넌트 내부에서 useEffect를 활용한 비동기 데이터 처리를 하지 않아도 돼서 컴포넌트 내부 코드가 더 깔끔해지는 느낌이였다.  
이번에, msw를 사용해보려고 했지만 msw가 loader보다 늦게 실행되버리는 이슈가 있어서 msw 사용은 포기하고 `public`폴더에 있는 json 데이터를 가져오는 것으로 구현했다.

### 차트 그려주는 라이브러리 `recharts` 사용

- `<ToolTip />` 컴포넌트를 사용해서 hover 이벤트 처리
- 복합 그래프는 라이브러리의 `<ComposedChart />` 사용
- `<ComposedChart />` 컴포넌트의 `onClick` 이벤트에 따라서, url을 변경함으로서 특정 지역 클릭 시 동일한 지역의 모든 데이터를 하이라이트 처리할 수 있도록 구현

```ts
const handleBarClick = (data: CategoricalChartState) => {
  if (!data || !data.activePayload) return;

  const {
    payload: { id },
  } = data.activePayload[0];
  handleActiveAreas(id as string);
};

//...

<Tooltip position={{ y: -5 }} contentStyle={{ outline: 'none' }} content={ToolTip} />

//...

<ComposedChart
  onClick={handleBarClick}
  width={2000}
  height={400}
  data={chartData}
  margin={{
    top: 40,
    right: 80,
    left: 80,
    bottom: 20,
  }}
>
```

### url을 변경시키는 useAreas 커스텀 훅 구현

> 선택한 지역의 차트에 하이라이트 처리하는 것을 구현해야 했는데, **`"여러개의 지역을 선택해도 그 지역을 모두 하이라이트 처리 해줘야 하지 않을까?"`**라는 생각이 들어서 고민을 하다가 `react-router-dom` 라이브러리가 제공하는 useSearchParams 훅을 사용해서 커스텀 훅을 구현해보기로 했다.

`useArea` 커스텀 훅의 인터페이스는 다음과 같다.

1. input : `None`
2. output

- activeAreas : `string[]`
  - 사용자가 선택한 지역들이 담긴 배열이다.
  - 이 배열안에 있는 지역들의 차트 데이터를 하이라이트 처리해주기 위해서 사용한다.

```ts
const activeAreas = params.getAll(ACTIVE_AREA);
```

- handleActiveAreas : `(param:string) => void`
  - 지역들의 버튼을 클릭하거나, 차트 데이터를 클릭했을 때 실행되는 함수이다.
  - `useSearchParams`훅의 2번째 인자인 setParams에 배열을 전달할 수 있고 배열을 전달하게 되면, 각 배열의 요소들이 `&`로 연결된다
  - 이를 사용해서, 새롭게 하이라이트 처리를 해줘야 하는 지역과 이미 하이라이트 처리가 되고 있는 지역 2개로 나누어서 분기 처리를 해주었다.

```ts
const handleActiveAreas = useCallback(
  (param: string): void => {
    if (activeAreas.includes(param)) {
      setParams({ active: activeAreas.filter(prevParam => prevParam !== param) });
      return;
    }
    setParams({ active: [...activeAreas, param] });
  },
  [activeAreas],
);
```
