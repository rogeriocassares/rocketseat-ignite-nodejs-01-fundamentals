# Quick Start
```bash
npm i
npm run dev
```

# Relevant Notes

Create package.json

npm init -y

Geralmente nao usamos o padrao de index como semantica. Isso é mais utilizado para web e browser.

Nao consegimos ter acesso ao document,ID, por exemplo no Node.



Modulo de http vem interno.

Por padrao, o node nao suporta o ECMA SCripts modules. Para isso, dentro do package.json vamos inserir o type module.

Para idenificarmos melhor e diferenciarmos a imoirta~cao de modulos internos e externos, para os modulos internos é sempre de bom tomcolcoar node:http, por exemplo. 

No req conseguimos acessar todas as infos que chegam no server

O res é utilizado para devolver uma resposta para quem esta chamando o server

Podemos testar tb com o httpie

http localhost:3333

Para observar as mudanças, nao precisamos instalar mais bibliotecas externas, apenas usar o comando watch 

node --watch src/server.js

Podemos criar scrips automatizados dentro do package.json

"scripts": {

​    "dev": "node --watch src/server.js"

  },



Agora,

npm run dev

ROtas: Criar, listar, editar, remover usuários



Stateful vs stateless 

Por enquanto vamos fazer statefull e os dados serao colcoados emmemoria. 

Nao é possivel devolver um array no concole.log, mas uma string, buffer or uint8 array (buffer)

Todas as vezes que reiniciamos o servidor a memoria é apagada. Por isso nao é bom fazermos dessa aplicaçao do exemplo como umastatefull

Para o frontend saber como o server devolveu como JSON., é importante informar isso para os headers da requisiçcao.

Os cabeçalhos da requisicao ;resposta sao metadados. INformaçoes adicionais que nao sao dados, mas como o dado pode ser interpretado pelo front.

Os headers podem ser enviados em ambos os sentidos 

O status code é muito importante na semantica de uma apirest

Utilizar o 201 sempre que foi criado algo compost.



STREAMS

Obter pequenas partes de algumacoisa e ja conseguir trabalhar naqueles dados mesmo sem ter o conteudo completo.

Netflix, youtube, importaçao de clientes etc

IMportaçao de clientes via csv. Imagina que ele contenha 1GB!  Se nao usar o conceito de stream, o usuário vai subir o csv, vai ser enviado atraves de um post upload e envia o arquivo. O Node pecisa lr o arquuvo inteiro, depois vai percorrer e fazer cada uma das operaçoes no db.

Se a internete for bem lenta, isso poderia demorar muito!

Quando trabalhamos com stream, enquanto fazemos o upload do arquivo, nos primeiros segundos de uploads, já vao sendo lidos do upload e aos poucos processando ele enquanto o arquivo esta sendo feito o upload! 

Nao é necessário receber o arquivo inteiro !



Writeable streams -> envia pro frontend aos pouos

Readable -> Enviando aos poucos

No node, toda porta de entrada e saida é uma stream. No final das contas, req e res sao streams.

POdemos deixar a porta aberta e ir devolvendo as mensagens ou recebendo as mensagens aos poucos!

No node temos varias portas de entrada e saida, por exemplo http

Para stream, vamos começar trabalhando com stdin e stout.

o process é uma duplex stream. Tdo o que recebemos como entrada, encaminhamos para a saida com o pipe e estamos lendo ela aos poucos.

Como construir streams do total zero? IMportamos do node o Readble 



Toda stream Readble possui um metodo obrigtorio chamado _read()

Uma stream de leitura tem como proposito fornecer e enviar informaçoes. 

push é um mẽtodo que utilizamos para uma readbale stream fornecer informaçoes para quem estiver lendo ela.

Para enviar uma stream, nao podemos trabalhar com string ou number, mas buffer. O buffer nao aceita numeros, mas apenas string.



Seao inves de simplesmente lermos o i e fazermos um push em nosssa stream, faremos um timer e ai sim executarmoso codifo ali dentro?

O resultado é que ele enviaria aos poucos as mensagens de dados, a cada 1 segundo até chegar ao 100;

​	Isso significa que estamos conseguindo trabalhar e processas com esses dados mesmo antes de chegar no limite e os dados estarem completos!

Os metodos req e res do http s"ao streams nativamente eveja que tb consegumos trabalhar com res.pipe() e req.pipe()!

Por mais que talvez nao vamos codar streams nativas, conseguimos trabalhar com estes conceitos no Node!



A stream de escrita vai receber algo da stream de leitura e processá-los;

​	WRITEALE --> READABLE (PROCESS THE INFO)



A stream de escrita nao retorna nada, ela processa o dado. Nunca vai transformar o dado em alguma outra coisa, Ela apenas processa.



Enquanto o arquivo esta sendo lido, ja estamos conseguindo processar estes dados!





Elas transformam um dado (chunk) em outro!

TRANSFORM STREAMS

