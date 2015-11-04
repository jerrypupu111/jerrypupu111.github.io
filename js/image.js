var images = new Array;
readURL = function(input) {
  if (input.files[0]) {
  	//create reader
      var reader = new FileReader();


       	reader.onload = function (e) {
          console.log('on load');
      	  temp_img =new Image();
          temp_img.src = e.target.result;
          //images.push(temp_img);
          
          canvasEditor.addImageWithDOM(temp_img);
      	}

      	reader.readAsDataURL(input.files[0]);
      
  }
}