# Deployment

## Anything that can go wrong...
- always be prepared for serious cases

## What does a good deployment system do?
- should fail gracefully
- should never leave our SW in a broken state => automatic rollback
- should alarm us any errors
- prepare for situations in which a HTTP request could be sent during deployment

- TCP, HTTP based health checks