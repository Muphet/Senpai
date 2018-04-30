# Linux distro with node.js pre-installed
FROM node:10-alpine
# My credentials
LABEL maintainer "Yukine <DevYukine@gmx.de>"
# Workdir
WORKDIR /usr/src/Senpai
# Copy package.json and yarn.lock for Yarn
COPY package.json yarn.lock ./
# Install dependencies 
RUN apk add --update \
&& apk add --no-cache ffmpeg opus pixman cairo pango giflib ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl build-base jpeg-dev pixman-dev \
cairo-dev pango-dev pangomm-dev libjpeg-turbo-dev giflib-dev freetype-dev python g++ make \
# Install node.js dependencies
&& yarn install \
# Clean up build dependencies
&& apk del .build-deps
# Add project source
COPY . .
# Enviroment variables
ENV bottoken=\
    prefix=\
    osuToken=\
    googleAPIKey=\
    owmAPIKey=\
    dBotsToken=\
    wolkeToken=\
    discordBotsToken=\
    supportServerLink=\
    voteLink=\
    pixabayToken=\
    databaseName=\
    databaseHost=\
    databasePort=\
    lavalinkPW=\
    lavalinkHost=\
    lavalinkPortWS=\
    LavalinkPort=
# Run command
CMD ["node", "."]
