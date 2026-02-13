import PropTypes from "prop-types";

const DeleteConfirmation = ({ onConfirm, onCancel, title = "Delete Task?", message = null }) => (
  <div className="fixed inset-0 z-50">
    <div className="bg-[#00000088] w-screen h-screen flex justify-center items-center">
      <div className="bg-white px-8 md:px-16 py-8 md:py-12 rounded-[45px] flex flex-col space-y-8 md:space-y-12 justify-center items-center shadow-lg w-full max-w-sm mx-4">
        <div className="text-4xl font-semibold tracking-wide">
          <span className="text-stone-500">{title}</span>
        </div>
        {message && (
          <div className="text-lg text-center text-gray-600">
            {message}
          </div>
        )}
        <div className="flex justify-center items-center gap-8 text-white text-xl tracking-wide">
          <button
            className="rounded-3xl bg-[#578EFB] px-7 py-3 shadow-md hover:bg-[#2869eb]"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="rounded-3xl bg-gray-400 px-7 py-3 shadow-md hover:bg-gray-500"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
);

DeleteConfirmation.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default DeleteConfirmation;