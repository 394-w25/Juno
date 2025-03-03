import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('counter tests', () => {
    
  test("Login button", () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeDefined();
  });

  test("Sign up button", async () => {
    // render(<App />);
    // const counter = screen.getByRole('button');
    // fireEvent.click(counter);
    // expect(await screen.getByText('count is: 1')).toBeDefined();
    // console.log(counter)
    render(<App />);
    expect(screen.getByText('Sign Up')).toBeDefined();
  });

});