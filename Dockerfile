FROM node
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
RUN npm install -g gulp
EXPOSE 9000
ENV DEBUG=app*
CMD ["npm", "run", "develop"]
