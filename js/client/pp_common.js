/* 클라이언트 ui 스크립트 */
/*var sessionUserId = '';

if(sesseionUserId == ""){
   //로그인 안했을때
	console.log("로그인x");
} else {
   //로그인 했을때
	console.log("로그인o");
}*/

// 헤더 메뉴 반응형
function responsiveStyle() {

	//gnb 메뉴용
	var windowWidth = $(window).outerWidth();

	// 더보기 버튼 추가
	$('.gnb_2depth > li').each(function(){
		var target = $(this);
		target.children('a').children('.gnb_more').hide();
		if ( target.find('.gnb_3depth').length ) {
			$('<span class="gnb_more">펼쳐보기</span>').appendTo( target.children('a') );
		}
	});

	if (windowWidth < 1025) {
		//console.log('모바일,태블릿');

		// 기본 설정
		$(window).off('scroll');
		$('body').removeClass('scrolly on');
		$('body').off('scrolly');
		$('.gnb_1depth').off();
		$('.gnb_1depth').removeClass('on');
		$('.gnb_2depth li').off();
		$('.gnb_2depth').removeAttr('style');
		$('.gnb_3depth').removeAttr('style');
		$(".function_left").insertBefore($('.btn_menu'));
		$(".btn_msg").insertBefore($('.btn_log'));
		$(".btn_admin").prependTo($('.gnb_wrap'));
		$('.btn_menu').removeClass('on');
		$('.gnb_2depth').removeClass('on');
		$('.sitemap').removeClass('on');
		$('.sitemap > .inner').hide();
		$('.btn_prof_menu').off('click');
		$('.btn_prof_menu').removeClass('on'); 
		$('.prof_gnb_1depth > li > a').unbind('mouseenter');
		$('.prof_gnb_submenu').removeAttr('style');
		$('.prof_gnb_submenu').unbind('mouseenter');  
		$('.prof_gnb_list').removeAttr('style');
		$('.prof_gnb_list').unbind('mouseenter mouseleave');    
		$('.prof_gnb_submenu .prof_gnb_2depth').removeAttr('style');
		$('.prof_gnb_submenu .prof_gnb_2depth').hide(); 
	
		
		$(".btn_prof_admin").prependTo($(".prof_gnb_submenu"));
		$(".btn_prof_log").prependTo($(".prof_gnb_submenu"));

		// gnb
		$('.btn_menu').on('click', function(e){
			e.stopImmediatePropagation();
			$('.gnb_list').scrollLeft(0);//메뉴 왼쪽 끝으로 이동
			$('.gnb_1depth').removeClass('on');
			$('.gnb_2depth').hide();
			if( $(this).hasClass('on') ){ 
				$('body').removeClass('on');
				$(this).removeClass('on');
			} else {
				$('body').addClass('on');
				$(this).addClass('on');
			}
		});

		//2depth 아코디언메뉴
		$('.header_bottom .gnb_2depth').hide();
		$(".gnb_1depth > a").unbind("click");
		$('.gnb_1depth > a').click(function () {
			$('.gnb_1depth').removeClass("on"); 
			if ($(this).next().children().is(':hidden')) {
				$(this).parent().parent().find('.gnb_2depth').hide();
				$(this).next().show();
				$(this).parent().addClass("on");
			} else {
				$(this).parent().addClass("on");
			}
		});

		// gnb
		$('.btn_prof_menu').on('click', function(e){
			e.stopImmediatePropagation();
			$('.prof_gnb_list').removeClass('on');
			$('.prof_gnb_2depth').stop().slideUp(200);
			if( $(this).hasClass('on') ){
				$('body').removeClass('on');
				$(this).removeClass('on');
			} else {
				$('body').addClass('on');
				$(this).addClass('on');
			}
		});

		// 2depth
		$('.prof_gnb_list .gnb_tit').on('click', function(e){
			e.stopImmediatePropagation();
			$('.prof_gnb_list').removeClass('on');
			$('.prof_gnb_2depth').stop().slideUp(200);
			if( $(this).next('ul').is(':visible') ){
				$(this).parent().removeClass('on').children('ul').stop().slideUp(200);
			} else {
				$(this).parent().addClass('on').children('ul').stop().slideDown(200);
			}
		});
		
	} else {
		//console.log("PC");

		// 기본 설정
		$('body').removeClass('scrolly on');
		//$(".btn_admin").insertBefore($(".user_info"));
		$('.gnb_1depth').removeClass('on'); 
		$('.gnb_2depth').removeAttr('style');
		$('.gnb_3depth').removeAttr('style');
		$(".btn_log").prependTo($('.function_left'));
		$(".btn_msg").insertAfter($('.user_info'));
		$(".btn_admin").insertBefore($('.btn_sitemapmenu'));
		$('.sitemap').removeClass('on');
		$('.sitemap > .inner').hide();  

		//2depth 메뉴
		$(".gnb_1depth").on({
			'mouseenter focusin' : function(){
				$(this).addClass('on');
				$(".prof_header_wrap .gnb_1depth").removeClass('on');
				$(this).find(".gnb_2depth").stop().slideDown('fast');
			},
			'mouseleave focusout' : function(){
				$(this).removeClass('on');
				$(this).find(".gnb_2depth").stop().slideUp('fast');
			}
		});
		
		// header 스크롤시
		$(window).on('scroll', function(){
			var scr = $(this).scrollTop();
			if ( scr > 0) {
				$('body').addClass('scrolly');
				//$('.btn_sitemapmenu').appendTo('.gnb_wrap');
			} else {
				$('body').removeClass('scrolly');
				//$('.btn_sitemapmenu').appendTo('.header_top');
			}
			return false;
		});
		
		if ( $(this).scrollTop() > 0) {
			$('body').addClass('scrolly');
		} else {
			$('body').removeClass('scrolly');
		}  

	}

	
	if (windowWidth < 1280) {
		$('.mycerti_area').insertAfter('.myinfo_area');
	}else {
		$('.mycerti_area').insertAfter('.mytest_area');
	}

	if ( windowWidth < 480 ) {
		$('.mainprogram_wrapper .main_more').insertAfter('.check_col_wrapper');
	} else {
		$('.mainprogram_wrapper .main_more').appendTo('.mainprogram_wrapper .check_col_wrap');
	}

}

