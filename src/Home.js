import { signOut } from "firebase/auth";
import React ,{useState}from "react";
import { database } from './FirebaseConfig';
import { useNavigate } from "react-router-dom";

function HomeScreen(){
    const history = useNavigate()
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const handleClick = () =>{
        signOut(database).then(val=>{
            console.log(val,"val")
            history('/')
        })
    }
    const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {

      setTodos([...todos, newTodo]);
      setNewTodo("");

  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

    
    return(
        <div>
            <h1>Home</h1>
            <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new todo..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
            <button onClick={handleClick}>SignOut</button>
        </div>
    )
}
export default HomeScreen;