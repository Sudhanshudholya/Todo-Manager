import { Todo } from "../models/todo.models.js";

export const createTodo = async (req, res) => {
    try {
        const { text } = req.body

        if (!text) {
            return res.status(400).send({
                success: false,
                message: "Text field are required"
            })
        }

        const newTodo = await Todo.create({ text })

        return res.status(200).json({
            success: true,
            message: "Todo created successfully",
            newTodo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error or something went wrong to create todo"
        })
    }
}

export const getTodos = async (req, res) => {
    try {
        const allTodos = await Todo.find()
        
        return res.status(200).json({
            success: true,
            message: "All todos fetched successfully",
            allTodos
        })
    } catch (error) {
        return res.status(500).json({
            success :"false",
            message: "Something went wrong to get all todos"
        })
    }
}

export const getTodoById = async (req, res) => {
    try{
            const singleTodo = await Todo.findById(req.params.id)

            return res.status(200).json({
                success :true,
                message : "Todo fetched by id successfully",
                singleTodo
            })
    }catch(error){
        return res.status(500).json({
            success :false,
            message: "Something went wrong to get todo by id"
        })
    }
}

export const updateTodoById = async (req, res) => {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})

        return res.status(200).json({
            success: true,
            message: "Todo update by id successfully",
            updateTodo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong to update todo"
        })
    }
}

export const deleteTodoById = async (req, res) => {
    try {
       const deleteTodo = await Todo.findByIdAndDelete(req.params.id) 

       return res.status(200).json({
        success: true,
        message :"Todo deleted successfully by id"
       })
    } catch (error) {
         return res.status(500).json({
            success: false,
            message :"Something went wrong to delete user"
         })
    }
}