# Introduction to CI/CD

## Getting software to production
- "works on my machine" problem: how to coordinate a collection of works done by different developers?

## Some useful terms

### Branches
- branch: different versions of the project's code
- each different version is merged to the main branch to be a part of the main product  
  - when a branch is merged, the other branches are based on the older commits of the main branch

### Pull request
- a request that a programmer makes, such that changes he/she made needs to be merged into the main branch

### Build
- preparing SW to run on the platform where it is intended to run

### Deploy
- putting the SW where it needs to be for the end-user to use it
- deployment pipeline: from commit to deployment in an automatic way
- zero downtime deployments, database migrations

## What is CI?
- Martin Fowler's Blog: https://www.martinfowler.com/articles/continuousIntegration.html
- **CI**: merging developer changes to the main branch often
- but not only merging itself, CI conveys many meanings like: lint, build, test, package, upload/deploy

## Packaging and Deployment as a part of CI
- why are packaging and deployment a part of CI?  
  - strictly, no
  - however, 99% of cases they work together and they are the part where many failures occur

- packaging: testing the packaging of a product during the CI workflow => testing the code in the same form as what will be deployed to production

- deployment: we want a process that always looks the same, whether we're running tests on a development branch or the main branch

### Is this CD thing related?
- Martin Folwer's blog: https://martinfowler.com/bliki/ContinuousDelivery.html
- **CD**: the practice where the main branch is kept deployable at all times
- it is hard to tell the boundary between CI and CD

## Why is it important?
- so why are we using CI/CD?
  - no direct commits to the main branch
  - allowing only desirable code to be merged(passing tests, etc.)
  - building our packages for production in the known environment of the CI system
  - always keeping track of the up-to-date branch => easy to cowork

## Important principles
- goal: better, faster SW dev with fewer preventable bugs and better team cooperation
- make sure that:
  - tests run on all code
  - main branch is deployable at all times
  - builds will be consistent and will always work on the platform to which the code will be deployed 
  - changes don't overwrite each other
  - automatic testing, building, and deployment

### Documented behavior
- avoid any situations where we don't know the exact outcome

### Know the same thing happens every time
- make sure that the tests will run against the code that will actually be deployed
- we need to make sure that the same thing happens every time

### Code always kept deployable
- easy to fix bugs and make changes

### Knowing what code is deployed (sha sum/version)
- important to know what is actually running in production: it is not always possible to maintain the main branch to be in production
  - versioning the main branch commits
  - we can identify which version is wrong and how many people are affected from it

## Types of CI setup
- needs to have a separate server only dedicated for CI/CD tasks: minimizes the risk of being interfered
- jenkins(self-hosted) vs github actions(cloud-based)

## sum up
- CI/CD tries to solve the following problems and achieve high-quality code
1. coworking: different local machine / branch / bad code
2. automation: production pipeline is to long(dev => test, build => deploy)
3. different deploy environment: local(macOS) vs cloud(linux)

# Review(on May 14th, 2023)

## Restart from the beginning
- Essential questions
  1. What is product? What does it mean to the customers, developers, and other team members?
  2. What is collaboration? Why is it important and how do you achieve it?

- Answers:
  1. Product is our goal: We want to deliever values to our customers. Not only for making money and make our ends meet, but also for creating values do we work together. Here "We" doesn't only mean the company and its members, but also the customers as well. Customers give feedback to the product, and from that the company can improve the quality of the product(or maybe stop making it).

  2. Obviously a large-scale software cannot be made by a single person. We need to work together to achieve our goal: product. But how, at least in the development part? And also, what in other part, such as CMS, marketing, sales, or even HR? What about our customers?

  3. So all the answers to the questions can boil down to this single question: how are we going to collaborate well, inside a SLDC?

## What is CI, CD, and DevOps?
- This is why we need DevOps
- DevOps is a paradigm about SW development practices aiming at the collaboration: development team itself, sales, marketing, HR, etc., and the customers.
  - CI(continuous integration, **Dev**) is a set of practices for the development team
    - frequent merging into the main branch
    - automation of the processes for the code quality: lint, build, test, release, and deploy

  - CD(continuous delivery, **Ops**) is another set of practices, but this time it is for both the devlopement team and the other stakeholders
    - keep the main branch deployable at all times

  - but these two processes usually go together and hard to distinguish in practice

- But why CI/CD?
  - "work on my machine" problem: frequent merge makes the workflow more consistent, and testing could be done in the same environment as the one for the production as well
    - it is basically, "lack of communication in terms of code"

- Why do we need automation?
  - to accomodate such frequent merging and code sharing

- other topics: tag, documentation
