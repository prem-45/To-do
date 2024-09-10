import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("todoData")) || [];
    setAllData(data);
  }, []);
  const todoData = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  const addTodo = () => {
    // setAllData((prevData)=>([
    //   ...prevData,data
    // ]));
    if (!data.title || !data.desc) {
      alert("All fields are required");
      return;
    }
    setAllData([...allData, data]);
    saveTodoLocalStorage([...allData, data]);
    setData({ title: "", desc: "" }); // reset form data to default state after adding new todo.
  };

  const deleteTodo = (index) => {
    const newAllData = [...allData];
    newAllData.splice(index, 1);
    console.log(newAllData);
    setAllData(newAllData);
    saveTodoLocalStorage(newAllData); // save updated todo data to local storage.);  // save updated todo data to local storage.
  };

  const deleteAllTodo = () => {
    setAllData([]);
    localStorage.removeItem("todoData"); // remove all todo data from local storage.
  };

  const saveTodoLocalStorage = (todoData) => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  };
  return (
    <div className="bg-blue-400 max-w-screen min-h-screen text-center">
      <h1 className="text-4xl pt-12">Todo App</h1>
      <div className="mt-4">
        <input
          className="text-2xl px-4 py-2 outline-none capitalize rounded-md"
          value={data.title}
          name="title"
          type="text"
          placeholder="Title"
          onChange={todoData}
          autoComplete="off"
        />
        <br />
        <br />
        <input
          className="text-2xl px-4 py-2 outline-none capitalize rounded-md"
          value={data.desc}
          name="desc"
          type="text"
          placeholder="Description"
          onChange={todoData}
          autoComplete="off"
        />
        <br />
        <br />
        <button
          className="text-2xl bg-gray-900 text-white px-3 py-2 rounded-md"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div className="w-[40%] mx-auto mt-4 mb-4 py-7">
        {
          allData.map((item, index) => (
            <div
              className="bg-slate-200/40 m-4 text-left p-4 rounded-md flex justify-around capitalize"
              key={index}
            >
              <div className="flex gap-6 w-[60%]">
                <p>{index + 1}</p>
                <div className="w-64">
                  <h1>{item.title}</h1>
                  <p className="break-words overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.desc}
                  </p>
                </div>
              </div>
              <button
                className="bg-gray-800 text-white px-2 py-1 text-center rounded-md"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </div>
          )) // this will render all the todo items from the state 'allData' array.  // 'key' prop is required for React to identify uniquely each element in the list.  // 'item' is the current element being iterated over.  // 'index' is the index of the current element.  // 'allData' is the state holding all the todo items.  // 'allData.map()' is a method that returns a new array with the results of calling a provided function on every element in the calling array.  // 'item' is the current element being processed in the loop.  // 'index' is the index of the current element being processed in the loop.  // 'allData.map()' is a
        }
      </div>
      <button
        className="bg-gray-800 text-white px-20 text-2xl py-4 m-3 text-center rounded-md"
        onClick={() => deleteAllTodo()}
      >
        Delete All
      </button>
    </div>
  );
}

export default App;
