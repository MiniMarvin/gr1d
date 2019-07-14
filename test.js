var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');
let baseHost = "127.0.0.0.1:8080/";
const https = require('https');
var request = require('request');

mockdata = {
    "beneficios": [
        {
            "descricao": "Despesas médicas e hospitalares em viagem nacional (DMH) (inclui preexistência e fisioterapia - em âmbito hospitalar) (por evento)",
            "descricaoCompleta": null,
            "idBeneficio": 2701,
            "imagem": null,
            "ordem": 1,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Despesas odontológicas em viagem nacional",
            "descricaoCompleta": "",
            "idBeneficio": 2652,
            "imagem": null,
            "ordem": 2,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Despesas Farmacêuticas",
            "descricaoCompleta": "",
            "idBeneficio": 2604,
            "imagem": null,
            "ordem": 3,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Invalidez permanente total por acidente viagem nacional",
            "descricaoCompleta": "",
            "idBeneficio": 2653,
            "imagem": null,
            "ordem": 7,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Coordenação de reserva de hotel para acompanhante em caso de internação",
            "descricaoCompleta": null,
            "idBeneficio": 248,
            "imagem": null,
            "ordem": 8,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Coordenação de reserva de passagem aérea de ida e volta para um familiar",
            "descricaoCompleta": null,
            "idBeneficio": 97,
            "imagem": null,
            "ordem": 9,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Regresso Antecipado",
            "descricaoCompleta": "",
            "idBeneficio": 2614,
            "imagem": null,
            "ordem": 9,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Assistência financeira",
            "descricaoCompleta": null,
            "idBeneficio": 3,
            "imagem": null,
            "ordem": 12,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Assistência na localização de bagagem",
            "descricaoCompleta": null,
            "idBeneficio": 19,
            "imagem": null,
            "ordem": 12,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Orientação em caso de perda de docs/cart cred",
            "descricaoCompleta": null,
            "idBeneficio": 249,
            "imagem": null,
            "ordem": 13,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Transmissão de mensagem urgente",
            "descricaoCompleta": null,
            "idBeneficio": 192,
            "imagem": null,
            "ordem": 14,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Assistência jurídica",
            "descricaoCompleta": null,
            "idBeneficio": 4,
            "imagem": null,
            "ordem": 18,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Adiantamento em caso de fiança",
            "descricaoCompleta": null,
            "idBeneficio": 2288,
            "imagem": null,
            "ordem": 19,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Bagagem – Gastos Derivados por atraso de bagagem",
            "descricaoCompleta": "",
            "idBeneficio": 2598,
            "imagem": null,
            "ordem": 19,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Bagagem – Danos à Mala",
            "descricaoCompleta": "",
            "idBeneficio": 2596,
            "imagem": null,
            "ordem": 20,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Coordenação de acompanhamento de menor",
            "descricaoCompleta": null,
            "idBeneficio": 2689,
            "imagem": null,
            "ordem": 20,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Morte acidental em viagem",
            "descricaoCompleta": "",
            "idBeneficio": 2612,
            "imagem": null,
            "ordem": 23,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Traslado de corpo",
            "descricaoCompleta": "",
            "idBeneficio": 2618,
            "imagem": null,
            "ordem": 25,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Traslado Médico",
            "descricaoCompleta": "",
            "idBeneficio": 2619,
            "imagem": null,
            "ordem": 26,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Coordenaçao de reserva de hotel por convalescença",
            "descricaoCompleta": null,
            "idBeneficio": 2539,
            "imagem": null,
            "ordem": 100,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Linhas de consultas 24hs",
            "descricaoCompleta": "",
            "idBeneficio": 2654,
            "imagem": null,
            "ordem": 100,
            "tipoBeneficio": 2
        },
        {
            "descricao": "Bagagem - Extravio",
            "descricaoCompleta": null,
            "idBeneficio": 2666,
            "imagem": null,
            "ordem": 100,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Retorno antecipado por problemas na residência",
            "descricaoCompleta": "",
            "idBeneficio": 2655,
            "imagem": null,
            "ordem": 100,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Adiantamento para assistência jurídica",
            "descricaoCompleta": null,
            "idBeneficio": 1,
            "imagem": null,
            "ordem": 12,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Morte acidental ou invalidez permanente total por acidente",
            "descricaoCompleta": null,
            "idBeneficio": 243,
            "imagem": null,
            "ordem": 21,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Cancelamento de viagem",
            "descricaoCompleta": null,
            "idBeneficio": 35,
            "imagem": null,
            "ordem": 24,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Bagagem",
            "descricaoCompleta": "",
            "idBeneficio": 2595,
            "imagem": null,
            "ordem": 21,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Despesas médico-hospitalares em viagem nacional (Por evento)",
            "descricaoCompleta": "",
            "idBeneficio": 2651,
            "imagem": null,
            "ordem": 1,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Acompanhamento de menor",
            "descricaoCompleta": null,
            "idBeneficio": 31,
            "imagem": null,
            "ordem": 12,
            "tipoBeneficio": 1
        },
        {
            "descricao": "Invalidez permanente total ou parcial por acidente em viagem nacional",
            "descricaoCompleta": null,
            "idBeneficio": 2659,
            "imagem": null,
            "ordem": 12,
            "tipoBeneficio": 1
        }
    ],
    "produtos": [
        {
            "avulso": false,
            "beneficios": [
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2701,
                    "valor": "R$ 20.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2652,
                    "valor": "R$ 500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2604,
                    "valor": "R$ 800,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2653,
                    "valor": "R$ 10.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 248,
                    "valor": "SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 97,
                    "valor": "SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2614,
                    "valor": "R$ 1.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 3,
                    "valor": "R$ 500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 19,
                    "valor": "SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 249,
                    "valor": "SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 192,
                    "valor": "SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 4,
                    "valor": "R$ 500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2288,
                    "valor": "R$ 3.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2598,
                    "valor": "R$ 500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2596,
                    "valor": "R$ 800,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2689,
                    "valor": " SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2612,
                    "valor": "R$ 15.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2618,
                    "valor": "R$ 2.500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2619,
                    "valor": "R$ 1.500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2539,
                    "valor": "SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2654,
                    "valor": "SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2666,
                    "valor": "R$ 3.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2655,
                    "valor": "SIM"
                }
            ],
            "beneficiosOpcionais": [
                {
                    "coberturaBeneficio": null,
                    "descricao": "Prática de Esportes",
                    "descricaoCompleta": "Prática de Esportes x",
                    "fkBeneficio": 1253,
                    "idBeneficioOpcional": 2285,
                    "imagem": null
                }
            ],
            "descricao": "NACIONAL ",
            "idBeneficioDestaque": 0,
            "idProduto": 14324
        },
        {
            "avulso": false,
            "beneficios": [
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2651,
                    "valor": "R$ 10.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2652,
                    "valor": "R$ 500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2604,
                    "valor": "R$ 400,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 248,
                    "valor": " SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 97,
                    "valor": " SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 31,
                    "valor": " SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 19,
                    "valor": " SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2659,
                    "valor": "R$ 10.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 249,
                    "valor": " SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 192,
                    "valor": " SIM"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 4,
                    "valor": "R$ 500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2288,
                    "valor": "R$ 3.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2596,
                    "valor": "R$ 800,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2612,
                    "valor": "R$ 15.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2618,
                    "valor": "R$ 2.500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2619,
                    "valor": "R$ 1.500,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2666,
                    "valor": "R$ 3.000,00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2539,
                    "valor": " SIM"
                }
            ],
            "beneficiosOpcionais": [],
            "descricao": "PRODUTO ESPECIAL NACIONAL ",
            "idBeneficioDestaque": 0,
            "idProduto": 25759
        },
        {
            "avulso": false,
            "beneficios": [
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 2595,
                    "valor": "$120.00"
                }
            ],
            "beneficiosOpcionais": [],
            "descricao": "TESTE ",
            "idBeneficioDestaque": 0,
            "idProduto": 4276
        },
        {
            "avulso": true,
            "beneficios": [
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 1,
                    "valor": "$10,000.00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 249,
                    "valor": "Sim"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 192,
                    "valor": "Sim"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 243,
                    "valor": "$1,000.00"
                },
                {
                    "beneficioDestaque": false,
                    "idBeneficio": 35,
                    "valor": "$2,000.00"
                }
            ],
            "beneficiosOpcionais": [],
            "descricao": "CANCELAMENTO TOTAL 2 ",
            "idBeneficioDestaque": 0,
            "idProduto": 3856
        }
    ]
}

