# Expanding Further

## Visibility and Understanding
- not only developers: many stakeholders related to products
- want to see the progress: integration with project management & bug tracking SWs
  - PR, merge

## Notifications
- what if the project gets bigger?: takes a long time to test/build
  - another developer might work on the same branch without noticing the branch is on the build/test process
  - problematic: misscommunication

- notification: slack, discord

## Metrics
- we need to measure some features: build/test times, for example
- self-reported(each build reports, "push") / fetched(from the API afterwards, "pull")

## Periodic tasks
- we can automate some periodic tasks
- tools: checking packages for security vulnerabilities(Dependabot)
- manually: github actions(scheduled trigger)

## **remark**: periodic health check
- make a GET request to the server(*ping*)