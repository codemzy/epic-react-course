// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
// import {render, screen} from '@testing-library/react'
import {render as renderWithTheme, screen} from '../../test/test-utils'; // extra 3 
// import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// // extra 2
// function renderWithTheme(ui, { theme = 'light', ...options } = {}) { // so we can wrap theme context around any ui
//     function Wrapper({children}) {
//         return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
//     };
//     return render(ui, {wrapper: Wrapper, ...options}); // so we can add other options if we want to
// };

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  renderWithTheme(<EasyButton>Easy</EasyButton>); // extra 2
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
  renderWithTheme(<EasyButton>Easy</EasyButton>, { theme: 'dark' }); // extra 2
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
