var fontSize = [];
var fontEndLine = [];
var defaultFontSize = 80;
var addable = true;
var message = "";

var canvas;
var canvasEditor;
var textarray = new Array;
function CanvasEditor()
{
	myobj = this;
	var font_family = 'Gotham,LiHei Pro,Microsoft YaHei';
	var pattern = new Image();
	var rim = new Image();
	rim.src = 'rim.png';
	pattern.src = "test.png";
	var currentSelected;
	
	
	$(document).unbind('keydown').bind('keydown',function(e){
		/*
    	if(e.keyCode==17)
    	{
    		currentSelected.lockMovementX = true;
    	}
    	else if(e.keyCode==16)
    	{
    		currentSelected.lockMovementY = true;	
    	}
    	*/
    	if(e.keyCode == 8||e.keyCode == 46){
    		if(document.activeElement == $('body').get(0))
	    	 {
	    	 	e.preventDefault();
	    	 }
    	}
    	else if(e.keyCode==38)
	    {
	    	canvas.bringForward(currentSelected);
	    	e.preventDefault();
	    }
	    else if(e.keyCode==40)
	    {
	    	canvas.sendBackwards(currentSelected);
	    	e.preventDefault();
	    }
	});

	$(document).unbind('keyup').bind('keyup',function(e){
		console.log(e.keyCode);
	    if(e.keyCode == 8||e.keyCode == 46) {
	    	if(document.activeElement == $('body').get(0))
	    	 {
	    	 	 canvas.getActiveObject().remove();
	    	 	 
	    	 }
	    	e.preventDefault();

	    }
	   
	    /*
	    else if(e.keyCode==17)
	    {
	    	currentSelected.lockMovementX = false;
	    }
	    else if(e.keyCode==16)
    	{
    		currentSelected.lockMovementY = false;	
    	}*/
	});

	function createCanvas()
	{
		console.log('canvas created');
		canvas = new fabric.Canvas('canvas');
		//var text2 = myobj.addColorText('ONE',250);
		//	text2.top-=60;

		var text2 = myobj.addColorText('ONE',250);
		
		

		canvas.setBackgroundColor('rgba(255, 255, 255, 1)', function()
		{
		});
		//myobj.addImage('rim.png');
		canvas.renderAll();
			canvas.calcOffset();

	}
	
	var ori_w = 800;
	var ori_h = 800;
	myobj.setCanvasHeight = function(h)
	{
		if(h>2048)
			h = 2048;
		ori_h = h;
		canvas.setHeight(ori_h);
		canvas.setWidth(ori_w);
		canvas.calcOffset();
		canvas.renderAll();

	}
	myobj.setCanvasWidth = function(w)
	{
		if(w>2048)
			w = 2048;
		ori_w = w;
		canvas.setHeight(ori_h);
		canvas.setWidth(ori_w);
		canvas.calcOffset();
		canvas.renderAll();
	}
	function sync()
	{
		//$(edit_lock_x).prop('checked',currentSelected.lockMovementX);
	}


	myobj.addColorText = function(string,size,x,y)
	{
		var text = myobj.addText(string,size,x,y);
		addPatternToText(text);
		canvas.renderAll();
		return text;
	}
	//Add Text
	myobj.addText = function(string,size,x,y)
	{
		if (typeof x === 'undefined') { x = ori_w/2; }
		if (typeof y === 'undefined') { y = ori_h/2; }
	
		var text = new fabric.Text(string, { 
			left: x, top: y,
			originX: 'center',
			originY: 'center',
			fontSize:size,
			fontFamily:font_family,
			selectable:true,
			lineHeight:1,
			//lockMovementX: true,
			lockUniScaling: true,
			textAlign:'center',
			minScaleLimit: 0.2,
			maxScaleLimit: 3,
			hasControls: true,
    		hasBorders: true
		});
		
		canvas.add(text);
		
		function syncTextValue()
		{
			var text_str = text.getText();
		 	$(edit_text).val(text_str);
		}
		

		text.on('selected', function() {
			currentSelected = text;
		  	syncTextValue();
		  	sync();
		});

		text.on('scaling', function() {
			console.log(text.fontSize);
		  currentSelected = text;
		});


		textarray.push(text);
		return text;
	}
	this.updateText = function(str)
	{
		currentSelected.setText(str);
		canvas.renderAll();
	}




	this.updatelockMovementX = function(is)
	{
		currentSelected.lockMovementX = is;
	}
	this.centerX = function()
	{
		currentSelected.left = ori_w/2;
		canvas.renderAll();
	}
	this.centerY = function()
	{
		currentSelected.top = ori_h/2;
		canvas.renderAll();
	}
	
	this.bringToFront = function()
	{
		canvas.bringToFront(currentSelected);
		canvas.renderAll();
	}

	this.sendToBack = function()
	{
		canvas.sendToBack(currentSelected);
		canvas.renderAll();
	}

	var bg_pattern;
	var pattern_img;
	fabric.Image.fromURL('test.png', function(img) {

		pattern_img = img;
	    var patternSourceCanvas = new fabric.StaticCanvas();
	    patternSourceCanvas.add(img);

	    bg_pattern = new fabric.Pattern({
	      source: function() {
	        patternSourceCanvas.setDimensions({
	          width: img.getWidth(),
	          height: img.getHeight(),
	          
	        });
	        return patternSourceCanvas.getElement();
	      },
	      repeat: 'repeat'
	    });
	    setTimeout(createCanvas, 100);
	    

	});

	function addPatternToText(text)
	{
		pattern_img.scaleToWidth(text.fontSize*3);
		bg_pattern.offsetX = 450;
		text.fill = bg_pattern;
	}
	this.addImageWithDOM = function(img_dom)
	{
		console.log(img_dom);
		var img = new fabric.Image(img_dom, {
		  originX: 'center',
		  originY: 'center',
			 left: ori_w/2,
			 top: ori_h/2,
	lockUniScaling:true
		});
		canvas.add(img);

		img.on('selected', function() {
			currentSelected = img;
			sync();
		});
		canvas.renderAll();
	}
	this.addImage =function(url,order)
	{
		
		fabric.Image.fromURL(url, function(img) {
		  // scale image down, and flip it, before adding it onto canvas
		  	img.originY = 'center';
		  	img.originX = 'center';
		  	img.left = ori_w/2;
		  	img.top = ori_h/2;
			img.lockUniScaling=true;
		  	//img.scale(0.5);
		  	canvas.add(img);
		  	img.moveTo(0);
		 	img.on('selected', function() {
				currentSelected = img;
				sync();
			});
	
		});
		canvas.renderAll();
		
		
	}
	myobj.currentSelected;
	//pattern.onload = createCanvas();
}


