import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Trash2, Calendar, Clock } from 'lucide-react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, {
        text: newTodo,
        completed: false,
        id: Date.now(),
        dueDate,
        dueTime
      }]);
      setNewTodo('');
      setDueDate('');
      setDueTime('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const formatDateTime = (date, time) => {
    if (!date && !time) return '';
    let formattedDate = date ? new Date(date).toLocaleDateString('tr-TR') : '';
    return `${formattedDate} ${time || ''}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Yapılacaklar Listesi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTodo} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni görev ekle..."
              className="flex-grow"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 flex-grow">
              <Calendar size={20} className="text-gray-500" />
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-grow"
              />
            </div>
            <div className="flex items-center gap-2 flex-grow">
              <Clock size={20} className="text-gray-500" />
              <Input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="flex-grow"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Ekle</Button>
        </form>

        <div className="space-y-2 mt-4">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="flex flex-col p-3 border rounded hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 border rounded flex items-center justify-center ${
                    todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}
                >
                  {todo.completed && <Check size={16} className="text-white" />}
                </button>
                <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {(todo.dueDate || todo.dueTime) && (
                <div className="text-sm text-gray-500 mt-1 ml-7">
                  <Calendar size={14} className="inline mr-1" />
                  {formatDateTime(todo.dueDate, todo.dueTime)}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
