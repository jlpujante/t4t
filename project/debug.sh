#!/bin/bash

PORT=9999
UWSGI=0

help () {
	echo [--help|-h] [--uwsgi|-u] [port]
	exit 1
}

if [ "$1" == "--help" ] || [ "$1" == "-h" ] ; then
	help
elif [ "$1" == "--uwsgi" ] || [ "$1" == "-u" ] ;  then
	UWSGI=1
	shift
fi

if [ $# -eq 1 ] ; then
	PORT=$1
elif [ ! $# -eq 0 ] ; then
	help
fi

cd `dirname $0`/server
if [ $UWSGI -eq 1 ] ; then
	/usr/local/bin/uwsgi --http-socket :$PORT --plugin python --wsgi-file main.py --chdir2 ../static/ --process 2 --enable-threads
else
	python standalone_server.py --debug --port=$PORT
fi
