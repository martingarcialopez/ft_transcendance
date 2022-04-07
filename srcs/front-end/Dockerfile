FROM debian
LABEL maintainer="mkayumba@student.42.fr"

RUN apt-get -y update \
&& apt-get -y upgrade \
&& apt install build-essential -y \
&& apt install -y zsh \
&& apt-get install -y tree \
&&  apt-get install -y curl

COPY  ./entrypoint.sh /usr/local/bin
# COPY /home/lenox/ft_transcendance/srcs/back-end

ENTRYPOINT [ "entrypoint.sh" ]