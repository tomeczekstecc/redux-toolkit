import {useSelector} from "react-redux";

import {getAllUsers} from "../users/usersSlice";

const PostAuthor = ({userId}) => {
    console.log(userId);
    const users = useSelector(getAllUsers);
    const author = users.find(user => user.id === userId);
    return <span>{author ? author.name : "Unknown author"}</span>
};
export default PostAuthor;
