const express = require('express');
const app = express();
const port = 3000; // Оберіть порт за вашим вибором
const postRouter = require('./postRouter'); // Підключення роутів
const postController = require('./postController'); // Підключення контролерів
const Post = require('./postModel'); // Приклад імпорту моделі посту
//const mongoose = require('mongoose');

const { MongoClient } = require('mongodb');

//const uri = "mongodb+srv://andrian:Aswqer21323@cluster0.7g0iblo.mongodb.net/MyBlogDatabase";
const uri = "mongodb://localhost:27017";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
const client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log('Підключено до MongoDB');
  })
  .catch(err => {
    console.error('Помилка підключення до MongoDB: ', err);
  });

app.post('/api/posts', (req, res) => {
  const { title, description, author } = req.body; // Отримати дані з запиту

  const newPost = {
    title,
    description,
    author,
  };

  const db = client.db('MyBlogDatabase'); // Замініть <dbname> на ім'я вашої бази даних

  // Додати новий пост до колекції
  db.collection('Posts').insertOne(newPost, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Помилка при створенні посту' });
    } else {
      res.json({ message: 'Пост створено успішно', postId: result.insertedId });
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});

app.get('/api/posts', (req, res) => {
    const db = client.db('MyBlogDatabase'); // Замініть <dbname> на ім'я вашої бази даних
  
    // Отримати список постів з колекції
    db.collection('Posts').find({}).toArray((err, posts) => {
      if (err) {
        res.status(500).json({ error: 'Помилка при отриманні постів' });
      } else {
        res.json({ posts });
      }
    });
  });

app.use('/api/posts', postRouter);

exports.getAllPosts = (req, res) => {
    // Отримати список постів з бази даних або іншого джерела даних
    const posts = []; // Ось приклад списку постів
  
    res.json({ posts });
  };
  
  // Операція створення нового посту
  exports.createPost = (req, res) => {
    const { title, description, author } = req.body; // Отримати дані з запиту
  
    // Створити новий пост з отриманими даними
    const newPost = new Post({ title, description, author });
  
    // Зберегти пост в базі даних
    newPost.save((err) => {
      if (err) {
        res.status(500).json({ error: 'Помилка при створенні посту' });
      } else {
        res.json({ message: 'Пост створено успішно' });
      }
    });
  };
  
  // Операція оновлення існуючого посту
  exports.updatePost = (req, res) => {
    const postId = req.params.id; // Отримати ідентифікатор посту з параметра маршруту
    const { title, description, author } = req.body; // Отримати дані для оновлення
  
    // Знайти пост за ідентифікатором і оновити його дані
    Post.findByIdAndUpdate(
      postId,
      { title, description, author },
      { new: true },
      (err, updatedPost) => {
        if (err) {
          res.status(500).json({ error: 'Помилка при оновленні посту' });
        } else {
          res.json({ message: 'Пост оновлено успішно', updatedPost });
        }
      }
    );
  };
  
  // Операція видалення посту
  exports.deletePost = (req, res) => {
    const postId = req.params.id;
}