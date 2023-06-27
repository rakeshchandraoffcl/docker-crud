FROM node:16
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "${NODE_ENV}"="development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
COPY . .
ENV PORT=3000 \
    NODE_ENV=developemnt
EXPOSE $PORT
CMD [ "npm","start" ]