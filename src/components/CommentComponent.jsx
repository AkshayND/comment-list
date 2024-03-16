import { useState } from "react";
import PostComponent from "./PostComponent";
import ReplyComponent from "./ReplyComponent";

export default function CommentComponent({
  name,
  comment,
  date,
  id,
  handleAddReply,
  replies,
  type,
  handleDelete,
  handleDeleteReply,
  handleEditReply,
  handleEditComment,
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleReplying = () => {
    setIsReplying((prevValue) => !prevValue);
  };

  const toggleEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  const submitReply = (name, reply) => {
    handleAddReply(name, reply, id);
    toggleReplying();
  };

  return (
    <>
      {isEditing && (
        <div className="mt-2">
          <PostComponent
            comment={comment}
            name={name}
            handleCancel={toggleEditing}
            handleSubmit={(name, comment) => handleEditComment(id, comment)}
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
              className="me-10 text-blue-500 font-bold hover:text-blue-700"
              onClick={toggleReplying}
            >
              Reply
            </button>
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
      {replies.length > 0 && (
        <div className="flex justify-end">
          <div className=" w-10/12 mt-2">
            {replies.map((reply) => (
              <ReplyComponent
                key={reply.id}
                id={reply.id}
                name={reply.name}
                comment={reply.comment}
                date={reply.date}
                replies={reply.replies}
                commentId={id}
                handleEditReply={handleEditReply}
                handleDelete={() => handleDeleteReply(reply.id, id)}
              />
            ))}
          </div>
        </div>
      )}

      {isReplying && (
        <div className="flex justify-end">
          <div className=" w-10/12 mt-2">
            <PostComponent
              type="Reply"
              handleSubmit={submitReply}
              handleCancel={toggleReplying}
            />
          </div>
        </div>
      )}
    </>
  );
}
