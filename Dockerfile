FROM node:16
ARG BRANCH=main

# Install basic dependencies
RUN apt-get -y update && apt-get install -y build-essential curl git ca-certificates gnupg

# Install cd0292-building-a-server-project-starter
RUN mkdir /tmp/cd0292-building-a-server-project-starter
RUN cd /tmp && git clone --single-branch --branch $BRANCH https://github.com/polarbeargo/cd0292-building-a-server-project-starter.git
RUN cd /tmp/cd0292-building-a-server-project-starter && npm install
RUN cat /etc/os-release | grep VERSION=
RUN node -v

# Expose the ports that server and client runs on
EXPOSE 3002

WORKDIR /tmp/cd0292-building-a-server-project-starter

# Define the command to run the app
CMD ["npm", "run", "start"]
