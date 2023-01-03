# Getting started with GitHub Actions
- a typical execution of a workflow:
  - an event triggers the workflow
  - the workflow is executed
  - cleanup

## Basic needs
- a repository & access permission to it
- instructions that the CI needs to execute(shell script, actions, etc.)
- permissions for such instructions(secrets, credentials, etc.) 

## Getting started with workflows
- review:
  - jobs are run in parallel by default
  - steps are run sequentially

- example
```yml
name: Name

on:
  push:
    branches: 
      - master

jobs:
  hello_world_job:
    runs-on: ubuntu-20.04
    steps:
      - name: Say
        run: |
          echo "Hey"
```

- triggers:
  - an event on GitHub
  - a scheduled event
  - an externel event

## Setting up lint, test and build steps

### Setting up the environment
- `uses`: when running a specific *action*
- setup the basic OS => checkout the code in the repo => setup the language env(node, python, etc.) => install dependencies
- `with`: provides parameters to an action

### Lint
