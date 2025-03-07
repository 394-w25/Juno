import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useAuth } from './services/auth.jsx';

vi.mock("./services/auth.jsx")

describe('Login tests', () => {
    
  test("Login button", async () => {
    useAuth.mockReturnValue({
      user: null,
      logOut: null,
      businessConfig: null,
      setUser: null,
      authLoading: false
    })
    render(<App />);
    const button = await screen.findByText("Login");
    expect(button).toBeInTheDocument();
  });
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