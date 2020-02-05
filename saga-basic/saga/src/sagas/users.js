import {takeEvery, takeLatest, call, fork, put, take} from 'redux-saga/effects'; 
import * as actions from '../actions/users'; 
import * as api from '../api/users'; 


function* getUsers(){
  try{
    const result = yield call(api.getUsers); 
    // no callback involved 
    yield put(actions.getUsersSuccess({    
      // another action creator, 
      // all imported via * 
      items: result.data.data
    }))
  }catch(e){

  }
}

function* watchGetUsersRequest(){
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers); 
}

function* createUser(action){
  
  try{
    yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName}); 
    yield call(getUsers); //refresh the user list again. 
  }catch(e){  
    yield put(actions.usersError({
      error: 'An error occurred when trying to create a user. '
    }))
  }
}

function* deleteUser({userId}){
  try{
    yield call(api.deleteUser, userId)
    yield call(getUsers)
  }catch(e){
    yield put(actions.usersError({
      error:'An error occurred when trying to deletre the user',
    }))
  }
}

function* watchDeleteUserRequest(){
  while(true){
    const action = yield take(actions.Types.DELETE_USER_REQUEST);  //we cannot pass worker saga as take is lower level, simply return
    yield call(deleteUser, {
      userId: action.payload.userId
    })
  }
}
function* watchCreateUserRequest(){
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

const usersSaga =[fork(watchGetUsersRequest), fork(watchCreateUserRequest), fork(watchDeleteUserRequest)
]

export default usersSaga