// import redux
import { RouterState } from "redux-first-history";
import { AnyAction, Reducer } from "redux";

/** Root State Type */
export interface RootState {
  datas: DatasState;
  comments: CommentsState;
  search: SearchState;
  timedata: TimeState;
  graphdata: GraphState;
  nowdata: DatasState;
  router: Reducer<RouterState, AnyAction>;
}

/** Data State Type */
export interface DatasState {
  data: Datatype[] | null;
  loading: boolean;
  error: Error | null;
}
export interface DataListState {
  data: DataListType[] | null;
  loading: boolean;
  error: Error | null;
}

/** data type */
export interface Datatype {
  id: number;
  text: string;
  time: string;
  count: number;
  year: number;
  date: number;
  state: string;
  No: string;
  Type: string;
  Text: string;
  Mean: string;
  Time: string;
  datas: {
    text: string;
    count: number;
  };
}
export interface DataListType {
  No: string;
  Type: string;
  Text: string;
  Mean: string;
  Time: string;
}

/** comment data Type */
export interface CommentsState {
  comments: CommentType[] | null;
  loading: boolean;
  error: Error | null;
}

export interface CommentType {
  No: number;
  Text: string | undefined;
  Type: string;
}

export interface CommentAddType {
  text: string;
  comment: string | undefined;
}

export interface CountIncreaseType {
  type: string | null;
  text: string | undefined;
  count: number;
}

/** Search Type */
export interface SearchState {
  search: SearchType | null;
  loading: boolean;
  error: Error | null;
}

export interface SearchType {
  dict: {
    mean: string[] | null;
    text: string;
  } | null;
  crime: {
    text: string;
    mean: string;
    category: string;
  } | null;
  static: {
    datas: Datatype | null;
  } | null;
}

/** Time State */
export interface TimeState {
  time: TimeType | null;
  loading: boolean;
  error: Error | null;
}

export interface TimeType {
  datas1:
    | [
        {
          text: string;
          total: number;
        }
      ];
  datas2:
    | [
        {
          text: string;
          total: number;
        }
      ];
}

/** Graph State */
export interface GraphState {
  graph: GraphType[] | null;
  loading: boolean;
  error: Error | null;
}

export interface GraphType {
  text: string;
  year: number;
  month: number;
  count: number;
  err: string | null;
}

/** Components props Type */
export interface Mainprops {
  datas: Datatype[] | null;
  nowdatas: Datatype[] | null;
  loading: boolean;
  error: Error | null;
  getDatas: () => void;
  getNowDatas: () => void;
}

export interface SearchProps {
  datas: SearchType | null;
  time: GraphType[] | null;
  loading: boolean;
  searchData: (arg: string) => void;
  getListData: (arg: string) => void;
}

export interface ChartProps {
  datas: Datatype[] | null;
}

export interface ChartDetailProps {
  datas: GraphType[] | null;
}

export interface DictionarymainProps {
  datas: Datatype[] | null;
  getDatas: () => void;
}

export interface DictionarydetailProps {
  comments: CommentType[] | null;
  getComments: (arg: string) => void;
  addComment: (arg: CommentAddType) => void;
  increaseCount: (arg: CountIncreaseType) => void;
}

export interface CrimeresultProps {
  datas: DataListType[] | null;
  getList: (arg: string) => void;
}

export interface StatisticmainProps {
  datas: TimeType | null;
  getDatas: () => void;
}

export interface StatisticdetailProps {
  mean: CommentType[] | null;
  graph: GraphType[] | null;
  getListData: (arg: string | null) => void;
  getComments: (arg: string | null) => void;
}

export interface ModalPropsType {
  error: Error | null;
  show: boolean;
  onHide: () => void;
}

/** Component State Data Type */
export interface dictionarydataState {
  idx: number;
  mean: string | undefined;
  count: number;
}

export interface SearchDataState {
  word: string | null;
  data: {
    dict: {
      text: string;
      mean: string[] | null;
    } | null;
    crime: {
      text: string;
      mean: string;
      category: string;
    } | null;
    static: Datatype | null;
  };
}
