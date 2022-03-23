FROM debian
LABEL maintainer="mkayumba@student.42.fr"

RUN apt-get -y update \
&& apt-get -y upgrade \
&& apt install build-essential -y \
&& apt install -y zsh \
&& apt-get install -y tree \
&& apt install -y git\
&&  apt-get install -y curl 

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - &&   apt-get install -y nodejs
COPY  ./entrypoint.sh /usr/local/bin

WORKDIR /app

ENTRYPOINT [ "entrypoint.sh" ]