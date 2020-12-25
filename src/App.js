import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import IMessage from './component/IMessage/IMessage';
import Login from './component/Login/Login';
import { selectUser } from './component/features/userSlice';
import { auth } from './component/firebase/firebase';
import { login, logout } from './component/features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch]);

  return (
    <div className="app">
        {!user ? <Login /> : <IMessage />}
    </div>
  );
}

export default App;
