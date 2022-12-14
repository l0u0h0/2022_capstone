// import Component
import Crimemain from "../components/crime/CrimemainComponent";
import Crimeresult from "../components/crime/CrimeresultComponent";
import Crimedetail from "../components/crime/CrimedetailComponent";
// import React
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
// import Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import Type
import { DataListType, RootState } from "../common/types";
// import Saga
import { getListDatas as getListDatasSaga } from "../redux/module/data";

// Container component
const CrimeContainer = () => {
  const path = useLocation().pathname;
  const [pathName, setPathName] = useState("");
  const datas = useSelector<RootState, DataListType[] | null>(
    (state) => state.datas.data
  );

  const dispatch = useDispatch();
  const getList = useCallback(
    (type: string) => {
      dispatch(getListDatasSaga(type));
    },
    [dispatch]
  );

  useEffect(() => {
    setPathName(path);
  }, [path]);

  if (pathName === "/crime") {
    return <Crimemain />;
  } else if (pathName === "/crime/result") {
    return <Crimeresult datas={datas} getList={getList} />;
  } else if (pathName === "/crime/detail") {
    return <Crimedetail />;
  } else {
    return <Crimemain />;
  }
};

export default CrimeContainer;
