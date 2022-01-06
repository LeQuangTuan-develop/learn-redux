import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Reducer Thunk
export const getTodos = createAsyncThunk("todos/todosFetched", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (title) => {
  const newTodo = {
    id: nanoid(),
    title,
    completed: false,
  };

  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);

  return newTodo;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete("https://jsonplaceholder.typicode.com/todos/" + id);

  return id;
});

const totosSlide = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
  },
  reducers: {
    getAllTodos(state, action) {},
    // addTodo: {
    //   reducer(state, action) {
    //     state.allTodos.unshift(action.payload);
    //   },
    //   prepare(title) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },
    markCompleted(state, action) {
      state.allTodos.map((todo) => {
        if (todo.id === action.payload) todo.completed = !todo.completed;
        return todo;
      });
    },
    // deleteTodo(state, action) {
    //   state.allTodos = state.allTodos.filter(
    //     (todo) => todo.id !== action.payload
    //   );
    // },
    // todosFetched(state, action) {
    //   state.allTodos = action.payload;
    // },
  },
  extraReducers: {
    // get all todos
    [getTodos.pending]: (state, action) => {
      console.log("Fetching todo from backend ...");
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log("done");
      state.allTodos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      console.log("failed to get todos");
    },

    // addTodo
    [addTodo.fulfilled]: (state, action) => {
      state.allTodos.unshift(action.payload);
    },

    // delete todo
    [deleteTodo.fulfilled]: (state, action) => {
      state.allTodos = state.allTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

// Async action creator, action and reducer dispatch
// export const getTodos = () => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos?_limit=5"
//     );
//     dispatch(todosFetched(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// };

// reducer
const todosReducer = totosSlide.reducer;

// Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

// export actions
export const { markCompleted } = totosSlide.actions;

export default todosReducer;
