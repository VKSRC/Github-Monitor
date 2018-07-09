FROM python:3
MAINTAINER Tuuu Nya<song@secbox.cn>

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x wait-for-it.sh
RUN chmod +x run.sh

EXPOSE 5000

CMD ["./wait-for-it.sh", "mysql:3306", "--", "./run.sh"]
