[![wercker status](https://app.wercker.com/status/e39e9ad81e711bf363bb159deddb9e7a/s/master "wercker status")](https://app.wercker.com/project/bykey/e39e9ad81e711bf363bb159deddb9e7a)
[![Code Climate](https://codeclimate.com/repos/55845aeb6956805917006f76/badges/bae1be1b55e103c9689c/gpa.svg)](https://codeclimate.com/repos/55845aeb6956805917006f76/feed)
# ATS 18F Demo (Pool 2)

# Getting Started
Development environments are managed using Docker Compose. Before proceeding, you must have Docker installed on your machine.

### Starting the Application Server 
    > docker-compose build && docker-compose up
    
### Viewing the Application
* Linux: http://localhost:9000/
* OSX: 
    > open http://$(boot2docker ip 2>/dev/null):9000
