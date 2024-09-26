## Task Wallet app

# Сервер реализует логику рабты с кошельками пользователей. Каждый кошелек состоит из набора счетов. Пользователь может отправлять и принимать средства, просматривать историю операций. Как бы Вы спроектировали подобную систему (как бы организовали управление бизнес-сущностями и их взаимодействие, как бы организовали общение с клиентами и т.д.)?

## Seed database

```bash
 npm run seed
```

## Run development

```bash
  npm run dev
```

## ENDPOINT

# просматривать историю операций

```bash
/api/history/:accountId
```

# отправлять и принимать средства

```bash
/api/history/:accountId
```
