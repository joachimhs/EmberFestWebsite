# EmberFest

The source code for http://emberfest.eu

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

### Docker

To run the app via Docker, use the included setup with

```bash
docker compose up
```

#### Troubleshooting

Make sure you are up to date by building/rebuilding services:

```bash
docker compose build
```

### Vagrant

Alternatively, you can use the included Vagrantfile with

```bash
vagrant up
```

Copyright &copy; 2017 EmberFest UG (https://emberfest.eu)
