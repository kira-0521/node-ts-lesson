import { RequestHandler } from 'express'

import { Todo } from '../models/todo'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text
  const newTodo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  // 201 ===> 通信が成功して新しいリソースが作成された
  res.status(201).json({message: 'TODOを作成しました。', createdTodo: newTodo})
}

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({todos: TODOS})
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id
  const todoText = (req.body as { text: string }).text

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId)
  if(todoIndex < 0) {
    throw new Error('Todoが存在しません。')
  }

  TODOS[todoIndex] = new Todo(todoId, todoText)

  res.json({ message: 'Todoを更新しました。', updatedTodo: TODOS[todoIndex]})
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId)
  if(todoIndex < 0) {
    throw new Error('Todoが存在しません。')
  }

  TODOS.splice(todoIndex, 1)
  res.json({ message: 'Todoを削除しました。', todos: TODOS})
}