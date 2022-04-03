import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";


const PostExcerpt = ({post}) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 50) + '...'}</p>
            <div className={'postCredit'}>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
                <ReactionButtons post={post}/>
            </div>
        </article>
    );
};

export default PostExcerpt;
