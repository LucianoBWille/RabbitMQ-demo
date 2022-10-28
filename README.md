# RabbitMQ-demo
Demontração das funcionalidades do RabbitMQ com projetos Nest.js. Onde o produto e o consumidor rodam diretamente no nodejs da máquina e o RabbitMQ em container Docker.

## Requisitos para rodar

- NPM

- Docker com Docker compose

## Rodar as aplicações

Rode o RabbitMQ com Docker Compose. Use dois terminais diferentes para ver os logs de cada um sendo executados.

```bash
    docker compose up
```


Existem 2 aplicações WEB no projeto:
 * nest-consumer - consumidor de mensagens do RabbitMQ
 * nest-publisher - publicador de mensagens do RabbitMQ

Entre em cada um delas e rode os comandos:

```bash
npm install # instalar as dependencias
npm run start:dev # levantar o serviço das aplicações
```


Use o arquivo `nest-publisher/api.http` para testar a publicação usando a extensão Rest Client do VSCode ou outra ferramenta para brincar com o HTTP.

Verifique os logs no terminal do `nest-consumer` para ver se as mensagens foram consumidas.

## Se quiser saber o processo para recriar o projeto

[Passo a passo para desenvolver o produtor e o consumidor](./passo_a_passo.md)