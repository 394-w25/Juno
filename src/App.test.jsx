import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App, { PrivateRoute } from './App';
import { useAuth } from './firebase/AuthFunctions';
import Onboarding from './pages/Onboarding';
import AuthProvider from './components/AuthContext';
import { Router, Route, Routes } from 'react-router-dom';

vi.mock("./firebase/AuthFunctions")

describe('Login tests', () => {

  test("Sign up button", async () => {
    useAuth.mockReturnValue({
      user: null,
      authLoading: false,
      businessConfig: null,
      setBusinessConfig: null,
      isGuest: false,
      setIsGuest: null
    })
    render(<App />);
    expect(screen.getByText('Sign Up')).toBeDefined();
  });

  test("Onboard after log in", async () => {
    useAuth.mockReturnValue({
      user: {
        display_name: "breh",
      },
      authLoading: false,
      businessConfig: null,
      setBusinessConfig: null,
      isGuest: false,
      setIsGuest: null
    })
    
    render(
      <App />
    )
    
    expect(screen.getByText("BASIC BUSINESS INFO")).toBeDefined()
  })
  // test("Login button", async () => {
  //   useAuth.mockReturnValue({
  //     user: null,
  //     logOut: null,
  //     businessConfig: null,
  //     setUser: null,
  //     authLoading: false
  //   })
  //   render(<App />);
  //   const button = await screen.findByText("Login");
  //   expect(button).toBeInTheDocument();
  // });
})

  // test("Login button", async () => {
  //   useAuth.mockReturnValue({
  //     user: null,
  //     logOut: null,
  //     businessConfig: null,
  //     setUser: null,
  //     authLoading: false
  //   })
  //   render(<App />);
  //   screen.getByText('Login');
  // });

  // test("Sign up button", async () => {
  //   // render(<App />);
  //   // const counter = screen.getByRole('button');
  //   // fireEvent.click(counter);
  //   // expect(await screen.getByText('count is: 1')).toBeDefined();
  //   // console.log(counter)
  //   render(<App />);
  //   expect(screen.getByText('Sign Up')).toBeDefined();
  // });



// });