import PropTypes from "prop-types";

const ShapeButton = ({ shapeName, handleClick }) => {
  return (
    <button
      className="justify-center tracking-widest text-xl text-gray-400 hover:text-gray-900 px-4 py-1 border-dotted border-2 border-gray-400 hover:border-gray-900 "
      onClick={handleClick}
      aria-label={`Change ${shapeName}`}
    >
      change {shapeName}
    </button>
  );
};

ShapeButton.propTypes = {
  shapeName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ShapeButton;
