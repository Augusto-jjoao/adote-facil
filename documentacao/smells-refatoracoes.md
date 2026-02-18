# Detecção de Code Smells e Refatorações

Este documento lista os *code smells* identificados automaticamente pelo SonarLint no projeto Adote Fácil, juntamente com as refatorações sugeridas e aplicadas no código-fonte.

---

## 1. Code Smell: Missing Readonly Modifier (Modificador Ausente)
**Arquivo:** `backend/src/providers/authenticator.ts`

**Qual o smell identificado:** O SonarLint apontou a regra **S2933** (*"Member 'secret' is never reassigned; mark it as `readonly`"*). A variável `secret` recebe um valor na instanciação e nunca mais é alterada. Deixá-la mutável abre margem para alterações acidentais no futuro.

**Trecho do código original:**
```typescript
export class Authenticator {
  private secret = process.env.JWT_SECRET || 'secret'
  // ...
```

**Refatoração aplicada:**
Adicionar o modificador `readonly` para garantir a imutabilidade em tempo de compilação.
```typescript
export class Authenticator {
  private readonly secret = process.env.JWT_SECRET || 'secret'
  // ...
```

---

## 2. Code Smell: Ignored Exception (Exceção Mascarada/Silenciada)
**Arquivo:** `frontend/src/middleware.ts`

**Qual o smell identificado:** O SonarLint apontou a regra **S2486** (*"Handle this exception or don't catch it at all"*). O bloco `catch` captura o erro `e` retornado pelo `jwtDecode`, mas não faz nada com ele. Isso engole a falha silenciosamente, tornando o *debug* impossível caso o token esteja malformado.

**Trecho do código original:**
```typescript
try {
  const decoded: { exp: number } = jwtDecode(token)
  return decoded.exp > Date.now() / 1000
} catch (e) {
  return false
}
```

**Refatoração aplicada:**
Adicionar pelo menos um *log* de erro para registrar o motivo da falha de validação antes de retornar `false`.
```typescript
try {
  const decoded: { exp: number } = jwtDecode(token)
  return decoded.exp > Date.now() / 1000
} catch (e) {
  console.error('Falha ao decodificar o token:', e)
  return false
}
```

---

## 3. Code Smell: Mutable Component Props (Props Mutáveis no React)
**Arquivo:** `frontend/src/layout/DefaultLoggedPage/DefaultLoggedPageLayout.tsx` (e outros Providers)

**Qual o smell identificado:** O SonarLint apontou a regra **S6759** (*"Mark the props of the component as read-only"*). No ecossistema React, propriedades (`props`) 
passadas para componentes nunca devem ser alteradas pelo próprio componente. O TypeScript deve refletir essa regra usando o tipo `Readonly`.

**Trecho do código original:**
```typescript
export function DefaultLoggedPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
```

**Refatoração aplicada:**
Utilizar o utilitário `Readonly` do TypeScript na definição da tipagem das props.
```typescript
export function DefaultLoggedPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
```

---

## 4. Code Smell: Unexpected Negated Condition (Condicional Negativa Confusa)
**Arquivo:** `frontend/src/layout/DefaultLoggedPage/DefaultLoggedPageLayout.tsx`

**Qual o smell identificado:** O SonarLint apontou a regra **S7735** (*"Unexpected negated condition"*). Usar uma condição negada em um operador ternário (`!condicao ? a : b`) exige maior esforço cognitivo para leitura. 
É sempre preferível inverter a lógica ou, no caso do React, usar o operador lógico `&&` se o retorno alternativo for `null`.

**Trecho do código original:**
```tsx
{!mobileMenuIsOpen ? <S.PageContent>{children}</S.PageContent> : null}
```

**Refatoração aplicada:**
Substituir o ternário negado pelo operador lógico `&&` direto ou inverter a lógica.
```tsx
// Muito mais limpo e legível:
{!mobileMenuIsOpen && <S.PageContent>{children}</S.PageContent>}
```

---
