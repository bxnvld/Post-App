// // Ваш JavaScript код для взаємодії з сервером
// // Зробити AJAX-запит до сервера, щоб отримати список постів
// const fs = window.fs;
// const process = {};
// const postList = document.getElementById('post-list');
// const ul = postList.querySelector('ul');
// const errorMessage = document.getElementById('error-message');
// const loadingMessage = document.getElementById('loading-message');
// const successMessage = document.getElementById('success-message');

// // Функція для відображення помилок
// function showError(message) {
//     errorMessage.textContent = message;
//     successMessage.textContent = '';
// }

// // Функція для відображення завантаження
// function showLoading() {
//     loadingMessage.style.display = 'block';
//     errorMessage.textContent = '';
//     successMessage.textContent = '';
// }

// // Функція для відображення успішного додавання постів
// function showSuccess(message) {
//     successMessage.textContent = message;
//     errorMessage.textContent = '';
// }

// // Завантажити список постів
// function loadPosts() {
//     showLoading();
//     ul.innerHTML = ''; // Очистити список перед завантаженням
//     fetch('/api/posts')
//         .then(response => response.json())
//         .then(data => {
//             showSuccess('Список постів успішно завантажено.');
//             data.posts.forEach(post => {
//                 const li = document.createElement('li');
//                 li.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p><p>Author: ${post.author}</p>`;
//                 ul.appendChild(li);
//             });
//         })
//         .catch(error => {
//             showError('Помилка при отриманні постів: ' + error.message);
//         })
//         .finally(() => {
//             loadingMessage.style.display = 'none';
//         });
// }

// loadPosts(); // Завантажити список постів при завантаженні сторінки

// // Додати обробник подій для форми додавання посту
// const newPostForm = document.getElementById('new-post-form');
// newPostForm.addEventListener('submit', event => {
//     event.preventDefault();
    
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const author = document.getElementById('author').value;
//     showLoading();
    
//     // Відправити дані на сервер для створення нового посту
//     fetch('/api/posts', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             title,
//             description,
//             author,
//         }),
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json(); // Отримати JSON-відповідь від сервера
//     })
//     .then(data => {
//         showSuccess('Пост створено успішно');
//         loadPosts(); // Оновити список постів після додавання нового
//     })
//     .catch(error => {
//         showError('Помилка при створенні посту: ' + error.message);
//     });
// });

// Initialize an array to store posts
let posts = [];

// Function to add a new post
function addPost(title, description, author) {
  const newPost = {
    title,
    description,
    author,
  };
  posts.push(newPost);
}

// Function to update a post by index
function updatePost(index, title, description, author) {
  if (index >= 0 && index < posts.length) {
    posts[index].title = title;
    posts[index].description = description;
    posts[index].author = author;
  }
}

// Function to delete a post by index
function deletePost(index) {
  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
  }
}

// Function to display posts
function displayPosts() {
  const ul = document.querySelector('#post-list ul');
  ul.innerHTML = ''; // Clear the list

  posts.forEach((post, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p><p>Author: ${post.author}</p>`;
    ul.appendChild(li);
  });
}

// Function to show an error message
function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
}

// Function to show a success message
function showSuccess(message) {
  const successMessage = document.getElementById('success-message');
  successMessage.textContent = message;
}

// Function to show loading message
function showLoading() {
  const loadingMessage = document.getElementById('loading-message');
  loadingMessage.style.display = 'block';
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');
  errorMessage.textContent = '';
  successMessage.textContent = '';
}

// Load posts when the page loads
displayPosts();

// Add event listener for the new post form
const newPostForm = document.getElementById('new-post-form');
newPostForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const author = document.getElementById('author').value;

  showLoading();

  // Add the new post to the array
  addPost(title, description, author);

  // Clear the form
  newPostForm.reset();

  // Display the updated posts
  displayPosts();
  showSuccess('Post created successfully');
});
