# FROM risingstack/alpine:3.4-v7.4.0-4.2.0
FROM node:7.7.4

# install yarn
# https://github.com/yarnpkg/yarn/blob/master/Dockerfile.node7
# ADD https://dl.yarnpkg.com/debian/pubkey.gpg /tmp/yarn-pubkey.gpg
# RUN apt-key add /tmp/yarn-pubkey.gpg && rm /tmp/yarn-pubkey.gpg
# RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
# RUN apt-get -y update && \
#   apt-get install -y --no-install-recommends yarn && \
#   apt-get clean && \
#   rm -rf /var/lib/apt/lists/*

# for unbuntu
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
# for alpine
# RUN apk update && apk add ca-certificates && \
#     apk add tzdata && \
#     ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
#     echo "Asia/Shanghai" > /etc/timezone








RUN mkdir -p /ebsa/service \
  && mkdir -p /tmp/service \
  && mkdir -p /int/www \
  && touch /int/www/stats.html

# for npm install
ADD package.json /tmp/service/
RUN cd /tmp/service && NODE_ENV=development npm install
WORKDIR /ebsa/service
RUN ln -s /tmp/service/node_modules
# for yarn
# ADD package.json yarn.lock /tmp/service/
# RUN cd /tmp/service && NODE_ENV=development yarn
# WORKDIR /ebsa/service
# RUN ln -s /tmp/service/node_modules

COPY . /ebsa/service

EXPOSE 80
CMD ["npm", "run", "start"]
