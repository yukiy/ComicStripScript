$(function(){
	function drawComic(){

		//---parse the source code
		var source = $('#code_input').val();
		ComicStripScript.draw(source);

		//---save function
		$('#comic').append('<div class="save_btn" type="button">SAVE THIS COMIC STRIP</div>');
		$('.save_btn').click(function(){
			console.log('hi');
			ComicStripScript.canvas.toBlob(function(blob) {
				console.log(blob);
				saveAs(blob, "mystrip.png");
			});
		});
	}

	$('.parse_btn').click(function(){
		drawComic();
	});

	drawComic();

})