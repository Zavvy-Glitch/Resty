import { render, screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import App from "../app.js";

const server = setupServer(
  rest.get("*", (req, res, ctx) => {
    return res(
      ctx.json({
        headers: { contentType: "application/json" },
        data: { results: ["test"] },
      })
    );
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test("Should Render URL onto App after submission", () => {
  render(<App />);

  act(() => {
    let testInput = screen.getByTestId("urlInput");
    fireEvent.change(testInput, {
      target: { value: "https://pokeapi.co/api/v2/pokemon" },
    });
  });

  act(() => {
    let testButton = screen.getByTestId("submitButton");
    fireEvent.click(testButton);
  });

  const elem = screen.getByTestId("urlDisplay");
  expect(elem.textContent).toBe("URL: https://pokeapi.co/api/v2/pokemon");
});

test("Should Render a Default Request Method after Submission", () => {
  render(<App />);

  act(() => {
    let testInput = screen.getByTestId("urlInput");
    fireEvent.change(testInput, {
      target: { value: "https://pokeapi.co/api/v2/pokemon" },
    });
  });

  act(() => {
    let testButton = screen.getByTestId("submitButton");
    fireEvent.click(testButton);
  });

  const elem = screen.getByTestId("reqDisplay");
  expect(elem.textContent).toBe("Request Method: GET");
})
