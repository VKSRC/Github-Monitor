FROM ubuntu:16.04
MAINTAINER Tuuu Nya<song@secbox.cn>

# install system requirement
RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
RUN sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y python3 python3-dev python3-pip nginx supervisor libmysqlclient-dev redis-server && \
    rm -rf /var/lib/apt/lists/*

# setup all the configfiles
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY docker/nginx-app.conf /etc/nginx/sites-available/default
COPY docker/supervisor-app.conf /etc/supervisor/conf.d/

# copy server and client code
COPY client/dist/ /home/docker/Github-Monitor/client/
COPY server/ /home/docker/Github-Monitor/server/

# copy uwsgi.ini and uwsgi_params
COPY docker/uwsgi.ini /home/docker/Github-Monitor/server/
COPY docker/uwsgi_params /home/docker/Github-Monitor/server/

# copy run.sh
COPY docker/run.sh /home/docker/Github-Monitor/

# install requirement
RUN pip3 install -r /home/docker/Github-Monitor/server/requirements.pip -i http://pypi.doubanio.com/simple --trusted-host pypi.doubanio.com

# volumne
VOLUME ["/var/lib/redis"]

WORKDIR /home/docker/Github-Monitor/

EXPOSE 80
CMD ["/bin/bash", "run.sh"]