var resizeTimer;
$( window ).on( 'resize', function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(resizeEnd, 1000);
} );

function resizeEnd() {
	responsiveStyle();
}

//sitemap 
function siteMap(){
	$('.btn_sitemapmenu').on('click', function(e){
		e.stopImmediatePropagation();
		$('body').addClass('on');
		$(".sitemap").addClass('on');
		$(".sitemap > .inner").slideDown();
	});

	$('.btn_sitemap').on('click', function(e){
		e.stopImmediatePropagation();
		$('body').removeClass('on');
		$(".sitemap").removeClass('on');
		$(".sitemap > .inner").slideUp();
	});
}

// toggle class 'on'
function toggleOn(){
	$('.on_js').on('click',function(e){
		e.preventDefault();
		$(this).toggleClass('on');
	});
}

//페이지 상단 이동
function moveTop() {
	var windowWidth = $(window).outerWidth();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.move_top').addClass('on');
		} else {
			$('.move_top').removeClass('on');
		}
	});
	$('.move_top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	if ($(this).scrollTop() > 100) {
		$('.move_top').addClass('on');
	} else {
		$('.move_top').removeClass('on');
	}
}

// chatbot click
function chatbotClick() {
	var chatbot = $('.chatbot');
	var Content = $('.chat_content');

	chatbot.off();

	chatbot.on('click',function(){
		if(Content.hasClass('on')) {
			Content.removeClass('on');
		}else {
			Content.addClass('on');
		}
	});
}

// tab : '.tab_js' 안에 '.tab_list_js' 와 '.tab_cnt_js'로 구분지어 사용.
function tab(){
	$('.tab_js').each(function(){
		var tabs = $(this).children('.tab_list_js').children('li');
		var panels = $(this).children('.tab_cnt_js').children('div');
		var lastTab = tabs.filter('.on');
		var lastPanel = $(lastTab.children('a').attr('href'));
		panels.hide();
		lastPanel.show();
		tabs.on('click',function(e){
			e.preventDefault();
			var thisTab = $(this);
			var thisPanel = $(thisTab.children('a').attr('href'));
			lastTab.removeClass('on');
			thisTab.addClass('on');
			lastPanel.hide();
			thisPanel.show();
			lastTab = thisTab;
			lastPanel = thisPanel;
		});
	})
}

// tab 모양만
function tabSwitch(){
	$('.tab_switch_js').each(function(){
		var tab = $(this).children('li');

		tab.on('click',function(e){
			e.preventDefault();
			tab.removeClass('on');
			$(this).addClass('on');
		})
	})
}

// 클릭한 영역으로 이동
function gotoin() {
	$('.goto_js').each(function(){
		var gotoTit = $(this).find('a');

		gotoTit.on('click',function(e){
			e.preventDefault();
			gotoTit.removeClass('on');

			var target = $(this).attr('href');

			if (target.length) {
				$(this).addClass('on');
				$('html,body').animate({
					scrollTop: $(target).offset().top - 220
				}, 'slow');
			}
		})
	})
}

// accordion : '.accordion_js' 안에 '.acd_list_js' 와 '.acd_cnt_js'로 구분지어 사용.
function accordion(){
	$('.accordion_js').each(function(){
		var tabs = $(this).find('.acd_list_js');

		$(this).find('.acd_cnt_js').hide();

		// '.on'이 붙은 아이는 페이지 진입시 열어놓기
		tabs.filter('.on').next('.acd_cnt_js').show();

		tabs.on('click',function(e){
			e.preventDefault();

			var thisTab = $(this);
			var thisPanel = thisTab.next('.acd_cnt_js');
			var notThisTab = tabs.not(thisTab);
			var notThisPanel = notThisTab.next();

			if(notThisTab){
				notThisTab.removeClass('on');
				notThisPanel.slideUp(300);
			}

			thisTab.toggleClass('on');
			thisPanel.stop().slideToggle(300);
		});
	})
}

