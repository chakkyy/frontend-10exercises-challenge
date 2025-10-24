# Exercise 8
**Scenario:**  
A dashboard renders a `<ul>` with thousands of `<li>` rows. Each `<li>` has a click handler attached individually like this:
```ts
items.forEach(item => {
  const li = document.createElement("li");
  li.innerText = item;
  li.addEventListener("click", () => select(item));
  ul.appendChild(li);
});
```  

Over time, the UI becomes **slow and unresponsive**.

**Task:**
1. Identify the **performance bottleneck**.
2. Refactor the code to make it more efficient, while keeping the same functionality.

