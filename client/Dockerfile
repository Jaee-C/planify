## Test
FROM --platform=linux/amd64 node:19.4-alpine as base-target

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json /usr/src/app/package.json
ARG npm_install_command=ci
RUN npm $npm_install_command

## Copying source files
#COPY . /usr/src/app
#
#EXPOSE 3000
#
## Running the app
#CMD "npm" "run" "dev"

FROM base-target as ci-target

RUN npm run lint

CMD npm run test

# Build
FROM base-target as build-target
ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build.
RUN npm run build

# Reduce installed packages to production-only.
RUN npm prune --production

# Archive
FROM node:12.8-alpine as archive-target
ENV NODE_ENV=production
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

# Include only the release build and production packages.
COPY --from=build-target /usr/src/app/node_modules node_modules
COPY --from=build-target /usr/src/app/.next .next

CMD ["next", "start"]