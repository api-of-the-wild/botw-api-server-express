FROM node:8

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY ./src/ ./src/
COPY ./test/ ./test/
COPY ./scripts/ ./scripts/
COPY ./config.env.js .
COPY ./index.js .

RUN chmod +x ./scripts/wait-for-it.sh
RUN chmod +x ./scripts/test/index.sh
RUN chmod +x ./scripts/test/lint.sh
RUN chmod +x ./scripts/test/unit.sh
RUN chmod +x ./scripts/test/integration.sh

ENTRYPOINT ./scripts/wait-for-it.sh app:3001 -- yarn test:integration
