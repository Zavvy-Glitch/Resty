import { render, screen, fireEvent } from '@testing-library/react';
import App from '../app.js';

describe('Testing renderings on App', () => {
  test('will render JSON data', () => {
    render(<App />);

    let testInput = screen.getByTestId('urlInput');

    fireEvent.change(testInput, { target: { value: 'test'}})

    expect(screen.getByTestId('urlInput')).toHaveTextContent('test');

  })
})