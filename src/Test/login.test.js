import { render, screen, fireEvent } from "@testing-library/react";
import { userContext } from "../App";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter, useNavigate } from "react-router-dom"; // Import BrowserRouter
import Login from "../Components/Login";

// Mock Firebase functions
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { uid: "epCQaefYAJclsXH2Qrv4cBWFRZ43", email: "test1@gmail.com" } })
  ),
}));

// Mock react-router-dom and useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock implementation of useNavigate
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);

describe("Login Component", () => {
  let mockSetUser;

  beforeEach(() => {
    mockSetUser = jest.fn();
    render(
      <BrowserRouter> {/* Wrap with BrowserRouter to provide routing context */}
        <userContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </userContext.Provider>
      </BrowserRouter>
    );
  });

  test("renders login form", () => {
    expect(screen.getByTestId("login-page")).toBeInTheDocument();

    const loginElement = screen.getByText('Constructions')
    expect(loginElement).toBeInTheDocument();

  });

  test("renders login form", () => {
    expect(screen.getByTestId("login-page")).toBeInTheDocument();

    const contentElement = screen.getByText('Start Your journey now with Us')
    expect(contentElement).toBeInTheDocument();

  });
});
