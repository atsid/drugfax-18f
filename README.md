[![wercker status](https://app.wercker.com/status/e39e9ad81e711bf363bb159deddb9e7a/s/master "wercker status")](https://app.wercker.com/project/bykey/e39e9ad81e711bf363bb159deddb9e7a)
[![Code Climate](https://codeclimate.com/repos/55845aeb6956805917006f76/badges/bae1be1b55e103c9689c/gpa.svg)](https://codeclimate.com/repos/55845aeb6956805917006f76/feed)
[![Test Coverage](https://codeclimate.com/repos/55845aeb6956805917006f76/badges/bae1be1b55e103c9689c/coverage.svg)](https://codeclimate.com/repos/55845aeb6956805917006f76/coverage)

# ATS 18F Demo (Pool 2)

### Install Using Docker Compose (Recommended for Linux)
    > docker-compose build && docker-compose up
        
### Install Using Vagrant (Slower Startup)
    > vagrant plugin install vagrant-docker-compose
    > vagrant up
    
### Viewing the Application
* **Linux or Vagrant**: `> open http://localhost:9000/`
* **OSX via Docker Compose**: `> open http://$(boot2docker ip 2>/dev/null):9000`

