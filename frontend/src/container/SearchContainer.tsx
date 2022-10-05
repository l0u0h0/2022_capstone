// React import
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, SearchType, GraphType } from "../common/types";

// Component import
import SearchComponent from "../components/SearchComponent";
import { searchData as searchDataSagaStart } from "../redux/module/search";
import { getListData as getListDataSagaStart } from "../redux/module/graph";

// Container Component
const SearchContainer = () => {
  const datas = useSelector<RootState, SearchType | null>(
    (state) => state.search.search
  );

  const graph = useSelector<RootState, GraphType[] | null>(
    (state) => state.graphdata.graph
  );

  const dispatch = useDispatch();

  const searchData = useCallback(
    (word: string) => {
      dispatch(searchDataSagaStart(word));
    },
    [dispatch]
  );

  const getListData = useCallback(
    (word: string | null) => {
      dispatch(getListDataSagaStart(word));
    },
    [dispatch]
  );

  return (
    <SearchComponent
      datas={datas}
      time={graph}
      searchData={searchData}
      getListData={getListData}
    />
  );
};

export default SearchContainer;