// accordion : 테이블 연동 1
function accorTable(){
	$('.accortable_js').each(function(){
		var btn = $(this).find('.btn_accordion');

		btn.on('click',function(e){
			e.preventDefault();

			if($('.tbl').is(':hidden')){
				$(this).addClass('on');
				$(this).find('span').removeClass('on');
				$(this).find('.close').addClass('on');
				$(this).parents('.accortable_js').find('.tbl').slideDown();
			}else {
				$(this).removeClass('on');
				$(this).find('span').removeClass('on');
				$(this).find('.open').addClass('on');
				$(this).parents('.accortable_js').find('.tbl').slideUp();
			}
		});
	});
}

// accordion : 테이블 연동 2
function accorTable2(){
	$('.accortable2_js').each(function(){
		var btn = $(this).find('.btn_accordion');

		btn.on('click',function(e){
			e.preventDefault();

			if($(this).parents('tr').next('.detail').is(':hidden')){
				$(this).addClass('on');
				$(this).find('span').removeClass('on');
				$(this).find('.close').addClass('on');
				$(this).parents('tr').next('.detail').show();
			}else {
				$(this).removeClass('on');
				$(this).find('span').removeClass('on');
				$(this).find('.open').addClass('on');
				$(this).parents('tr').next('.detail').hide();
			}
		});
	});
}

//  검색영역 - 상세검색 Toggle
function searchDetail() {
	var clickDetail = $('.search_box .btn_searchdetail');
	clickDetail.on('click', function(){
		$(this).toggleClass('on');
		$(this).parents('.search_box').find('.search_detail').slideToggle();
	});
}

// selectbox
function selectBox() {
	$('.select_form').each(function(){
		var label = $(this).children('label');
		var target = $(this).children('.select_custom');
		var targetName = target.children('option:selected').text();

		label.text(targetName);
		target.on('change',function(){
			var targetName = $(this).children('option:selected').text();
			label.text(targetName);
		});
	});
}

//swiper 메인 비교과
function swiperSlide1() {
	var swiper = new Swiper('.mainprogram_swiper .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 20,
		/*loop: true,
		loopFillGroupWithBlank: true,*/
		navigation: {
			nextEl: '.mainprogram_swiper .swiper_next',
			prevEl: '.mainprogram_swiper .swiper_prev',
		},
		breakpoints: {
			1280: {
				spaceBetween: 20,
				slidesPerView: 3
			},
			1024: {
				spaceBetween: 15,
				slidesPerView: 2
			},
			768: {
				spaceBetween: 10,
				slidesPerView: 2
			},
			480: {
				spaceBetween: 10,
				slidesPerView: 1
			}
		}
	});
}

//swiper 메인 하단배너
function swiperSlide2() {

	let options = {};
	if ( $(".mainemploy_swiper .swiper-slide").length < 4 ) {
		options = {
			slidesPerView: 3, 
			spaceBetween: 30, 
			loop: false,
			loopAdditionalSlides: 1,
			loopFillGroupWithBlank: true, 
			breakpoints: {
				1280: { 
					spaceBetween: 25, 
				},
				1025: {
					slidesPerView: 3,
					spaceBetween: 15, 
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 10, 
				},
				480: {
					slidesPerView: 2, 
					spaceBetween: 10, 
				}
			}
		}
	} else {
		options = {
			slidesPerView: 3, 
			spaceBetween: 30, 
			autoplay: {
				delay: 3000,  
				disableOnInteraction: false,
			},
			loop: true,
			loopAdditionalSlides: 1,
			loopFillGroupWithBlank: true,  
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
			},
			breakpoints: {
				1280: { 
					spaceBetween: 25, 
				},
				1025: {
					slidesPerView: 3,
					spaceBetween: 15, 
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 10, 
				},
				480: {
					slidesPerView: 2, 
					spaceBetween: 10, 
				}
			}
		}
	}
	
	var swiper = new Swiper('.mainemploy_swiper .swiper-container', options);
}

//swiper 마일리지 안내
function swiperSlide3() {
	var swiper = new Swiper('.mileage_container .swiper-container', {
		slidesPerView: 1,
		spaceBetween: 10,
		autoHeight: true,
		navigation: {
			nextEl: '.mileagebutton_box .swiper_next',
			prevEl: '.mileagebutton_box .swiper_prev',
		},
	});
}

//swiper Today 오늘 내가 참여해야 할 비교과
function swiperSlide4() {
	var swiper = new Swiper('.today_swiper .swiper-container', {
		slidesPerView: 2, 
		spaceBetween: 20, 
		pagination: {
			el: '.today_swiper .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: { 
			1024: {
				slidesPerView: 3, 
				spaceBetween: 15, 
			},
			768: {
				spaceBetween: 10,
				slidesPerView: 2
			},
			480: {
				spaceBetween: 10,
				slidesPerView: 1
			}
		}
	});
}

