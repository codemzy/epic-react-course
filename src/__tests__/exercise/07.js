// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// extra 2
function renderWithTheme(theme) {
    function Wrapper({children}) {
        return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    };
    return render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper});
};

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  renderWithTheme('light'); // extra 2
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
    // function Wrapper({children}) {
    //     return <ThemeProvider initialTheme={'light'}>{children}</ThemeProvider>
    // };

})

// extra 1
test('renders with the dark styles for the dark theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  renderWithTheme('dark'); // extra 2
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
    // function Wrapper({children}) {
    //     return <ThemeProvider initialTheme={'dark'}>{children}</ThemeProvider>
    // };

})

/* eslint no-unused-vars:0 */
