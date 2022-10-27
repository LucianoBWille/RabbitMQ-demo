# RabbitMQ-demo
Demontração das funcionalidades do RabbitMQ com projetos Nest.js

##Requisitos para rodar
- NPM

- Docker com Docker compose

## Rodar as aplicações

Rode o RabbitMQ e Kafka com Docker Compose. Use dois terminais diferentes para ver os logs de cada um sendo executados.

```bash
docker compose -f docker-compose.rabbit.yaml up
```

```bash
docker compose -f docker-compose.kafka.yaml up
```


Existem 2 aplicações WEB no projeto:
 * nest-consumer - consumidor de mensagens do RabbitMQ e Kafka
 * nest-publisher - publicador de mensagens do RabbitMQ e Kafka

Entre em cada um delas e rode os comandos:

```bash
npm install
npm run start:dev # levantar o serviço das aplicações
```


Use o arquivo `nest-publisher/api.http` para testar a publicação usando a extensão Rest Client do VSCode ou outra ferramenta para brincar com o HTTP.

Verifique os logs no terminal do `nest-consumer` para ver se as mensagens foram consumidas

# Recriar o projeto
```bash
    npm install -g @nestjs/cli
```

## criar o consumer

```bash
    nest new nest-consumer
```

```bash
    npm install @golevelup/nestjs-rabbitmq
```

### Na app.module.ts

importar o RabbitModule, adicionando o seguinte texto na primeira linha:

```Typescript
    import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
```

adicionar o sequinte texto no import da "@module({})"
```typescript
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@localhost:5672',
    }),
```

### Na app.service.ts

importar o RabbitSubscribe, adicionando o seguinte texto na primeira linha:
```Typescript
    import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
```

adicionar o seguinte texto antes do metodo "getHello"

```typescript
    @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'pagamentos', //rota - binding
    queue: 'nest-consumer',
  })
  consumerRabbit(msg) {
    console.log(`${JSON.stringify(msg)}`);
  }
```

## criar o publisher

```bash
    nest new nest-publisher
```

```bash
    npm install @golevelup/nestjs-rabbitmq
```

### Na app.module.ts

importar o RabbitModule, adicionando o seguinte texto na primeira linha:

```Typescript
    import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
```

adicionar o sequinte texto no import da "@module({})"
```typescript
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@localhost:5672',
    }),
```

### Na app.controller.ts

subtituir a primeira linha por:
```Typescript
    import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
    import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
```

adicionar parametro ao construtor
```typescript
    private amqpConnection: AmqpConnection,
```

adicionar o seguinte texto depois do metodo "getHello"

```typescript
  @Post('rabbit-publish')
  publisherRabbitMQ(@Body() body) {
    this.amqpConnection.publish('amq.direct', 'pagamentos', body);
    console.log('mensagem publicada');
    return { message: 'mensagem publicada' };
  }
```

### Na main.ts

mudar a porta de 3000 para 3001

### api.http

adicionar extensão REST Client no Visual Studio Code

adicionar o post no arquivo
``` 
POST http://localhost:3001/rabbit-publish
Content-Type: application/json

{
    "client": "Fulano de Tal",
    "amount": 100000
}
```



