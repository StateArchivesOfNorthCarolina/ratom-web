.. contents::
   :depth: 3
..

RATOM Web
=========================================

🌵 created by Caktus Group 🏜
===========================

Below you will find basic setup and deployment instructions for the ratom_api
project. To begin you should have the following applications installed on your
local development system:

- Python >= 3.7
- NodeJS >= 10.16
- `pip <http://www.pip-installer.org/>`_ >= 19
- `virtualenv <http://www.virtualenv.org/>`_ >= 1.10
- `virtualenvwrapper <http://pypi.python.org/pypi/virtualenvwrapper>`_ >= 3.0

Getting Started
------------------------

First clone the repository from Github and switch to the new directory::

    $ git clone git@github.com:StateArchivesOfNorthCarolina/ratom-web.git
    $ cd ratom_web

Next setup a virtualenv with python 3.7::

    $ virtualenv -p `which python3.7` $(WORKON_HOME)/ratom_web

Finally install node packages and start the server

1. npm i
2. npm run start

Enable Auto-Linting (VSCode)
============================

1. download and enable the following vscode extensions:

-  dbaeumer.vscode-eslint
-  esbenp.prettier-vscode

2. make sure your vscode workspace contains
   ``"editor.formatOnSave": true``

-  (this should already be set if .vscode is checked in to version
   control)

Deployment
==========

For deployment documentation, please see the
`ratom\_server <https://github.com/StateArchivesOfNorthCarolina/ratom-server#deployment>`__
repo.

Testing
=======

1. make sure cypress is installed (``npm i`` should do the trick)
2. if not already present, make sure there is a user ``test@user.com``
   with password ``testing``
3. npm run test

To create new tests, open /cypress/integration and add a
yourtests.spec.js file.
