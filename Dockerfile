FROM debian:latest

RUN apt-get update && \
    apt-get install -y git python3 python3-setuptools nodejs npm

RUN git clone --depth 1 https://github.com/novnc/websockify.git && \
    cd websockify && \
    python3 setup.py install

WORKDIR /run

COPY . .

EXPOSE 8000 3000

CMD bash -c "websockify 0.0.0.0:8000 --token-plugin TokenFile --token-source proxypaths & node server.js"
