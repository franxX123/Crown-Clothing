import { createContext, useReducer, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocument,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const USER_ACTIONS = {
  SET_USER_ACTION: "SET_USER_ACTION",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS.SET_USER_ACTION:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled error of type ${type} in reducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (currentUser) => {
    // dispatch takes an action, which is an object
    // this updates the state of user to reducers returned object
    dispatch({ payload: currentUser, type: USER_ACTIONS.SET_USER_ACTION });
  };

  console.log(currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      // IMPORTANT: Changes the user state based on changes in
      // the auth singleton. If signed in change the navigation look
      // and other components in the future.
      setCurrentUser(currentUser);
      if (currentUser) {
        createUserDocument(currentUser);
      }
    });
    // IMPORTANT: unsubscribe allows us to prevent memory leak problems
    // for having observer running long after application is done.
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
