var edit_area;
var edit_text;
var edit_font_size;
var edit_lock_x;
function wait(second)
{
	//setTimeout(unlock,second*1000);
	setTimeout(countSecond, 1000);
}
var cnt = 10;
function countSecond()
{
	cnt--;
	$('.waitBtn').text("要不然就等"+cnt+"秒解鎖");
	if(cnt==0)
	{
		unlock();
	}
	else
	{
		setTimeout(countSecond,1000);	
	}
}
function unlock()
{
	$('.auth').removeClass("auth");

	$('.waitBtn').remove();
}
function removeFB()
{
	$('.not-login').remove();
	$('.start-area').remove();
	$('.fb-login-button').remove();
	$('.auth-login').removeClass('auth-login');
    $('.auth').removeClass("auth");
    $('.waitBtn').remove();
}
function event_main()
{
	create_event();
	edit_area = $('.edit-area');
	edit_text = $(edit_area).find('#text');
	edit_font_size = $(edit_area).find('#fontSize');
	edit_lock_x = $(edit_area).find('#lockX');
	//text 
	$(edit_text).on('input',function()
	{
		console.log('input');
		console.log($(this).val());
		canvasEditor.updateText($(this).val());
		console.log(document.activeElement);
	});
	

	//lock x
	/*
	edit_lock_x.on('change',function()
	{
		var is =$(this).is(":checked");
		console.log(is);
		canvasEditor.updatelockMovementX(is);
	});
*/
	$('#sendToBack').click(function()
	{
		canvasEditor.sendToBack();
	})

	$('#bringToFront').click(function()
	{
		canvasEditor.bringToFront();
	});

	//set center
	$(edit_area).find('#centerX').click(function()
	{
		canvasEditor.centerX();
	});
	$(edit_area).find('#centerY').click(function()
	{
		canvasEditor.centerY();
	});


	$('#message_area').on('input',function()
	{
		message = $(this).val();
	});
	$('.top-text, .main-text').on('input', function(){
		  //generate();
		  console.log(canvasEditor);
		  canvasEditor.addText("test");
	});
	$('.bottom-area').on('input', '.bottom-text', function(){
		//generate();
	});
	$('.bottom-area').on('change', '.font-size', function(){
		var idx = $(this).index('.font-size');
		var newFontSize = $(this).find(':selected').val();
		fontSize[idx] = newFontSize;
		//generate();
		addableCheck();
	});
	$('.bottom-area').on('click', '.remove-bottom', function(){
  //console.log($(this).parent().index());
      var idx = $(this).parent().index();
      fontSize.splice(idx,1);
      fontEndLine.splice(idx,1);
      $(this).parent().remove();
      reindex();
      //generate();
      addable = true;
    });
	
	var bottom_template = $('.bottom-text-template');
	console.log(bottom_template);

	fontSize.push(defaultFontSize); // the first default one
    $('#new').click(function(){
      if(addable) {
        newBottom();
        fontSize.push(defaultFontSize);
        //generate();
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
}
function canvas_main()
{
	$('#canvas-height').on('input',function(){
		canvasEditor.setCanvasHeight($(this).val());
	});

	$('#canvas-width').on('input',function(){
		console.log("?");
		canvasEditor.setCanvasWidth($(this).val());
	});


}

function addPeriod()
{
	var text = canvasEditor.addText('。',80,80);
	//text.left = 80;
	console.log(text);
	canvas.setActiveObject(text);
	canvas.renderAll();
}


function create_event()
{	
	canvas_main();
	$('#add-normal-text').click(function(){
		canvasEditor.addText('新文字',200);
	});

	$('#add-color-text').click(function(){
		canvasEditor.addColorText('ONE',250);
	});	

	$('.image-btn').click(function()
	{
		console.log($(this));
		var img = canvasEditor.addImage($(this).attr('src'),0);

		
	});

	$('#load-web-img').click(function()
	{
		canvasEditor.addImage($(this).siblings('input').val());
	});


/*
	$('#file').on('change',function()
	{
		canvasEditor.addImage($(this).val());
	});*/
	
}
function share_btn_event_listener()
{
		$('#gen-btn').click(function()
		{
			_trackEvent("click","gen image");
			canvas.deactivateAll().renderAll();
			var data = canvas.toDataURL('image/png');
			window.open(data,'_blank');
			var imgur_data = data.replace(/.*,/, '');

		});

		$('#share-feed-btn').click(function()
		{
			_trackEvent("click","share feed");
			console.log('share to feed');
			shareToFB('me');
		});

		$('#share-event-btn').click(function()
		{
			_trackEvent("click","share event");
			console.log('share to event');
			shareToFB('event');
		});
}