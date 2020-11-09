# Durak

[![Actions Status](https://github.com/KaiSforza/durak/workflows/Node.js%20CI/badge.svg)](https://github.com/KaiSforza/durak/actions?query=workflow%3A"Node.js+CI")
[![Actions Status](https://github.com/KaiSforza/durak/workflows/CodeQL/badge.svg)](https://github.com/KaiSforza/durak/actions?query=workflow%3ACodeQL)

[![pipeline status](https://gitlab.kaictl.me/kaictl/durak/badges/master/pipeline.svg)](https://gitlab.kaictl.me/kaictl/durak/-/commits/master)
[![coverage report](https://gitlab.kaictl.me/kaictl/durak/badges/master/coverage.svg)](https://gitlab.kaictl.me/kaictl/durak/-/commits/master)

[![pipeline status](https://gitlab.com/KaiSforza/durak/badges/master/pipeline.svg)](https://gitlab.com/KaiSforza/durak/-/commits/master)
[![coverage report](https://gitlab.com/KaiSforza/durak/badges/master/coverage.svg)](https://gitlab.com/KaiSforza/durak/-/commits/master)



This project is a playable version of the card game, Durak ('fool' in Russian).

The game can be played with up to 5 people, with a deck of 36 cards (6 through Ace, Ace high).

See the [wikipedia page](https://en.wikipedia.org/wiki/Durak) for more information.

## Dev setup guide:
 - Make sure that you have Node.JS Installed
    - I recommend using NVM (Node Version Manager) then using that to install Node on a per project basis. The windows version can be found here: https://github.com/coreybutler/nvm-windows
 - Run `npm install` in the terminal, this will install all of the packages needed to run the project (and all of their dependencies)

## Running the application:
 - You should have completed the dev setup (install Node and all dependencies)
 - in the project directory run `npx tsc` this will compile the typescript in `.\src` and output to `.\dist`
 - run `npm start` to run the application

### Quick Guide:
  - Install Node
  - Run the following commands in the project directory:

    `npm install`

    `npm start`

### Testing:
Tests are stored in `test/`, named after the files they are testing, ending in `test.ts`.
  - To run the tests once use:  
    `npm test`

  - However, you usually want to watch the files while working. You can use:  
    `npm run testwatch`  
    to re-run the tests every time you make changes.