import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomeUsersView from './endpoints/home'
import RegForm from './endpoints/registration'
import LoginForm from './endpoints/login'
import PostsView from './endpoints/posts'
import CreatePostForm from './endpoints/create_post'

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Главная</Link>
          </li>
          <li>
            <Link to='/registration'>Регистрация</Link>
          </li>
          <li>
            <Link to='/login'>Войти</Link>
          </li>
          <li>
            <Link to='/posts'>Публикации</Link>
          </li>
          <li>
            <Link to='/create_post'>Создать</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<HomeUsersView/>} />
        <Route path='/registration' element={<RegForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/posts' element={<PostsView/>} />
        <Route path='/create_post' element={<CreatePostForm/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App
