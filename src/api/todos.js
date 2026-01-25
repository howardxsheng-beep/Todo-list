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