import PropTypes from "prop-types";

const ShapeButton = ({ shapeName, handleClick }) => {
  return (
    <div className="absolute bottom-3 left-3">
      <button
        className="w-32 h-32 rounded-full text-gray-100 px-2 py-1 bg-gray-900 hover:bg-gray-700"
        onClick={handleClick}
        aria-label={`Change ${shapeName}`}
      >
        change
      </button>
    </div>
  );
};

ShapeButton.propTypes = {
  shapeName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ShapeButton;
