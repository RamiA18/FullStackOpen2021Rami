const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("../utils/test_helper");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("goodpassword", 10);
  const user = new User({ username: "rooti", passwordHash });
  await user.save();
});

describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    const passwordHash = await bcrypt.hash("notagoodpassword", 10);

    const newUser = {
      username: "anEndUser",
      name: "John Smith",
      password: passwordHash,
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