//swiper 교수메인 교수지원프로그램
function pfswiperSlide1() {
	var swiper = new Swiper('.profsupport .main_program_swiper .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 25,
		/*loop: true,
		loopFillGroupWithBlank: true,*/
		navigation: {
			nextEl: '.profsupport .main_program_swiper .swiper_next',
			prevEl: '.profsupport .main_program_swiper .swiper_prev',
		},
		breakpoints: {
			1280: {
				spaceBetween: 20,
				slidesPerView: 3
			},
			1024: {
				spaceBetween: 15,
				slidesPerView: 3
			},
			768: {
				spaceBetween: 10,
				slidesPerView: 2.2
			},
			480: {
				spaceBetween: 10,
				slidesPerView: 1.1
			}
		}
	});
}

//swiper 교수메인 비교과프로그램
function pfswiperSlide2() {
	var swiper = new Swiper('.nunsubject .main_program_swiper .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 25,
		/*loop: true,
		loopFillGroupWithBlank: true,*/
		navigation: {
			nextEl: '.nunsubject .main_program_swiper .swiper_next',
			prevEl: '.nunsubject .main_program_swiper .swiper_prev',
		},
		breakpoints: {
			1280: {
				spaceBetween: 20,
				slidesPerView: 3
			},
			1024: {
				spaceBetween: 15,
				slidesPerView: 3
			},
			768: {
				spaceBetween: 10,
				slidesPerView: 2.2
			},
			480: {
				spaceBetween: 10,
				slidesPerView: 1.1
			}
		}
	});
}

//swiper 교수메인 공지사항 
function pfswiperSlide3() {
	var swiper = new Swiper('.main_notice_swiper .swiper-container', { 
		slidesPerView: 1,  
		direction: "vertical",
		mousewheel: true,
		autoplay : {   
			delay : 3000, 
			disableOnInteraction : false, 
		},
	});
} 

//swiper 교수서브 - 학생상담 상담회차 
function pfswiperSlide4() {
	var swiper = new Swiper('.prof_counsel_swiper .swiper-container', {
		slidesPerView: 5,
		// spaceBetween: 10,
		slidesPerGroup : 5,
		/*loop: true,
		loopFillGroupWithBlank: true,*/
		navigation: {
			nextEl: '.prof_counsel_swiper .btn_right',
			prevEl: '.prof_counsel_swiper .btn_left',
		}, 
	});
	
}

//swiper 공간대여  
function spaceRental() {
	$(".rental_cardtype .swiper-container").each(function (index) {
		let $this = $(this);
		let swiper = undefined;
		let slideNum = $this.find('.swiper-slide').length; // 슬라이드 총 개수
		let slideInx = 0; // 현재 슬라이드 index

		// 디바이스 체크
		let oldWChk = window.innerWidth > 768 ? 'pc' : 'mo';
		sliderAct();
		$(window).on('resize', function () {
			let newWChk = window.innerWidth > 768 ? 'pc' : 'mo';
			if (newWChk !== oldWChk) {
				oldWChk = newWChk;
				sliderAct();
			}
		});

		function sliderAct() {
			// 슬라이드 초기화
			if (swiper !== undefined) {
				swiper.destroy();
				swiper = undefined;
			}

			// slidesPerView 옵션 설정 (1로 수정)
			let viewNum = 1;
			// loop 옵션 체크
			let loopChk = slideNum > viewNum;
			swiper = new Swiper($this, {
				slidesPerView: viewNum,
				initialSlide: slideInx, 
				slidesPerGroup: 1, 
				navigation: {
					prevEl: $this.children('.swiper_prev'),
					nextEl: $this.children('.swiper_next'),
				},
				on: {
					activeIndexChange: function () {
						slideInx = this.realIndex; // 현재 슬라이드 index 갱신
					},
				},
			});
		}
	});
}


//실시간 인기 비교과 키워드 클릭
function hotKeyword() {
	var keyword = $('.keyword_box li');
	var pick = keyword.find('a');

	pick.on('click', function(){
		if($(this).parent('li').hasClass('on')){
			$(this).parent('li').removeClass('on');
		}else {
			keyword.removeClass('on');
			$(this).parent('li').addClass('on');
		}
	});
}

 // 관심 키워드 설정
 function keywordSelect() {
	var wrapper = $('#keywordSelect');

	// 기본 설정
	wrapper.find('.check_only input:checked').parents('tr').find('th, td').addClass('td_selected');

	// 클릭시
	wrapper.find('.check_only').on('change',function(){
		var target = $(this).find('input');
		var targetChecked = wrapper.find('.check_only input:checked');

		// 체크 표시
		if( target.is(':checked') ){
			target.prop('checked', true);
			$(this).parents('tr').find('th, td').addClass('td_selected');

		} else {
			target.prop('checked', false);
			$(this).parents('tr').find('th, td').removeClass('td_selected');
		}
	});
}

