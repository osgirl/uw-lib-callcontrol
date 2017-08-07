export SHELL = /bin/bash

test:
	node_modules/jest/bin/jest.js tests/*

test-coverage:
	node_modules/jest/bin/jest.js tests/* --coverage