// getDataFromCPF("11055828419", (data) => {
//   console.log(data);
// });

async function getDataFromCPF(cpf, callback){
  console.log(cpf)

  // faz um post
  request({
      url: "https://gateway.gr1d.io/sandbox/bigdata/bigboost/v1/peoplev2",
      method: "POST",
      headers: {
          "content-type": "application/json",
          "x-api-key": "52d2e55d-0561-4178-b812-079491fa1769"
        },
      json: {
      "Datasets": "basic_data",
      "q": "doc{" + cpf + "}"
      }
  //  body: JSON.stringify(requestData)
      },
      function (error, resp, body) {
        //console.log(body);
        console.log(body['Result'][0]['BasicData']);
        console.log("here")
        callback(body['Result'][0]['BasicData']);        
        // res.send("OK");
        // return body['Result'][0]['BasicData'];
      });
  // return "dssdsd"
}

async function getDataFromProducts(callback= ()=>{}){
  // realiza um get na API de produtos
  request({
      url: "https://gateway.gr1d.io/sandbox/travelace/v1/beneficios?idioma=por&tipoTarifa=1&nacional=true",
      method: "GET",
      headers: {
        "x-api-key": "b7483bb4-f7f9-4521-a047-223fc550a1cb"
      },
    },
    function (error, resp, body) {
      //console.log(body);
      console.log(body);
      // console.log("here")
      // callback(body['Result'][0]['BasicData']);
      // exports.database["products"] = body;
      callback();
    });
}

// getDataFromProducts();

// used when the web is low traffic
async function recordDataFromProducts(callback) {
  let file = "service.json";
  // let rawdata = fs.readFileSync(file);
  // fs.readFile(filename, "utf8", function(err, data) {
      // if (err) throw err;
      // let rawdata = mockdata;
      // let contextData = JSON.parse(rawdata);
      let contextData = mockdata;

      let v1 = {
        "desc": contextData["beneficios"][1]["descricao"],
        "valor": contextData["produtos"]["beneficios"][1]["valor"]
      };

      let v2 = {
        "desc": contextData["beneficios"][2]["descricao"],
        "valor": contextData["produtos"]["beneficios"][2]["valor"]
      };

      let v3 = {
        "desc": contextData["beneficios"][7]["descricao"],
        "valor": contextData["produtos"]["beneficios"][7]["valor"]
      };

      let arr = [v1, v2, v3];
      callback(arr);
  // });
}





recordDataFromProducts((arr)=> {
  console.log(arr);
})




