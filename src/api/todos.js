import { request } from "./request";

export const getTodos = () => {
  return request("/todos/", { method: "GET" });
};

export const createTodo = (content) => {
  return request("/todos/", {
    method: "POST",
    data: { content },
  });
};


export const deleteTodo = (id) => {
  return request(`/todos/${id}`, {
    method: "DELETE",
  });
};

export const toggleTodo = (id) => {
  return request(`/todos/${id}/toggle`, {
    method: "PATCH",
  });
};


export const updateTodo = (id, content) => {
  return request(`/todos/${id}`, {
    method: "PUT",
    data: { content },
  });
};