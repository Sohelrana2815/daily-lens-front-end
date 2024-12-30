const SectionTitle = ({ title, titleStyle, subTitle }) => {
  return (
    <>
      <div className="flex gap-x-60 relative my-20 items-center">
        <div className="border-4 w-1/4 mx-auto"></div>
        <div className="border-4 w-1/4 mx-auto"></div>
        <h2 className="text-center uppercase text-xl md:text-2xl xl:text-4xl absolute left-1/2 transform -translate-x-1/2 font-volKHob">
          <span className="text-[#d13030] font-bold">{titleStyle}</span> {title}
        </h2>
        <p className="text-center absolute  left-1/2 transform -translate-x-1/2 mt-20 text-sm md:text-base">
          {subTitle}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
