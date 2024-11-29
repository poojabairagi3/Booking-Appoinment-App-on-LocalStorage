// Selectors
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userNumber = document.getElementById("number");
const form = document.getElementById("myForm");

// Add event listener to the form for submission
form.addEventListener("submit", saveToLocalStorage);

function saveToLocalStorage(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Retrieve values from form fields
  const name = userName.value;
  const email = userEmail.value;
  const phoneNumber = userNumber.value;

  // Create an object to store the user's data
  const obj = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  };

  // Save the object to local storage using the email as the key
  localStorage.setItem(obj.email, JSON.stringify(obj));

  // Display the user data on the screen
  showUserOnScreen(obj);

  // Clear form inputs after saving
  form.reset();
}

function showUserOnScreen(obj) {
  const parentElem = document.getElementById("listOfItems"); // List container
  const childElem = document.createElement("li"); // Create a new list item

  // Set the content of the list item
  childElem.textContent = `${obj.name} - ${obj.email} - ${obj.phoneNumber}`;

  // Add a delete button to each list item
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";

  // Add delete functionality
  deleteBtn.onclick = function () {
    localStorage.removeItem(obj.email); // Remove the user from local storage
    parentElem.removeChild(childElem); // Remove the list item from the screen
  };

  // Add edit button to each list item
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.marginLeft = "10px";

  // Add edit functionality
  editBtn.onclick = function () {
    // Prefill the form fields with the current user data
    userName.value = obj.name;
    userEmail.value = obj.email;
    userNumber.value = obj.phoneNumber;

    // Remove the old entry from localStorage and the screen
    localStorage.removeItem(obj.email);
    parentElem.removeChild(childElem);
  };

  // Append the delete and edit buttons to the list item
  childElem.appendChild(deleteBtn);
  childElem.appendChild(editBtn);

  // Add the list item to the parent container
  parentElem.appendChild(childElem);
}
