describe("User can close voting", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls/1",
      response: "fixture:polls_show.json",
    });
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/polls/1",
      response: { message: "successfully joined this poll" },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/comments/1",
      response: "fixture:comments.json",
    });
    cy.visit("/");
    cy.login();
    cy.get("[data-cy='poll-1']").click();
    cy.get('[data-cy="join-poll"]').click();
  });

  context("successfully closed", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        params: { state: "pending" },
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:pollsVoting_closed.json",
      });
    });

    it("user can close voting in a poll", () => {
      cy.get('[data-cy="close-poll"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('[data-cy="message"]').should(
        "contain",
        "Voting succesfully closed"
      );
    });
  });

  context("unsuccessfully - usersession breaks", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: "Unauthorized, You need to sign in before you can proceed",
      });
    });
    it("visitor receives error message if user-session broke", () => {
      cy.get('[data-cy="close-poll"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('[data-cy="message"]').should(
        "contain",
        "Unauthorized, You need to sign in before you can proceed"
      );
    });
  });
});