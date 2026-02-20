# Análise dos Testes Unitários do Projeto "Adote Fácil"

Os testes unitários do projeto estão concentrados no backend, validando regras de negócio como autenticação, cadastro e manipulação de entidades principais.

A estrutura é organizada, usa **Jest** como framework principal e aplicando mocks para simular dependências externas. Isso contribui para maior isolamento e execução mais rápida dos testes.

É completo de modo geral, mas seria interessante a adição de outros testes que tratem campos null.

---

## Análise

### Pontos Positivos

- Uso de mocks para simular dependências externas.
- Testes organizados.
- Estrutura que facilita manutenção futura.

---

### Pontos negativos

- Não trata muitas exceções e permissões.
- Pouca verificação de comportamentos inesperados.

---

## Melhorias Recomendadas

- Criar testes para fluxos de erro (ex: usuário não autorizado, recurso inexistente).
- Isolar completamente os services utilizando mocks completos das dependências.
- Melhorar o nome dos testes.

---

# Testes de Aceitação com linguagem natural

A seguir estão cenários alternativos aos já existentes, cobrindo novos fluxos do sistema.

---

## 1 - Cenário: Solicitar adoção de um animal disponível

### Cenário Principal

**Dado que** o usuário está autenticado como adotante  
**E** está na página de detalhes de um animal disponível  
**Quando** ele clicar no botão "Solicitar adoção"  
**E** confirmar a solicitação  
**Então** o sistema deve registrar a solicitação com sucesso  
**E** o status do animal deve mudar para "Em processo de adoção"

---

### 1.1 - Cenário: Solicitar adoção sem estar autenticado

**Dado que** o usuário não está autenticado  
**Quando** tentar clicar em "Solicitar adoção"  
**Então** o sistema deve redirecioná-lo para a página de login  
**E** exibir mensagem informando que é necessário autenticação

---

### 1.2 - Cenário: Solicitar adoção de animal já adotado

**Dado que** o usuário está autenticado  
**E** o animal já está marcado como adotado  
**Quando** tentar solicitar adoção  
**Então** o sistema não deve permitir a ação  
**E** deve informar que o animal não está mais disponível

---

## 2 - Cenário: Cancelar solicitação de adoção

### Cenário Principal

**Dado que** o usuário realizou uma solicitação de adoção  
**E** está na página "Minhas solicitações"  
**Quando** clicar na opção "Cancelar solicitação"  
**E** confirmar a ação  
**Então** a solicitação deve ser removida  
**E** o animal deve voltar ao status "Disponível"

---

### 2.1 - Cenário: Cancelar solicitação inexistente

**Dado que** o usuário não possui solicitações ativas  
**Quando** tentar acessar uma URL direta de cancelamento  
**Então** o sistema deve retornar erro  
**E** informar que a solicitação não existe

---

## 3 - Cenário: Alterar senha do usuário

### Cenário Principal

**Dado que** o usuário está autenticado  
**E** está na página "Alterar senha"  
**Quando** informar a senha atual corretamente  
**E** informar uma nova senha válida  
**E** confirmar a nova senha  
**Então** o sistema deve atualizar a senha com sucesso  
**E** exigir novo login após alteração

---

### 3.1 - Cenário: Informar senha atual incorreta

**Dado que** o usuário está autenticado  
**Quando** informar senha atual incorreta  
**E** tentar salvar alterações  
**Então** o sistema não deve alterar a senha  
**E** deve informar que a senha atual está incorreta

---

### 3.2 - Cenário: Nova senha e confirmação diferentes

**Dado que** o usuário está autenticado  
**Quando** informar nova senha e confirmação diferentes  
**E** clicar em salvar  
**Então** o sistema não deve atualizar a senha  
**E** deve informar que as senhas não coincidem

---

# Instruções para Executar os Testes no Cypress

## 1. Instalação

Na raiz do projeto:

```bash
npm install
npm install cypress --save-dev
