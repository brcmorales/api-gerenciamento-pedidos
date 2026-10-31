# API de Gerenciamento de Pedidos

Projeto acadêmico de Tópicos Avançados em Sistemas de Informação II.

## Requisitos
- Node.js 18 ou superior
- npm

## Instalação e execução
```bash
npm install
npm start
```
A API ficará disponível em `http://localhost:3000`. Verificação: `GET /health`.

## Testes
```bash
npm test
```

## Endpoints
| Método | Rota | Resultado esperado |
|---|---|---|
| POST | `/pedidos` | 201: cria pedido |
| GET | `/pedidos` | 200: lista pedidos |
| GET | `/pedidos/:id` | 200 ou 404 |
| PATCH | `/pedidos/:id/status` | 200, 400 ou 404 |

Exemplo para `POST /pedidos`:
```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

Tipos aceitos: `entrega`, `retirada`. Prioridades: `baixa`, `normal`, `alta`, `urgente`.
Status: `recebido`, `em_preparacao`, `enviado`, `entregue`, `cancelado`.

Transições permitidas: `recebido` → `em_preparacao` ou `cancelado`; `em_preparacao` → `enviado` ou `cancelado`; `enviado` → `entregue`. Os status `entregue` e `cancelado` são finais.

## Arquitetura
- `routes`: mapeia métodos HTTP e caminhos.
- `controllers`: recebe requisições e define respostas HTTP.
- `services`: valida dados e aplica regras de negócio.
- `middlewares`: padroniza respostas de erro.
- `tests`: testes automatizados com Jest e Supertest.

O armazenamento é em memória, portanto os pedidos são apagados quando o processo é reiniciado. Banco de dados não faz parte do escopo mínimo.

## Testes manuais no Postman
Execute os cenários do projeto acadêmico: criação válida (201), validação inválida (400), listagem (200), consulta inexistente (404) e atualização de status (200). Salve capturas legíveis na pasta `evidencias/`, mostrando método, URL, corpo quando aplicável, resposta e código HTTP. As capturas devem ser realizadas após executar a API; não são simuladas neste repositório.

## Git
Recomenda-se manter ao menos cinco commits significativos, por exemplo:
1. estrutura inicial e configuração;
2. rotas e controllers;
3. regras de negócio e validações;
4. tratamento de erros;
5. testes e documentação.

## Uso de IA
Este projeto foi elaborado com apoio de inteligência artificial para estruturar a documentação e sugerir uma implementação inicial. A equipe deve revisar o código, executar os testes, compreender as decisões e registrar no relatório quais sugestões foram aceitas, modificadas ou rejeitadas e por quê. Não declarar testes executados antes de executá-los.
