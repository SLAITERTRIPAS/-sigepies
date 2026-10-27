# Especificação de Segurança SIGEP

## 1. Invariantes de Dados
- **Validação RH**: Nenhum utilizador pode existir no sistema sem um registo correspondente na coleção `colaboradores` (Efetivo Geral).
- **Acesso Restrito**: Apenas colaboradores com `cargoChefia` válido ou permissões de Administrador podem aceder às funcionalidades do sistema.
- **Isolamento de Dados**: Utilizadores comuns só podem ler/escrever os seus próprios dados.
- **Administrador Global**: O email `slaitertripas@gmail.com` ignora restrições institucionais.
- **Integridade de Atributos**: Campos como `email`, `nuit` e `instituicaoId` são imutáveis após a criação para utilizadores não-admin.

## 2. Dirty Dozen Payloads (Tentativas de Violação)

1. **Acesso Alheio (Identity Spoofing)**: Tentar ler `users/outro_user_id`.
2. **Escalação de Privilégios**: Tentar atualizar o próprio perfil com `role: "Administrador"`.
3. **Injeção de Cargo de Chefia**: Tentar definir `cargoChefia: "Director Geral"` num perfil comum.
4. **Violação de Fronteira Institucional**: Tentar ler `colaboradores` de outra instituição.
5. **Apagamento Malicioso**: Tentar excluir outro utilizador sem ser Administrador.
6. **Bypass de Validação RH**: Criar um utilizador em `users` que não existe em `colaboradores`.
7. **Resource Poisoning**: Enviar um NUIT com 1MB de caracteres.
8. **Alteração de Email**: Tentar mudar o email vinculado para assumir outra identidade.
9. **Sessão Fantasma**: Tentar atualizar `isOnline` de outro utilizador.
10. **Acesso Anónimo**: Tentar ler qualquer coleção sem estar autenticado.
11. **Escrita em Logs**: Tentar apagar ou modificar `auditLogs`.
12. **Injeção de Configuração**: Tentar alterar `config_sistema/main_config`.

## 3. Estratégia de Regras (firestore.rules)

- **Helpers Globais**: `isSignedIn()`, `isOwner(userId)`, `isAdmin()`, `isChefia()`.
- **Validação por Entidade**: `isValidUser(data)`, `isValidColaborador(data)`.
- **Restrição de Listagem**: `allow list: if resource.data.instituicaoId == request.auth.token.instituicaoId`.

## 4. Testes de Segurança (firestore.rules.test.ts)
*(Implementação lógica para validação interna)*
