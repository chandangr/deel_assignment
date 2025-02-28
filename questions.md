Please answer the following questions to the best of your knowledge, in clear English. Elaborate
and demonstrate the React knowledge you have. Feel free to give examples and use cases.

1. What is the difference between Component and PureComponent? Give an example where it might break my app.

Answer:
Component is normal react component that re-renders on state update, 
whereas PureComponent is like react.memo in functional components, it renders only when its primitive props or state change, it is used for shallow comparison of props. 
EXAMPLE: if you pass non-primitive values like objects or arrays as props, PureComponent might not detect the change, resulting in re-rendering the component. To avoid this, you can use useMemo or useCallback to memoize the values.

---

2. Context + ShouldComponentUpdate might be dangerous. Why is
that?

Answer:
Using Context with shouldComponentUpdate  because it can cause many re-renders. If Context is wrapped in a PureComponent, it will only re-render when its props or state change, which is not desired behavior.

---

3. Describe 3 ways to pass information from a component to its PARENT.

Answer:
- Props: Pass data from a child component to its parent using props.
- Callbacks: Pass a function as a prop from a child to a parent.
- Context API: Use React's Context API to share data between components at different levels of the component tree. You can use redux, zustand, or other state management libraries.

---

4. Give 2 ways to prevent components from re-rendering.

Answer: 
- React.memo: Wrap the component with React.memo to memoize the component and prevent unnecessary re-renders. But it is used for primitive props and state.
- useMemo: we can use useMemo hook to memoize computations and prevent extra re-renders.
- useCallback: we can use useCallback hook to memoize callbacks/functions and prevent extra re-renders.

---

5. What is a fragment and why do we need it? Give an example where it might break my app.

Answer:
A fragment is used without adding extra nodes to the DOM. It can be used to return multiple elements from a component.
Example:
```jsx
return (
  <React.Fragment>
    <h1>Title</h1>
    <p>Description</p>
  </React.Fragment>
);  
```
Cannot apply styles, classnames, ids to fragments.

---

6. Give 3 examples of the HOC pattern.

Answer:
-  React.memo: Wrap the component with React.memo to memoize the component and prevent unnecessary re-renders.
-  withRouter: A HOC from React Router that provides routing-related props to the wrapped component.
-  connect: A HOC from Redux that connects a React component to the Redux store, allowing it to access state and dispatch actions.

---

7. What's the difference in handling exceptions in promises, callbacks and async...await?  

Answer:
- Promises: Use .catch() to handle exceptions.
- Callbacks: Use error handling in the callback function.
- async...await: Use try...catch to handle exceptions.

---

8. How many arguments does setState take and why is it async.

Answer:
setState takes two arguments: the state value and a callback function. It is async because it schedules the update and returns immediately, allowing the component to continue rendering.

---

9. List the steps needed to migrate a Class to Function
Component.

Answer:
- Convert the class component to a function component.
- Convert the class component's state to function component's state.
- Convert the class component's lifecycle methods to function component's hooks.

---

10.List a few ways styles can be used with components.

Answer:
- Inline styles: Use the style attribute to add styles to the component.
- CSS classes: Use the className attribute to add styles to the component.
- CSS modules: Use a CSS module to add styles to the component. - tailwind css, styled components.

---

11. How to render an HTML string coming from the server.

Answer:
- Use the dangerouslySetInnerHTML attribute to render the HTML string.
- Use the renderToString function to render the component to a string.
