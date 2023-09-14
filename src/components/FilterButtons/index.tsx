import React from 'react';
import styled from 'styled-components';

interface FilterButtons {
  areas: string[];
  activeAreas: string[];
  handleActiveAreas: (param: string) => void;
}

const FilterButtons = ({ areas, activeAreas, handleActiveAreas }: FilterButtons) => {
  const isActiveArea = (area: string) => activeAreas.includes(area);
  return (
    <ButtonContainer>
      {areas.map((area, index) => (
        <StyledButton
          isActive={isActiveArea(area)}
          key={index}
          onClick={() => handleActiveAreas(area)}
        >
          {area}
        </StyledButton>
      ))}
    </ButtonContainer>
  );
};

export default FilterButtons;

const ButtonContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button<{ isActive: boolean }>`
  background-color: #9e9ba1;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  padding: 10px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: lighter;
`;
