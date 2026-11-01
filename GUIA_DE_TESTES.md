

\# Guia de Testes da API



\## 1. Preparação



Abra o terminal na pasta do projeto e execute:



```bash

npm install

```



\## 2. Executar os testes automatizados



```bash

npm test

```



O Jest apresenta o resultado de cada teste e informa quantos passaram ou falharam.



\## 3. Testes manuais no Postman



Configure a URL base:



`http://localhost:3000`



Execute os seguintes cenários:



1\. \*\*Criar pedido:\*\* `POST /pedidos`, com dados válidos. Esperado: HTTP 201.

2\. \*\*Validar dados:\*\* `POST /pedidos`, com cliente vazio ou valor zero. Esperado: HTTP 400.

3\. \*\*Listar pedidos:\*\* `GET /pedidos`. Esperado: HTTP 200.

4\. \*\*Consultar pedido inexistente:\*\* `GET /pedidos/999999`. Esperado: HTTP 404.

5\. \*\*Atualizar status:\*\* `PATCH /pedidos/ID/status`, utilizando o ID de um pedido criado. Esperado: HTTP 200 para uma transição permitida.



\## 4. Evidências



Salve capturas reais das cinco respostas na pasta `evidencias/`. Cada imagem deve mostrar a requisição, a resposta e o código HTTP. Não utilize capturas simuladas.



