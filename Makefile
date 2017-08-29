export SHELL = /bin/bash

install:
	npm install

test:
	npm test --ci

test-coverage:
	npm run test-coverage
