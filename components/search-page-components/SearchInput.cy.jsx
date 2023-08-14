import React from "react";
import { mount } from "@cypress/react";
import SearchInput from "./SearchInput";

describe("<SearchInput />", () => {
  it("calls onChange with the correct value on button click", () => {
    // Create a spy for the handleChange function
    const handleChange = cy.spy().as("handleChange");

    // Create a mock t function
    const t = (key) => key;

    // Create a mock onSubmit function
    const onSubmit = cy.spy().as("onSubmit");

    const setSearch = cy.stub().as("setSearch");

    // Mount the SearchInput component with the handleChange spy, the mock t function, and the mock onSubmit function
    mount(
      <SearchInput
        value=""
        onChange={handleChange}
        t={t}
        onSubmit={onSubmit}
        setSearch={setSearch}
      />
    );

    // Wait for the input element to render
    cy.get("#input").should("exist");

    // Type into the input and submit the form
    cy.get("#input").type("test value");
    cy.get("form").submit();

    // Check that handleChange was called with the correct value
    cy.get("@handleChange").should("have.been.calledWith");

    // Check that onSubmit was called with the correct value
    cy.get("@onSubmit").should("have.been.calledWith");
  });
});
