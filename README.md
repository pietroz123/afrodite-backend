
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
| GET | /api/servicos | Retorna todos os serviços disponíveis no Salesforce |
| GET | /api/profissionais | Retorna todos os profissionais disponíveis no Salesforce |
| GET | /api/profissionais/:idProfissional/servicos | Retorna todos os serviços prestados por um profissional |