// selectbox 교수 상담 시간
function selectBoxCounsel(){
	var windowWidth = $(window).outerWidth();
	var target = $('.date_current');
	var optBox = target.find('.date_selectbox').find('a');
	var counsel = $('.counsel_possible, .counsel_full');

	if(windowWidth < 1025) {
		target.on('click',function(){
			$(this).find('.date_selectbox').stop().slideToggle(300);
		});
	}else {
		target.on({
			'mouseenter focus' : function(){
				$(this).find('.date_selectbox').stop().slideDown(300);
			},
			'mouseleave blur' : function(){
				$(this).find('.date_selectbox').stop().slideUp(300);
			}
		});
	}
	optBox.on('click',function(){
		var optSelected = $(this).text();
		$(this).parents('.date_selectbox').prev('strong').text(optSelected);
	});

	counsel.on('click',function(){
		$(this).toggleClass('on');
	});

}

// 체크박스 토글(row) : 검색창 셀렉트박스
function checkToggleRow(){
	// 클릭시 셀렉트 박스 보여졌다 사라지는 동작
	$('.show_checktxt').on('click',function(){
		$('.check_row_wrap').slideToggle(300);
	})

	var checkBox = $('.show_checktxt');
	var check = $('input:checkbox[name=check_row]');
	var checkAll = $('input:checkbox[name=checkall_row]');
	var checkAllSelected = $('input:checkbox[name=checkall_row]:checked');
	var checkTotalCnt = $('input:checkbox[name=check_row]').length;
	var checkTxt = $('.check_row_wrap').children('.check_row').children('input:checked').next().text();

	checkBox.text(checkTxt);

	// '전체'외 나머지 선택시
	check.on('change', function(){
		var checkSelected = $('input:checkbox[name=check_row]:checked');
		var checkAllSelected = $('input:checkbox[name=checkall_row]:checked');
		var showCheck = checkSelected.next().html();

		checkBox.text(showCheck);

		if(checkSelected.length == checkTotalCnt){
			check.prop('checked',false);
			checkAll.prop('checked',true);
			checkBox.text('전체');
		}else if(checkSelected.length >= 2){
			checkAllSelected.prop('checked',false);
			checkBox.text('다중선택');
		}else if(checkSelected.length >= 1){
			checkAllSelected.prop('checked',false);
			checkBox.text(showCheck);
		}else{
			checkAll.prop('checked',true);
			checkBox.text('전체');
		}
	});

	// '전체' 선택시
	checkAll.on('change', function(){
		checkAll.prop('checked',true);
		checkBox.text('전체');
		check.prop('checked',false);
	});
}

//체크박스 토글(col) : 체크박스 버튼
function checkToggleCol(){
	$('.check_col_wrapper').each(function(){
		var checkAll = $(this).find('input[name="checkall_col"]');
		var check = $(this).find('input[name="check_col"]');
		var checkTotalCnt = check.length;

		checkAll.on('change',function(){
			check.prop('checked',false);
			$(this).prop('checked',true);
		})

		check.on('change',function(){
			var checkSelected =  check.filter(':checked');

			checkAll.prop('checked',false);
			//$(this).prop('checked',true);

			if(checkSelected.length >= checkTotalCnt){
				checkAll.prop('checked',true);
				check.prop('checked',false);
			}

			if(checkSelected.length == 0){ 
				checkAll.prop('checked',true); 
			   } 
			
		})
	})
}

//라디오 토글
function radioToggle() {
	$(".radio_toggle>input[type='radio']").click(function () {
		var previousRadio = $(this).data('storedRadio');
		if (previousRadio) {
			$(this).prop('checked', !previousRadio);
			$(this).data('storedRadio', !previousRadio);
		} else {
			$(this).data('storedRadio', true);
			$(".radio_toggle>input[type=radio]:not(:checked)").data("storedRadio", false);
		}
		if ($(this).is(":checked")){
			$(".radio_toggle").removeClass("on");
			$(this).parent().addClass("on");
		} else {
			$(this).parent().removeClass("on");
		}
	});
}

// checkbox button - 찜목록 버튼
function checkBtn(){
	$('.check_btn_wrap').each(function(){
		$(this).find('input[type="checkbox"]').change(function(){
			$(this).next().toggleClass('on');
		})
	})
}

// 클릭시 on/off 버튼 : 찜하기 버튼
function toggleBtn(){
	$('.btn_toggle').each(function(){
		$(this).on('click',function(){
			$(this).toggleClass('on');
		});
	});
}

// 진단결과 선택하기
function resultCheck1() {
	// 기본 설정
	$('.box_checklist1 .testdo_checkbox.on .check_only input').prop("checked", true);

	// 클릭시
	$(".box_checklist1 .testdo_checkbox").on("click", function(){
		$(".box_checklist1 .testdo_checkbox").removeClass("on");
		$(".box_checklist1 .testdo_checkbox .check_only input").prop("checked", false);
		$(this).addClass("on");
		$(this).find('.check_only').children('input').prop("checked", true);
	});
}

// 역량도향상 선택하기 2개까지 선택 가능
function resultCheck2() {
	$(".box_checklist2 .testdo_checkbox").on("click", function(){
		if($(".box_checklist2 .testdo_checkbox.on").length >= 2){
			if($(this).hasClass("on")) {
				$(this).removeClass("on");
			} else {
				alert("2개이상 선택할 수 없습니다.");
			}
		} else {
			if($(this).hasClass("on")) {
				$(this).removeClass("on");
			} else {
				$(this).addClass("on");
			}
		}
	});
}

