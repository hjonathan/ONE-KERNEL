# NextGen Shared Kernel Module #

The Shared Kernel module stores and provides common functionlity accross all 
the different containers and domains of the platform.

### Architecture Principles ###

* Repository Based.
* Factory Based.
* Version 0.1

### How do I get set up? ###

The setup steps provides the developer with the tools to test and build the source code.

#### Configuration ####
The environment configuration is provided within the application. 

#### Dependencies ####
The project needs the following global dependencies:

* node.js.
* gulp module.
* mocha module.
* chai module.
* istanbul module.
* groc module.

Once the source is downloaded is required to install also gulp, mocha, groc and istanbul as global modules.

```
#!bash
npm install -g gulp mocha groc istanbul
```

You can run install the project project issuing the following command:

```
#!bash
npm install
```

#### Testing ####
The test suite uses a gulp task in order to run the suite.

```
#!bash
gulp test
```

#### Development mode ####
The development uses a gulp task in order to run the suite and run a watch task in order to re-run the suite.

```
#!bash
gulp bdd
```