
FROM timbru31/node-alpine-git:18

RUN mkdir -p /app/node_modules

WORKDIR /app

RUN apk update

RUN echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> $HOME/.bashrc

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip

RUN apk add zip

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000


CMD source ~/.bashrc && npm run start:prod