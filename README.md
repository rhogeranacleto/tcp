# Trabalho de Sistemas distribuidos.

## Rhoger Anacleto

### Instruções

- Instalar node no linux se não tiver. Versão 6.11.3 ou superior. Indicado usar [nvm](https://github.com/creationix/nvm#install-script).
- **É preciso ter um banco em mongodb. Configurar no _server.js:7_ a url do mongodb caso não seja o local (padrão)**

**Rodar o comando `npm install` na pasta raiz.**

- Na pasta raiz executar em um terminal o servidor com `node server.js`;
  - As portas são definidas automaticamente entre a 3000 e 3010.
  - É possivel executar até 11 servidores ao mesmo tempo.

- Na pasta raiz executar em um terminal o client com `node client.js`;
  - O cliente tentará conectar automaticamente em algum servidor ativo nas portas entre 3000 e 3010.
  - É possivel digitar mensagens no terminal, será enviada para o server, e este responderá o mesmo texto.
  - Ao enviar `\historic` reberá a lista de mensagens enviadas por aquele cliente naquela sessão.
  - **Cada vez que o cliente inicia é uma sessão diferente.**
