import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Courses from './pages/Courses'
import Blog from './pages/Blog'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Header from "./components/Header"
import Footer from './components/Footer'
import DashBoard from './pages/DashBoard'
import CreatePost from './pages/CreatePost'
import PrivateRoute from './components/PrivateRoute'
import PostShow from './pages/PostShow'
import SearchPage from './pages/SearchPage'
import UpdatePost from './pages/UpdatePost'
import ChatSection from './pages/ChatSection'
import AdminRoute from './components/AdminRoute'

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
          <Route path='/search' element={<SearchPage />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/post/:PostId' element={<PostShow />}></Route>
          <Route path='/post/update/:PostId' element={<UpdatePost />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashBoard />}></Route>
            <Route path='/chat/inbox' element={<ChatSection />}></Route>
            <Route path='/create-post' element={<CreatePost />}></Route>
          </Route>
          {/* <Route element={<AdminRoute />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
          </Route> */}
        </Routes>
        <Footer />
      </Router>

    </div>
  )
}