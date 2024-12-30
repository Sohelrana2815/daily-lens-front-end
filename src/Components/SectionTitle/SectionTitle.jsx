const SectionTitle = ({ title, subTitle }) => {
  return (
    <>
      <div className="flex gap-x-60 relative my-20 items-center">
        <div className="border-4 w-1/4 mx-auto"></div>
        <div className="border-4 w-1/4 mx-auto"></div>
        <h2 className="text-center text-base md:text-xl xl:text-2xl absolute z-10 left-1/2 transform -translate-x-1/2">
          Top 6 Trending Articles
        </h2>
        <p className="text-center absolute z-10 left-1/2 transform -translate-x-1/2 mt-20 text-sm md:text-base">
          Latest in AI - Stay Informed
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
