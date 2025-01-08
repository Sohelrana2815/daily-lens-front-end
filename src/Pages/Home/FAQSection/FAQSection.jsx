import { RiTwitterXFill } from "react-icons/ri";
import { GrArticle } from "react-icons/gr";
import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import AnimatedComponent from "../../../Components/AnimatedComponent/AnimatedComponent";
const FAQSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  const faqs = [
    {
      question: "How can I add an article?",
      answer:
        "To add an article, navigate to your dashboard, click on 'Add Article,' and fill in the necessary details.",
    },
    {
      question: "What subscription plans are available?",
      answer:
        "We offer three subscription plans: 1 minute (for testing), 5 days, and 10 days. Choose the one that suits your needs.",
    },
    {
      question: "How can I view articles?",
      answer:
        "You can view articles by browsing through the homepage or searching by keywords.",
    },
    {
      question: "What is the benefit of a premium subscription?",
      answer:
        "Premium users get exclusive access to articles, faster browsing experience, and no ads.",
    },
  ];
  return (
    <>
      <SectionTitle
        titleStyle="Got"
        title="Questions?"
        subTitle="Find answers to the most common queries about our platform."
      />
      <div className="max-w-screen-lg mx-auto my-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-md"
            >
              <AnimatedComponent animation="fade-in">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <div className="text-xl">
                    {openAccordion === index ? (
                      <RiTwitterXFill className="dark:text-red-500 md:text-xl lg:text-2xl" />
                    ) : (
                      <GrArticle className="dark:text-gray-300 md:text-xl lg:text-2xl" />
                    )}
                  </div>
                </div>
              </AnimatedComponent>
              {openAccordion === index && (
                <AnimatedComponent animation="fade-in">
                  <div className="p-4 bg-gray-50 text-gray-700 transition-all ease-in-out dark:bg-slate-800 dark:text-gray-100">
                    <p>{faq.answer}</p>
                  </div>
                </AnimatedComponent>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQSection;
