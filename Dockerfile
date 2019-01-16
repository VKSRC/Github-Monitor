FROM ubuntu:16.04
MAINTAINER Tuuu Nya<song@secbox.cn>

# install system requirement
RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
RUN sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y python3 python3-dev python3-pip nginx supervisor libmysqlclient-dev redis-server libssl-dev libffi-dev && \
    rm -rf /var/lib/apt/lists/*

# setup all the configfiles
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/sites-enabled/default
RUN sed -i '/include \/etc\/nginx\/sites-enabled\//a\\tinclude /home/docker/Github-Monitor/docker/nginx-app.conf;' /etc/nginx/nginx.conf
RUN sed -i 's/\/etc\/supervisor\/conf.d\/\*.conf/\/home\/docker\/Github-Monitor\/docker\/supervisor-app.conf/g' /etc/supervisor/supervisord.conf

# install requirement
COPY server/requirements.pip /requirement.txt
RUN pip3 install -r /requirement.txt -i http://pypi.doubanio.com/simple --trusted-host pypi.doubanio.com

# volumne
VOLUME ["/var/lib/redis"]
VOLUME ["/home/docker/Github-Monitor/"]

WORKDIR /home/docker/Github-Monitor/

ENV LANG C.UTF-8

EXPOSE 80

CMD ["/bin/bash", "/home/docker/Github-Monitor/docker/run.sh"]
