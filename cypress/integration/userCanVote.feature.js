describe("User can vote", () => {
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
      response: "fixture:poll_show_state_ongoing.json",
    });
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/polls/1",
      response: { message: "successfully joined this poll" },
    });
    cy.visit("/");
    cy.login();
    cy.get("[data-cy='poll-1']").click();
    cy.get('[data-cy="join-poll"]').click();
  });

  context("successfully voted", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:polls_vote.json",
      });
    });

    it("user can vote", () => {
      cy.get('[data-cy="vote-select"]').contains(2).click({ force: true });
      cy.get('[data-cy="vote"]').click();
      cy.get("[data-cy='points-2']").should("contain", 1);
      cy.get('[data-cy="vote"]').should("not.exist");
    });
  });

  context("unsuccessfully - not selecting points", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: "You need to pick a value to vote",
      });
    });

    it("visitor receives error message if points are blank", () => {
      cy.get('[data-cy="vote"]').click();
      cy.get("[data-cy='error-message']").should(
        "contain",
        "You need to pick a value to vote"
      );
    });
  });
});
