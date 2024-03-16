import { useState } from "react";
import PostComponent from "./PostComponent";

export default function ReplyComponent({
  name,
  comment,
  date,
  id,
  commentId,
  handleDelete,
  handleEditReply,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  return (
    <>
      {isEditing && (
        <div className="mt-2">
          <PostComponent
            comment={comment}
            name={name}
            handleCancel={toggleEditing}
            handleSubmit={(name, comment) =>
              handleEditReply(id, commentId, comment)
            }
          />
        </div>
      )}
      {!isEditing && (
        <div className="comment mt-2 rounded-md relative pe-10">
          <div className="flex justify-between">
            <strong>{name}</strong>
            <p>
              {date.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p>{comment}</p>
          <div className="mt-3">
            <button
              className="me-2 text-blue-500 font-bold hover:text-blue-700"
              onClick={toggleEditing}
            >
              Edit
            </button>
          </div>
          <div className="absolute -right-4 top-1/3">
            <button
              className="rounded-3xl bg-slate-700 p-1 text-white inline-flex w-10 h-10 justify-center flex-wrap content-center"
              onClick={handleDelete}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
