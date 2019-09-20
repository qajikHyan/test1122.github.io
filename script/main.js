$(document).ready(function () {
    $('.menuBtn').click(function(){
        $('.ulMenu').addClass('showMenu');
    });
    $('.closeBtn').click(function(){
        $('.ulMenu').removeClass('showMenu')
    });
    $('.ulMenu li a').click(function(){
      $('.ulMenu').removeClass('showMenu')
    })
    $('.iconBtn').click(function(){
        if($(document).width() <= 768){
            $('.modalAlertWrapper').addClass('openAlertWrapper');
            let text = $(this).closest('.section').find('p').text();
            $('.moalAlert p').html(text);
        }
        $('.closeAlertModal').click(function(){
            $('.modalAlertWrapper').removeClass('openAlertWrapper');
        })
    })

    $('.ulMenu li a').click(function(){
        $('.ulMenu li a').removeClass('activeLink');
        $(this).addClass('activeLink');
    })
    let top = $('.menuFix').offset().top;
    $(document).scroll(function(){
      let y = $(this).scrollTop();
      $('.boy').css('transform','translateY('+ y/2 + 'px)');
      if(y > top){
        $('.menuFix').addClass('showFixedMenu');
      }else{
        $('.menuFix').removeClass('showFixedMenu');
      }
    })

    let about = $('#about').offset().top;
    let packages = $('#packages').offset().top;
    $(document).scroll(function(){
      let y = $(this).scrollTop();      
      if(y > about){
        $('.ulMenu li a').removeClass('activeLink');
        $('a[href*="#about"]').addClass('activeLink');
      }
      else if(y <= 100){
        $('.ulMenu li a').removeClass('activeLink');
        $('a[href*="#home"]').addClass('activeLink');
      }
    })
    $(document).scroll(function(){
      let y = $(this).scrollTop();  
      if(y > packages){
        $('.ulMenu li a').removeClass('activeLink');
        $('a[href*="#packages"]').addClass('activeLink');
      }  
    })



    $(function() {
        var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
        slideCount = $('.slide').length;
        
        $('.wrapper').on('mousedown touchstart', slideStart);
        $('.wrapper').on('mouseup touchend', slideEnd);
        $('.wrapper').on('mousemove touchmove', slide);
        
        /**
        / Triggers when slide event started
        */
        function slideStart(event) {
          // If it is mobile device redefine event to first touch point
          if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
          // If sliding not started yet store current touch position to calculate distance in future.
          if (sliding == 0) {
            sliding = 1; // Status 1 = slide started.
            startClientX = event.clientX;
          }
        }
        
        /** Occurs when image is being slid.
        */
        function slide(event) {
          event.preventDefault();
          if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
          // Distance of slide.
          var deltaSlide = event.clientX - startClientX;
          // If sliding started first time and there was a distance.
          if (sliding == 1 && deltaSlide != 0) {
            sliding = 2; // Set status to 'actually moving'
            startPixelOffset = pixelOffset; // Store current offset
          }
          
          //  When user move image
          if (sliding == 2) {
            // Means that user slide 1 pixel for every 1 pixel of mouse movement.
            var touchPixelRatio = 1;
            // Check for user doesn't slide out of boundaries
            if ((currentSlide == 0 && event.clientX > startClientX) ||
               (currentSlide == slideCount - 1 && event.clientX < startClientX))
              // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
              touchPixelRatio = 3;
            // Calculate move distance.
            pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
            // Apply moving and remove animation class
            $('#slides').css('transform', 'translateX(' + pixelOffset + 'px').removeClass();
          }
        }
        
        /** When user release pointer finish slide moving.
        */
        function slideEnd(event) {
          if (sliding == 2){
            // Reset sliding.
            sliding = 0;
            // Calculate which slide need to be in view.
            currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide -1;
            // Make sure that unexisting slides weren't selected.
            currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
            // Since in this example slide is full viewport width offset can be calculated according to it.
            pixelOffset = currentSlide * -$('.wrapper').width();
            // Remove style from DOM (look below)
            $('#temp').remove();
            // Add a translate rule dynamically and asign id to it
            $('<style id="temp">#slides.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
            // Add animate class to slider and reset transform prop of this class.
            $('#slides').addClass('animate').css('transform', '');
          }
        }
        
      });

});