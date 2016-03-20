var EnKai = EnKai || {}

EnKai.auth = {
		clientKey: "",
		
		registerKey: function () {
			var $ = jQuery.noConflict();
			
			$.ajaxSetup( { async: false } );
			
			$.ajax( {
		        cache		: false,
		        crossDomain	: true,
		        headers		: {},
		        dataType	: "json",
		        url			: "/com.enkai.ms.auth/rest/enkai-resource/registerClient/",
		        type		: "GET",
		        data		: {},
		        success: function( jsonObj, textStatus, xhr ) {
		        	sessionStorage.clientKey = jsonObj.clientKey;
		        	window.location = "index.html";
		        },
		        error: function( xhr, textStatus, errorThrown ) {
					console.log( "HTTP Status: " + xhr.status );
					console.log( "Error textStatus: " + textStatus );
					console.log( "Error thrown: " + errorThrown );
		        }
		    } );
		},
		
		login: function (username, password) {
			var $ = jQuery.noConflict();
			
			$.ajaxSetup( { async: false } );
			
			$.ajax( {
		        cache		: false,
		        crossDomain	: true,
		        headers		: { 
		        	"client_key": sessionStorage.clientKey 
		        },
		        dataType	: "json",
		        url			: "/com.enkai.ms.auth/rest/enkai-resource/login/",
		        type		: "POST",
		        data		: {
		            "username": $("#inputEmail").val(),
		            "password": $("#inputPassword").val()
		        },
		        success: function( jsonObj, textStatus, xhr ) {
		        	sessionStorage.auth_token = jsonObj.auth_token;
					window.location = "main.html";
		        },
		        error: function( xhr, textStatus, errorThrown ) {
		        	
		        	$("#alertMessage").addClass("alert-danger").show().html("Invalid username or password");

//		        	console.log( "HTTP Status: " + xhr.status );
//					console.log( "Error textStatus: " + textStatus );
//					console.log( "Error thrown: " + errorThrown );
		        }
		    } );
		},
		
		test: function () {
			var $ = jQuery.noConflict();
			
			$.ajaxSetup( { async: false } );
			
			$.ajax( {
		        cache			: false,
		        crossDomain	: true,
		        headers		: {
		        	"client_key"	: sessionStorage.clientKey,
		        	"auth_token"	: sessionStorage.auth_token
		        },
		        dataType		: "json",
		       url			: "//localhost:8080/com.enkai.ms.auth/rest/enkai-resource/test-get-method/",
		       type			: "GET",
		       success		: function( jsonObj, textStatus, xhr ) {
						var htmlContent = $( "#logMsgDiv" ).html( ) + "<p>Test Get Methode nach Login. JSON Message: " + jsonObj.message + "</p>";
		          alert( htmlContent );
		       },
		       error: function( xhr, textStatus, errorThrown ) {
		       	console.log( "HTTP Status: " + xhr.status );
		          console.log( "Error textStatus: " + textStatus );
		          console.log( "Error thrown: " + errorThrown );
					}
			});
		}
}

$( document ).ready(function() {
	
	if (!sessionStorage.clientKey)
		EnKai.auth.registerKey();
	
	var suffix = "index.html";
	if (window.location.pathname.substr(-suffix.length) === suffix)
		return;
	
	if (!sessionStorage.clientKey || !sessionStorage.auth_token)
		EnKai.auth.registerKey();
	
});