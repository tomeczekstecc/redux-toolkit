import {useDispatch} from "react-redux";
import {reactionAdded} from "./postsSlice";

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();

    const reactionEmoji = {
        thumbsUp: "👍",
        wow: "😮",
        heart: "❤️",
        rocket: "🚀",
        coffee: "☕️",
    }

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                className={'reactionButton'}
                onClick={() => dispatch(reactionAdded({
                    postId: post.id,
                    reaction: name,
                }))}
            >
                {emoji}{post?.reactions[name]}
            </button>
        )
    })

    return (
        <div className="reaction-buttons">
            {reactionButtons}
        </div>
    );
};

export default ReactionButtons;
