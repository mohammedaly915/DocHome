const Logintype = {
  start: "LOGIN_START",
  success: "LOGIN_SUCCESS",
  fail: "LOGIN_FAILURE",
  logout: "LOGOUT"
}

const AuthReducer = (state, action) => {
  switch (action.type) { 
    case Logintype.start:
      return {
        user: null,
        isFetching: true,
        error: false,
      }
    case Logintype.success:
      return { 
        user: action.payload,
        isFetching: false,
        error: false,
      }
    case Logintype.fail:
      return {
        user: null,
        isFetching: false, 
        error: true,
      }
    case Logintype.logout:
      return {
        user: null,
        isFetching: false,
        error: false,
      }
    default:
      return { ...state }
  }
}

export const loginStart = () => ({
  type: Logintype.start,
})

// export const loginSuccess = (user) => ({
//   type: Logintype.success,
//   payload: user,
// })

export const loginSuccess = (user) => {
  console.log("User logged in successfully: Auth Reducer"); // Log user data
  return {
    type: Logintype.success,
    payload:user,
  };
};

export const loginFailure = () => ({
  type: Logintype.fail,
})

export const logout = () => ({
  type: Logintype.logout,
})

export default AuthReducer
