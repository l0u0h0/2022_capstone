// import Chartjs
import { Line } from "react-chartjs-2";
// import Type
import { ChartDetailProps } from "../../common/types";

/** Chart Detail Component
 *  단어별 데이터를 받는 그래프 컴포넌트
 *  월별로 그래프 출력
 */
const ChartDetail: React.FC<ChartDetailProps> = ({ datas }) => {
  if (datas === null) {
    return <div>데이터 로딩중,,,</div>;
  } else {
    if (datas[0].err === "NoData") {
      return <div>데이터가 없습니다.</div>;
    }
  }
  const data = {
    datasets: [
      {
        label: "StatisticDetail Chart",
        backgroundColor: "rgb(0, 51, 51)",
        borderColor: "rgb(0, 51, 51)",
        data: [
          {
            x: `${datas[4].month}월`,
            y: datas[4].count,
          },
          {
            x: `${datas[3].month}월`,
            y: datas[3].count,
          },
          {
            x: `${datas[2].month}월`,
            y: datas[2].count,
          },
          {
            x: `${datas[1].month}월`,
            y: datas[1].count,
          },
          {
            x: `${datas[0].month}월`,
            y: datas[0].count,
          },
        ],
        fill: false,
      },
    ],
  };

  let max_num: number = datas[0].count;
  let min_num: number = datas[0].count;
  datas.forEach((data) => {
    if (max_num <= data.count) {
      max_num = data.count;
    } else if (min_num >= data.count) {
      min_num = data.count;
    }
  });
  max_num = max_num + max_num / 10;
  min_num = min_num - min_num / 10;

  const options = {
    responsive: true,
    title: {
      display: true,
      text: "단어별 데이터 그래프",
    },
    tooltips: {
      mode: "point" as const,
      intersect: true,
    },
    hover: {
      mode: "point" as const,
      intersect: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        gird: {
          display: false,
        },
        min: min_num < 0 ? 0 : min_num,
        max: max_num,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default ChartDetail;
