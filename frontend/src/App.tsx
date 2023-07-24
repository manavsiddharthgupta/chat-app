import { Link } from "react-router-dom";

function App() {
  const onHandleGoogleSignin = () => {
    console.log("google signin");
    window.open("http://localhost:4000/auth/google", "_self");
  };
  return (
    <div>
      <h1>Hello World</h1>
      <Link to="chat">chat</Link>
      <button onClick={onHandleGoogleSignin}>SignIn With Google</button>
    </div>
  );
}

export default App;
