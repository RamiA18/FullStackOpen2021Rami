describe("Blog app tests", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const newUser = {
      username: "aNewUser",
      password: "aNewPassword",
      name: "testUser",
    };
    cy.request("POST", "http://localhost:3003/api/users/", newUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown when entering app", function () {
    cy.contains("log in");
  });

  describe("Login tests", function () {
    it("test succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#usernameField").type("aNewUser");
      cy.get("#passwordField").type("aNewPassword");
      cy.get("#loginButton").click();

      cy.contains("testUser logged-in");
    });

    it("test fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#usernameField").type("aNewUser");
      cy.get("#passwordField").type("wrongPassword:(");
      cy.get("#loginButton").click();
      cy.contains("Wrong credentials");
    });

    describe("Actions when logged in", function () {
      beforeEach(function () {
        cy.login({ username: "aNewUser", password: "aNewPassword" });
      });

      it("New blog post can be added", function () {
        cy.contains("Add Blog").click();
        cy.get("#title").type("a New Blog Title for Testing");
        cy.get("#author").type("A Virtual Author");
        cy.get("#url").type("www.example.con");
        cy.get("#submitAddBlog").click();
        cy.contains("A Virtual Author");
        cy.contains("a New Blog Title for Testing");
        cy.contains("a new blog has been added");
      });

      describe("Actions with a blog", function () {
        beforeEach(function () {
          cy.contains("Add Blog").click();
          cy.get("#title").type("a New Blog Title for Testing");
          cy.get("#author").type("A Virtual Author");
          cy.get("#url").type("www.example.con");
          cy.get("#submitAddBlog").click();
        });

        it("it is possible to add a like to a blog", function () {
          cy.contains("View Info").click();
          cy.get(".blogLikes").should("contain", "0");
          cy.get("#addLikeButton").click();
          cy.get(".blogLikes").should("contain", "1");
        });

        it("it is possible to delete a blog if it was created by the same user", function () {
          cy.reload();
          cy.contains("View Info").click();
          cy.contains("Delete").click();
          cy.contains("post has been deleted");
        });
      });

      describe("Actions when multiple blogs exist", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "blog 1",
            author: "author 1",
            url: "example1.com",
            likes: 1,
          });
          cy.createBlog({
            title: "blog 2",
            author: "author 2",
            url: "example2.com",
            likes: 2,
          });
          cy.createBlog({
            title: "blog 3",
            author: "author 3",
            url: "example3.com",
            likes: 3,
          });
        });

        it("blogs are ordered by number of likes", function () {
          cy.get(".blogTitle").eq(0).should("contain.text", "blog 3");
          cy.get(".blogTitle").eq(1).should("contain.text", "blog 2");
          cy.get(".blogTitle").eq(2).should("contain.text", "blog 1");
        });
      });
    });
  });
});
