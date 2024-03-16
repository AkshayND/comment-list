import useInput from "../hooks/useInput";

function isNotEmpty(value) {
  return value.trim() !== "";
}

export default function PostComponent({
  type,
  handleSubmit,
  comment,
  name,
  handleCancel,
}) {
  const {
    value: nameValue,
    handleInputBlur: handleNameBlur,
    handleInputChange: handleNameChange,
    hasError: nameError,
  } = useInput(name ? name : "", (value) => isNotEmpty(value));

  const {
    value: commentValue,
    handleInputBlur: handleCommentBlur,
    handleInputChange: handleCommentChange,
    hasError: commentError,
  } = useInput(comment ? comment : "", (value) => isNotEmpty(value));

  const clickSubmit = () => {
    console.log(nameError, commentError);
    if (nameError || commentError || nameValue == "" || commentValue == "") {
      return;
    }
    handleSubmit(nameValue, commentValue);
    handleNameChange();
    handleCommentChange();
    if (comment !== undefined) {
      handleCancel();
    }
  };

  return (
    <div className="post-comment rounded-md">
      <p className="m-0 mb-1">{type}</p>
      <div>
        {comment == undefined && (
          <input
            type="text"
            placeholder="Name"
            className={`w-full p-3 mb-1 rounded ${
              nameError
                ? "border border-red-600 bg-red-200 placeholder:text-red-500"
                : ""
            }`}
            value={nameValue}
            onBlur={handleNameBlur}
            onChange={handleNameChange}
            autoFocus
          />
        )}

        {nameError && (
          <div className="control-error mb-1 text-red-600">
            <p>Name is required!</p>
          </div>
        )}

        <textarea
          type="text"
          placeholder={type}
          className={`w-full p-3 resize-none rounded mt-2 mb-2 ${
            commentError
              ? "border border-red-600 bg-red-200 placeholder:text-red-500"
              : ""
          }`}
          rows="3"
          value={commentValue}
          onBlur={handleCommentBlur}
          onChange={handleCommentChange}
        ></textarea>

        {commentError && (
          <div className="control-error mb-1 text-red-600">
            <p>Comment is required!</p>
          </div>
        )}

        <div className="flex justify-end">
          {(type == "Reply" || comment != undefined) && (
            <button
              className="rounded p-2 me-5 text-blue-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          <button
            className="rounded p-2 bg-blue-500 text-white"
            onClick={clickSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
