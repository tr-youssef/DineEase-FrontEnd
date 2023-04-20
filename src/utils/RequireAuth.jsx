import { Navigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
function RequireAuth({ children, isAllowed }) {
  let auth = JSON.parse(localStorage.getItem("user"));
  // console.log("isAllowed !== auth.role", isAllowed !== auth.role);
  // console.log("isAllowed", isAllowed);
  // console.log("auth.role", auth.role);
  // console.log('isAllowed !== "all"', isAllowed !== "all");

  if (!auth) {
    return <Navigate to="/signin" replace={true} />;
  } else if (auth.role !== isAllowed && isAllowed !== "all") {
    return <Navigate to="/signin" replace={true} />;
  } else {
    const decodedJwt = parseJwt(auth.token);
    if (Date.now() >= decodedJwt.exp * 43200) {
      localStorage.clear();
      return <Navigate to="/signin" replace={true} />;
    }
  }

  return children;
}

export default RequireAuth;
