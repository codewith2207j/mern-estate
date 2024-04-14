import { describe, it, expect } from "vitest";
import App from "../App";
import { render } from "@testing-library/react";

describe("App", () => {
  it("render the app component", () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});
