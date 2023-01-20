# Test
FROM node:19.4-alpine as base-target
ENV NODE_ENV=development
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

COPY package*.json ./

# CI and release builds should use npm ci to fully respect the lockfile.
# Local development may use npm install for opportunistic package updates.
ARG npm_install_command=ci
RUN npm $npm_install_command

COPY . .

# Test
FROM base-target as test-target

CMD npm run test

# Build
FROM base-targe as build-target
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