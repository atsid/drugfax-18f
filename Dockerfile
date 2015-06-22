FROM node:0.10.38
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
EXPOSE 9000
ENV DEBUG=app*
CMD ["npm", "start"]
