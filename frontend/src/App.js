import React, { useState, Fragment, useEffect } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import './App.css'
import axios from 'axios'

const App = () => {


  const [ data, setData  ] = useState([]);

  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(
        'https://santih-node-api.herokuapp.com/users',
      );
      setData(result.data);
      console.log(result.data);

    };
	fetchData();

  }, []); 

	const initialFormState = { id: null, name: '', email: '' }

  // Setting state
//   const [ users  ] = useState(data)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
  const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addUser = (user) => {
		// user.id = users.length + 1
		setData([ ...data, user ])

	}

	const deleteUser = id => {
		setEditing(false)

		setData(data.filter(user => user.id !== id))

	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setData(data.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = (user) => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, email: user.email })

	}

	return (
		<div className="container">
			<h1>CRUD App with Hooks</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable  data={data} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App