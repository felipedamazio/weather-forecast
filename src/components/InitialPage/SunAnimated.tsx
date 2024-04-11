export const SunAnimated = () => {
  return (
    <div className="container w-64 h-64 flex items-center justify-center">
      <div className="cloud front animate-clouds animate-[clouds_2s_ease-in-out_infinite] z-10">
        <span className="left-front bg-blue-400 inline-block w-16 h-16 rounded-full"></span>
        <span className="right-front bg-blue-400 inline-block w-16 h-16 rounded-full ml-2"></span>
      </div>
      <span className=" sun sunshine bg-gradient-to-r from-yellow-400 to-yellow-500 w-32 h-32 rounded-full absolute animate-sunshine animate-[sunshines_1s_ease-in-out_infinite] z-0"></span>
      <span className="sun w-32 h-32 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full absolute z-0"></span>
      <div className=" cloud back animate-clouds animate-[clouds_2s_ease-in-out_infinite] z-10">
        <span className="left-back bg-blue-400 inline-block w-20 h-20 rounded-full"></span>
        <span className="right-back bg-blue-400 inline-block w-20 h-20 rounded-full ml-4"></span>
      </div>
    </div>
  );
};
