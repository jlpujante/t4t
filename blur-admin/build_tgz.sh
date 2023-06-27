#!/usr/bin/env bash

set -e

cd `dirname $0`
DIRNAME=$(basename `pwd`)
VERSION=$(git rev-list --count HEAD)
DATE=`date`
BUILD_FILE=${DIRNAME}-1.0-${VERSION}.tgz
BUILD_INFO_FILE="server/build_info.py"

#echo $VERSION > revision.txt

#less/generate_css.sh
#./generate_assets.sh

#gulp

echo "BUILD_TIME=\"$DATE\"" > ${BUILD_INFO_FILE}
echo "REVISION=\"$VERSION\"" >> ${BUILD_INFO_FILE}

cd ..

tar -zcv \
--exclude ".*" \
--exclude "*.pyc" \
--exclude "${DIRNAME}/*.sh" \
--exclude "${DIRNAME}/README.md" \
--exclude "${DIRNAME}/CHANGELOG.md" \
--exclude "${DIRNAME}/bower_components" \
--exclude "${DIRNAME}/bower.json" \
--exclude "${DIRNAME}/bundle.config.js" \
--exclude "${DIRNAME}/development_docs" \
--exclude "${DIRNAME}/docs" \
--exclude "${DIRNAME}/gulp" \
--exclude "${DIRNAME}/gulpfile.js" \
--exclude "${DIRNAME}/LICENSE.txt" \
--exclude "${DIRNAME}/node_modules" \
--exclude "${DIRNAME}/package.json" \
--exclude "${DIRNAME}/preview.html" \
--exclude "${DIRNAME}/scripts" \
--exclude "${DIRNAME}/src" \
--exclude "${DIRNAME}/static" \
--exclude "${DIRNAME}/resources" \
--exclude "${DIRNAME}/apt-requirements.txt" \
-f ${BUILD_FILE} ${DIRNAME}


echo File ${BUILD_FILE} generated

if [ "$#" -eq 1 ] ; then
    scp ${BUILD_FILE} $1:~
    echo File ${BUILD_FILE} sent to $1
fi
