import {useSelector} from "react-redux";
import {selectAllPosts} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    console.log(posts.slice());

    const orderedPosts = posts.slice().sort((b, a) => a.date.localeCompare(b.date));


    const renderPosts = orderedPosts.map(post => {
        return (
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 50) + '...'}</p>
                <p className={'postCredit'}>
                    <PostAuthor userId={post.userId}/>
                    <TimeAgo timestamp={post.date}/>
                    <ReactionButtons post={post}/>
                </p>
            </article>
        )
    })

    return (
        <div>
            <h2>Posts</h2>
            {renderPosts}
        </div>
    );
};

export default PostsList;
