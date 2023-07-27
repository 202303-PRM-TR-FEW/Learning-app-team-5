const TotalStatistics = ({t}) => {
  return (
    <div className=" w-full py-8 ">
      <h2 className="font-bold text-xl dark:text-bodyWhite">{t("title")}</h2>
      <div className="flex justify-between ">
        <div className=" mt-2 bg-white dark:bg-indigoDay p-2 rounded-[20px] shadow-md">
          <div className=" bg-[#cbe1fa] rounded-[10px]  px-14 py-2">
            <svg
              viewBox="0 0 24 24"
              className="h-[40px] w-[40px]"
              style={{ fill: "#2E8DFF" }}
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center py-2 font-medium">
            <p>{t("Finished")}</p>
            <p className="text-lg">0</p>
          </div>
        </div>
        <div className=" mt-2 bg-white dark:bg-indigoDay p-2 rounded-[20px] shadow-md">
          <div className=" bg-lightOrange rounded-[10px]  px-14 py-2">
            <svg
              viewBox="0 0 24 24"
              className="h-[40px] w-[40px]"
              style={{ fill: "#FE9E23" }}
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="m18 22-.01-6L14 12l3.99-4.01L18 2H6v6l4 4-4 3.99V22h12zM8 7.5V4h8v3.5l-4 4-4-4z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center py-2 font-medium">
            <p>{t("Hours")}</p>
            <p className="text-lg">0</p>
          </div>
        </div>
        <div className=" mt-2 bg-white dark:bg-indigoDay p-2 rounded-[20px] shadow-md">
          <div className=" bg-lightGreen rounded-[10px]  px-14 py-2">
            <svg
              viewBox="0 0 576 512"
              className="h-[40px] w-[40px]"
              style={{ fill: "#9FCB66" }}
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M572.1 82.38C569.5 71.59 559.8 64 548.7 64h-100.8c.2422-12.45 .1078-23.7-.1559-33.02C447.3 13.63 433.2 0 415.8 0H160.2C142.8 0 128.7 13.63 128.2 30.98C127.1 40.3 127.8 51.55 128.1 64H27.26C16.16 64 6.537 71.59 3.912 82.38C3.1 85.78-15.71 167.2 37.07 245.9c37.44 55.82 100.6 95.03 187.5 117.4c18.7 4.805 31.41 22.06 31.41 41.37C256 428.5 236.5 448 212.6 448H208c-26.51 0-47.99 21.49-47.99 48c0 8.836 7.163 16 15.1 16h223.1c8.836 0 15.1-7.164 15.1-16c0-26.51-21.48-48-47.99-48h-4.644c-23.86 0-43.36-19.5-43.36-43.35c0-19.31 12.71-36.57 31.41-41.37c86.96-22.34 150.1-61.55 187.5-117.4C591.7 167.2 572.9 85.78 572.1 82.38zM77.41 219.8C49.47 178.6 47.01 135.7 48.38 112h80.39c5.359 59.62 20.35 131.1 57.67 189.1C137.4 281.6 100.9 254.4 77.41 219.8zM498.6 219.8c-23.44 34.6-59.94 61.75-109 81.22C426.9 243.1 441.9 171.6 447.2 112h80.39C528.1 135.7 526.5 178.7 498.6 219.8z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center py-2 font-medium">
            <p>{t("Skills")}</p>
            <p className="text-lg">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalStatistics;
