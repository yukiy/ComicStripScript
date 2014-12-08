//---to debug make it 1, tree for test is at the bottom;
var test = 0;

var ComicStripScript = {
	tree : {
		title: '',
		cast : [],
		panels : [{cast:"this is dummy"}]
	},

	draw : function(source){
		$('#comic').empty();
		PLT.fn.parseCodesFromString(source);
	},


//---functions for grammar-----

	emoticon : [
		"('-')",	//0
		'(;ﾟﾛﾟ)',	//1
		'(^o^)',	//2
		'(｀ε´)',	//3
		'(･_･)'		//4
	],

	run : function(_tree){

		console.log(_tree);
		var tree = {};
		if(_tree && test==0){
			tree = _tree;
		}else{
			tree = testTree;
		}
		this.panelNum = tree.panels.length - 1;

		this.setupCanvas();
		this.createPanels(tree);

		//---reset tree
		this.tree = {title:'', cast:[], panels:[{cast:"this is dummy"}]};
	},

	addToCasts : function(arr){
		this.tree.cast = arr;
	},

	addToPanels : function(cast){
		this.tree.panels.push({cast:cast});
	},


//---functions for draw------
	canvas : '',
	ctx: '',
	panelNum : 4,
	panelW : 400,
	panelH : 400,
	panelMarginH : 10,
	panelMarginW : 10,
	titleH : 400 / 4,

	createPanels : function(obj){
		this.drawTitle(obj.title);
		//for(var i=0; i<obj.panels.length; i++){
		for(var i=1; i<obj.panels.length; i++){
			this.createPanel(i, obj.panels[i]);
		}
	},

	createPanel : function (i, panelTree){
		var index = i-1; //---ComicStripScript index starts from 1
		this.drawFrame(index);
		var cast = panelTree.cast;

		for(var i = 0; i<cast.length; i++){
			this.drawCharacter(index, cast[i].name, cast[i].emoticon, cast[i].direction);
			console.log(cast[i].caption.length);
			if(cast[i].caption.length > 0){
				this.drawSpeech(index, cast[i].caption);
			}
		}
	},

	drawTitle :  function(title){
		this.ctx.save();
	//---draw a text
		var fontSize = 60;
		this.ctx.font = fontSize+'px' + ' ' + 'Comic Sans MS';
		this.ctx.textBaseline = "middle";
		//this.ctx.textAlign = 'center';
		var textW = this.ctx.measureText(title).width;
		var textX = this.panelW/2 - textW/2;
		var textY = this.panelMarginH + this.titleH/2 ;
		this.ctx.fillText(title, textX, textY);

	//---draw a title frame
		this.ctx.beginPath();
		this.ctx.rect(this.panelMarginW, this.panelMarginH, this.panelW, this.titleH);
		this.ctx.lineWidth = 7;
		this.ctx.strokeStyle = 'black';
		this.ctx.stroke();

		this.ctx.restore();
	},

	drawFrame : function(index){
		this.ctx.save();
		var x = this.panelMarginW;
		var y = (this.panelMarginH + this.titleH + this.panelMarginH) + (index * this.panelH) + (index * this.panelMarginH);
		var w = this.panelW;
		var h = this.panelH;
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.lineWidth = 7;
		this.ctx.strokeStyle = 'black';
		this.ctx.stroke();
		this.ctx.restore();
	},

	drawCharacter :  function(index, name, emoticon, direction){
		//---get path from name
		var path;
		for(var i=0; i<this.tree.cast.length; i++){
			if(this.tree.cast[i].name == name){
				path = this.tree.cast[i].path + '/';
			}
		}

		//---get image from emoticon
		var filename;
		for(var i=0; i<this.emoticon.length; i++){
		console.log(this.emoticon[i]);

			if(this.emoticon[i] == emoticon){
				filename = i + '.png';
			}
		}
		//---draw
		var left = this.panelMarginW;
		var top = (this.panelMarginH + this.titleH + this.panelMarginH) + (index * this.panelH) + (index * this.panelMarginH);

		var img = new Image();
		img.src = './characters/'+path+filename;
		console.log(img.src);
		img.onload = function(){
			var that = ComicStripScript;
			var ctx = that.ctx;
			var oriW = img.naturalWidth;
			var oriH = img.naturalHeight;
			var w = that.panelW / 2;
			var h = oriH * w / oriW;
			var y = top + that.panelH - h - 10;

			ctx.save();
			if(direction == "right"){
				var x = w;
				ctx.scale(-1, 1);
				ctx.drawImage(img, -x, y, -w, h);
			}else{
				var x = left + 10;
				ctx.drawImage(img, x, y, w, h);
			}
			ctx.restore();
		}
	},

	drawSpeech : function(index, caption, direction){
		this.ctx.save();

		var left = this.panelMarginW;
		var top = (this.panelMarginH + this.titleH + this.panelMarginH) + (index * this.panelH) + (index * this.panelMarginH);
		var fontSize = 20;
		var lines = caption.split('\\n');

		//---draw a speech bubble
		var bubbleW = this.panelW / 4 * 3;
		var bubbleH = (fontSize+20) * lines.length;
		var bubbleX = left + this.panelW/2 - bubbleW/2;
		var bubbleY = top + 10;
		var bubbleR = 15;

		//---start draw rounded square
		this.ctx.beginPath();
		this.ctx.moveTo(bubbleX         + bubbleR,   bubbleY); //---left top
		this.ctx.lineTo(bubbleX+bubbleW - bubbleR,   bubbleY); //---to right top
		this.ctx.arc   (bubbleX+bubbleW - bubbleR,   bubbleY + bubbleR,           bubbleR, Math.PI*1.5, 0, false);
		this.ctx.lineTo(bubbleX+bubbleW,             bubbleY + bubbleH - bubbleR);//---to right bottom
		this.ctx.arc   (bubbleX+bubbleW - bubbleR,   bubbleY + bubbleH - bubbleR, bubbleR, 0, Math.PI*0.5, false);
		//---draw arrow
		if(direction == "left"){
			this.ctx.lineTo(bubbleX + bubbleW/3, bubbleY + bubbleH);
			this.ctx.lineTo(bubbleX + bubbleW/2.8, bubbleY + bubbleH + 20);
			this.ctx.lineTo(bubbleX + bubbleW/4, bubbleY + bubbleH);

		}else{
			this.ctx.lineTo(bubbleX+bubbleW - bubbleW/4, bubbleY + bubbleH);
			this.ctx.lineTo(bubbleX+bubbleW - bubbleW/2.8, bubbleY + bubbleH + 20);
			this.ctx.lineTo(bubbleX+bubbleW - bubbleW/3, bubbleY + bubbleH);
		}
		//---draw rest
		this.ctx.lineTo(bubbleX   + bubbleR,   bubbleY + bubbleH);//---to left bottom
		this.ctx.arc   (bubbleX   + bubbleR,   bubbleY + bubbleH - bubbleR, bubbleR, Math.PI*0.5, Math.PI, false);
		this.ctx.lineTo(bubbleX,               bubbleY + bubbleR);//---to left top
		this.ctx.arc   (bubbleX   + bubbleR,   bubbleY + bubbleR,           bubbleR, Math.PI, Math.PI*1.5, false);
		this.ctx.closePath();
		this.ctx.lineWidth = 3;
		this.ctx.strokeStyle = 'black';
		this.ctx.stroke();

		//---draw a caption
		this.ctx.font = fontSize+'px' + ' ' + 'Comic Sans MS';
		this.ctx.textBaseline = "middle";
		this.ctx.textAlign = 'left';

		for(var i=0; i<lines.length; i++){
			var captionW = this.ctx.measureText(lines[i]).width;
			var captionH = lines.length * (fontSize+10);
			var captionX = this.panelW/2 - captionW/2;
			var captionY = bubbleY + bubbleH/2 - captionH/2 + i*(fontSize+10) + 10;
			this.ctx.fillText(lines[i], captionX, captionY);
		}

		this.ctx.restore();
	},

	setupCanvas : function(){
		canvasDiv = document.getElementById('comic');
		if(canvasDiv == null) return;
		this.canvas = document.createElement('canvas');
		this.canvas.height = this.panelMarginH + this.titleH + this.panelMarginH + (this.panelH * this.panelNum) + (this.panelMarginH * this.panelNum);
		this.canvas.width = this.panelW+this.panelMarginW*2;
		canvasDiv.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d');
	}

}


var testTree = {
	title : "I'm Testing",
	cast : [
		{
			name: "M",
			path: "mickey"
		 },
		{
			name: "P",
			path: "pikachu"
		 }
	],
	panels : [
		{
			index : 0,
			cast : "dummy"
		},
		{
			cast : [
				{
					name : "M",
					path : "mickey",
					direction : "left",
					emoticon : "normal",
					caption : "HELLO \nMY NAME IS \nMICKEY."
				}
			]
		},
		{
			cast : [
				{
					name : "M",
					path : "mickey",
					direction : "right",
					emoticon : "surprise",
					caption : "WHAT!?\n ARE YOU MICKEY?"
				}
			]
		},
		{
			cast : [
				{
					name : "M",
					path : "mickey",
					direction : "left",
					emoticon : "angry",
					caption : "YES. \nI AM \nMICKEY MOUSE."
				}
			]
		}
	]
}

