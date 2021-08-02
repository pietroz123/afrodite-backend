
## Estrutura de Pastas

O backend da aplicação está localizado na pasta root da aplicação, nas seguintes pastas:

    .
    ├── config					# Variáveis de configuração
    ├── controllers             # Controllers do backend
    ├── helpers                 # Helpers (validação de body e schemas)
    ├── models                  # Models do backend (schemas do mongoose)
    ├── routes                  # Rotas do backend
    ├── package.json			# Dependências do backend e scripts
    ├── passport.js				# Stratégias de autenticação (contém local também, embora apenas google seja utilizado)
    └── server.js				# Entry point da aplicação

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/servicos | Retorna todos os serviços disponíveis |
| GET | /api/servicos/:idServico | Retorna um serviço pelo seu Id |
| GET | /api/servicos/:idServico/profissionais | Retorna todos os profissionais que prestam o serviço |
| GET | /api/profissionais | Retorna todos os profissionais disponíveis |
| GET | /api/profissionais/:idProfissional | Retorna um profissional pelo seu Id |
| GET | /api/profissionais/:idProfissional/servicos | Retorna todos os serviços prestados por um profissional |
| POST | /api/agendamentos | Criação de um agendamento passando horário, cliente, serviço e profissional. Ex: `{ "horario": "2021-08-03T14:30:00.000Z", "idCliente": "a015e000008zEKEAA2", "idServico": "a0C5e000000hUO5EAM", "idProfissional": "a0A5e00000574jBEAQ" }` |

## Rodar a API

```bash
$ npm run dev
```