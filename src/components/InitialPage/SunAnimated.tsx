export const SunAnimated = () => {
  return (
    <div className="container w-64 h-64 flex items-center justify-center">
      <div className="cloud front animate-clouds animate-[clouds_6s_ease-in-out_infinite] pt-16 z-10">
        <span className="left-front bg-blue-400 inline-block w-16 h-12 ml-6 mb-[-4.23em] rounded-full"></span>
        <span className="right-front bg-blue-400 inline-block w-[4.8rem] h-[3.890rem]  mr-6 rounded-full "></span>
      </div>
      <span className=" sun sunshine bg-gradient-to-r from-yellow-400 to-[#F2A516] w-32 h-32 rounded-full absolute animate-sunshine animate-[sunshines_1s_ease-in-out_infinite] z-0"></span>
      <span className="sun w-32 h-32 bg-gradient-to-r from-[#F2A516] to-yellow-500 rounded-full absolute z-0"></span>
      <div className=" cloud back animate-clouds animate-[clouds_8s_ease-in-out_infinite] pb-16 z-10">
        <span className="left-back bg-blue-400 inline-block w-16 h-12 mb-[-4.28em] rounded-full"></span>
        <span
          className="right-back bg-blue-400 inline-block w-[4.8rem] h-[3.890rem] rounded-full ml-4"
        ></span>
      </div>
    </div>
  );
};
