var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');
let baseHost = "093c1afe.ngrok.io:8080/";
const https = require('https');
var request = require('request');


// Não funciona mas deveria funcionar devido ao fato de 
// que o pessoal que disponibilizou a API não deixou esse
// serviço disponível por meio da plataforma.
app.post('/priceInsurance', (req, res) => {

	let name = req.body["name"];
	let destine = req.body["destine"];
	// TODO: read the data of the user from the files
	let birth = req.body["birth"];
	let dout = req.body["dout"];
	let din = req.body["din"];
	let tipoViagem = req.body["tipoViagem"];
	let tipoTarifa = req.body["tipoTarifa"];
	let produtoAvulso = req.body["produtoAvulso"];

	// faz um post
	request({
	    url: "https://gateway.gr1d.io/sandbox/travelace/v1/Cotacao",
	    method: "POST",
	    headers: {
	        "content-type": "application/json",
	        "x-api-key": "52d2e55d-0561-4178-b812-079491fa1769"
        },
	    json: 
	    {
		  "destinos": [
		  	destine
		  ],
		  "passageiros": [
		    {
		      "nome": name,
		      "dataNascimento": birth
		    }
		  ],
		  "dataSaida": dout
		  "dataRetorno": din
		  "tipoViagem": tipoViagem,
		  "tipoTarifa": tipoTarifa,
		  "produtoAvulso": true,
		  "cupom": "",
		  "classificacoes": [
		    4
		  ]
		}
	//  body: JSON.stringify(requestData)
	    },
	    function (error, resp, body) {
	    	console.log(body);
	    	console.log(body['Result'][0]['BasicData']);
	    	res.send("OK");
	    });
});

// Não funciona mas deveria funcionar devido ao fato de 
// que o pessoal que disponibilizou a API não deixou esse
// serviço disponível por meio da plataforma.
app.post('/hireInsurance', (req, res) => {

	let name = req.body["name"];
	let code = req.body["code"];
	let sex = req.body["sex"];
	let destine = req.body["destine"];
	// TODO: read the data of the user from the files
	let birth = req.body["birth"];
	let dout = req.body["dout"];
	let din = req.body["din"];
	let tipoViagem = req.body["tipoViagem"];
	let tipoTarifa = req.body["tipoTarifa"];
	let produtoAvulso = req.body["produtoAvulso"];

	// Ideia: automatically read from the CPF API before here
	// but this need was set to a step before even more because
	// this API doesn't works
	// faz um post
	request({
	    url: "https://gateway.gr1d.io/sandbox/travelace/v1/Cotacao",
	    method: "POST",
	    headers: {
	        "content-type": "application/json",
	        "x-api-key": "52d2e55d-0561-4178-b812-079491fa1769"
        },
	    json: 
	    {
		  "dadosBasicos": {
		    "destinos": [
		      destine
		    ],
		    "tipoViagem": 0,
		    "tipoTarifa": 0,
		    "dataSaida": dout,
		    "dataRetorno": din,
		    "valorCompra": 0,
		    "formaPagamento": 0,
		    "cupom": "string",
		    "cnpjAgencia": "string",
		    "cpfEmissor": "string",
		    "numeroControle": "string",
		    "identificacao": "string",
		    "identificacao2": "string",
		    "nomeContatoBrasil": "string",
		    "telefoneContatoBrasil": "string",
		    "celularContatoBrasil": "string",
		    "valorTotalPacote": 0,
		    "CodigoOperacao": 0,
		    "canalDeVenda": 0
		  },
		  "dadosTitular": {
		    "codigo": code,
		    "nome": name.split()[0],
		    "sobrenome": name.split()[name.split().length - 1],
		    "sexo": sex,
		    "documento": ,
		    "tipoDocumento": 0,
		    "telefone": "string",
		    "celular": "string",
		    "email": "string",
		    "dataNascimento": birth,
		    "endereco": "string",
		    "cep": "string",
		    "numero": "string",
		    "cidade": "string",
		    "bairro": "string",
		    "uf": "string",
		    "complemento": "string",
		    "idade": 0,
		    "dataEmissaoDocumento": "2019-07-14T11:55:12.866Z",
		    "origemDocumento": "string",
		    "beneficiarios": "string"
		  },
		  "dadosIntegrantes": [
		    {
		      "codigo": 0,
		      "nome": "string",
		      "sobrenome": "string",
		      "sexo": "string",
		      "tipoDocumento": 0,
		      "documento": "string",
		      "dataNascimento": "2019-07-14T11:55:12.866Z",
		      "idade": 0,
		      "dataEmissaoDocumento": "2019-07-14T11:55:12.866Z",
		      "origemDocumento": "string",
		      "email": "string",
		      "beneficiarios": "string"
		    }
		  ],
		  "dadosProdutos": {
		    "codigoProduto": 0,
		    "valorProduto": 0,
		    "codigoPeriodoMultiViagem": 0,
		    "codigoTarifaAcordo": 0,
		    "cambio": 0
		  },
		  "dadosBeneficios": [
		    {
		      "codigoBeneficio": 0,
		      "valorBeneficio": 0,
		      "dadosPassageiro": [
		        {
		          "codigoPassageiro": 0
		        }
		      ]
		    }
		  ],
		  "dadosBeneficiosCustomizavel": [
		    {
		      "codigoBeneficio": 0,
		      "valorBeneficio": 0,
		      "dadosPassageiro": [
		        {
		          "codigoPassageiro": 0
		        }
		      ]
		    }
		  ],
		  "dadosProdutosAvulsos": [
		    {
		      "codigoProduto": 0,
		      "codigoPeriodoMultiViagem": 0,
		      "codigoTarifaAcordo": 0,
		      "valorProduto": 0,
		      "dadosPassageiroProdutoAvulso": [
		        {
		          "codigoPassageiro": 0
		        }
		      ],
		      "dadosBeneficiosOpcionais": [
		        {
		          "codigoBeneficio": 0,
		          "valorBeneficio": 0,
		          "dadosPassageiro": [
		            {
		              "codigoPassageiro": 0
		            }
		          ]
		        }
		      ],
		      "dadosBeneficiosCustomizavel": [
		        {
		          "codigoBeneficio": 0,
		          "valorBeneficio": 0,
		          "dadosPassageiro": [
		            {
		              "codigoPassageiro": 0
		            }
		          ]
		        }
		      ]
		    }
		  ],
		  "dadosPagamento": {
		    "codigoOperadora": 0,
		    "nomeTitularCartao": "string",
		    "cpfTitular": "string",
		    "numeroCartao": "string",
		    "codigoSeguranca": "string",
		    "mesValidade": "string",
		    "anoValidade": "string",
		    "parcelas": 0
		  }
		}
	//  body: JSON.stringify(requestData)
	    },
	    function (error, resp, body) {
	    	console.log(body);
	    	console.log(body['Result'][0]['BasicData']);
	    	res.send("OK");
	    });
});

// Como não funcionavam as rotas da API de cotação
// e contratação de seguro não foi possível implementar
// nesse momento, contudo, nós estamos utilizando a 
// chamada de produtos como um serviço para atualizar os
// valores de produtos presentes
// como a resposta dessa API é muito grande o que
// faremos aqui é fazer um controle do que precisa
// ser realizado para que o sistema possa utilizar
// esses dados
app.post('/atualizaProdutos', (req, res) => {
	let request = req.body;
	fs.writeFile('products.json', JSON.stringfy(req.body));
});

app.get('/produtos', (req, res) => {
	let raw = fs.readFileSync('products.json');
	let products = JSON.parse(raw);

	// mock de alguns produtos presentes na seguradora
	
});


app.listen(8081);























