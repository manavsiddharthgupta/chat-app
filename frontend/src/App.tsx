import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
	useEffect(() => {
		fetch("http://localhost:4000/auth/success")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<h1>Hello World</h1>
			<Link to="chat">chat</Link>
		</div>
	);
}

export default App;
