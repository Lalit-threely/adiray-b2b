import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateBlog from "./component/CreateBlogPost"
import UpdateBlog from "./component/UpdateBlogPost"
import Blog from "./component/Blog"
import Blogpost from "./component/BlogPost"
import Navbar from "./component/Navbar"


function App() {
 

  return (
    <>

    <BrowserRouter>
    <Navbar/>
    <Routes>
      
      <Route path="/admin/blog/" element={<Blog/>} />
      <Route path="/admin/posts/" element={<CreateBlog/>} />
      <Route path="/admin/posts/:postId" element={<UpdateBlog />} />
      <Route path="/admin/blogposts/:postId" element={<Blogpost />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
