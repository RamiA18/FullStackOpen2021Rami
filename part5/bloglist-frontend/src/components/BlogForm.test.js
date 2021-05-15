import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm.js";

const mockHandler = jest.fn();

test("the form calls the event handler it received as props with the right details when a new blog is created", () => {
  const component = render(<BlogForm createBlogPost={mockHandler} />);
  const titleField = component.container.querySelector("#title");
  const authorField = component.container.querySelector("#author");
  const urlField = component.container.querySelector("#url");
  const blogForm = component.container.querySelector("#createBlogPost");

  fireEvent.change(titleField, {
    target: { value: "New Title" },
  });
  fireEvent.change(authorField, {
    target: { value: "New Blog Author" },
  });
  fireEvent.change(urlField, {
    target: { value: "www.newURL.com" },
  });
  fireEvent.submit(blogForm);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("New Title");
  expect(mockHandler.mock.calls[0][0].author).toBe("New Blog Author");
  expect(mockHandler.mock.calls[0][0].url).toBe("www.newURL.com");
});
