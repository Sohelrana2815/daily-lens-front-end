import AnimatedComponent from "../AnimatedComponent/AnimatedComponent";

const SectionTitle = ({ title, titleStyle, subTitle }) => {
  return (
    <>
      <AnimatedComponent animation="fade-out">
        <div className="flex gap-x-60 relative my-40 items-center md:my-32 lg:my-24">
          <div className="border-4 w-1/4 mx-auto"></div>
          <div className="border-4 w-1/4 mx-auto"></div>
          <h2 className="text-center uppercase text-xl md:text-2xl xl:text-4xl absolute left-1/2 transform -translate-x-1/2 font-volKHob dark:text-slate-300">
            <span className="text-[#d13030] font-bold">{titleStyle}</span>{" "}
            {title}
          </h2>
          <p className="text-center absolute  left-1/2 transform -translate-x-1/2 mt-40 md:mt-24 md:text-lg dark:text-gray-300">
            {subTitle}
          </p>
        </div>
      </AnimatedComponent>
    </>
  );
};

export default SectionTitle;