Buffer é uma forma de nós transicionarmos dados entre streams. É o modelo que o node usa para transicionar dados entre streams!



Existe ainda a Stream do tipo Duplexque pode ter tanto o metodo de leitura quanto o metodo de escrita, ela pode fazer qualquer tipo de operaçcao. 

Podemos pensar nisso ocomo sendo um arquivo fisico do nosso sistema, em que podemos tanto ler, como escrever nele. Mas nao necessariamente podemos transformar algo dentro dele. LER, TRANSFORMA E DEPOIS ESCREVE DE NOVO. Na grande maioria dos cados a Duplex nao é utilizada. 



Vamos criarum server http a parte para ver como tudo se conecta! 



Desde aversao 18 do node ele suporta a fetchApi para trabalharmo com requisicoes e respostas no app

Para enviar pouco a pouco para o backend, o metodo da requisiçao necessita ser POST ou PUT pois estamos enviando algo. 

NO NODE, TODAS AS PORTAS DE ENTRADAS E SAIDAS NO NODE SAO STREAMS!

// req => ReadableStream

// res => WriteableStream

const server = http.createServer((*req*, *res*) => {

  return req.pipe(**new** InverseNumberStream()).pipe(res);

});



OHHH!!





eMALGUNS CASOS, precisamos da info por completo para entao trabalhar com esses dados por completo. Vamos criar o array de buffer,  percorre a stram populando o buffer e depois trabalha como array de forma completa!



É totalmente inviavel, or exexplo, consumir o formato JSON por partes

Ostream server muito mis para consumr de forma parcial. Video, musica, texto ...



Seria legal agora enviar no corpo da req o usuario e emai. Para testarmos vamos passar a utilizar um restclient. Insomina, hoppscotch etc

Para trabalhar com transmissao de dados entre front e back normalmente ehcom JSON. Vamos criar um nome no client http

Apos criar o req.body, consegumos, usando o conceito destream, ler todo o corpo da nossa requisiçao e depois que tiver ldo por completo, transformamos um opbeto de js e usamos os dados na hora da criaçao do usuário. 

Tudo isso poderia ser trabalhadocom framwork, mas essas ferramentas sao necessarios para ir além em situaçoes mais complexas e solucionar problemas de performance!



BUFFER é uma representaçao de um espaço na memoria do computador usado para transitar dados de uma maneira muito rapida. Os dados armazenados no buffer sao armazenados para logo serem trataos/enviados paraalgum outro lugar e depois logo removidos.

Sao maneiras de conseguirmos salvar e ler da memoria de uma maneira MUITO PERFORMATICA! Isso pq o node utiliza esse modelo de buffer na leitura e na escrita de strreams pois eh mais performatico ler parcialmente uma info de forma binaria, que eh como ele guarda na mameoria, do que necessariamente um texto;string ou algo que tem muito mais infos. Acendos e simpbolos devem terum encoding ainda mais pesados para srem lidos

O buffer existe dentro do node (uma api criadadentro do node)  exatamente pela incapacidade no js de trabalhar com dados binarios. Por muito tempo o js nunca teve uma forma nativa de trabalhar com dados binarios. 

Ateh existe a typed array,, mas ainda nao existe no node, entao precisamos aindausar a forma nativa que eh utilizando buffers paraler os valores da memoria de maneira binaria na memoria do pc.

// <Buffer 6f 6b> => hexadecimal em que cada byte representa uma das letras "o" e "k"

// Com os dados armazenados de forma hexadecimal, o Node consegue trabalhar demaneira MUUUUITOmais performatica do que se tentasse salvar como texto que precisa de varias tratativas para ser salvana memoria

Tb podemos utilizar um metodo buf.toJSON()

E quando ele roda no node, ele tras os numeros de uma maneira decimal 

❯ node streams/buffer.js
{ type: 'Buffer', data: [ 111, 107 ] }



PORTANTO, O BUFFER EH ESSA REPRESENTAÇAO DE DADOS NA MEMORIA QUE O NODE UTILIZA. ENTAO, POPULAMOSO BUFFER COMSTRINGS E A PARTIR DESSE BUFFER PODEMOS TRABALHAR COM ESSES DADOS DA MANEIRA QUE A GENTE PREFERIR. ELE EH UMA MANEIRA MAIS OTIMIZADA DE LERMOS E ESCREVERMOS DA MEMORIA PRNCIPLAMENTE UTILIZADAS PELAS STREAMS DO NODE.



Agora vamos separar um pouco mais o codigo. 



MIDDLEWARE EH UM CONCEITO QUE MUITOSE OUVE FALAR. Ele eh nada mais que um interceptador. UMinterceptador no node eh uma funcao que vai iterxeptar a nossa requisicao por um outro arquivo e sao faceis de serem reconhecidos pois sempre vao receber como parametros o req e o res. 

