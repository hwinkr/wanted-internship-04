// interface

// 1. input : None
// 2. output
// -> handleParams(param:string) => void
// -> currentParams

/*
useAreas interface
1. input
-> None
2. output
-> curretAreas : 사용자가 버튼 이름을 클릭했을 때, 현재 활성화 된 지역 이름들
-> handleActiveAreas : 사용자가 버튼 이름을 클릭했을 때, 현재 활성화 된 지역 이름들을 관리하는 함수
- 현재 쿼리 스트링에 지역이름이 있으면 지우고, 없으면 추가하는 함수
*/

import { useSearchParams } from 'react-router-dom';

import { useCallback } from 'react';
import ACTIVE_AREA from '../constants/active-area';

const useAreas = () => {
  const [params, setParams] = useSearchParams();
  const activeAreas = params.getAll(ACTIVE_AREA);

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

  return {
    activeAreas,
    handleActiveAreas,
  };
};

export default useAreas;
