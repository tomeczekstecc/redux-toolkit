import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postAdded} from "./postsSlice";
import {getAllUsers} from "../users/usersSlice";

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    const users = useSelector(getAllUsers);

    const onTitleChange = e => setTitle(e.target.value);

    const onContentChange = e => setContent(e.target.value);

    const onAuthorChange = e => setUserId(e.target.value)


    const onSavePostClick = e => {
        e.preventDefault();

        if (title && content) {
            dispatch(postAdded(title, content, userId));
        }
        setTitle('');
        setContent('');
    };

    const canSave = title && content && userId;
    const usersOptions = users.map(user => <option key={user.id} value={user.id}>{user.name}</option>);

    return <>
        <h2>Add Post</h2>
        <form>
            <label htmlFor={'postTitle'}>Post Title</label>
            <input
                id={'postTitle'}
                name={'postTitle'}
                value={title}
                type="text"
                onChange={onTitleChange}
                placeholder="Title"/>
            <label htmlFor={'postAuthor'}>Post Author</label>
            <select onChange={onAuthorChange} value={userId}>
                <option disabled value="">Select author</option>
                >
                {usersOptions}
            </select>

            <label htmlFor={'postContent'}>Post Content</label>
            <textarea
                id={'postContent'}
                name={'postContent'}
                onChange={onContentChange} value={content}
                placeholder="Content"/>
            <button onClick={onSavePostClick} type="submit" disabled={!canSave}>Save Post</button>
        </form>
    </>

}

export default AddPostForm;
