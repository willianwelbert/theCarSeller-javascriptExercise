(function($, doc) {
  "use strict";

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  // var $registerButton = $( '[data-js="register"]' ).get();

  function makeCatalogCell(input) {
    var newCell = doc.createElement("td");
    var cellValue = input.value;
    var cellText = doc.createTextNode(cellValue);
    newCell.appendChild(cellText);
    return newCell;
  }

  var id = 0;

  // $registerButton.on( 'click', function ( e ) {
  //   e.preventDefault();
  //   var newLine = doc.createElement( 'tr' );

  //   function makeIdCell() {
  //     ++id;
  //     var idCell = doc.createElement( 'td' );
  //     var idString = String( id );
  //     var idText = doc.createTextNode( idString );
  //     return idCell.appendChild( idText );
  //   }

  //   newLine.append(
  //     makeIdCell(),
  //     makeCatalogCell( $imageURLinput ),
  //     makeCatalogCell( $carModelinput ),
  //     makeCatalogCell( $carYearinput ),
  //     makeCatalogCell( $carPlateinput ),
  //     makeCatalogCell( $carColorinput ),
  //   );
  //   $catalog.append( newLine );

  // } )

  var app = (function appController() {
    return {
      init: function init() {
        console.log("app init");
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on("submit", this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        var $catalog = $(".catalog-body").get();
        $catalog.appendChild(app.createNewCar());
      },

      id: (function getId() {
        id = 0;
        return function idIncrement() {
          ++id;
          return String(id);
        };
      })(),

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement("tr");
        var $tdID = document.createElement("td");
        var $tdImage = document.createElement("td");
        var $tdBrand = document.createElement("td");
        var $tdYear = document.createElement("td");
        var $tdPlate = document.createElement("td");
        var $tdColor = document.createElement("td");

        $tdID.textContent = this.id();
        $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"]').get().value;

        var $image = document.createElement("img");
        $image.src = $('[data-js="image"]').get().value;
        $tdImage.appendChild($image);

        $tr.appendChild($tdID);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        return $fragment.appendChild($tr);
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "company.json", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this)) return;

        var response = JSON.parse(this.responseText);
        var companyDataParagraph = doc.createElement("p");
        var companyDataText = `${response.name} | ${response.phone}`;
        companyDataParagraph.append(companyDataText);
        doc.querySelector(".header").appendChild(companyDataParagraph);
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    };
  })();

  app.init();
})(window.DOM, document);