e o req e o res vao ser tratados la dentro, podem ser transformados (nesse caso adicionamos uma propriedade nova no req (req.body). E podemos aproveitar o middelwae tb para aproveitarmos a linha de codigo de transformar todas as respostasque vamos devolver no nosso backend em JSON.



OU seja, criamos umunico arquivo que lida com oJSON de entrada, convertendo o corpo da nossa requisiçao em JSON na entrada tanto quanto ja devolvem os dados em JSON para o frontend.



Vamos persistir os dados em um db com arquivos fisicos!

Vamos criarum arquivo datbase.js e ao inves de salvar os usuários como array vamos salvar como um objeto com um array de todos os usuarios.que podemos aproximar um pouco mais como um banco sw dados pode salvar. 

Mesmo assim nao estamos salvando os dados poq nao estamos ainda em umarquivo ficico. 

em database.js estamos criando os metodos insert e select justamente para eles serem a porta de entrada para a nossa classe e nao queremos que arquivos externos possam acessar a propriedade de database senao apenas os metodos de insert e select.



O jsnode tem um sistema interno de propriedades e  metdos privados.

Para isso, basta colocarmos um # na frente de database; E entao, arquivos externos nao terao como acessar essa propriedade database! Ela estará disponivel apenas ao escopo da classe Databases.



O codigo funciona normalmente, mas a propriedade database nao pode ser maisacessada de maneira externa . COmo deve ser. :)



Persistir banco de dados nos arquvos fisicos

vamos trabalha com o modulo interno de filesystems fs

Temos entao o fs(assincronismo mais antigo co callbacks, que nos faz saber quando uma fun~cao termnou de ser executada) e o fs/promises (assincronismo mais atual async/await )

PARTICULARMENTE DEVEMOS UTILIZAR PRIMSES SEMPRE QUE POSSIVEL. A UNICA DIFERENÇCA EH QUE NOS FS-PRIMSES NAO TEMOS OS METODOS DE STREAM!

Entao se formos lidar com stream em arquivos, ler ou escrever arquivos por partes, nao podemos utilizar o fs-primises. 



Quando executamos o post, criou-se agora um aquivo db.json e foi criado na raiz do nosso projeto. 

Por padrao, o node interpreta o caminho dentro do arquivo dependendo do  diretorio onde estamos executando o terminal. 

se tivessemos dentro da pasta src e executassemos o node server.js, ele iria criar dentro da pasta src.

Ha varias formas de lidarmos com caminhos dentro do node. Antigamente, 5existiam as funcoes __dirname que retorna o local do arquivo onde esta sendo executado.

Porem conforme estamos executando o node com type modules nao mais como commom.js, __dirname e __filename nao existem mais. 

Vamos usar uma variavel global dentro do node que chama import.meta.url, e entao ele retorna exatamente o arquivo para o nosso aqruivo database.js deste o root do pc.

E etnao podemos utilizar uma classe interna do node chamada URL e oara essa classe podemos enviar dois parametros: o nome do arquvo que queremos e no final o caminho relativo onde queremos criar o arquivo. 

Se colocarmos '../db.json ele volta um diretorio!

Agora mesmo que executemos o node de qualquer pasta, ele nao vai ser refem de ode exetemos, ams sempre estará definido pelo databasePath!

E esta relativaaoarquivo e nao ao terminal! Boa!



Para ler desse arquivo, vamos executar um petodo constructor que deve ser instancido assim que esse banco de dadps for instanciado ;





Antes de continuarmos, conforme criamos usuarios, uma lternativas ẽ nao colcoarmos id 1. Existem varias formas de gerar um id. vamos geralr um aleatorio, porem unico agora. Randomuuid do proprio node!



3 FORMAS DE ENVIAR INFOS PARA API
* Query /users?userId=1&name=Rogerio
Usamos query param quando precisamos manter uma URL stateful
Quando vamos fazer um filtro, busca, paginaçao, nao obrigatorios para a requisiçao e vamos enviar para alguem. Enviar infos que nao sao sensiveis que serverm para modificar resposta do backend.


Route -> Parametros nao nomeados que fiacam nas rotas.
/users/1
O 1 é chamado de route params. Geralemnte se usa para identificaçao de recursos. POr exemplo, buscar usuarios com ID 1.
GET http://localhost:3333/users/1
Nao eh necessario ter um nome pois o method http jádiz o que o 1 significa.
Caso queiramos deletar o usuario com Id 1
DELETE http://localhost:3333/users/1
Tb naopode ser utilizado como informaçoes sensiveis!!!


Req Body
Utilizado para envio de infos de um formulario e quantas infos quisermos. Muitomais dificeis de serem decriptografados com https.
O corpo da req eh enviado a parte junto com o body.

Vamoscriar rotas de ediçcao e remocao dos usuario. 


REGEX eh um fromato de expressao regular que fazemos para encontrar textos dentro de textos.

O metodo matchAll() do js retorna quais buscas foram bem sucedidas a partir de um Regex. E reotna uma classe iterator do js.

Para isso, o methodo Array.from converte a estrutura  tetornada domachAll para um array pois o JSON.stringify nao funciona muito bem.







