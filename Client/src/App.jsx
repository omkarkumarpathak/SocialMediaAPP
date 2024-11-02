import Home from './pages/Home'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import Courses from './pages/Courses'
import Blog from './pages/Blog'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Header from "./components/Header"
import Footer from './components/Footer'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import PrivateRoute from './components/PrivateRoute'
import PostShow from './pages/PostShow'
import UpdatePost from './pages/UpdatePost'
export default function App() {
  return (
    <div>

      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/blog' element={<Blog />}></Route>
          <Route path='/courses' element={<Courses />}></Route>
          <Route path='/sign-in' element={<LogIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/post/:PostId' element={<PostShow />}></Route>
          <Route path='/post/update/:PostId' element={<UpdatePost/>}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />}></Route>
          </Route>
          <Route path='/create-post' element={<CreatePost />}></Route>
        </Routes>
        <Footer />
      </Router>

    </div>
  )
}