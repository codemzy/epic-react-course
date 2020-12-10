// mocking HTTP requests
// http://localhost:3000/login-submission

import {handlers} from '../../test/server-handlers.js' // extra 1

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
// rest.post(
//   'https://auth-provider.example.com/api/login',
//   async (req, res, ctx) => {},
// )
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/
// const server = setupServer(
//     rest.post(
//         'https://auth-provider.example.com/api/login',
//         async (req, res, ctx) => {
//             if (!req.body.password) {
//                 return res(ctx.status(400), ctx.json({message: 'password required'}))
//             }
//             if (!req.body.username) {
//                 return res(ctx.status(400), ctx.json({message: 'username required'}))
//             }
//             return res(
//                 ctx.json({ username: req.body.username })
//             );
//         }
//     )
// );
// so we can share mock handlers with node tests and front end tests
// this is like using the handlers from backend here in the front end
const server = setupServer(...handlers) // extra 1

// 🐨 before all the tests, start the server with `server.listen()`
// 🐨 after all the tests, stop the server with `server.close()`
beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
  expect(screen.getByText(username)).toBeInTheDocument
})

// extra 2
test(`logging in without a password fails and results in an error`, async () => {
  render(<Login />)
  const {username} = buildLoginForm() // only get username (not password)
  userEvent.type(screen.getByLabelText(/username/i), username) // only fill in username (not password)
  userEvent.click(screen.getByRole('button', {name: /submit/i})) // make the request
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  ) // extra 3 (toMatchInlineSnapshot created the text on first run of toMatchInlineSnapshot())
})

// extra 4
test(`any other error from the server results in an error`, async () => {
  // custom server for this test
  server.use(
    rest.post(
      // note that it's the same URL as our app-wide handler
      // so this will override the other.
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        // your one-off handler here
        return res(ctx.status(500), ctx.json({message: 'some random error'}))
      },
    ),
  )
  // run the test
  render(<Login />)
  userEvent.click(screen.getByRole('button', {name: /submit/i})) // make the request
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"some random error"`,
  )
})
