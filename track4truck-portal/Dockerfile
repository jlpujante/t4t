FROM debian:jessie-slim
RUN apt-get update
RUN apt-get install -y libssl1.0.0 \
        uwsgi-plugin-python \
        libpython2.7 \
        libexpat1 \
        libpq5 && \
    apt-get clean

MAINTAINER Jose Luis Pujante <jose.pujante@numbytes.com>

ENV PYTHONUNBUFFERED 1
ENV TRACK4TRUCKHOME /opt/track4truck
ENV TRACK4TRUCKAPP ${TRACK4TRUCKHOME}/blur-admin
ENV INITSCRIPT ${TRACK4TRUCKHOME}/deployment/init-container.sh

RUN mkdir -p ${TRACK4TRUCKHOME}
RUN mkdir -p ${TRACK4TRUCKHOME}/log
RUN mkdir -p ${TRACK4TRUCKHOME}/deployment
WORKDIR ${TRACK4TRUCKHOME}
COPY ${DEPLOYMENT}/deployment ${TRACK4TRUCKHOME}/deployment
RUN chmod +x ${INITSCRIPT}
RUN /bin/bash ${INITSCRIPT}
CMD ["/opt/track4truck/virtual_env/bin/uwsgi", "--ini", "/opt/track4truck/etc/uwsgi/track4truck.ini"]
