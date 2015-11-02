

$(document).ready(function(){
$('.top-text, .bottom-text').on('input', function(){
		  generate();
	});
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var pattern = new Image();
	

	pattern.src = "test.png";
	pattern.onload = generate;
	
	var bottom_template = $('.bottom-text-template');
	console.log(bottom_template);
	$('#new').click(function(){
		newBottom()
	});
	$('#gen-btn').click(function()
	{
		render();
	});

	function newBottom()
	{
	  $('.bottom-area').append(bottom_template.clone());
	}
	function clear()
	{
	  ctx.clearRect(0,0,1000,400);
	}
	function generate()
	{
		clear();
		var tempColor = ctx.createPattern(pattern,"repeat");
		ctx.fillStyle = tempColor;
		ctx.font = "100px Gotham";
		ctx.textAlign="center";
		ctx.fillText("Hello World",300,200);
		
		ctx.fillStyle = '#000';
		ctx.font = "60px Gotham";
		var top_text = $('.top-text').val();
		
		if(top_text !== '')
		{
		  ctx.fillText(top_text,300,100);  
		}
		
		
		
	  $('.bottom-area .bottom-text').each(function(index){
			//console.log($(this).val());
			var bottom_text = $(this).val();
			if(bottom_text !== '')
			{
			  ctx.fillText(bottom_text,300,300+index*80);  
			}
		});
		
		
	}
	function render()
	{
		var appid = '145634995501895';
		var url = canvas.toDataURL('image/jpg');
		window.open('https://www.facebook.com/dialog/share?app_id='+appid+'&display=popup&href='+url+'&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer');
	}
});