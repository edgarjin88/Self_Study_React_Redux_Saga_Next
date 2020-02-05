import React, {useEffect} from 'react';

import {connect} from 'react-redux'; 
import {getUsersRequest, createUserRequest, deleteUserRequest, usersError} from '../actions/users'
import UsersList from './UsersList'; 
import NewUserForm from './NewuserForm'
import {Alert} from 'reactstrap'



//redux-saga runs all in while-true loop
// because it is true, it will runs again after third yield

function App(props) {
  
  useEffect(()=>{

    props.getUsersRequest()
  },[])

  
  // console.log('lksajdf::', props );
  const users = props.items; 
  // console.log('this  user;', props.items);
  const handleSubmit = ({firstName, lastName}) =>{
    // console.log(firstName, lastName);
    props.createUserRequest({firstName, lastName})
  }

  const handleDeleteuserClick=(userId)=>{
    props.deleteUserRequest(userId)
  }
  const handleCloseAlert= ()=>{
    props.usersError({
      error:''
    })
  }
  return (
    <div className="App" style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>
      <Alert color="danger" isOpen={!!props.error} toggle={handleCloseAlert}>
        {props.error}
      </Alert>
      <NewUserForm onSubmit={handleSubmit}/>
      <UsersList onDeleteUser={handleDeleteuserClick} users={users}/>
    </div>
  );
}

export default connect(((state) => {return state.users}), {getUsersRequest, createUserRequest, usersError, deleteUserRequest})(App);
