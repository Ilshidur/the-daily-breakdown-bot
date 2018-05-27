# The Daily Breakdown bot

[![Twitter Follow](https://img.shields.io/twitter/follow/The_Daily_Break.svg?style=social&label=Follow)](https://twitter.com/The_Daily_Break)

![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)

[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![Code Climate][maintainability-badge]][maintainability-url]

> A Twitter bot that posts a neat deathcore breakdown every day.

## Manual build

```bash
docker build -t <your_docker_ID>/the-daily-breakdown-bot .
docker push <your_docker_ID>/the-daily-breakdown-bot
```

## Installation

### Without docker-compose

Yeah ... **TODO** !

### With docker-compose (that's not necessary)

`docker-compose up -d`

## Development

`docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up`

## License

MIT License

Copyright (c) 2018 Nicolas Coutin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[vulnerabilities-badge]: https://snyk.io/test/github/Ilshidur/the-daily-breakdown-bot/badge.svg
[vulnerabilities-url]: https://snyk.io/test/github/Ilshidur/the-daily-breakdown-bot
[dependency-badge]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot.svg
[dependency-url]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot
[devdependency-badge]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot/dev-status.svg
[devdependency-url]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot#info=devDependencies
[maintainability-badge]: https://api.codeclimate.com/v1/badges/4eaa13b43e0982417057/maintainability
[maintainability-url]: https://codeclimate.com/github/Ilshidur/the-daily-breakdown-bot/maintainability
