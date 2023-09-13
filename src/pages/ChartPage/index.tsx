import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ChartPerDay } from '../../types/chart';

// TODO
// 1. msw를 적용한다.
// mocking server worker : 클라이언트의 api 요청을 가로채서, 실제 서버가 있을 때의 동작처럼 구현이 가능하다.
// loader을 사용해서 컴포넌트가 렌더링 되기 전, msw의 worker가 loader 함수보다 늦게 실행 되는 문제가 있어서 네트워크 에러가 발생한다. -> msw를 적용하지 않기로 결정

const ChartPage = () => {
  const chartData = useLoaderData() as ChartPerDay;

  return <main>Chart Page</main>;
};

export default ChartPage;
