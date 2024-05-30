FROM node:20 as node

ENV PROJECT_HOME /usr/src/appweb

WORKDIR $PROJECT_HOME

COPY . .

RUN npm install
RUN npm install @angular/cli -g

EXPOSE 4200

CMD ["ng", "serve", "--configuration=production", "--host", "0.0.0.0"]