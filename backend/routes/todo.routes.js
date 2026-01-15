import express from "express"
import { createTodo, deleteTodoById, getTodoById, getTodos, updateTodoById } from "../controllers/todo.controller.js"

const router = express()


router.post("/create", createTodo)
router.get("/get-todos", getTodos)
router.get("/get-todo/:id", getTodoById)
router.put("/update-todo/:id", updateTodoById)
router.delete("/delete-todo/:id", deleteTodoById)

export default router