var fontSize = [];
var fontEndLine = [];
var defaultFontSize = 80;
var addable = true;
var message = "";
$(document).ready(function(){
	waitForWebfonts(['Gotham'], function() {main()});

	function main()
	{
		$('#message_area').on('input',function()
		{
			message = $(this).val();
		});
		$('.top-text, .main-text').on('input', function(){
			  generate();
		});
		$('.bottom-area').on('input', '.bottom-text', function(){
			generate();
		});
		$('.bottom-area').on('change', '.font-size', function(){
			var idx = $(this).index('.font-size');
			var newFontSize = $(this).find(':selected').val();
			fontSize[idx] = newFontSize;
			generate();
			addableCheck();
		});
		$('.bottom-area').on('click', '.remove-bottom', function(){
      //console.log($(this).parent().index());
	      var idx = $(this).parent().index();
	      fontSize.splice(idx,1);
	      fontEndLine.splice(idx,1);
	      $(this).parent().remove();
	      reindex();
	      generate();
	      addable = true;
	    });
		
		var bottom_template = $('.bottom-text-template');
		console.log(bottom_template);

		fontSize.push(defaultFontSize); // the first default one
	    $('#new').click(function(){
	      if(addable) {
	        newBottom();
	        fontSize.push(defaultFontSize);
	        generate();
	        addableCheck();
	      }
	      else {
	        alert('塞不下囉～');
	      }
	    });

	    function addableCheck() {
	      var len = fontEndLine.length;
	      
	      if(fontEndLine[len-1]+main_y >= 920) {
	        addable = false;
	      }
	    }


		function reindex()
		{
			$('.bottom-area label').each(function(index){
				$(this).text('下標'+parseInt(index+1));
			});
		}
		function newBottom()
		{
		  var newBtnTemplate = bottom_template.clone();
		  var idx = $('.bottom-area .bottom-text').length+1;
		  newBtnTemplate.find('label').text('下標'+idx);
		  $('.bottom-area').append(newBtnTemplate);
		}
		
		$('#gen-btn').click(function()
		{
			
			var data = canvas.toDataURL('image/png');
			window.open(data,'_blank');
		});

		$('#share-btn').click(function()
		{
			var img_data = render();
		});


		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var pattern = new Image();
		var rim = new Image();
		rim.src = 'rim.png';
		pattern.src = "test.png";
		pattern.onload = generate;

		

		var main_y = 450;
		var font_family = 'Gotham,LiHei Pro,Microsoft YaHei';
		function generate()
		{
			console.log('generate');
			ctx.clearRect(0,0,1000,1000);
			//ctx.drawImage(rim,500-rim.width/2,200);
			var tempColor = ctx.createPattern(pattern,"repeat");
			ctx.fillStyle = tempColor;
			ctx.font = "300px "+font_family;
			ctx.textAlign="center";
			var main_text = $('.main-text').val();
			ctx.fillText(main_text,500,main_y);
			

			for(var i=0;i<images.length;i++)
			{
				console.log('draw image');
				ctx.drawImage(images[i],0,0);
			}

			ctx.fillStyle = '#000';
			ctx.font = "120px "+font_family;
			var top_text = $('.top-text').val();
			

			if(top_text !== '')
			{
			  ctx.fillText(top_text,500,main_y-300);  
			}
			
			
			
		  	$('.bottom-area .bottom-text').each(function(index){
				//console.log($(this).val());
				//ctx.textBaseline = 'middle';
				ctx.font = fontSize[index]+"px "+font_family;
				var bottom_text = $(this).val();
				var offset;

				offset = parseInt(fontEndLine[index-1])+parseInt(fontSize[index])+40 || parseInt(fontSize[index])+40;
				console.log('index: '+index+', offset: '+offset);
				fontEndLine[index] = offset;
				
				if(bottom_text !== '')
				{
				  ctx.fillText(bottom_text,500,main_y+offset);  
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
			fd.append("message",message);
			fd.append("link","https://jerrypupu111.github.io");

			
			/*
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
			*/

			try {
			    $.ajax({
			        url: "https://graph.facebook.com/1217380698278728/photos?access_token=" + authToken,
			        type: "POST",
			        data: fd,
			        processData: false,
			        contentType: false,
			        cache: false,
			        success: function (data) {
			            console.log("success " + data);
			            console.log(data);
			            console.log(data.id);
			            window.open('https://www.facebook.com/'+data.id,'_blank');
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
	}
});