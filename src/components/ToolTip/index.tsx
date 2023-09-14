import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styled from 'styled-components';
import CHART_DATA_COLOR from '../../constants/chart-color';
import CHART_DATA_KEY from '../../constants/chart-key';

const ToolTip = ({ active, payload: toolTipPayload }: TooltipProps<ValueType, NameType>) => {
  if (!active || !toolTipPayload) return <></>;

  const {
    payload: { id, value_area, value_bar },
  } = toolTipPayload[0];

  return (
    <Container>
      <ContentItem>{id}</ContentItem>
      <ContentItem style={{ color: CHART_DATA_COLOR.AREA }}>
        {CHART_DATA_KEY.AREA} : {value_area}
      </ContentItem>
      <ContentItem style={{ color: CHART_DATA_COLOR.BAR }}>
        {CHART_DATA_KEY.BAR} : {value_bar}
      </ContentItem>
    </Container>
  );
};

export default ToolTip;

const Container = styled.section`
  display: flex;
  flex-direction: column;

  padding: 10px;
  min-width: 170px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 3px #bababa;
  border: solid 1px #bababa;
  line-height: 1.5;

  font-weight: light;
`;

const ContentItem = styled.span``;
