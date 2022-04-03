import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {selectAllPosts, getPostsError, getPostsStatus, fetchPosts} from "./postsSlice";
import PostExcerpt from "./PostExcerpt";


const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    let content;
    if (postsStatus === "idle") {
        content = <div>Loading...</div>;
    } else if (postsStatus === "pending") {
        content = <div>Loading...</div>;
    } else if (postsStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((b, a) => a.date.localeCompare(b.date));
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post}/>);
    } else if (postsStatus === "failed") {
        content = <div>{postsError}</div>;
    }


    return (
        <div>
            <h2>Posts</h2>
            {content}
        </div>
    );
};

export default PostsList;
