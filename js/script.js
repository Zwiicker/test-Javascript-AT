$(document).ready(function(){
 
	var cartas = [{img: "imagem/android.png",	 id: 1},
				  {img: "imagem/chrome.png",  	 id: 2},
				  {img: "imagem/facebook.png",	 id: 3},
				  {img: "imagem/firefox.png", 	 id: 4}, 
				  {img: "imagem/googleplus.png", id: 5},
				  {img: "imagem/html5.png",		 id: 6},
				  {img: "imagem/twitter.png",	 id: 7},
				  {img: "imagem/windows.png",	 id: 8},
				];
	
	var jogar = {


		iniciar: function(cartas){

			this.$jogoMemoria = $(".jogoMemoria");
			this.$newGame = $("button.newGame");
			this.cartasArray = $.merge(cartas, cartas);
			this.shuffle(this.cartasArray);
			this.config();

		},
	

		
		cartaClicada: function(){
			
			var _ = jogar;
			var $carta = $(this);


		if(!_.pausar && !$carta.find(".dentro").hasClass("igual") && !$carta.find(".dentro").hasClass("cartaEscolhida")){

				$carta.find(".dentro").addClass("cartaEscolhida");
				if(!_.achar){
					
					_.achar = $(this).attr("data-id");
				} else if(_.achar == $(this).attr("data-id") && !$(this).hasClass("cartaEscolhida")){
					_.achar = null;
					$(".cartaEscolhida").addClass("igual");
				} else {

					_.pausar = true;
					_.achar = null;
					
					setTimeout(function(){
						$(".cartaEscolhida").removeClass("cartaEscolhida");
						jogar.pausar = false;
					}, 1000);
				}
			}
		},
		


		config: function(){

			this.html = this.construtor();
			this.$jogoMemoria.html(this.html);
			this.$guardarCartas = $(".carta");
			this.guardarCartasClicadas();
			this.pausar = false;
     		this.achar = null;

		},



		guardarCartasClicadas: function(){

			this.$guardarCartas.on("click", this.cartaClicada);
			this.$newGame.on("click", $.proxy(this.reset, this));
		},

		reset: function(){

			this.shuffle(this.cartasArray);
			this.config();
			this.$jogoMemoria.show("slow");

		},
		


		embaralharCartas: function(array){
			
			var counter = array.length, temp, index;
	   
	  			while (counter > 0) {
        	
        			index = Math.floor(Math.random() * counter);
        			counter--;
        	
        			temp = array[counter];
        			array[counter] = array[index];
        			array[index] = temp;
	    			}
	    	return array;

		},

		shuffle: function(cartasArray){
			this.$cartas = $(this.embaralharCartas(this.cartasArray));
		},


		


		construtor: function(){

			var ini = '';

			this.$cartas.each(function(k, v){

				ini += '<div class="carta" data-id="'+ v.id +'"><div class="dentro">\ <div class="frente"><img src="'+ v.img +'"\ " /></div>\ <div class="back"><img src="imagem/cross.png"\
				alt="cross" /></div></div>\
				</div>';
			});

			return ini;
		}
	};

	 
	jogar.iniciar(cartas);


})();