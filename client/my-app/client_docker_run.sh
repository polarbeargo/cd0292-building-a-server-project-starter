#!/usr/bin/env bash
set -e

if ! type docker >/dev/null; then
  echo "Please install docker"
  exit 1
fi

BRANCH=$(git branch --show-current)
echo "Running image processing using $BRANCH branch"

docker build --build-arg "BRANCH=$BRANCH" -t build-react-client-start .

docker run --rm -it -p 3000:3000 build-react-client-start