// 워크넷 진단 결과보기
function worknetResult() {
	$(".worknet_box").each(function() {
		var resultBtn = $(this).find(".btn_worknetresult");
		resultBtn.on("click", function(){
			$(this).toggleClass('on');
			$(this).parent().next().slideToggle();
		});
	});
}

// 교육 수요자 만족도조사 참여 버튼
function surveyOn() {
	$(".testdo_list").each(function() {
		$(this).find('.btn_testsurvey').on({
			'mouseenter focus':function(){
				$(this).parents('.testdo_list').addClass('on');
			},
			'mouseleave blur':function(){
				$(this).parents('.testdo_list').removeClass('on');
			}
		});
	});
}

// 채용정보 hover
function recruitOn() {
	$(".employ_box").each(function() {
		$(this).find('a').on({
			'mouseenter focus':function(){
				$(this).parents('.employ_box').addClass('on');
			},
			'mouseleave blur':function(){
				$(this).parents('.employ_box').removeClass('on');
			}
		});
	});
}

//진로설계 : 기업
function targetSelectCorp() {
	$(".corp_radio input").change(function(){
		if($(this).parent().parent().hasClass("target_box")){
			var companyName = $(this).parent().prev().children().find("dt").text();
			companyName = companyName.trim();
			/*alert(companyName + "를 목표기업으로 설정합니다.");*/
			$(".target_box").removeClass("on");
			if($(".corp_radio input").is(":checked")){
				$(this).closest("div").addClass("on");
			}
		}
	});
}

// 진로설계 : 학과 (롤모델)
function targetSelectRole() {
	$(".role_radio input").change(function(){
		if($(this).parent().parent().hasClass("role_box")) {
			var RoleName = $(this).parent().prev().children("p").text();
			//alert(RoleName + "를 롤모델로 설정합니다.");
			$(".role_box").removeClass("on");
			if($(".role_radio input").is(":checked")){
				$(this).closest("div").addClass("on");
			}
		}
	});
}

//비교과 프로그램 카드
function nonSubjectHover() {
	$('.program_cardtype dt > a').on({
		'mouseenter focus':function(){
			$(this).parents('.program_cardtype').addClass('on');
		},
		'mouseleave blur':function(){
			$(this).parents('.program_cardtype').removeClass('on');
		}
	});

	$('.prof_program_cardtype dt > a').on({
		'mouseenter focus':function(){
			$(this).parents('.prof_program_cardtype').addClass('on');
		},
		'mouseleave blur':function(){
			$(this).parents('.prof_program_cardtype').removeClass('on');
		}
	});

	// 비교과 이수 계획 추가
	$('.programcard_addlist .img_box').on('click', function(){
		$(this).parents('.programcard_addlist').toggleClass('selected');
	});
}

// 글자수 표기
function letterCount(){
	$('#letter_count').keyup(function(){
		var content = $(this).val();
		$('#letter_counter').html(content.length + '/100');
	});
	$('#letter_count').keyup();
}

// 테이블 스크롤 커스텀
function tableScroll() {
	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 mCustomScrollbar 실행
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".scrollx_tbl_xxl, .scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs").mCustomScrollbar("destroy");
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".scrollx_tbl_xxl, .scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs").mCustomScrollbar({
				axis: "x",
				theme: "dark",
				advanced: {
					autoExpandHorizontalScroll: true,
					updateOnContentResize: true
				}
			});
		}
	}
}

// 페이징버튼 클릭시 페이지 상단부분으로 이동
function up(){
	$('.up_js').each(function(){
		var windowWidth = $(window).outerWidth();

		if(windowWidth < 1025) {
			$('.testlist_move').click(function(e){
				e.preventDefault();
				$('body,html').animate({scrollTop: 150 }, 300);
			});
		}else {
			$('.testlist_move').click(function(e){
				e.preventDefault();
				$('body,html').animate({scrollTop: 200 }, 300);
			});
		}

	});
}

// hashtag
function hashtag(){
	$('.hashtag_clickable a').on('click',function(e){
		e.preventDefault();

		$(this).parent().toggleClass('on');
	});
}

// 비교과 카드형/리스트형 변환
function nonsubjectTypeChange(){
	var wrapper = $('.btntab_js').parent();
	wrapper.children('.btntab_js').on('click',function(){
		wrapper.children('.btntab_js').removeClass('on');
		$(this).addClass('on');
	});
}

// 교과목 이수체계도 조회
function departmentList(){
	// 기본 설정
	$('.department_list > li.on').find('.department_sublist').show();
	// 클릭시
	$('.department_list').children('li').children('a').on('click', function(){
		var target = $(this).next('.department_sublist');
		if( target.is(':visible') ){
			$(this).parent().removeClass('on');
			target.slideUp(200);
		} else {
			$(this).parent().addClass('on');
			target.slideDown(200);
		}
	});
}

