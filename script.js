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
		var img_data = render();

		FB.api(
		    "/me/photos",
		    "POST",
		    {
		        "source": img_data
		    },
		    function (response) {
		      if (response && !response.error) {
		        /* handle the result */
		      }
		    }
		);
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
		//var appid = '145634995501895';
		var data = canvas.toDataURL('image/png');
		try{
    	blob = dataURItoBlob(data);
		}catch(e){console.log(e);}

		var fd = new FormData();
		fd.append("access_token",authToken);
		fd.append("source", blob);
		fd.append("message","Photo Text");

		try {
		    $.ajax({
		        url: "https://graph.facebook.com/me/photos?access_token=" + authToken,
		        type: "POST",
		        data: fd,
		        processData: false,
		        contentType: false,
		        cache: false,
		        success: function (data) {
		            console.log("success " + data);
		            $("#poster").html("Posted Canvas Successfully");
		        },
		        error: function (shr, status, data) {
		            console.log("error " + data + " Status " + shr.status);
		        },
		        complete: function () {
		            console.log("Posted to facebook");
		        }
		    });

		} catch (e) {
		    console.log(e);
		}
			
		//var open_url ='https://www.facebook.com/dialog/share?app_id='+appid+'&display=popup&href='+dataURLToBlob(url)+'&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer';
		//window.open(open_url);
		//console.log(open_url);
	}

	function dataURItoBlob(dataURI) {
	var byteString = atob(dataURI.split(',')[1]);
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
	    ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ab], { type: 'image/png' });
	}

});