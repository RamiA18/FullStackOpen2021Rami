// TODO: Change User and blog to BeforeAll Function

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const mockHandler = jest.fn();

test("Renders title + author of post wihtout other details", () => {
  const user = {
    name: "robotTestUser",
    username: "testUsername",
  };

  const TestBlog = {
    title: "A random lovely title",
    author: "A smart author",
    url: "A website on the net",
    likes: 55,
    user: {
      username: "aRandomUser",
    },
  };

  const component = render(
    <Blog
      blog={TestBlog}
      addLike={mockHandler}
      deleteClickFuntion={mockHandler}
      user={user}
    />
  );

  const blogTitle = component.container.querySelector(".blogTitle");
  const blogAuthor = component.container.querySelector(".blogAuthor");
  const blogDetails = component.container.querySelector(".blogDetails");

  expect(blogTitle).toBeDefined();
  expect(blogAuthor).toBeDefined();
  expect(blogDetails).toBe(null);
});

test("information of blog shown when view button is clicked", () => {
  const user = {
    name: "robotTestUser",
    username: "testUsername",
  };

  const TestBlog = {
    title: "A random lovely title",
    author: "A smart author",
    url: "A website on the net",
    likes: 55,
    user: {
      username: "aRandomUser",
    },
  };

  const component = render(
    <Blog
      blog={TestBlog}
      addLike={mockHandler}
      deleteClickFuntion={mockHandler}
      user={user}
    />
  );

  const button = component.getByText("View Info");
  fireEvent.click(button);

  const blogDetails = component.container.querySelector(".blogDetails");

  expect(blogDetails).toBeDefined();
});

test("Like button works (2 times cicked = two likes", () => {
  const user = {
    name: "robotTestUser",
    username: "testUsername",
  };

  const TestBlog = {
    title: "A random lovely title",
    author: "A smart author",
    url: "A website on the net",
    likes: 55,
    user: {
      username: "aRandomUser",
    },
  };

  const component = render(
    <Blog
      blog={TestBlog}
      addLike={mockHandler}
      deleteClickFuntion={mockHandler}
      user={user}
    />
  );

  const showButton = component.getByText("View Info");
  fireEvent.click(showButton);
  const likeButton = component.getByText("Add Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

//   test('Like button works (2 times cicked = two likes (second test)', () => {

//     const user = {
//         name: 'robotTestUser',
//         username: 'testUsername',
//       }

//     const TestBlog = {
//         title: 'A random lovely title',
//         author: 'A smart author',
//         url: 'A website on the net',
//         likes: 55,
//         user: {
//           username: 'aRandomUser',
//         },
//       }

//     const component = render(
//         <Blog blog={TestBlog} addLike={mockHandler} deleteClickFuntion={mockHandler} user={user} />
//       )

//       const showButton = component.getByText('View Info')
//       fireEvent.click(showButton)
//     //   const likeButton = component.getByText('Add Like')
//     //   fireEvent.click(likeButton)
//     //   fireEvent.click(likeButton)
//     const blogLikes = component.container.querySelector("blogLikes")

//     //   expect(mockHandler.mock.calls).toHaveLength(2)
//       expect(blogLikes).toEqual(55)

//   })
