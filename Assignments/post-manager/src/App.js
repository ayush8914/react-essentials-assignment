import {useState, useEffect} from 'react';
// import PostList from './components/PostList';
// import PostForm from './components/PostForm';
import './App.css'

function App(){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({title: '', body: '',userId:1});
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({title: '', body: ''});
  const [updating,setUpdating] = useState(false);
     


  const fetchPosts =async () => {
    try{
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
    }
    catch(error){
      setError(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  const createPost = async(postData)=>{
    try{
        setSubmitting(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        } 

        const createdPost = await response.json();
        setPosts(prevPosts => [{...createdPost, id: Date.now()},...prevPosts]);
        setNewPost({title: '', body: '',userId:1});
        setShowForm(false);
    }
    catch(err){
      setError(`Failed to create Post: ${err.message}`);
      console.error('Error creating post:', err);
    }
    finally{
      setSubmitting(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!newPost.title.trim()|| !newPost.body.trim()){
      setError('Please fill in both title and body for the post.');
      return;
    }
    setError(null);
    createPost(newPost);
  }


  const handleInputChange = (e) => {
    setNewPost(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const deletePost =async (id)=>{
    try{
      setError(null);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    }
    catch(err){
      setError(`Failed to delete Post: ${err.message}`);
      console.error('Error deleting post:', err);
    }
  } 

  const handleDelete = (id)=>{
      if(window.confirm('Are you sure you want to delete this post?')){
        deletePost(id);
      }
  }

  const updatePost  = async (postID, updatedPost) => {
    try{
        setUpdating(true);
        setError(null);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : postID,
            ...updatedPost,
            userId:1
          }),
        });

        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedPostData = await response.json();
        setPosts(prevPosts => prevPosts.map(post => post.id === postID ? {...post, ...updatedPostData} : post));
        setUpdating(false);
        setEditingPost(null);
        setEditForm({title: '', body: ''});
        console.log('Post updated successfully:', updatedPostData);
    }
    catch(err){
      setError(`Failed to update Post: ${err.message}`);
      console.error('Error updating post:', err);
    }
    finally{
      setUpdating(false);
    }
  }

  const startEditing = (post) => {
    setEditingPost(post.id);
    setEditForm({title: post.title, body: post.body});
  }

  const cancelEditing = () => {
    setEditingPost(null);
    setEditForm({title: '', body: ''});
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if(!editForm.title.trim()|| !editForm.body.trim()){
      setError('Please fill in both title and body for the post.');
      return;
    }
    updatePost(editingPost, editForm);
  }




  return(
    <div className='App'>
        <div className='app-header'>
          <h1>Posts Manager</h1>
        </div>

      <div className='add-post-section'>
        <button
          className='toggle-form-button'
          onClick={()=>setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Post'}
        </button>

        {showForm && (
          <form className='post-form' onSubmit={handleSubmit}>
            <h3>Create New Post</h3>
            <div className='form-group'>
              <label htmlFor="title">Post Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter an engaging title..."
                value={newPost.title}
                onChange={handleInputChange}
                disabled={submitting}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="body">Post Body:</label>
              <textarea
                name="body" 
                value={newPost.body}
                onChange={handleInputChange}
                placeholder="Write your post content here..."
                rows="6"
                disabled={submitting}
                />
            </div>
            <div className='form-actions'>
             <button type="submit" disabled={submitting || !newPost.title.trim() || !newPost.body.trim()}
             className='submit-btn'>
               {submitting ? 'Creating Post...' : 'Create Post'}
              </button>
              <button type='button' onClick={()=> setShowForm(false)} disabled={submitting} className='cancel-btn'>
                  Cancel
              </button>
            </div>
          </form>
        )}

      </div>

        {loading && (
          <div className='loading'>
            <h2>Loading Posts...</h2>
            <p>Please wait while we fetch the posts.</p>
          </div>
        )}

        {error && (
          <div className='error'>
            <h2>Error Fetching Posts</h2>
            <p>{error}</p>
            <button onClick={fetchPosts}>Try Again</button>
          </div>
        )}

        {!loading && !error && (
          <div className='post-container'>
              <h2>All Posts ({posts.length})</h2>
              {posts.length == 0 ? (
                <p>No posts found.</p>
              ) : (
                <div className='post-grid'>
                {posts.map((post) => (
                    <div key={post.id} className='post-card'>
                      { editingPost === post.id ? (
                        <div className='edit-form'>
                          <input type='text' value={editForm.title}
                            disabled={updating}
                            className='edit-input'
                            onChange={(e) => setEditForm(prev => ({...prev,title: e.target.value}))}
                            /> 
                          <textarea value={editForm.body}
                          onChange={(e) => setEditForm(prev => ({...prev,body: e.target.value}))}   
                          className='edit-textarea' disabled={updating} rows="4" />
                          <div className='edit-actions'>
                            <button className='save-btn' onClick={handleEditSubmit} disabled={updating || !editForm.title.trim() || !editForm.body.trim()}>
                              {updating ? 'Saving...' : 'Save'}
                            </button>
                            <button className='cancel-edit-btn'
                            onClick={cancelEditing}
                            disabled={updating}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : 
                      <>
                      <div className='post-header'>
                          <h3>{post.title}</h3>
                          <div className='post-actions'>
                            <button className='delete-btn' title='Delete this post' onClick={() => handleDelete(post.id)}>Delete</button>
                            <button className='edit-btn' title='Edit this post' onClick={() => startEditing(post)}>Edit</button>
                          </div>
                      </div>
                      <p>{post.body}</p>
                        <small>Post ID: {post.id} | User ID: {post.userId}</small>
                      </>
                    }
                    </div>  
                ))}
                </div>
              )}
          </div>
        )}
    </div>
  );
}


export default App;
