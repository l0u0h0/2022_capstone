// import react
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import type
import { Datatype, Mainprops } from "../common/types";
// import moment
import moment from "moment";
// import Component
import Banner from "../common/BannerComponent";
import Header from "../common/HeaderComponent";
import Footer from "../common/FooterComponent";
// Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Thumbs } from "swiper";
import "swiper/css";

// axios import
import axios from "axios";

// Chart import
import Chart from "./chartCompo/ChartComponent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

// ChartJS init
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

// Main Area
const MainComponent: React.FC<Mainprops> = ({
  datas,
  nowdatas,
  loading,
  error,
  getDatas,
  getNowDatas,
}) => {
  useEffect(() => {
    getDatas();
    getNowDatas();
  }, [getDatas, getNowDatas]);

  return (
    <div className="App-main">
      <Header />
      <div className="body">
        <Body1
          datas={datas}
          nowdatas={nowdatas}
          loading={loading}
          error={error}
          getDatas={getDatas}
          getNowDatas={getNowDatas}
        />
      </div>
      <div className="body">
        <Body2 />
      </div>
      <Banner />
      <Footer />
    </div>
  );
};

// Tab Area
const Body1: React.FC<Mainprops> = ({
  datas,
  nowdatas,
  loading,
  error,
  getDatas,
  getNowDatas,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <div className="main-body-first">
      <h2>&nbsp;&nbsp;Today's</h2>
      <hr />
      <div className="swiper-area">
        <Swiper
          className="tab-title"
          slidesPerView={3}
          onSwiper={setThumbsSwiper}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
        >
          <SwiperSlide>
            <div className="title">?????????</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="title">?????????</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="title">??????</div>
          </SwiperSlide>
        </Swiper>
        <Swiper
          className="tab-contents"
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
        >
          <SwiperSlide>
            <Tab1
              datas={datas}
              nowdatas={nowdatas}
              loading={loading}
              error={error}
              getDatas={getDatas}
              getNowDatas={getNowDatas}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Tab2
              datas={datas}
              nowdatas={nowdatas}
              loading={loading}
              error={error}
              getDatas={getDatas}
              getNowDatas={getNowDatas}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Tab3 datas={datas} />
          </SwiperSlide>
        </Swiper>
      </div>
      <hr />
    </div>
  );
};

// Tab Fragment
const Tab1: React.FC<Mainprops> = ({ nowdatas }) => {
  const [now, setNow] = useState("");

  useEffect(() => {
    const dt = moment();
    setNow(
      `${dt.format("YYYY")}??? ${dt.format("MM")}??? ${dt.format(
        "DD"
      )}??? ${dt.format("HH")}??? ??????`
    );
  }, [now]);

  if (nowdatas === null) {
    return <div>????????? ?????????,,,</div>;
  }

  return (
    <div key="main_Tab1" className="contents">
      <div className="table-area-first">
        <table>
          <tbody>
            {nowdatas ? (
              nowdatas.map((nowdatas: Datatype, i) => (
                <tr key={`table_row_${i}`}>
                  <th className="data-rank">{i + 1}.</th>
                  <td className="data-word">{nowdatas.text}</td>
                  <td
                    className={`data-state-${
                      nowdatas.state === "-" ? "??????" : nowdatas.state
                    }`}
                  >
                    {nowdatas.state}
                  </td>
                  <td className="data-num">{nowdatas.count}</td>
                </tr>
              ))
            ) : (
              <div>????????? ?????????...</div>
            )}
          </tbody>
        </table>
      </div>
      <div className="update-time">
        <p>{now}</p>
      </div>
    </div>
  );
};

const Tab2: React.FC<Mainprops> = ({ datas }) => {
  let navigate = useNavigate();

  function LinkClick() {
    navigate("/dictionary");
  }

  if (datas === null) {
    return <div>????????? ?????????,,,</div>;
  }

  return (
    <div key="main_Tab2" className="contents">
      <div className="table-area-second">
        <table>
          <tbody>
            {datas !== null ? (
              datas.map((data: Datatype, i) => (
                <tr key={`table_row_${i}`}>
                  <th className="data-rank">{i + 1}.</th>
                  <td className="data-word">{data.text}</td>
                  <td className="data-state"></td>
                  <td className="data-num">{data.count}</td>
                </tr>
              ))
            ) : (
              <div>????????? ?????????...</div>
            )}
          </tbody>
        </table>
      </div>
      <div className="link-area">
        <button className="btn btn--link" onClick={LinkClick}>
          ??? ?????? ?????? ??????
        </button>
      </div>
    </div>
  );
};

function Tab3({ datas }) {
  let navigate = useNavigate();

  function LinkClick() {
    navigate("/statistic");
  }

  return (
    <div key="main_Tab3" className="contents">
      <div className="static-data-area" id="static-data-area">
        <Chart datas={datas} />
      </div>
      <hr />
      <div className="link-area">
        <button className="btn btn--link" onClick={LinkClick}>
          ??? ?????? ?????? ??????
        </button>
      </div>
    </div>
  );
}

// NEWS API
function Body2() {
  const [newslist, setNewslist] = useState([{ _id: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/search",
      params: {
        q: "??????",
        lang: "ko",
        sort_by: "relevancy",
        page: "1",
        page_size: "4",
      },
      headers: {
        // "x-api-key": `${process.env.REACT_APP_NAK_develop}`,
        "x-api-key":
          process.env.NODE_ENV === "production"
            ? `${process.env.REACT_APP_NEWS_API_KEY}`
            : `${process.env.REACT_APP_NAK_develop}`,
      },
    };
    const newsApi = async () => {
      setLoading(true);
      try {
        const result = await axios.request(options);
        setNewslist(result.data.articles);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    newsApi();
  }, []);

  if (loading) {
    return <div>??????????????????</div>;
  }
  if (!newslist) {
    return null;
  }

  return (
    <div className="main-body-second">
      <h2>&nbsp;&nbsp;?????? ?????? ??????</h2>
      <div className="news-area">
        {newslist.map((news) => (
          <News key={news._id} news={news} />
        ))}
      </div>
      <Link to="/crime">
        <button className="btn btn--link">?????? ?????? ?????? ??????</button>
      </Link>
    </div>
  );
}

const News = ({ news }) => {
  const { title, excerpt, link, media } = news;

  return (
    <>
      {media && (
        <div className="news-row">
          <div className="news_script">
            <h2>
              <a href={link} target="_blank" rel="nooper noreferrer">
                {title}
              </a>
            </h2>
            <p>
              <a href={link} target="_blank" rel="nooper noreferrer">
                {excerpt}
              </a>
            </p>
          </div>

          <div className="news_image">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={media} alt="news_thumnail" />
            </a>
          </div>
        </div>
      )}
      <hr />
    </>
  );
};

export default MainComponent;
