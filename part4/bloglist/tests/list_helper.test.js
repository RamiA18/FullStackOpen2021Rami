const listHelper = require("../utils/list_helper.js");
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const oneBlog = [blogs[0]];

describe("Dummy Test", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  test("bigger list test calculated right", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
  test("empty list should give 0 likes", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test("one item blog array should give the number of likes of that blog", () => {
    expect(listHelper.totalLikes(oneBlog)).toBe(7);
  });
});

describe("Favourite Blog Post", () => {
  test("Found the post with highest amount of likes", () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(12);
  });
});

describe("Most Likes ", () => {
  test("Found the post with highest amount of likes", () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(12);
  });
});

describe("Most liked author ", () => {
  test("found the most liked author", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

describe("Most active author ", () => {
  test("found author with most blogposts", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
