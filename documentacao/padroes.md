# Princípios SOLID e Padrões de Projeto

Este documento descreve a análise de princípios SOLID e Padrões de Projeto encontrados (ou sugeridos) no backend do sistema Adote Fácil.

---

## 1. Princípios SOLID

### SRP (Princípio da Responsabilidade Única) - Aplicado
As classes do projeto possuem responsabilidades bem definidas e separadas. O `Encrypter`, por exemplo, lida exclusivamente com a criptografia de senhas, sem misturar lógicas de banco de dados ou requisições HTTP.

**Exemplo (`providers/encrypter.ts`):**
```typescript
export class Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }
  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}
```

### ISP (Princípio da Segregação da Interface) - Aplicado
As interfaces de transferência de dados (DTOs) são segregadas por caso de uso, evitando que as funções dependam de propriedades que não irão utilizar. 

**Exemplo (`repositories/animal.dto.d.ts`):**
```typescript
// Interface específica para criação
export namespace CreateAnimalRepositoryDTO {
  export type Params = { name: string; type: string; gender: 'Macho' | 'Fêmea'; userId: string }
}

// Interface específica para atualização de status (menor e focada)
export namespace UpdateAnimalStatusRepositoryDTO {
  export type Params = { id: string; status: AnimalStatus; userId: string }
}
```

### DIP (Princípio da Inversão de Dependência) - Ausência / Sugestão de Melhoria
Atualmente, as classes de alto nível dependem de implementações concretas em vez de abstrações (interfaces). 

**Exemplo do problema (`controllers/user/create-user.ts`):**
```typescript
// O Controller depende diretamente da classe concreta CreateUserService
class CreateUserController {
  constructor(private readonly createUser: CreateUserService) {}
}
```
*Sugestão:* Criar uma interface `ICreateUserService` e injetá-la no construtor. Isso facilitaria a criação de *mocks* para os testes automatizados.

// import { CreateUserDTO }

// interface ICreateUserService {
  // método de executar 
  
//class CreateUserController {
  //constructor(private readonly createUser: ICreateUserService) {}
  
}

----

## 2. Padrões de Projeto

### Adapter (Aplicado)
As classes na pasta `providers` atuam como adaptadores para bibliotecas externas. O `Encrypter` "envelopa" a biblioteca `bcrypt`, protegendo o restante do sistema caso a ferramenta de criptografia precise ser trocada no futuro.

**Exemplo (`providers/encrypter.ts`):**
```typescript
import bcrypt from 'bcrypt'

export class Encrypter {
  encrypt(value: string): string { return bcrypt.hashSync(value, 10) }
}
```

### Singleton / Module Pattern (Aplicado)
O projeto exporta instâncias já inicializadas das classes ao final dos arquivos. Isso garante que a aplicação utilize um único objeto em memória durante toda a execução, economizando recursos.

**Exemplo (`providers/encrypter.ts`):**
```typescript
export const encrypterInstance = new Encrypter()
```

### Facade (Aplicado)
A camada de *Service* atua como uma fachada (Facade) para os *Controllers*. O controller não precisa interagir com o repositório ou com o provedor de criptografia; ele apenas chama o serviço, que orquestra toda a complexidade da regra de negócio.

**Exemplo (`controllers/user/create-user.ts`):**
```typescript
// O controller interage apenas com a "fachada" (o método execute)
const result = await this.createUser.execute({ name, email, password })
```

### Strategy (Sugestão de Melhoria)
Para complementar a criptografia e a validação de tokens, o padrão **Strategy** poderia ser implementado.

*Sugestão:* Criar uma interface `IEncrypter` (Estratégia) e fazer com que a classe atual se chame `BcryptEncrypter` (Estratégia Concreta). Se futuramente o projeto migrar para o `Argon2`, bastaria criar uma nova classe `Argon2Encrypter` implementando a mesma interface, sem alterar as regras de negócio do `CreateUserService`.
