# Trabalho de Sistemas distribuidos.

## Rhoger Anacleto

### Instruções

- Instalar node no linux se não tiver. Versão 6.11.3 ou superior. Indicado usar [nvm](https://github.com/creationix/nvm#install-script).

- Na pasta raiz executar em um terminal o servidor com `node server.js`;
  - As portas são definidas automaticamente entre a 3000 e 3010.
  - É possivel executar até 11 servidores ao mesmo tempo.

- Na pasta raiz executar em um terminal o client com `node client.js`;
  - O cliente tentará conectar automaticamente em algum servidor ativo nas portas entre 3000 e 3010.
  - É possivel digitar mensagens no terminal, será enviada para o server, e este responderá o mesmo texto.
