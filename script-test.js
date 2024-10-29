$(window).load(function(){
    $('#select-volume input[name="volume"]').eq(0).prop("checked", true); 
});

//Таймер
function CountdownTimer(elm,tl){
	this.initialize.apply(this,arguments);
}
CountdownTimer.prototype={
	initialize:function(elm,tl) {
		this.elem = document.getElementById(elm);
		this.tl = tl;
	},
	countDown:function(){
		var today=new Date();
		if(this.tl-today==0){
			this.tl=this.tl+86400;
			
		}
		var timer='',
			me=this,

			hour=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000)),
			min=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60,
			sec=Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
			timer += '<span class="number">0</span><span class="number">0</span><span class="number_dv">:</span>';
		timer += '<span class="number">'+Math.floor(hour/10)+'</span><span class="number">'+(hour-Math.floor(hour/10)*10)+'</span><span class="number_dv">:</span>';
		timer += '<span class="number">'+Math.floor(min/10)+'</span><span class="number">'+(min-Math.floor(min/10)*10)+'</span><span class="number_dv">:</span>';
		timer += '<span class="number">'+Math.floor(sec/10)+'</span><span class="number">'+(sec-Math.floor(sec/10)*10)+'</span>';
		this.elem.innerHTML = timer;
		setTimeout(function(){me.countDown()},1000);
	}
}

function CDT(){
	 // Set countdown limit
	 //var tl = new Date('2014/06/16 02:00:00');
	var today=new Date();
	var y = today.getFullYear();
	var m = today.getMonth();
	var d = today.getDate();
	if (today.getHours() < 2) {
		var tl = new Date(y,m,d);
	}
	else{
		var tl = new Date(y,m,(d+1));
	};

	var timer1 = new CountdownTimer('countdown1',tl);
	timer1.countDown();
}

jQuery(document).ready(function($) {
	CDT();
    $(".fancybox").fancybox({
		maxWidth	: 750,
        openEffect	: 'fade',
		closeEffect	: 'none',
        nextEffect : 'fade',
        prevEffect : 'fade'
	});
    
	$("#success").fancybox({
		openEffect: 'fade',
        closeEffect: 'fade',
        maxWidth: 550,  
	    afterClose: $.redirectFunc
	});
    $('[action="sendEmail.php"]').on('submit',function(e){
        e.preventDefault();
        var self = this,
            url = self.getAttribute('action')||'',
            obj = {};
        $(self).find('input').each(function(){
            obj[this.name] = this.value;
        });
        if(obj.email && $.trim(obj.email)!== ''){
            $.ajax({
                url : url,
                data: obj,
                type: 'POST'
            })
            .done(function(){
                $.redirectFunc();
            })
        }
    });
    $('.product-item .button').on('click', function(event){
        $('#quick-order form input[name="id"]').val($(this).data('id'));
    });
    
    $('.form-block input[type="submit"]').on('click', function(event){
        $('.form-block .order-form input[name="id"]').val($('#select-volume input[name="volume"]:checked').val());
    });
    
    $('#select-volume input[name="volume"]').on('click', function(event){
        $('.price-new span').text($(this).data('new'));
        $('.price-old span').text($(this).data('old'));
    });
});