import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { app } from "../../App";
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
  return (dispatch) => {
    const db = getFirestore(app);

    const auth = getAuth();

    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
      
        dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
      } else {
        console.log("Data does not exist");
      }
    });
  };
}
