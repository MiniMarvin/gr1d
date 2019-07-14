# Chaarrr

O Chaarrr é um sistema omnichannel capaz de compreender o contexto dos usuários por meio de suas redes sociais e consequentemnete compreender o melhor momento de realizar uma oferta de venda para o usuário.


## APIs

O sistema de APIs utilizado conta com um grande conjunto de integrações nesse mundo de alta conectividade. Podemos dividir em APIs relacionadas a seguros e APIs relacionadas a coleta de dados.

### APIs de seguros

A API utilizada para o MVP é a da Travel Ace, onde é possível analizar os produtos de serviço de APIs utilizados pelo sistema para compreender quais os produtos que devem ser ofertados para o usuário, as rotas que se desejaria utilizar são as rotas de uso da API de compra e cotação de seguros, contudo, por recomendação da organização não se deveria utilizar essa rota da API pois ela estava fora do ar, então o que foi utilizado foi um sistema de recomendação de produtos de tabela ofertados pela corretora e solicitado principalemnte no arquivo dialogflow.js na linha 149 que é posto pela pipeline como um caching dos dados

### APIs de dados

Foi utilizada uma API de coleta de dados que é a API BigBoost para coletar os dados do usuário para completar automaticamente o registro do usuário no banco de dados.