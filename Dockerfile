FROM python:3
MAINTAINER Tuuu Nya<song@secbox.cn>

USER root

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update -y && apt-get install -y supervisor

COPY . .
COPY docker/github_monitor.conf /etc/supervisor/conf.d/

RUN chmod +x /usr/src/app/docker/wait-for-it.sh
RUN chmod +x /usr/src/app/docker/run.sh

EXPOSE 5000

CMD ["/usr/src/app/docker/wait-for-it.sh", "mysql:3306", "--", "/usr/src/app/docker/run.sh"]
