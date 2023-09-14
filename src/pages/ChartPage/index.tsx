import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ChartPerDay } from '../../types/chart';
import FilterButtons from '../../components/FilterButtons';
import styled from 'styled-components';
import getTotalAreas from '../../utils/get-areas';
import Chart from '../../components/Chart';
import { useAreas } from '../../hooks';

const ChartPage = () => {
  const chartData = useLoaderData() as ChartPerDay;
  const [day, areas] = getTotalAreas(chartData);
  const { activeAreas, handleActiveAreas } = useAreas();

  return (
    <Container>
      <Chart
        chartData={chartData[day]}
        activeAreas={activeAreas}
        handleActiveAreas={handleActiveAreas}
      />
      <FilterButtons
        areas={areas}
        activeAreas={activeAreas}
        handleActiveAreas={handleActiveAreas}
      />
    </Container>
  );
};

export default ChartPage;

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;
