
jQuery(function($) {
	"use strict";
	
	$('#guestUserFrm').submit(function(e){
		var first_name = $("#first_name").val();
		var last_name = $("#last_name").val();
		var customer_type = $("#customer_type").val();
		var industry = $("#industry").val();
		var business_location = $("#business_location").val();
		var email = $("#email").val();
		
		if(first_name==""){
			$("#alert_msg").html(error('Please enter first name')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(last_name==""){
			$("#alert_msg").html(error('Please enter last name')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(customer_type==""){
			$("#alert_msg").html(error('Please select customer type')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(industry==""){
			$("#alert_msg").html(error('Please select industry of the business')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(business_location==""){
			$("#alert_msg").html(error('Please select business location')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(email==""){
			$("#alert_msg").html(error('Please enter email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(!validateEmail(email)){
			$("#alert_msg").html(error('Please enter valid email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else{
		
			$.ajax({ 
				url: 'login-guest-user',
				type: 'POST',
				data: $("#guestUserFrm").serialize(),
				dataType: "json",
				success: function (data)
				{
					if (data.status=="success") {
						$("#alert_msg").html(success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						var url =  "dashboard";
						$(location).attr('href', url);
					}else{
						$("#alert_msg").html(error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
				}
			});
		}
	 e.preventDefault();
	});
		
	
	$('#signUpFrm').submit(function(e){
		var first_name = $("#first_name").val();
		var last_name = $("#last_name").val();
		var customer_type = $("#customer_type").val();
		var industry = $("#industry").val();
		var business_location = $("#business_location").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var confirm_password = $("#confirm_password").val();
		if(first_name==""){
			$("#alert_msg").html(error('Please enter first name')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(last_name==""){
			$("#alert_msg").html(error('Please enter last name')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(customer_type==""){
			$("#alert_msg").html(error('Please select customer type')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(industry==""){
			$("#alert_msg").html(error('Please select industry of the business')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(business_location==""){
			$("#alert_msg").html(error('Please select business location')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(email==""){
			$("#alert_msg").html(error('Please enter email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(!validateEmail(email)){
			$("#alert_msg").html(error('Please enter valid email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(password==""){
			$("#alert_msg").html(error('Please enter password')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(confirm_password!=password){
			$("#alert_msg").html(error('Confirm password not match')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else{
		
			$.ajax({ 
				url: 'submit-sign-up',
				type: 'POST',
				data: $("#signUpFrm").serialize(),
				dataType: "json",
				success: function (data)
				{
					if (data.status=="success") {
						$('#signUpFrm')[0].reset();
						$(".sign_card").html('<div class="sign_success"><div class="form-group"><label>UserId</label><p>'+data.user_name+'</p></div> <p class="alert alert-success">'+data.msg+'</p></div>');
					}else{
						$("#alert_msg").html(error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
				}
			});
		}
	 e.preventDefault();
	});
		
	
	$('#loginFrm').submit(function(e){
		var user_name = $("#user_name").val();
		var password = $("#password").val();
		if(user_name==""){
			$("#alert_msg").html(error('Please enter username')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(password==""){
			$("#alert_msg").html(error('Please enter password')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else{
			$.ajax({ 
				url: 'submit-login',
				type: 'POST',
				data: $("#loginFrm").serialize(),
				dataType: "json",
				success: function (data)
				{
					if (data.status=="success") {
						$("#alert_msg").html(success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						var url =  "dashboard";
						$(location).attr('href', url);
					}else{
						$("#alert_msg").html(error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
				}
			});
		}
	 e.preventDefault();
	});
	
	$('#ticketFrm').submit(function(e){
		var priority = $("#priority").val();
		var datetime = $("#datetime").val();
		var location = $("#location").val();
		var desc_offence = $("#desc_offence").val();
		if(priority==""){
			$("#alert_msg").html(error('Please select priority')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(datetime==""){
			$("#alert_msg").html(error('Please enter date & time')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(location==""){
			$("#alert_msg").html(error('Please enter location')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(desc_offence==""){
			$("#alert_msg").html(error('Please enter description of offence')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else{
			$.ajax({ 
				url: 'submit-ticket',
				type: 'POST',
				data: $("#ticketFrm").serialize(),
				dataType: "json",
				success: function (data)
				{
					if (data.status=="success") {
						$("#alert_msg").html(success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#ticketFrm')[0].reset();
						$("#image_name_array").val('');
						$("#files-2").html('');
					}else{
						$("#alert_msg").html(error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
				}
			});
		}
	 e.preventDefault();
	});	
	
	$('#forgotUsernameFrm').submit(function(e){
		var email = $("#email").val();
		if(email==""){
			$("#alert_msg").html(error('Please enter email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(!validateEmail(email)){
			$("#alert_msg").html(error('Please enter valid email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else{
			$.ajax({ 
				url: 'get-username',
				type: 'POST',
				data: $("#forgotUsernameFrm").serialize(),
				dataType: "json",
				success: function (data)
				{
					if (data.status=="success") {
						$(".ajx_res").html('<label>Username: '+data.user_name+'</label>');
						$('#forgotUsernameFrm')[0].reset();
					}else{
						$("#alert_msg").html(error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$(".ajx_res").html('');
					}
				}
			});
		}
	 e.preventDefault();
	});	
	
	$('#forgotPasswordFrm').submit(function(e){
		var user_name = $("#user_name").val();
		var email = $("#email").val();
		if(user_name==""){
			$("#alert_msg").html(error('Please enter username')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(email==""){
			$("#alert_msg").html(error('Please enter email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else if(!validateEmail(email)){
			$("#alert_msg").html(error('Please enter valid email address')).fadeIn('slow').delay(2500).fadeOut('slow');
		}else{
			$.ajax({ 
				url: 'get-password',
				type: 'POST',
				data: $("#forgotPasswordFrm").serialize(),
				dataType: "json",
				success: function (data)
				{
					if (data.status=="success") {
						$(".ajx_res").html('<label>Password: '+data.password+'</label>');
						$('#forgotPasswordFrm')[0].reset();
					}else{
						$("#alert_msg").html(error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$(".ajx_res").html('');
					}
				}
			});
		}
	 e.preventDefault();
	});
		
		
});	

function error(msg) {
				return "<p class='alert alert-danger'><strong>Error </strong>"+msg+"</p>";
			}
function success(msg) {
				return "<p class='alert alert-success'>"+msg+"</p>";
			}
function info(msg) {
				return "<p class='alert alert-info'>"+msg+"</p>";
			}
			
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email)
}


var _validFileExtensions1 = [".jpeg", ".jpg", ".png", ".mp4", ".mp3"]; 
   function ValidateSingleInput1(oInput) {	 
   if (oInput.type == "file") {     
   var sFileName1 = oInput.value;    
   if (sFileName1.length > 0) {     
   var blnValid1 = false;          
   for (var j = 0; j < _validFileExtensions1.length; j++) 
   {  
   var sCurExtension1 = _validFileExtensions1[j];    
   if (sFileName1.substr(sFileName1.length - sCurExtension1.length, sCurExtension1.length).toLowerCase() == sCurExtension1.toLowerCase())
	   {                  
			blnValid1 = true; 
		 
			var file_data = $('#file').prop('files')[0]; 
			$("#file").attr('disabled', true);
			var form_data = new FormData();                  
			form_data.append('file', file_data);
			var numItems = $('.upload').length;
			console.log(numItems);
			if(numItems<3){
			var new_element_id = numItems;
			$("#load").show();
			$("#files-2").append('<li id="image_name'+new_element_id+'" class="upload"><img src="assets/images/loader.gif" alt="Uploading..."></li>'); 
			var	element=new_element_id;
		$.ajax({
					url:'upload-file', 
					contentType: false,
					processData: false,
					data: form_data,                         
					type: 'post',
					dataType: "json",
					success: function(data)
					{	
						$('#file').val('');
						$("#file").attr('disabled', false);
						$("#load").hide();
						
												
						var a=$("#image_name_array").val();
						var numItems = a.split(",").length;
						var new_element_id = numItems+1;
						if(a!=",")
						{
							$("#image_name_array").val(data.file_name+','+a);
						}
						
						$("#image_name"+element).html('<a style="cursor: pointer;" onClick="removedata(this.id);" id="'+element+','+data.file_name+'" class="btn123 btn-mini" title="Remove">x</a>'+data.file_name);
						
					}
		 });
			break; 
			}	
	   }          
   }        
   if (!blnValid1)
	   {         
   alert("Sorry, " + sFileName1 + " is invalid, allowed extensions are: " + _validFileExtensions1.join(", "));        
   oInput.value = "";             
   return false;          
   }     
   }  
   }	
   return true;
   }
   
function removedata(id)
{
	var dataId=id.split(",");
	
	$("#image_name"+id).css('display','none');
	var myArray = $("#image_name_array").val().split(",");
	
	var newUrl= Array();
	for(var i=0;i<myArray.length;i++)
	{
		
		if(myArray[i]!=dataId[1])
		{
			newUrl[i] = myArray[i];
		}
	}
	$("#image_name_array").val(newUrl);
}


function startDictation() {

	if (window.hasOwnProperty('webkitSpeechRecognition')) {

	  var recognition = new webkitSpeechRecognition();

	  recognition.continuous = false;
	  recognition.interimResults = false;

	  recognition.lang = "en-US";
	  recognition.start();

	  recognition.onresult = function(e) {
		document.getElementById('desc_offence').value
								 = e.results[0][0].transcript;
		recognition.stop();
		
	  };

	  recognition.onerror = function(e) {
		recognition.stop();
	  }

	}
}





 