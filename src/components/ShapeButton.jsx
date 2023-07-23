const ShapeButton = ({ shapeName, handleClick }) => {
  return (
    <button
      className="justify-center tracking-widest text-xl text-gray-400 hover:text-gray-900 px-4 py-1 border-dotted border-2 border-gray-400 hover:border-gray-900 text"
      onClick={handleClick}
    >
      {shapeName}
    </button>
  );
};

export default ShapeButton;