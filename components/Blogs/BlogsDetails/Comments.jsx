import Image from "next/image";
import LoadingSpinner from "../../LoadingSpinner";

const formatCommentDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .replace(" at", " At");
};

export default function Comments({ comments, loading }) {
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="py-8">
        <h3 className="text-3xl font-semibold mb-6">Leave a Comment</h3>
        <p>Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <div className="flex items-center space-x-3 mb-10">
        <h3 className="text-3xl font-semibold text-gray-800">Comments</h3>
        <span className="bg-amber-400 text-gray-800 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">
          {comments.length}
        </span>
      </div>

      <div className="space-y-8">
        {comments.map((comment, index) => (
          <div
            key={comment._id}
            className={`flex items-start space-x-5 border-b border-gray-200 pb-8 last:border-b-0 last:pb-0 ${
              index === 1 ? "ml-20" : ""
            }`}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={comment.userImage || "/user-image.jpg"}
                alt={`Avatar of ${comment.name}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    {comment.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatCommentDate(comment.createdAt)}
                  </p>
                </div>
              </div>

              <p className="text-black leading-relaxed mt-3">
                {comment.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}