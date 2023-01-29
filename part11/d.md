# Keeping green
- keeping the main(production) branch green?
- commit your code on a branch based on the stable latest version of the main branch
- do PR 

## Working with Pull Requests
- PR: review
  - make a new branch and commit your new feature
  - push the local branch's commits to the remote repo and receive reviews
  - you can also set a CI/CD pipeline such that whenever you make a new push on a branch,
  your code goes through build/test/linting, etc.

```yml
on:
  pull_request:
    branches: [master]
    types: [opened, synchronize]
    # opened: when a new PR is opened / synchronize: when the branch is updated
```

## Versioning
- versioning: uniquely identify the SW we're running, and the code associated with it
  - why?: we can roll back to a previous stable version, for example

### Semantic Versioning and Hash Versioning
- semantic versioning: `{major}.{minor}.{patch}`
  - patch: fixing functionality without changing how the application works from the outside
  - minor: small changes to functionality viewed from the outside
  - major: major/complete changes

- hash versioning: versions represented by hash values
  - usually used in conjunction with automation

### But what does the version point to?
- determining what code is in a given version?
  - hash versioning(such as git): looking up the commit based on the hash
  - semantic versioning: a little bit complicated
    - code itself: boils down to a version number in a file
    - repo/repo meta: relies on tags or releases(Github)
    - completely outside the repo: this may be really simple

- tag/release: the tag or release points to a commit

### Version order
- semantic: easy
- hash: need to look up the git log

### Comparing the Two
- semantic: 
  - deploying services(for people to be notified)

- hash:
  - commits are being built into artifacts that are themselves uploaded or stored(runnable binaries or docker images)
  - since you don't really update the semantic version of your own branch, without hash versioning it is hard to track down what is the problem when it comes to testing

### Best of Both Worlds
- semantic: release SW / hash: dev SW
- use both to make the base of them

- **remark**: for ex.11.15, please do checkout first before using the tag action(needs doesn't guarantee the checkout to be remained the same)

## A note about using third party actions
- semantic version: the code might be changed, so it might be better to depend on a commit's hash value
- third party actions are usually buggy and even malicious

## Keep the main branch protected
- protect your `main/master` branch with a couple of rules
