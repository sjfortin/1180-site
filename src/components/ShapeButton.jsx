import PropTypes from "prop-types";

const ShapeButton = ({ shapeName, handleClick }) => {
  return (
    <div className="absolute bottom-3 right-3">
      <button
        className="w-24 h-24 rounded-full text-gray-100 px-2 py-1 bg-gray-900 hover:bg-gray-800"
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
