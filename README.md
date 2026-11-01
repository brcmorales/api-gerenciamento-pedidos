
## Exemplos de respostas HTTP

### Criar pedido — `POST /pedidos`

Requisição:
```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

Resposta esperada: `201 Created`, com os dados do pedido criado e seu identificador.

### Dados inválidos — `400 Bad Request`

Ocorre quando os dados enviados não atendem às regras de validação, como cliente vazio ou valor igual a zero.

### Pedido não encontrado — `404 Not Found`

Ocorre quando o identificador informado não corresponde a um pedido existente.

### Atualização de status — `PATCH /pedidos/:id/status`

Requisição:
```json
{
  "status": "em_preparacao"
}
```

Uma atualização válida retorna `200 OK`. Transições de status não permitidas retornam `400 Bad Request`.

## Observações sobre os testes

Os testes automatizados são executados com Jest e Supertest usando o comando `npm test`. Os testes manuais no Postman devem ser registrados com capturas reais das requisições e respostas.
