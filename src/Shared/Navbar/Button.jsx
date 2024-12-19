import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
    duration-500"
    >
      {props.children}
    </button>
  );
};

// Define propTypes
Button.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is required and can be any renderable content
};

export default Button;
