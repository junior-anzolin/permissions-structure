## Estrutura de permissões com Angular e NestJS

Este repositório é relacionado ao artigo do medium
[Estrutura de permissões com Angular e NestJS](https://medium.com/@junioranzolin58/estrutura-de-permiss%C3%B5es-com-angular-e-nestjs-15645dcb4320)

### Backend

Para iniciar o backend, é necessário realizar a configuração de um banco MongoDB, é possivel fazer isso com a [Cloud da Mongo](http://cloud.mongodb.com/)
Com o link para o banco, basta colocar ele no arquivo `backend/src/database/database.module.ts`;

Após isso, entre na pasta do backend e execute o comando `npm start`. Agora o backend esta disponivel na rota `http://localhost:3000`;

As rotas estão mapeadas pelo insomnia no arquivo `requests-insomnia.json` na raiz do projeto.

### Frontend

Para iniciar o frontend, basta acessar a pasta `frontend` e rodar o comando `npm install`.
Depois pode rodar o comando `npm start`.

```
 cd frontend
 npm install
 npm start
```

Após isso basta acessar a o link `http://localhost:4200`;.
x
> Não esqueça de iniciar o backend antes para que a aplicação funcione!

### Mais sobre o projeto

Aqui contrui exemplos de como utilizar o pacote [ngx-permissions](https://www.npmjs.com/package/ngx-permissions).
Ao abrir a plataforma, verá os usuários cadastrados no seu banco. É necessário ter um para poder selecioar de qual usuário será carregada as permissões.

> Você pode cadastrar usuários, grupos e adicionar permissões pelas APIs mapeadas no insomnia.