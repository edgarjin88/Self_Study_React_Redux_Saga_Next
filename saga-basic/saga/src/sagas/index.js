import UsersSaga from './users'
import {all} from 'redux-saga/effects'; 

export default function* rootSaga(){
  yield all([...UsersSaga])
}

//all sagas created in parallel 