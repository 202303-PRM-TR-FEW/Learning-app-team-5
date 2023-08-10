import TimeSpentBar from "./TimeSpentBar";

function ThisWeek() {
  return (
    <div className="flex flex-col w-full text-lightBlack gap-4 h-1/2">
      <h1 className="font-semibold text-3xl">This Week</h1>
      <div className="bg-[#FBFBFB] rounded-[20px]  p-2 w-full h-full text-lightBlack">
        <div className="flex flex-col justify-center items-start py-2 font-medium h-full">
            <h2 className="font-semibold text-md">TIME SPENT</h2>
            <p className="text-2xl font-bold">AMOUNT OF COURSE  HOUR STUDIED HERE</p>
            <TimeSpentBar hoursPerDay={50} />
            </div>
      </div>
    </div>
  );
}

export default ThisWeek;