// 브라우저 알림창
function browserAlert(){
	$(".browseralert_close").on("click", function() {
		$("#browseralert").slideUp();
	});
}

//개인정보수집 동의서 
function privacy(){
	var checkAll = $('.privacyagree_box').children('.check_row').children('input');
	var checkEach = $('.privacy_list').find('.check_row').find('input');
	var checkTotal = checkEach.length;

	checkAll.on('change',function(){
		if($(this).is(':checked')){
			checkEach.prop('checked', true);
		}else {
			checkEach.prop('checked', false);
		}
	});

	checkEach.on('change',function(){
		var checkSelected = checkEach.filter(':checked');
		if(checkSelected.length >= checkTotal){
			checkAll.prop('checked',true);
		}else {
			checkAll.prop('checked',false);
		}

	})
}

// 장비선택
function rentalSelect(){ 
	$('.rent1').find('.rentselect_box > a').removeClass('on');
	$('.rentselect_box a').on('click', function (){
		$('.rent1').find('.rentselect_box > a').removeClass('on');
		$(this).addClass('on');
	}); 
}  

function rentalNext(){ 
	$('.rent_footer .btn_next').on('click', function (event){
		if($('.rentselect_box > a').hasClass('on')){
			$('.rent2 .rent_tit').addClass('on');
			$('.rent2 .rent_cnt_wrap').slideDown(); 

			event.preventDefault();
			$('html,body').animate({scrollTop:$(this).parents('.section_sarea').next().children('.equipment_rent').offset().top - 100}, 500);

		}else { 
			$('.rent2 .rent_cnt_wrap').hide(); 
		};
		if($('.rent2 .check_col input').is(':checked')) { 
			$('.rent3 .rent_tit').addClass('on');
			$('.rent3 .rent_cnt_wrap').slideDown(); 
		}else { 
			$('.rent3 .rent_cnt_wrap').hide(); 
		}
	}); 
	
	$('.rent_footer .btn_prev').click(function(event){
		event.preventDefault();

		$('html,body').animate({scrollTop:$(this).parents('.section_sarea').prev().children('.equipment_rent').offset().top - 200}, 500);
	});
}

//FAQ
function faqList() {
	$('.faq_tit').on('click', function () { 
		$(this).parents().children('.faq_box').not($(this).parent()).find('.faq_tit').removeClass('on');
		$(this).parents().children('.faq_box').not($(this).parent()).find('.faq_cnt').slideUp(); 
	});
} 

// lnb 메뉴
function profLnbMenu(){
	
	// // 서브 lnb 있을 경우 : 
	$(".prof_lnb_list > ul").children('li').each(function(){
		var target = $(this);
		target.children('a').children('span').hide();
		if ( target.find('.prof_lnb_2depth').length ) {
			$('<span>펼쳐보기</span>').appendTo( target.children('a') );
		} 
	});
	
	// // 마우스오버시 하위메뉴 show/hide :
	$(".prof_lnb_list > ul").children('li').on({
		'mouseenter focus':function(){
			$(this).addClass('on');
			$(this).children('a').next().stop().slideDown(300);
		},
		'mouseleave blur':function(){
			$(this).removeClass('on');
			$(this).children('a').next().stop().slideUp(300);
		}
	})
	
}

//진로탐색
function careerChoice() {
	var pick = $(".career_box");

	pick.on('click', function () { 
		pick.removeClass('on');
		$(this).addClass('on');
	});
}


//테이블 체크
function tableCheck() {
	$('.tbl_choice').each(function(){
		var checkAll = $(this).find('input[name="check_all"]');
		var check = $(this).find('input[name="check"]');
		var checkTotalCnt = check.length;

		checkAll.on('change',function(){
			if($(this).prop("checked") == true){
				check.prop('checked',true);
				$(this).prop('checked',true);
				// check.parents('tr').addClass('bg_skyblue');
			}else {
				check.prop('checked',false);
				$(this).prop('checked',false);
				// check.parents('tr').removeClass('bg_skyblue');
			}
		})

		check.on('change',function(){
			var checkSelected =  check.filter(':checked');

			if($(this).prop("checked") == true){
				$(this).prop('checked',true);
				// $(this).parents('tr').addClass('bg_skyblue');
			}else {
				$(this).prop('checked',false);
				// $(this).parents('tr').removeClass('bg_skyblue');
			}

			if(checkSelected.length >= checkTotalCnt){
				checkAll.prop('checked',true);
			}else {
				checkAll.prop('checked',false);
			}

		})
	})
} 

// IE 버전 체크 (UserAgent)
var ua = navigator.userAgent.toLowerCase();
// IE7엔 브라우저 엔진명인 Trident가 없고 IE11엔 MSIE란 문자열이 없으므로 두 가지 경우를 모두 체크.
if( ua.indexOf( 'msie' ) != -1 || ua.indexOf( 'trident' ) != -1 ) {
	var version = 11;
	ua = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( ua );
	if( ua )
	{
		version = parseInt( ua[ 1 ] );
	}
	var classNames = '';
	// 기존 방식에 is-ie 라는 클래스 추가
	classNames += ' is-ie';
	// 기존 방식에 현재 버전 클래스 추가
	classNames += ' ie' + version;
	for( var i = version + 1; i <= 11; i++ ) {
		classNames +=  ' lt-ie' + i;
	}
	// html 태그에 클래스 추가
	document.getElementsByTagName( 'html' )[ 0 ].className += classNames;
}

