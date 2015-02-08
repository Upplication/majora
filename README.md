
[![Build Status](https://travis-ci.org/Upplication/majora.svg)](https://travis-ci.org/Upplication/majora) [![Code Climate](https://codeclimate.com/github/Upplication/majora/badges/gpa.svg)](https://codeclimate.com/github/Upplication/majora)

## Majora Upplication

Upplication Dashboard for templaters

### Live version

* http://majora.upplication.com

### Features

* Create a templater profile
* Upload templates
* Control design rules
* Track the template versions
* Add notes and comments

## How to contribute

First, you must install the dependencies

```
npm install
```

and install the web dependencies

```
bower install
```

Now, your workspace is ready.
You can run the server with the command:

```
gulp server
```

To access the local server, enter the following URL into your web browser: ```htp://localhost:8080/```

If you want to use different config to test against others endpoints or a different database you can set:

```
# to use the config-test.json vars
NODE_ENV=test

# to use the config-development.json vars
NODE_ENV=development

# to use the config-production.json vars
NODE_ENV=production
```

You can add more environments creating a new config-xxxx.json and setting the NODE_ENV=xxxx

### Running Tests

To execute all unit and end-to-end (e2e) tests, use:

```
gulp tests
```