import cookie from 'js-cookie'


//set cookie
export const setCookie = (key, value)=>{
  if(window !== 'undefined'){
    cookie.set(key, value, {expires:1})
  }
}

// remove from cookie

export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, { expires: 1 });
  }
};

//get from cookie such as stored token

export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

//will be useful when we need to make request to server with token. 


//set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value)); 
  }
};

//remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};


//authenticate user by passing data to cookie and localstorage during signin 
export const authenticate =(response, next) =>{
  console.log('authenticatehelper on sign response', response);

  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
  next(); 
}

// access user info from localstorage
export const isAuth = ()=>{
  if(window !==undefined){ // only in browser
    const cookieChecked = getCookie('token') //getting token from browser cookie
    // console.log('cookieChecked :', cookieChecked);
    if(cookieChecked){
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'))  // hum... still looks unsafe. 
      }else{
        return false; 
      }
    }
  }
}


export const signout = (next)=>{ 
  removeCookie('token')
  removeLocalStorage('user') 
  // remove Localstorage here as well? 
  next(); 
} 


export const updateUser =(response, next)=>{
    console.log('Updateuser in localstorage :', response)

    if(typeof window !== 'undefined'){
      let auth = JSON.parse(localStorage.getItem('user'))
      auth = response.data

      localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}