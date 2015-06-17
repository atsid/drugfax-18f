#!/bin/bash

./node_modules/.bin/bower install

if [ ! -L node_modules/app ]; then
    ln -s ../server node_modules/app
fi

if [ ! -L client/web_modules ]; then
    ln -s ../bower_components client/web_modules
fi
