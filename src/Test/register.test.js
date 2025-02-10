import { render, screen } from "@testing-library/react";
import { userContext } from "../App";
import Register from "../Components/Register";

describe("register Component", () => {
  test("renders data test id correct", () => {

    // Mock user data
    const mockUser = { email: "test1@gmail.com" };

    render(
      <userContext.Provider value={{ user: mockUser }}>
        <Register />
      </userContext.Provider>
    );

    const registerElement = screen.getByTestId("register-data");
    expect(registerElement).toBeInTheDocument();

    const RegisterLabel = screen.getByText("Registration Form");
    expect(RegisterLabel).toBeInTheDocument(); 
  });

  test("renders input field", () => {
    // Mock user data
    const mockUser = { email: "test1@gmail.com" };

    render(
      <userContext.Provider value={{ user: mockUser }}>
        <Register />
      </userContext.Provider>
    );

    const inputElement = screen.getByTestId("enter-name");
    expect(inputElement).toBeInTheDocument(); 

    const descriptionInput = screen.getByTestId("enter-email");
    expect(descriptionInput).toBeInTheDocument();

    const dueDateInput = screen.getByTestId("enter-pass");
    expect(dueDateInput).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: "Register" });
    expect(buttonElement).toBeInTheDocument() 

    });

  
});