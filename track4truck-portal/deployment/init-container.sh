#!/bin/bash

#adduser --system --no-create-home --disabled-login --disabled-password --group uwsgi
#mkdir /opt/uwsgi
#chown -R uwsgi:uwsgi /opt/uwsgi
#chown -R uwsgi:uwsgi /opt/track4truck
touch /opt/track4truck/log/uwsgi-t4t.log
#chown uwsgi.uwsgi /opt/track4truck/log
#chown uwsgi /opt/track4truck/log/uwsgi-t4t.log
cp /opt/track4truck/deployment/uwsgi/uwsgi.init /etc/init.d/uwsgi
chmod +x /etc/init.d/uwsgi
#mkdir /etc/uwsgi
# cp /opt/track4truck/deployment/uwsgi/track4truck.ini /etc/uwsgi/track4truck.ini
update-rc.d uwsgi defaults
apt-get clean