$(document).ready(function () {

	// toggle class 'on' : sitemap
	toggleOn();

	// 페이징버튼 클릭시 페이지 상단부분으로 이동
	up();

	//gnb 메뉴 반응형 동작
	responsiveStyle();

	//페이지 상단으로 이동
	moveTop();

	// chatbot click
	chatbotClick();

	//sitemap 
	siteMap();

	//lnb 메뉴
	//lnbMenu();

	//tab
	/*tabList();*/

	// tab 기본
	tab();

	// tab 모양만
	tabSwitch();

	// 클릭한 영역으로 이동
	gotoin();

	// accordion
	accordion();
	// accordion : 테이블 연동 1
	accorTable();
	// accordion : 테이블 연동 2
	accorTable2();

	//  검색영역 - 상세검색 Toggle
	searchDetail();

	//토글 체크박스 검색버튼
	/*checkToggle();*/

	//tab 연동
	/*tabgoto();*/

	// selectbox
	selectBox();

	//swiper 메인 비교과
	swiperSlide1();

	//swiper 메인 하단배너
	swiperSlide2();
	
	//swiper 마일리지 안내
	swiperSlide3();
	
	//swiper Today 오늘 내가 참여해야 할 비교과
	swiperSlide4();

	//실시간 인기 비교과 키워드 클릭
	hotKeyword();

	// 관심 키워드 설정
	keywordSelect();

	// selectbox 교수 상담 시간
	selectBoxCounsel();

	// 체크박스 토글(row) : 검색창 셀렉트박스
	checkToggleRow();

	//체크박스 토글(col) : 체크박스 버튼
	checkToggleCol();

	//라디오 토글
	radioToggle();

	// checkbox button - 찜목록
	checkBtn();

	// 클릭시 on/off 버튼 : 찜하기 버튼
	toggleBtn();

	// 진단결과 선택하기
	resultCheck1();

	// 역량도향상 선택하기
	resultCheck2();

	// 워크넷 진단 결과보기
	worknetResult();

	// 교육 수요자 만족도조사 참여 버튼
	surveyOn();

	// 채용정보 hover
	recruitOn();

	//비교과 프로그램 카드
	nonSubjectHover();

	// 글자수 표기
	letterCount();

	//FAQ
	faqList();

	//진로설계 : 기업
	targetSelectCorp(); 

	// 진로설계 : 학과 (롤모델)
	targetSelectRole();

	// hashtag
	hashtag();

	// 비교과 카드형/리스트형 변환
	nonsubjectTypeChange();

	// 교과목 이수체계도 조회
	departmentList();

	// 브라우저 알림창
	browserAlert();

	//개인정보수집 동의서 
	privacy();

	//장비선택
	rentalSelect();
	rentalNext();

	// lnb 메뉴
	profLnbMenu();

	//swiper 교수메인 교수지원프로그램
	pfswiperSlide1();
	//swiper 교수메인 비교과프로그램
	pfswiperSlide2(); 
	//swiper 교수메인 공지사항 
	pfswiperSlide3();

	//swiper 교수서브 - 학생상담 상담회차 
	pfswiperSlide4();

	// swiper 공간대여
	spaceRental();

	//진로탐색
	careerChoice();

	//테이블 체크
	tableCheck();

	// select2 설정
	$(".sel_search_row select").select2({
		formatNoMatches: function() {
			return '결과가 없습니다.';
		}
	});

	// 이미지 라이트박스
	$('.openimg').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		callbacks: {
			resize: changeImgSize,
			imageLoadComplete: changeImgSize,
			change: changeImgSize
		}
	});

	function changeImgSize() {
		var img = this.content.find('img');
		img.css('max-height', '100%');
		img.css('height', 'auto');
		img.css('width', 'auto');
		img.css('max-width', '810px');
	}

});

$(window).on("load", function () {
	tableScroll();
});

// outline 설정 - 키보드로 접근시엔 아웃라인을 보여주고 마우스로 접근할때는 아웃라인을 없애줌
(function (d) {
	var style_element = d.createElement('STYLE'),
		dom_events = 'addEventListener' in d,
		add_event_listener = function (type, callback) {
			// Basic cross-browser event handling
			if (dom_events) {
				d.addEventListener(type, callback);
			} else {
				d.attachEvent('on' + type, callback);
			}
		},
		set_css = function (css_text) {
			// Handle setting of <style> element contents in IE8
			!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
		};

	d.getElementsByTagName('HEAD')[0].appendChild(style_element);

	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
	/*add_event_listener('mousedown', function () {
		set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
	});*/
	add_event_listener('keydown', function () {
		set_css(':focus{outline:dotted 1px #193296}::-moz-focus-inner{border:dotted 1px #193296;}');
	});
})(document);