$(document).ready(function(){
	waitForWebfonts(['Gotham'], function() {
		console.log('font done');
		event_main();
		share_btn_event_listener();
		main()
	});

	function main()
	{

		canvasEditor = new CanvasEditor();
		
		var currentSelected;
		
		//var canvas = document.getElementById("canvas");
		//var ctx = canvas.getContext("2d");
		
		//pattern.onload = addText;

		

		var main_y = 450;
		

		/*
		function generate()
		{

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
		*/
		function shareToFB(method)
		{
			var data = getImage();
			console.log(method);
			if(method=='event')
			{
				postImage(data,event_fb_url);
			}
			else if(method=='me')
			{	
				postImage(data,myfeed_fb_url);
			}	
		}
		function getImage()
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
			return fd;
	
		}

		var event_fb_url = "https://graph.facebook.com/1217380698278728/photos?access_token=";
		var myfeed_fb_url = "https://graph.facebook.com/me/photos?access_token=";
		function postImage(fd,url)
		{
			try {
			    $.ajax({
			        url:  url + authToken,
			        type: "POST",
			        data: fd,
			        processData: false,
			        contentType: false,
			        cache: false,
			        success: postImageSuccessCallBack,
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

		}


		function postImageSuccessCallBack(data)
		{
            console.log("success " + data);
            console.log(data);
            console.log(data.id);
            alert('張貼成功!!');

            window.open('https://www.facebook.com/'+data.id,'_blank');
			
            /*
			FB.api('/'+data.id,{fields:'full_picture'},function(response){
				response.full_picture
			});
			*/
			
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

		function uploadImgur()
		{
			/*
			$.ajax({
			    url: 'https://api.imgur.com/3/image',
			    type: 'post',
			    headers: {
			        Authorization: 'Client-ID 33b488fb5d5974a'
			    },
			    data: {
			        image: imgur_data,
			        type: 'base64'
			    },
			    success: function(response) {
			        if(response.success) {

			            var open_url ='https://www.facebook.com/dialog/feed?app_id='+appId+'&display=popup&picture='+response.data.link+'&link=https://www.facebook.com/onetaiwangen/'+'&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer';
			            console.log();
						window.open(open_url);
			        }
			    }
			});
*/
			//var open_url ='https://www.facebook.com/dialog/feed?app_id='+appId+'&display=popup&source='+dataURItoBlob(url)+'&link=https://www.facebook.com/onetaiwangen/'+'&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer';
			//window.open(open_url);
		}
	}
});