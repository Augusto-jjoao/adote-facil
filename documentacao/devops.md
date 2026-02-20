# Análise DevOps e melhorias no CI/CD

## Atualmente

O repositório possui:

- Workflow GitHub Actions em .github/workflows/experimento-ci-cd.yml
- Orquestração via docker-compose.yml na raiz
- Containers para backend, frontend e banco de dados

O pipeline executa:

1. Testes unitários no backend
2. Build das imagens Docker
3. Subida temporária dos containers

---

## Melhorias implementadas

### 1) Correção da execução do Docker Compose

O docker-compose.yml está na raiz do projeto.  
Antes, o workflow poderia executar docker compose up dentro do diretório ./backend, e o GitHub Actions não encontraria o arquivo.

**Correção aplicada:**  
O step de subida dos containers roda na raiz do repositório (sem working-directory: ./backend), garantindo que o Docker Compose use o docker-compose.yml correto.

### 2) Uso de npm ci no lugar de npm install

O pipeline utilizava npm install para instalar dependências.

Em CI recomenda-se npm ci, pois:

- Garante instalação determinística
- É mais rápido
- Usa estritamente o package-lock.json
- Evita diferenças entre ambientes

**Correção aplicada:**  
Substituição de npm install por npm ci no job de testes unitários.

## Conclusão

As alterações aplicadas deixam o pipeline mais estável: execução do Compose na raiz e uso de npm ci no CI, alinhados a boas práticas e com fluxo mais reproduzível.
