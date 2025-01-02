import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  FaEye,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import { BsClock, BsGoogle, BsTwitter } from "react-icons/bs";

const ArticlesDetails = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        // Increment view count
        await axiosPublic.patch(`/approvedArticles/${id}/view`);

        // Fetch the article details
        const response = await axiosPublic.get(`/approvedArticles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    };

    fetchArticleDetails();
  }, [axiosPublic, id]);

  if (!article) return <p>Loading...</p>;
  return (
    <div className="max-w-screen-2xl mx-auto  flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-3/4 p-4 space-y-6">
        {/* Title */}
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-center lg:text-left">
          {article.articleTitle}
        </h1>
        <hr />

        {/* Tags, Date, and Views */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.articleTags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#D13030] px-2 py-1 rounded text-white text-sm md:text-base"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Posted date */}
          <p className="flex items-center gap-x-2 text-sm md:text-base">
            <BsClock /> {article.postedDate}
          </p>

          {/* Views */}
          <p className="flex items-center gap-x-2 text-sm md:text-base">
            <FaEye /> {article.views} views
          </p>
        </div>
        <hr />

        {/* Share Section */}
        <div className="flex flex-wrap items-center gap-4">
          <p className="uppercase text-sm md:text-base">Share:</p>
          <div className="flex gap-2">
            <button className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded text-white">
              <FaFacebook className="text-white" />
            </button>
            <button className="bg-blue-400 w-10 h-10 flex items-center justify-center rounded text-white">
              <BsTwitter className="text-white" />
            </button>
            <button className="bg-red-500 w-10 h-10 flex items-center justify-center rounded text-white">
              <BsGoogle className="text-white" />
            </button>
            <button className="bg-red-600 w-10 h-10 flex items-center justify-center rounded text-white">
              <FaPinterest className="text-white" />
            </button>
            <button className="bg-[#0E76E8] w-10 h-10 flex items-center justify-center rounded text-white">
              <FaLinkedin className="text-white" />
            </button>
          </div>
        </div>

        {/* Article Image */}
        <img
          src={article.articleImage}
          className="w-full lg:w-3/5 object-cover rounded"
          alt="Article"
        />
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Description and other info */}
          <div className="space-y-4 lg:w-1/2">
            {/* Article Description */}
            <p className="text-sm md:text-base">{article.articleDescription}</p>

            {/* Publisher Info */}
            <p className="text-sm md:text-base font-medium">
              Published by: {article.publisherName}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <p className="text-sm md:text-base text-info">Author:</p>
              <img
                title={article.authorEmail}
                src={article.authorPhoto}
                className="w-10 h-10 rounded-full object-cover"
                alt={article.authorName}
              />
              <p className="text-sm md:text-base">{article.authorName}</p>
            </div>
          </div>

          {/* Style purpose things */}
          <div className="border p-4 space-y-4 dark:text-gray-300 lg:w-1/2">
            {/* Progress Items */}
            {[
              { label: "Engaging and Informative", value: 8.9 },
              { label: "Audience Connection Strength", value: 8.4 },
              { label: "Global Readership Impact", value: 9.4 },
              { label: "Trending Across Platforms", value: 8.3 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm font-semibold font-archIvo">
                  <p>{item.label}</p>
                  <p>{item.value}</p>
                </div>
                <progress
                  className="progress w-full rounded-none dark:bg-gray-500"
                  value={item.value}
                  max="10"
                ></progress>
              </div>
            ))}

            {/* Text Section */}
            <div className="space-y-4">
              <p className="text-center text-slate-600 dark:text-slate-300 mx-auto">
                This article exemplifies excellence in content creation,
                blending creativity with accuracy to captivate the audience.
              </p>

              {/* Progress Circle */}
              <div className="flex justify-center">
                <div
                  className="radial-progress bg-[#d13030] border-4 border-red-600 text-white text-lg md:text-xl lg:text-2xl"
                  style={{
                    "--value": 88,
                    "--size": "7rem",
                    "--thickness": "0.2rem",
                  }}
                  role="progressbar"
                >
                  8.8
                </div>
              </div>

              {/* Additional Progress */}
              <div className="flex items-center justify-between text-sm font-semibold font-archIvo">
                <p>Article Popularity</p>
                <p>6.6</p>
              </div>
              <div className="flex justify-center">
                <progress
                  className="progress w-full rounded-none dark:bg-gray-500"
                  value="6.6"
                  max="10"
                ></progress>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Indicator */}
        {article.isPremium && (
          <p className="text-red-500 font-semibold text-sm md:text-base">
            This is a premium article!
          </p>
        )}
      </div>
      {/* Contact Us */}
      <div className="border p-4 space-y-6 mt-10">
        {/* Section Title */}
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold uppercase">
            Contact Us
          </h2>
          <hr className="border-gray-300" />
        </div>

        {/* Social Icons and Stats */}
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              icon: <FaFacebook className="text-blue-600" />,
              number: "2.1k+",
              label: "Followers",
            },
            {
              icon: <BsTwitter className="text-blue-400" />,
              number: "1.8k+",
              label: "Likes",
            },
            {
              icon: <FaInstagram className="text-pink-500" />,
              number: "3.2k+",
              label: "Followers",
            },
            {
              icon: <FaLinkedin className="text-blue-700" />,
              number: "900+",
              label: "Connections",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-x-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <p className="text-lg font-bold">{item.number}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-black border-t-4" />

        {/* Latest Reviews */}
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold">Latest Reviews</h3>
          <hr className="border-gray-300" />

          {/* Reviews */}
          {[
            {
              title: "Great insights into the topic!",
              date: "Jan 1, 2025",
              image: "https://via.placeholder.com/40",
            },
            {
              title: "Very engaging and well-written.",
              date: "Dec 30, 2024",
              image: "https://via.placeholder.com/40",
            },
          ].map((review, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h4 className="text-sm md:text-base font-medium">
                  {review.title}
                </h4>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
              <img
                src={review.image}
                alt="reviewer"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          ))}
          <hr className="border-black border-t-4" />
        </div>

        <hr className="border-gray-300" />

        {/* Random Comments */}
        <div>
          <p className="text-center text-sm md:text-base italic text-gray-500 dark:text-gray-400">
            &quot;This section is a placeholder for random comments or
            additional text.&quot;
          </p>
        </div>

        {/* Random News Section */}
        <div className="text-center space-y-4">
          <h4 className="text-lg md:text-xl font-semibold uppercase">
            Random News
          </h4>
          <div className="mx-auto max-w-md">
            <Carousel
              autoPlay
              infiniteLoop
              interval={2000}
              showThumbs={false}
              showStatus={false}
              className="rounded-lg shadow-md"
            >
              <div>
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/50851f11443579.560f7d5bafbd1.jpg"
                  alt="Random News 1"
                  className="rounded-lg object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64"
                />
              </div>
              <div>
                <img
                  src="https://m.media-amazon.com/images/I/71zfpkr4bYL.jpg"
                  alt="Random News 2"
                  className="rounded-lg object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64"
                />
              </div>
              <div>
                <img
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/copy-of-watch-ads-design-template-616f0366883f13dac1204417ec5a9023_screen.jpg?ts=1635270302"
                  alt="Random News 3"
                  className="rounded-lg object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64"
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesDetails;
