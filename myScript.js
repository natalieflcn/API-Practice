'use strict';

// Challenge 1
const getUserData = function (userId) {
  try {
    const request = new XMLHttpRequest();
    request.open('GET', `https://jsonplaceholder.typicode.com/users/${userId}`);

    request.addEventListener('load', function () {
      if (!request.status === 200) {
        resolve(JSON.parse(request.responseText));
      } else {
        reject(`An error occurred. ${request.status}`);
      }
    });
  } catch (err) {
    reject(new Error(`An error occurred. ${request.status}`));
  }
};

// Challenge 2 -- remember to handle errors
const fetchPost = function (postId) {
  const request = fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => {
      if (!res.ok) throw new Error(`An error occurred. ${res.status}`);
      return res.json();
    })
    .then(data => console.log(data.title))
    .catch(err => console.error(err.message));
};

// Challenge 3
const fetchUserAndPosts = function (userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error(`Couldn't find user. ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log('Name: ' + data.name);

      return fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Error occurred. ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(`Posts: ${JSON.stringify(data)}`);
    })
    .catch(err => console.error(err.message));
};

const fetchUserandPosts2 = async function (userId) {
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!userResponse.ok) throw new Error(userResponse.status);
  const user = await userResponse.json();

  const userName = user.name;

  const usersPostsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  if (!usersPostsResponse.ok) throw new Error(usersPostsResponse.status);
  const usersPosts = await usersPostsResponse.json();

  console.log(`User: ${userName} Posts: ${usersPosts}`);
};
fetchUserAndPosts(-1);
fetchUserandPosts2(1);
