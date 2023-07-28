
function TimeSpentBar({ hoursPerDay }) {
    /* If height prop is not passed, the barheight will be zero */
    const barHeight = hoursPerDay || 0;
  return (
    <div className="mt-4 w-full h-full">
      <div className="bg-gray-200 rounded-full overflow-hidden w-[3%] h-[80%] relative">
        <div
          className="bg-gradient-to-r from-blue-200 to-blue-600 w-full rounded-full absolute bottom-0"
          style={{ height: `${barHeight}%`, transition: "height 1s" }}
        ></div>
      </div>
      {/* Progress Text */}
      <div className="pt-1 text-gray-500 text-xs font-bold mt-1">
        {barHeight}% complete
      </div>
    </div>
  );
}

export default TimeSpentBar;
