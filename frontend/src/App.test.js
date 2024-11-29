import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// \ const [usersData, setData] = useState( [] );

// useEffect(() => {
//   const fetchData = async () => {
//     const result = await axios(
//       'https://backend-lingering-moon-3048.fly.dev/users',
//     );
//     setData(result.usersData);
//     console.log(result.usersData);

//   };
//   fetchData();
// }, []);
