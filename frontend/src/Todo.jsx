import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_APP_API_URI;

  const fetchedTodo = async () => {
    try {
      const res = await axios.get(`${API}/get-todos`);
      setTodos(res.data.allTodos || res.data);
    } catch {
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchedTodo();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!text.trim()) {
      toast.warning("Todo text is required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`${API}/update-todo/${editId}`, { text });
        toast.success("Todo updated");
        setEditId(null);
      } else {
        await axios.post(`${API}/create`, { text });
        toast.success("Todo added");
      }

      setText("");
      fetchedTodo();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    const result = await Swal.fire({
      title: "Delete this todo?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API}/delete-todo/${id}`);
      toast.success("Todo deleted");
      fetchedTodo();
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  const handleEditClick = (todo) => {
    setText(todo.text);
    setEditId(todo._id);
    toast.info("Edit mode enabled");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          📝 Todo Manager
        </h2>

        {/* INPUT */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            className="border border-gray-300 rounded-xl p-3 flex-1 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button
            onClick={handleAddOrUpdate}
            disabled={loading}
            className={`px-5 rounded-xl text-white font-semibold transition ${
              editId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {loading ? "..." : editId ? "Update" : "Add"}
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Todo</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
                    🚫 No todos found
                  </td>
                </tr>
              ) : (
                todos.map((todo, index) => (
                  <tr
                    key={todo._id}
                    className={`border-b hover:bg-gray-50 transition ${
                      editId === todo._id ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{todo.text}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEditClick(todo)}
                        className="px-3 py-1 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todo;
