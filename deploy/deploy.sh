#!/bin/bash
set -e

function test {
	yarn lint
}

if [[ "$TRAVIS_BRANCH" == revert-* ]]; then
	echo -e "\e[36m\e[1mBuild triggered for reversion branch \"${TRAVIS_BRANCH}\" - running nothing."
	exit 0
fi

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	echo -e "\e[36m\e[1mBuild triggered for PR #${TRAVIS_PULL_REQUEST} to branch \"${TRAVIS_BRANCH}\" - only running test."
	test
	exit 0
fi

if [ "$TRAVIS_BRANCH" == dependabot-* ]; then
	echo -e "\e[36m\e[1mBuild triggered for dependabot PR #${TRAVIS_PULL_REQUEST} to branch \"${TRAVIS_BRANCH}\" - only running test."
	test
	exit 0
fi

if [ -n "$TRAVIS_TAG" ]; then
	echo -e "\e[36m\e[1mBuild triggered for tag \"${TRAVIS_TAG}\"."
	DOCKER_RELEASE="$TRAVIS_TAG"
	test
	docker login --username="$DOCKER_USERNAME" --password="$DOCKER_PASSWORD"
	docker build -t senpai .
	docker tag senpai:latest yukine/senpai:"$DOCKER_RELEASE"
	docker push yukine/senpai:"$DOCKER_RELEASE"
else
	echo -e "\e[36m\e[1mBuild triggered for branch \"${TRAVIS_BRANCH}\"."
	DOCKER_RELEASE="$TRAVIS_BRANCH"
	test
	docker login --username="$DOCKER_USERNAME" --password="$DOCKER_PASSWORD"
	docker build -t senpai .
	docker tag senpai:latest yukine/senpai:"$DOCKER_RELEASE"
	docker push yukine/senpai:"$DOCKER_RELEASE"
fi