# clubhub ;)

# Vite + React + Typescript + Eslint + Prettier

A starter for React with Typescript with the fast Vite and all static code testing with Eslint and formatting with Prettier.

I found out about Vite and I wanted to have a boilerplate for the technologies that I use. You can find more about these in the following links: [Vite](https://github.com/vitejs/vite), [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), [Eslint](https://eslint.org/), [Prettier](https://prettier.io/).

## Installation

Clone the repo and run `yarn install`

## Start

After the successful installation of the packages: `yarn dev`

## Steps in Vscode

use [vscode-example.json](vscode-example.json)

#### (works with better with this template)

1. Install Eslint and prettier extension for vs code.
2. Make Sure Both are enabled
3. Make sure all packages are installed. (Mostly Eslint and prettier in node_modules)
4. Enable formatOnSave of vs code
5. Open a .tsx file and check if the bottom right corners of vs code have Eslint and Prettier with a double tick

#### All icons to use from [Icons](https://tabler-icons.io/)

#### All illustrations to use from [Illustrations](https://undraw.co/illustrations)

### Types generation flow:

1. `npx supabase login`
2. Get access token https://app.supabase.com/account/tokens and put in terminal
3. `npx supabase gen types typescript --project-id mzdosecddjbllfefjwhb --schema public > ./src/types/generated/supabase.ts`
