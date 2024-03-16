import "./App.css";
import PostComponent from "./components/PostComponent";
import { useEffect, useState } from "react";
import CommentComponent from "./components/CommentComponent";

class CommentModel {
  constructor({ name, comment, id, date, type }) {
    this.name = name;
    this.comment = comment;
    this.id = id;
    this.date = date;
    this.type = type;
    this.replies = [];
  }
}
function App() {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const handleAddComment = (name, comment) => {
    console.log(name, comment);
    const newComment = new CommentModel({
      name,
      comment,
      id: Date.now(),
      date: new Date(),
      type: "comment",
    });
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleAddReply = (name, reply, commentId) => {
    setComments((prevComments) => {
      return prevComments.map((comm) => {
        if (comm.id == commentId) {
          comm.replies.push(
            new CommentModel({
              name,
              comment: reply,
              id: Date.now(),
              date: new Date(),
              type: "reply",
            })
          );
        }
        return comm;
      });
    });
  };

  const handleDeleteReply = (replyId, commentId) => {
    console.log(replyId, commentId);
    // const comment = comments.find((comm) => comm.id == commentId);
    // console.log(comment);
    // comment.replies = comment.replies.filter((reply) => reply.id != replyId);
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id == commentId) {
          comment.replies = comment.replies.filter(
            (reply) => reply.id != replyId
          );
        }
        return comment;
      });
    });
  };

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id != commentId)
    );
  };

  const handleEditReply = (replyId, commentId, editedReply) => {
    console.log(replyId, commentId);
    // const comment = comments.find((comm) => comm.id == commentId);
    // console.log(comment);
    // comment.replies = comment.replies.filter((reply) => reply.id != replyId);
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id == commentId) {
          const reply = comment.replies.find((reply) => reply.id == replyId);
          reply.comment = editedReply;
        }
        return comment;
      });
    });
  };

  const handleEditComment = (commentId, editedComment) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => {
        if (comment.id == commentId) {
          comment.comment = editedComment;
        }
        return comment;
      })
    );
  };

  const toggleSort = () => {
    setSortAsc((prevVal) => !prevVal);
    setComments((prevComments) => {
      if (sortAsc) {
        return prevComments
          .map((comment) => {
            comment.replies.sort((a, b) => b.id - a.id);
            return comment;
          })
          .sort((a, b) => b.id - a.id);
      } else {
        return prevComments
          .map((comment) => {
            comment.replies.sort((a, b) => a.id - b.id);
            return comment;
          })
          .sort((a, b) => a.id - b.id);
      }
    });
  };

  useEffect(() => {
    const comments = JSON.parse(localStorage.getItem("comments"));
    if (comments) {
      for (let comment of comments) {
        console.log(comment);
        comment.date = new Date(comment.date);
        for (let reply of comment.replies) {
          reply.date = new Date(reply.date);
        }
      }
      setComments(comments);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments, loaded]);

  return (
    <>
      <PostComponent handleSubmit={handleAddComment} type="Comment" />
      <div className="flex justify-end my-4">
        <button className="flex align-middle" onClick={toggleSort}>
          Sort By Date & Time{" "}
          <span className="material-symbols-outlined ms-2">
            {sortAsc ? "arrow_upward" : "arrow_downward"}
          </span>
        </button>
      </div>
      {comments.map((comment) => (
        <CommentComponent
          key={comment.id}
          id={comment.id}
          name={comment.name}
          comment={comment.comment}
          date={comment.date}
          handleAddReply={handleAddReply}
          replies={comment.replies}
          type={comment.type}
          handleDelete={() => handleDeleteComment(comment.id)}
          handleDeleteReply={handleDeleteReply}
          handleEditReply={handleEditReply}
          handleEditComment={handleEditComment}
        />
      ))}
    </>
  );
}

export default App;
