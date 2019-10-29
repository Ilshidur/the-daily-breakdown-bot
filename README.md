# 🎸 The Daily Breakdown bot

[![Twitter Follow](https://img.shields.io/twitter/follow/The_Daily_Break.svg?style=social&label=Follow)](https://twitter.com/The_Daily_Break)

![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)

[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![Code Climate][maintainability-badge]][maintainability-url]

[![dockeri.co](https://dockeri.co/image/ilshidur/the-daily-breakdown-bot)](https://hub.docker.com/r/ilshidur/the-daily-breakdown-bot)

> A Twitter bot that posts a neat deathcore breakdown every day.

## Manual build

```bash
docker build -t <your_docker_ID>/the-daily-breakdown-bot .
docker push <your_docker_ID>/the-daily-breakdown-bot
```

## Installation

First, copy `.env.dist` to a new `.env` file and fill in the environment variables.

### Without docker-compose

*`.env` file required*

```bash
docker pull ilshidur/the-daily-breakdown-bot
docker run \
  --env-file .env \
  -v $(pwd)/db/published_breakdowns.json:/home/app/db/published_breakdowns.json \
  --name the-daily-breakdown-bot \
  -d \
  ilshidur/the-daily-breakdown-bot
```

### With docker-compose (that's not necessary)

*`.env` file required*

In the project directory : `docker-compose up -d`

## Development

```bash
npm ci
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up
```

## License

MIT

[vulnerabilities-badge]: https://snyk.io/test/github/Ilshidur/the-daily-breakdown-bot/badge.svg
[vulnerabilities-url]: https://snyk.io/test/github/Ilshidur/the-daily-breakdown-bot
[dependency-badge]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot.svg
[dependency-url]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot
[devdependency-badge]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot/dev-status.svg
[devdependency-url]: https://david-dm.org/Ilshidur/the-daily-breakdown-bot#info=devDependencies
[maintainability-badge]: https://api.codeclimate.com/v1/badges/4eaa13b43e0982417057/maintainability
[maintainability-url]: https://codeclimate.com/github/Ilshidur/the-daily-breakdown-bot/maintainability
