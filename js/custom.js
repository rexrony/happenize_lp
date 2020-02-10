// Timer Count Down
function makeTimer() {

			var endTime = new Date("12 April 2020 7:30:00 UTC+04:00");	
	//	var endTime = new Date("01 March 2020 9:56:00 GMT+01:00");			
			endTime = (Date.parse(endTime) / 1000);

			var now = new Date();
			now = (Date.parse(now) / 1000);

			var timeLeft = endTime - now;

			var days = Math.floor(timeLeft / 86400); 
			var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
			var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
			var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
  
			if (hours < "10") { hours = "0" + hours; }
			if (minutes < "10") { minutes = "0" + minutes; }
			if (seconds < "10") { seconds = "0" + seconds; }

			$("#days").html("<div class='timewrap'>"+days + "</div><span>Days</span>");
			$("#hours").html("<div class='timewrap'>"+hours +  "</div><span>Hours</span>");
			$("#minutes").html("<div class='timewrap'>"+minutes +  "</div><span>Minutes</span>");
			$("#seconds").html("<div class='timewrap'>"+seconds +  "</div><span>Seconds</span>");		

	}

	setInterval(function() { makeTimer(); }, 1000);


	/******Auto Type Script******/
	
	var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
/*****Phone Select******/
    var input = document.querySelector("#user_phone");
    window.intlTelInput(input, {
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: document.body,
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      // geoIpLookup: function(callback) {
      //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // },
      // hiddenInput: "full_number",
       //initialCountry: "auto",
      // localizedCountries: { 'de': 'Deutschland' },
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
      // separateDialCode: true,
      utilsScript: "./js/utils.js",
    });


/****count****/
var a = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-wrap--count .counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 4000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});
/*--------------------------------Back to top----------------------------------*/
$(document).ready(function(){$("#back-top").hide();$(function(){$(window).scroll(function(){if($(this).scrollTop()>100){$("#back-top").fadeIn()}else{$("#back-top").fadeOut()}});$("#back-top a").click(function(){$("body,html").animate({scrollTop:0},800);return false})})});

/****onclick scroll*****/
$('a[href*=\\#]:not([href=\\#])').on('click', function() {
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
  if (target.length) {
      $('html,body').animate({
          scrollTop: target.offset().top
      }, 1000);
      return false;
  }
});
    // AOS
    AOS.init({
      easing: 'ease-in-out',
      delay: 300,
      duration: 800,
      offset: 200,
      disable: 'mobile'
    });

 /***Form Validation****/
$("#contact-attorney .btn").click(function(e){
      e.preventDefault();
  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
     var name = $("#fullname").val();
     var emailaddress = $("#user_email").val();
   var phone = $("#user_phone").val();
   
      if(name == "" || name.length < 3){  $("#name-error").html('Please Enter Name'); }
      else{ $("#name-error").html(''); }
     //email
 
if (emailaddress == "") { $("#email-error").html('Please Enter Email');
console.log('Please Enter Email'); 
return false;
                                  
} 
else if(!emailReg.test(emailaddress)) {
$("#email-error").html('Please enter valid email ID');
return false;
}
else {
$("#email-error").html('');
}
/**Phone***/
if(phone == ""){ 

 $("#phone-error").html('Please Enter Phone Number');

}
else if(phone.length < 9){
$("#phone-error").html('Please Enter Proper Number');

} else{ $("#phone-error").html(''); 


  $.ajax({
    type: "POST",
     url: 'http://happenizedev.com/sulayemlegal/thankyou.php',
    data: 'jx=1&name=' + name + '&email=' + emailaddress + '&phone=' +phone,
    success: function (data) {
    
      window.location.href = "http://happenizedev.com/sulayemlegal/thankyou.html";
    console.log(data);
    
    }
  }); 
  
}
      
      
      
  });
$(document).ready(function() {
   // $('.speakerdetail').hide();
    $('.speakerdetail').click(function() {
         var pID = $(this).data("id");       
        $('.keynote-popup-content').html('');       
        $( "#"+pID ).clone().appendTo( ".keynote-popup-content" );
        $('.keynote-popup-content .txt-overlay-fulltext').show();
        //console.log('check '+ pID);
    });
    
    $('.featherlight-close').click(function() {
        $('.keynote-popup-content .txt-overlay-fulltext').hide();
    });
});
    
/***Responsive Menu***/
$('#toggle').click(function() {
   $(this).toggleClass('active');
   //$(this).addClass('active');
   $('#overlay').toggleClass('open');
    //$('#overlay').addClass('open');
  });

$('.overlay-menu ul li a').click(function() {
   $(".button_container").toggleClass('active');
   //$(this).addClass('active');
   $('#overlay').toggleClass('open');
    //$('#overlay').addClass('open');
  });























