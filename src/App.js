import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

import Home from "./Home";
import Missing from "./Missing";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";

import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { format } from "date-fns";

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('ListOfPosts')) || []);
  const [searchResults, setSearchResults] = useState(posts);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  useEffect(() => {
    localStorage.setItem('ListOfPosts', JSON.stringify(posts));
    const filteredPosts = posts.filter((item) => {
      return (
        (item.title).toLowerCase().includes(search.toLowerCase()) ||
        (item.body).toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResults(filteredPosts);
  }, [posts, search]);
  

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const updatedPostsList = posts.filter((item) => item.id !== id);
    setPosts(updatedPostsList);
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id : id, title : postTitle, dateTime: dateTime, body: postBody};
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  return (
    <div className="App">
      <Header title={'React JS Blog'} />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home 
          posts={searchResults}
          />}
        />
        <Route path="/post" element={<NewPost
          handleSubmit = {handleSubmit}
          postTitle = {postTitle}
          setPostTitle = {setPostTitle}
          postBody = {postBody}
          setPostBody = {setPostBody}
        />}/>
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Missing/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;