# Redwood RSC Demo 2

Repo demonstrating the RedwoodJS React Server Components implementation

This app shows Suspense on both the server and the client

## How to run

`yarn install`

`yarn rw build -v && yarn rw serve`

## What to do

There are a few things going on here. I'll go through them one-by-one

1. Refresh the page. See how it says "Pending..." for a second up top before it
   switches to say "Hello from server!" This is an async server component
   wrapped in `<Suspense>`. This is the most basic use of Suspense.
2. Instead of just showing a simple "Pending..." text we can render a component
   while that part of the React tree is suspended. It can be very similar to
   the client component we're going to render later, but it can't use useState
   or other client-side hooks.
3. With `<MessageCounter>` we're passing a promise as a prop and can use
   `<Suspense>` on the client side to wait for that promise to resolve.
   Note that the rest of the component (and the rest of the app too) is still
   interactive while that suspense boundary sits there waiting. So you can
   still click the "Increment" button(s) and the updated client state will be
   passed in to the suspended part of the component when it's ready.
