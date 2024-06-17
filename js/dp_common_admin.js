/**
*****************************************
@ comment  : 조선대 dp_common_admin
*****************************************
**/

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////FUNCTION//////////////////////////////////////

/**
***************************************
@ function : BreadCrumb navigation 생성 모듈
@ comment  :
@ parameter :	breadId - 모듈이 append 될 tagId
				crumbs - 메뉴 array
@ example :
	BreadCrumb({
		breadId : 'breadCrumb',
		crumbs : ['메뉴1', '메뉴2', ...],
	});
@ history  : 2022-12-06 (최초작성)
****************************************
*/
function BreadCrumb(params){

	const crumbs = params.crumbs;

	$(`#${params.breadId}`).empty();
	$(`#${params.breadId}`).append(`
		<section class="content-header">
			<h1>${crumbs[crumbs.length - 1]}</h1>
			<ol class="breadcrumb">
				<li><a href="${basePath}/adminMain/a/t/main.do"><i class="fa fa-home"></i>home</a></li>
				${(	() => {
						let crumbLi = '';
						for( let crumb of crumbs ) {
							crumbLi += `
								<li>${crumb}</li>
							`
						};
						return crumbLi;
					}
				)()}
			</ol>
		</section>
	`);
}


/**
***************************************
@ function : 데이터테이블 검색부 모듈
@ comment  :
@ parameter :	appId - 검색부 모듈이 append 될 tagId
				formId - 검색 파라메터가 담길 formId
				fncName - 검색 함수명 (string), default : 'searchBtn' (searchBtn 시 생략 가능)
				widthMax - 검색부의 한 row에 담길 검색조건의 개수 (기본 : 3) (3일 때 생략 가능)
				headColumn - 대표 검색부 컬럼의 title과 id (type text 고정, 검색할 컬럼 중 하나와 일치해야함)
				columns - 검색 컬럼의 type(select, select2, text, date, dateFromTo)
									, title, id, name, className, value(string), or selected(boolean) or checked(boolean)
				hiddenColumns - type hidden으로 함께 전송할 파라메터의 id, name, value (미사용 시 생략 가능)
@ example :
	SearchDT({
		appId : 'searchApp',
		formId : 'searchForm',
//		fncName : 'searchBtn',
//		widthMax : 3,
		headColumn : {	title : '텍스트검색',	id : 'searchText'	},
		columns : [
			{	type : 'text',			title : '텍스트검색',		id : 'searchText',		name : 'searchText',	value : 'presetValue' },
			{	type : 'text',			title : '텍스트검색2',		id : 'searchText2',		name : 'searchText2',	className : 'numberOnly' },
			{	type : 'select',		title : '셀렉트검색',		id : 'searchSelect',	name : 'searchSelect',	className : 'wd_p70' },
			{	type : 'select2',		title : '셀렉트2검색',		id : 'searchSelect2',	name : 'searchSelect2', },
			{	type : 'select',		title : '옵션고정검색',		id : 'fixedOption',		name : 'fixedOption',
				option : {
					viewCol : 'cdNm',
					valueCol : 'cdId',
					datas : [
						{	cdNm : '옵션A',	cdId : 'optionA',	selected : true },
						{	cdNm : '옵션B',	cdId : 'optionB', },
					],
				},
			},
			{	type : 'radio',			title : '라디오검색',		id : 'searchRadio',		name : 'searchRadio',
				option : {
					viewCol : 'cdNm',
					valueCol : 'cdId',
					datas : [
						{	cdNm : '옵션A',	cdId : 'optionA',	checked : true },
						{	cdNm : '옵션B',	cdId : 'optionB', },
					],
				},
			},
			{	type : 'checkbox',		title : '체크박스검색',		id : 'searchCheck',		name : 'searchCheck',
				option : {
					viewCol : 'cdNm',
					valueCol : 'cdId',
					datas : [
						{	cdNm : '옵션A',	cdId : 'optionA',	checked : true },
						{	cdNm : '옵션B',	cdId : 'optionB',	checked : true },
						{	cdNm : '옵션C',	cdId : 'optionC', },
					],
				},
			},
			{	type : 'date',			title : '일자검색',		id : 'searchDate',		name : 'searchDate',	value : '2022-12-25' },
			{	type : 'dateFromTo',	title : '일자범위검색',		from : {	title : '시작일',		id : 'searchStrDate',	name : 'searchStrDate',	value : '2022-11-25' },
																to	 : {	title : '종료일',		id : 'searchEndDate',	name : 'searchEndDate',	value : '2022-12-25' },
			},
		],
//		hiddenColumns : [
//			{	id : 'searchKeyId',		name : 'searchKeyId',	value : ''	},
//		],
	});
@ history  : 2022-11-25 (최초작성)
****************************************
*/
function SearchDT(params){

	const	fncName = params.fncName === undefined ? "searchBtn" : params.fncName;

	const	columns = params.columns,
			columnsLength = columns.length;

	const	widthMax = params.widthMax === undefined ? 3 : params.widthMax;

	$(`#${params.appId}`).empty();
	$(`#${params.appId}`).append(`

		<div class="searchbox_wrap content container-fluid">
			<div class="searchbox_inner">

				<form id="${params.formId}" method="post" action="">
					${(	() => {
							let hiddenCol = '';
							if( params.hiddenColumns !== undefined ){
								for( let hiddenColumnObj of params.hiddenColumns ){
									hiddenCol += `<input type="hidden" id="${hiddenColumnObj.id}" name="${hiddenColumnObj.name}" value="${hiddenColumnObj.value}">`
								}
							}
							return hiddenCol;
						}
					)()}
					<div class="search_toparea fl_group">
						<input type="text" class="form-control fl_fluid" name="searchKeyword" id="searchKeyword" placeholder="${params.headColumn.title}" onkeyup="fnSetSearchValue('${params.headColumn.id}',this.value);">
						<button type="button" class="btn btn-md btn-primary fl_fixed btn_searchunified" onclick="(${fncName})();">
							<i class="fa fa-search"></i>검색
						</button>
						<button type="button" class="btn btn-md btn-outline-secondary fl_fixed btn_searchdetail">
							상세검색<i class="fa fa-angle-down mg_l5"></i>
						</button>
					</div>
					<div class="search_bottomarea">
						<table class="table table-bordered tbl_row tbl_fixed">
							<caption>검색 조건</caption>
							<colgroup>
								${(	() => {
										let col = '';
										let colMax = columnsLength > (widthMax - 1) ? widthMax : columnsLength,
											colWidth = colMax < 3 ? 12 : 8;
										for( let i = 0; i < colMax; i++ ){
											col += `
												<col style="width: ${colWidth}%">
												<col style="width: auto">
											`
										}
										return col;
									}
								)()}
							</colgroup>
							<tbody>
								${(	() => {
										let tbody = '';
										let td_index = 0;

										let trMax = columnsLength > widthMax ? Math.ceil(columnsLength / widthMax) : 1;
										for( let trLoop = 1; trLoop <= trMax; trLoop++ ){

											tbody += `<tr>`;

											let tdMax = trLoop * widthMax;
											tdMax = tdMax > columnsLength ? columnsLength : tdMax;
											for( ; td_index < tdMax; td_index++ ){

												let columnObj = columns[td_index];

												if( columnObj.type === 'text' ){
													tbody += `
														<th scope="row">${columnObj.title}</th>
														<td class="td_input" ${ columnObj.colspan ? "colspan='columnObj.colspan'" : '' }>
															<input type="text" id="${columnObj.id}" name="${columnObj.name}" class="form-control input-sm ${columnObj.className}" placeholder="${columnObj.title}" value="${columnObj.value ?? ''}">
														</td>
													`;
												};
												if( columnObj.type === 'select' || columnObj.type === 'select2' ){
													let clazz = columnObj.type === 'select2' ? `select2 ${columnObj.className}` : `form-control input-sm ${columnObj.className}`;
													tbody += `
														<th scope="row">${columnObj.title}</th>
														<td class="td_input">
															<select class="${clazz}" id="${columnObj.id}" name="${columnObj.name}">
													`;
													if( columnObj.type === 'select2' ){
														tbody += `
																<option value="">전체</option>
															`;
													}
													if( columnObj.option !== undefined ){
														let option = columnObj.option;
														let datas = option.datas ?? [];
														for( let data of datas ){
															tbody += `
																<option value="${data[option.valueCol]}" ${data.selected && 'selected'} >${data[option.viewCol]}</option>
															`;
														}
													};
													tbody += `</select>
														</td>
													`;
												};
												if( columnObj.type === 'radio' ){
													tbody += `
														<th scope="row">${columnObj.title}</th>
														<td class="td_input" id="${columnObj.id}">
													`;
													if( columnObj.option !== undefined ){
														let option = columnObj.option;
														let datas = option.datas ?? [];
														for( let i = 0; i < datas.length; i++ ){
															let data = datas[i];
															tbody += `
																<p class="ad_input_row">
																	<input type="radio" class="radio" id="${columnObj.id}${i}" name="${columnObj.name}" value="${data[option.valueCol]}" ${i === 0 ? 'checked' : ''}>
																	<label for="${columnObj.id}${i}" class="radio_label" ${data.checked && 'checked'} >${data[option.viewCol]}</label>
																</p>
															`;
														}
													};
													tbody += `
														</td>
													`;
												};
												if( columnObj.type === 'checkbox' ){
													tbody += `
														<th scope="row">${columnObj.title}</th>
														<td class="td_input" id="${columnObj.id}">
													`;
													if( columnObj.option !== undefined ){
														let option = columnObj.option;
														let datas = option.datas ?? [];
														for( let i = 0; i < datas.length; i++ ){
															let data = datas[i];
															tbody += `
																<p class="ad_input_row">
																	<input type="checkbox" class="check" id="${columnObj.id}${i}" name="${columnObj.name}" value="${data[option.valueCol]}">
																	<label for="${columnObj.id}${i}" class="check_label" ${data.checked && 'checked'} >${data[option.viewCol]}</label>
																</p>
															`;
														}
													};
													tbody += `
														</td>
													`;
												};
												if( columnObj.type === 'date' ){
													tbody += `
														<th scope="row">${columnObj.title}</th>
														<td class="td_input">
															<div class="dp_inline wd_200 va_m">
																<div class="input-group date">
																	<div class="input-group-addon" id="${columnObj.id}Fa">
																		<i class="fa fa-calendar"></i>
																	</div>
																	<input type="text" placeholder="${columnObj.title}" class="form-control pull-right input-sm btDtpicker"
																			name="${columnObj.name}" id="${columnObj.id}" value="${columnObj.value ?? ''}" readonly>
																</div>
															</div>
														</td>
													`;
												};
												if( columnObj.type === 'dateFromTo' ){
													let divWidth = widthMax > 3 ? 120 : 150;
													tbody += `
														<th scope="row">${columnObj.title}</th>
														<td class="td_input">
															<div class="dp_inline wd_${divWidth} va_m">
																<div class="input-group date">
																	<div class="input-group-addon" id="${columnObj.from.id}Fa">
																		<i class="fa fa-calendar"></i>
																	</div>
																	<input type="text" placeholder="${columnObj.from.title}" class="form-control pull-right input-sm btDtpicker"
																			name="${columnObj.from.name}" id="${columnObj.from.id}" value="${columnObj.from.value ?? ''}" readonly>
																</div>
															</div>
															~
															<div class="dp_inline wd_${divWidth} va_m">
																<div class="input-group date">
																	<div class="input-group-addon" id="${columnObj.to.id}Fa">
																		<i class="fa fa-calendar"></i>
																	</div>
																	<input type="text" placeholder="${columnObj.to.title}" class="form-control pull-right input-sm btDtpicker"
																			name="${columnObj.to.name}" id="${columnObj.to.id}" value="${columnObj.to.value ?? ''}" readonly>
																</div>
															</div>
														</td>
													`;
												};
												if( columnObj.type === 'inputFromTo' ){
													let divWidth = widthMax > 3 ? 120 : 150;
													tbody += `
														<th scope="row">${columnObj.title}</th>
														<td class="td_input">
															<div class="dp_inline wd_${divWidth} va_m">
																<input type="text" placeholder="${columnObj.from.title}" class="form-control pull-right input-sm"
																		name="${columnObj.from.name}" id="${columnObj.from.id}" value="${columnObj.from.value ?? ''}">
															</div>
															~
															<div class="dp_inline wd_${divWidth} va_m">
																<input type="text" placeholder="${columnObj.to.title}" class="form-control pull-right input-sm"
																		name="${columnObj.to.name}" id="${columnObj.to.id}" value="${columnObj.to.value ?? ''}">
															</div>
														</td>
													`;
												};
											};

											tbody += `</tr>`;
										}

										return tbody;
									}
								)()}
							</tbody>
						</table>
						<div class="btn_area">
							<button type="button" class="btn btn-md btn-outline-secondary" onclick="fnFormReset('${params.formId}');">
								<i class="fa fa-refresh mg_r5"></i>필터 초기화
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	`);
};

/**
***************************************
@ function : 데이터테이블 그리드 생성 및 호출 모듈
@ comment  : https://datatables.net/
@ parameter :	grid - 그리드 선택('section', 'box', 'table') ('section' 시 생략 가능)
				title - 그리드 제목 생성 (미사용 시 생략 가능)

				ids.sectionId - 테이블 모듈이 append 될 tagId
				ids.tableId - 데이터테이블 Id
				ids.formId - 검색부 id

				columns.columns - 호출 데이터 정보 (array)
				(	1. data(string = 테이블 컬럼명의 camel case), width(string), title(string), def(object), group(string) 속성을 가지는 object를 담는다.
						, def 객체는 className, order(boolean), orderBy, fnc((data, type, row) => {}) 속성을 가진다.
						, fnc 속성의 값으로 작성하는 함수의 data 파라메터는 해당 object의 data 로 가져오는 값을 담는다.
						, fnc 속성의 값으로 작성하는 함수의 type 파라메터는 'display' 혹은 'filter' 로 구분하여 리턴해주지만 잘 사용하지 않음.
						, fnc 속성의 값으로 작성하는 함수의 row 파라메터는 실행하는 쿼리의 모든 값을 row.컬럼명 으로 값을 호출한다.
					2. def 객체에 className : "hidden" 을 담아 보내면 해당 행은 표에서 hidden 처리 된다.
					3. group 속성이 부여되면 thead 가 자동으로 2열로 나뉘어지며, 연달아 작성된 헤더는 merge 된다.
				)
				columns.defaultVal - 데이터가 없을 때 셀을 채워줄 값, default : '-' ('-' 시 생략 가능)

				columns.select - 첫 행 select 적용, (미사용 시 생략 가능)
				columns.select.type - 'multi' : 체크박스, 'single' : 라디오 (미사용 시 생략 가능)
				columns.select.thId - 체크박스 시 전체선택 체크박스 id, default : 'chkAll' ('chkAll' 시 생략 가능)

				(선택 된 데이터 가져올 때 fn_DTgetSelectedValue 혹은 fn_DTgetCheckedValues 함수 사용하면 편리)
				columns.isScrollable - 스크롤 사용 여부 (boolean), default : false (false 시 생략 가능)
				columns.hasLengthChange - n건씩 보기 사용 여부 (boolean), default : true (true 시 생략 가능)
				columns.hasPaging - pagination 사용 여부 (boolean), default : true (true 시 생략 가능)
				columns.hasInfo - (총 n건 중 i ~ i건) 사용 여부 (boolean), default : true (false 시 생략 가능)
				columns.display - 화면에 출력되는 열의 수 (integer), default : 15 (15 시 생략 가능)

				buttons - 테이블 우측 상단 버튼(최상단), 데이터테이블 기본 버튼 모음 (object) (미사용 시 생략 가능)

				buttons.buttons - 테이블 우측 상단 버튼(최상단) (array) (미사용 시 생략 가능)
				butoons.buttons.fncName - 버튼 클릭 시 실행 함수명 (string)
				buttons.buttons.comboBox - 버튼 좌측에 생성할 comboBox (option은 선택)

				buttons.gridButtons - 데이터테이블 기본 버튼 (미사용 시 생략 가능)
				buttons.gridButtons.defaultButtons - 데이터테이블 기본 버튼 (object) (미사용 시 생략 가능)
				buttons.gridButtons.defaultButtons.excludeColArr - 기본 엑셀 다운로드에서 제외할 컬럼 명 (array)
				buttons.gridButtons.customButtons - 데이터테이블 버튼 좌측에 커스텀 버튼 (array) (미사용 시 생략 가능)

				buttons.footerButtons - 테이블 우측 하단 버튼 (array) (미사용 시 생략 가능)
				buttons.footerButtons.fncName - 버튼 클릭 시 실행 함수명 (string)

				drawCallback - 테이블이 전부 로드 된 후 callback ( settings => {} ) (미사용 시 생략 가능)
				rowCallback - 열이 로드될 때 마다 callback ( (row, data, displayNum, displayIndex, dataIndex) => {} ) (미사용 시 생략 가능)
				rowReorder - 열 재정렬 기능, 잘 사용하지 않음 (boolean or object) (미사용 시 생략 가능)
@ example :
	let tableObject;

	const columnsArray = [
		{	data: "no",			width : '5',	title : '번호',
			def: {	order : false },
		},
		{	data: "regDateOri",	width : '10',	title : '등록일',
			def: {	fnc : (data, type, row) => row.regDate },
		},
		{	data: "csiTitle",	width : 'auto',	title : '설문조사 명',
			def: {	fnc : (data, type, row) => `<p class="ta_l"><a href="javascript:void(0);" class="link_view underline" onclick="csiDetail('\${row.csiKeyId}');">\${data}</a></p>` },
		},
		{	data: "csiStrDate",	width : '10',	title : '조사기간',
			def: {	fnc : (data, type, row) => `\${row.csiStrDate} ~ \${row.csiEndDate}` },
		},
		{	data: "stdCnt",		width : '8',	title : '응답 완료자',		group : '대상자',
			def: {	fnc : data => `\${data}명` },
		},
		{	data: "targetCnt",	width : '8',	title : '총 진행자',		group : '대상자',
			def: {	fnc : data => `\${data}명` },
		},
		{	data: "csiKeyId",	width : '12',	title : '결과보기',
			def: {	fnc : (data, type, row) => `<button type='button' class='btn btn-xs btn-outline-info' onclick="goRepoPopUp('\${data}');">
													<i class="fa fa-file-o mg_r5"></i>통계</button>
												<button type='button' class='btn btn-xs btn-outline-success' onclick="surveyDownExcel('\${data}', \${row.stdCnt});">
													<i class="fa fa-download mg_r5"></i>RawData</button>`,
					order : false,
			},
		},
		{	data: "csiKeyId",	width : '10',	title : '관리',
			def: {	fnc : (data, type, row) => `<button type='button' class='btn btn-xs btn-outline-success' onclick="csiModify('\${data}', \${row.stdCnt});">
													<i class="fa fa-pencil-square-o mg_r5"></i>수정</button>
												<button type='button' class='btn btn-xs btn-outline-dark' onclick="csiDelete(this,'\${data}', \${row.stdCnt});">
													<i class="fa fa-trash-o mg_r5"></i>삭제</button>`,
					order : false,
			},
		},
		{	data: "csiKeyId",
			def : {	className : "hidden",	orderBy : 'desc' },
		},
	];

	function callGrid(){

		tableObject = DataTable({
//			grid : 'section',
//			title : '취업통계설문조사 목록',
			url : '${basePath}/empSurveyMngSTF/r/n/getSurveyListAjax.do',
			ids : {
				sectionId : 'tableSection',	tableId : 'dataTable',	formId : 'searchForm',
			},
			columns : {
				columns : columnsArray,
//				defaultVal : '-',
//				select : {
//					type : 'multi',
//					thId : 'chkAll',
//				},
//				isScrollable : false,
//				hasLengthChange : true,
//				hasPaging : true,
//				hasInfo : false,
//				display : 15,
			},
			buttons : {
				buttons : [
					{
//						comboBox : {	id : '',	name : '',
//										option : {
//											viewCol : 'cdNm',
//											valueCol : 'cdId',
//											datas : [
//												{	cdNm : '옵션A',	cdId : 'optionA',	selected : true },
//												{	cdNm : '옵션B',	cdId : 'optionB', },
//											],
//										},
//						},
//						date : {	title : '',		id : '',	name : '', },
						btnClass : 'btn btn-sm btn-primary',	icon : 'fa-plus',	text : '등록',	fncName : 'fnCreate',
					},
				],
				gridButtons : {
					defaultButtons : {
						title : '취업통계설문조사 목록',
						excludeColArr : ["csiKeyId"],
					},
//					customButtons : [
//						{btnClass : 'btn btn-sm btn-outline-success',	icon : 'fa-download',	text : '업로드 양식 다운로드',	fnc : fnDownExcelSample},
//						{btnClass : 'btn btn-sm btn-outline-success',	icon : 'fa-upload',		text : '엑셀 업로드',			fnc : fnExcelUpload},
//					],
//				},
//				footerButtons : [
//					{btnClass : 'btn btn-md btn-primary',			icon : 'fa-check',		text : '저장',	fncName : 'fnSave'},
//					{btnClass : 'btn btn-md btn-outline-secondary',	icon : 'fa-navicon',	text : '목록',	fncName : 'goBack'},
//				],
//			},
//			drawCallback : settings => {},
//			rowCallback : ( row, data, displayNum, displayIndex, dataIndex ) => {},
//			rowReorder : {
//				dataSrc: '',
//				selector: '',
//			},
		});
	}
@ history  : 2022-12-07 (최초작성)
****************************************
*/
function DataTable(params){

	let		columnsArray = params.columns.columns,
			columnsLength = columnsArray.length;

	let		hasColumnsGroup = false;

	let		colHiddenCnt = 0;

	const	defaultVal = params.columns.defaultVal ?? '-';

	const	selectTypes = ['single', 'multi'],
			selectType = params.columns.select?.type,
			selectThId = params.columns.select?.thId ?? 'chkAll',
			isCheckable = selectTypes.includes(selectType) ? true : false;
	let		isSelect = isCheckable ? fn_DTCheckBoxAdd(selectType) : false;

	const	buttons = params.buttons ?? [];

			hasButtons = buttons.buttons !== undefined && buttons.buttons.length > 0 ? true : false,
			plusButtons = hasButtons ? buttons.buttons : [],
			hasPlusButtonDate = false,

			hasGridButtons = buttons.gridButtons !== undefined && Object.keys(buttons.gridButtons).length > 0 ? true : false,
			gridButtons = hasGridButtons ? buttons.gridButtons : [],
			hasDefaultButtons = gridButtons.defaultButtons !== undefined && Object.keys(gridButtons.defaultButtons).length > 0 ? true : false,

			hasFooterButtons = buttons.footerButtons !== undefined && buttons.footerButtons.length > 0 ? true : false,
			footerButtons = hasFooterButtons ? buttons.footerButtons : [];

	let		defaultButtonsExcludeColArr = [],
			defaultButtonsExcludeArr = [];

	if( hasDefaultButtons ){
		defaultButtonsExcludeColArr = gridButtons.defaultButtons.excludeColArr ?? [];
	}

	let		indexs = [], orders = [];

	let		columnsDefsArray = []; // assign specific options to columns in the table

	columnsDefsArray.push(fn_DTColDefAll(defaultVal)); // default cell value

	columnsArray.forEach((elem, index) => {
		if( elem.def ){
			if( elem.def.className !== 'hidden' ){
				columnsDefsArray.push(fn_DTColDefOne([index], elem.def.className, elem.def.order, elem.def.fnc));
			}else{
				columnsDefsArray.push(fn_DTColDefHidden([index]));
			}
			if( elem.def.orderBy ){
				indexs.push(index);
				orders.push(elem.def.orderBy);
			}
		}
		if( defaultButtonsExcludeColArr.includes(elem.data) ){
			defaultButtonsExcludeArr.push(index);
		}

		if( elem.group ){
			hasColumnsGroup = true;
			elem.rowspan = 1;
		}
	});

	columnsDefsArray.forEach(item => {
		if( isCheckable ){
			if( item.targets !== '_all' ){
				item.targets = item.targets.map(e => e + 1)
			}
		}
		if( item.className === 'hidden' ){
			columnsLength--;
			colHiddenCnt++;
		}
	});

	if( isCheckable ){
		let selectClass = '';
		if( selectType === 'single' ){
			selectClass = 'select-radio';
		}else if( selectType === 'multi' ){
			selectClass = 'select-checkbox';
		}
		columnsArray = [{ data: "" }, ...columnsArray];
		columnsDefsArray.unshift(fn_DTColDefOne([0], selectClass, false));
		columnsDefsArray.unshift(fn_DTColDefArr([0], ""));

		indexs = indexs.map(e => e + 1);
		columnsLength++;

		if( hasDefaultButtons ){
			defaultButtonsExcludeArr = defaultButtonsExcludeArr.map(e => e + 1);
			defaultButtonsExcludeArr.unshift(0);
		}
	}

	const	dtButtons = hasDefaultButtons
						? fn_DTbtnAllCreate( gridButtons.defaultButtons.title,
											 columnsLength,
											 defaultButtonsExcludeArr,
											 gridButtons.customButtons	)
						: fn_DTbtnCustomCreate( gridButtons.customButtons ),
			dtButtonFloatRight = !hasDefaultButtons ? 'fr' : '';

	const	isScrollable = params.columns.isScrollable ?? false, // set table scrollable
			scrollClass = isScrollable ? 'nowrap' : 'wd_p100 tbl_fixed',
			scrollWidth = isScrollable ? '130%' : '100%';


	// create table(html)
	const	grid = params.grid ?? 'section';
	let		gridLevel = 3;
	switch(grid){
		case('section')	: gridLevel = 3; break;
		case('box')		: gridLevel = 2; break;
		case('table')	: gridLevel = 1; break;
		default	: break;
	};

	$(`#${params.ids.sectionId}`).empty();
	$(`#${params.ids.sectionId}`).append(`

		${( () => {
				let wrapperTag = '';
				if( gridLevel >= 3 ){
					wrapperTag += `
						<section class="content container-fluid">
					`
				}
				if( gridLevel >= 2 ){
					wrapperTag += `
						<div class="box box-solid">
					`
				}
				return wrapperTag;
			}
		)()}

		${( () => {
				let title = '';
				if( params.title ){
					title += `
						<div class="box-header with-border">
							<h3 class="box-title">${params.title}</h3>
							<div class="box-tools pull-right">
								<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
							</div>
						</div>
					`;
				};
				return title;
			}
		)()}

		${( () => {
				let wrapperTag = '';
				if( gridLevel >= 2 ){
					wrapperTag += `
						<div class="box-body">
					`
				}
				return wrapperTag;
			}
		)()}

		${(	() => {
				let buttonSection = '';
				if( plusButtons.length > 0 ){
					buttonSection += `	<div class="ad_tbl_top ${dtButtonFloatRight}">`;
					for( let button of plusButtons ){
						if( button.comboBox ){
							let comboBox = button.comboBox;
							let comboName = comboBox.name === undefined ? comboBox.id : comboBox.name;

							buttonSection += `
											<select class="form-control input-sm wd_100 dp_inline va_t" id="${comboBox.id}" name="${comboName}">
							`
							if( comboBox.option ){
								let option = comboBox.option;
								for( let data of option.datas ){
									buttonSection += `
												<option value="${data[option.valueCol]}" ${data.selected && 'selected'} >${data[option.viewCol]}</option>
									`;
								}
							}
							buttonSection += `
											</select>
							`;
						};
						if( button.date ){
							let date = button.date;
							buttonSection += `
											<div class="dp_inline wd_120 va_m">
												<div class="input-group date">
													<div class="input-group-addon" id="${date.id}Fa">
														<i class="fa fa-calendar"></i>
													</div>
													<input type="text" placeholder="${date.title}" class="form-control pull-right input-sm btDtpicker"
															name="${date.name}" id="${date.id}" value="${date.value ?? ''}" readonly>
												</div>
											</div>
							`;
							hasPlusButtonDate = true;
						};
						buttonSection += `	<button type="button" class="${button.btnClass}" onclick="(${button.fncName})()"><i class="fa ${button.icon} mg_r5"></i>${button.text}</button>`;
					}
					buttonSection += `	</div>`;
				}
				return buttonSection;
			}
		)()}

		<table class="table table-bordered table-hover tbl_col display dataTable ${scrollClass}" id="${params.ids.tableId}" role="grid" aria-describedby="123">
			<colgroup>
				${(	() => {
						let cols = '';
						if( isCheckable ){
							cols += `
								<col style="width: ${isScrollable ? '3' : '5'}%">
							`
						};
						for( let col of columnsArray ){
							if( col.width ){
								cols += `
									<col style="width: ${col.width}%">
								`
							}
						};
						return cols;
					}
				)()}
			</colgroup>
			<thead>
				<tr>
					${(	() => {
							let ths = '',
								thIndex = 0,
								rowspan = hasColumnsGroup ? 2 : 1;
							if( isCheckable ){
								if( selectType === 'single' ){
									ths += `
										<th scope="col" rowspan="${rowspan}">선택</th>
									`
								}else if( selectType === 'multi' ){
									ths += `
										<th scope="col" rowspan="${rowspan}">
											<input type="checkbox" name="${selectThId}" id="${selectThId}" value="all">
										</th>
									`
								}
								thIndex++;
							};
							for( ; thIndex < columnsLength; thIndex++ ){
								let th = columnsArray[thIndex];
								ths += `
									<th scope="col" rowspan="${th.rowspan ?? rowspan}">${th.group ? th.group : th.title}</th>
								`
							};
							if( !hasColumnsGroup ){
								for( let i = 0; i < colHiddenCnt; i++ ){
									ths += `
										<th scope="col"></th>
									`
								};
							}
							return ths;
						}
					)()}
				</tr>

				${(	() => {
						let groupElems = '';
						if( hasColumnsGroup ){
							groupElems += `
								<tr>
							`
							for( let groupElem of columnsArray ){
								if( groupElem.group ){
									groupElems += `
										<th scope="col">${groupElem.title}</th>
									`
								}
							}
							for( let i = 0; i < colHiddenCnt; i++ ){
								groupElems += `
									<th scope="col"></th>
								`
							};
							groupElems += `
								</tr>
							`
						}
						return groupElems;
					}
				)()}
			</thead>
			<tbody>
			</tbody>
		</table>

		${( () => {
				let wrapperTag = '';
				if( gridLevel >= 2 ){
					wrapperTag += `
						</div>
					`
				}
				return wrapperTag;
			}
		)()}

		${(	() => {
				let footerButtonSection = '';
				if( footerButtons.length > 0 ){
					footerButtonSection += `<div class="box-footer ta_r">`;
					for( let footerButton of footerButtons ){
						footerButtonSection += `<button type="button" class="${footerButton.btnClass}" onclick="(${footerButton.fncName})()"><i class="fa ${footerButton.icon} mg_r5"></i>${footerButton.text}</button>`;
					}
					footerButtonSection += `</div>`;
				}
				return footerButtonSection;
			}
		)()}

		${( () => {
				let wrapperTag = '';
				if( gridLevel >= 2 ){
					wrapperTag += `
						</div>
					`
				}
				if( gridLevel >= 3 ){
					wrapperTag += `
						</section>
					`
				}
				return wrapperTag;
			}
		)()}
	`);

	// table th merging
	if( hasColumnsGroup ){
		let $prevObj,
			prevTitle = '';
		$(`#${params.ids.tableId}`).find("th").each((index, elem) => {
			let title = $(elem).text();
			if( title === prevTitle ){
				$prevObj.attr("colspan", parseInt( $prevObj.attr("colspan") ?? 1 ) + 1 );
				$(elem).remove();
			}else{
				prevTitle = title;
				$prevObj = $(elem);
			}
		})
	}

	// active datePicker
	hasPlusButtonDate && dataPicker();

	// active checkbox (selectThId 가 default 일 때)
	selectType === 'multi' && selectThId === 'chkAll' && fnChkBoxAll();

	// DataTable data setting
	const	data = params.ids.formId ? $(`#${params.ids.formId}`).serializeFormDain() : {};

	// DataTable grid option setting
	const	hasOrders = indexs.length > 0 && orders.length > 0 ? true : false,
			hasLengthChange = params.columns.hasLengthChange ?? true,
			hasPaging = params.columns.hasPaging ?? true,
			hasInfo = params.columns.hasInfo ?? false,
			display = params.columns.display ?? 15;

	// DataTable callback setting
	const	fnDrawCallback = params.drawCallback ?? (() => {}),
			fnRowCallback = params.rowCallback ?? (() => {}),
			setRowReorder = params.rowReorder ?? false;


	return $(`#${params.ids.tableId}`).DataTable({
		"ajax" : {
			type : "POST"
			, url : params.url
			, dataSrc: "data"
			, data : data
		},

		columns: columnsArray,
		columnDefs: columnsDefsArray,

		ordering : hasOrders,
		order : fn_DTOrderCol(indexs, orders),
		lengthChange : hasLengthChange,
		pageLength : display,
		info : hasInfo,
		paging : hasPaging,
		select : isSelect,

		scrollXInner : scrollWidth,

		buttons : dtButtons,

		drawCallback : fnDrawCallback,
		rowCallback : fnRowCallback,
		rowReorder : setRowReorder,
	});
};


/**
***************************************
@ function : 데이터테이블 검색부 모듈
@ comment  :
@ parameter :	appId - 검색부 모듈이 append 될 tagId
				formId - 검색 파라메터가 담길 formId
				title - 그리드 제목 생성 (미사용 시 생략 가능)
				fncName - 검색 함수명 (string), default : 'searchBtn' (searchBtn 시 생략 가능)
				widthMax - 검색부의 한 row에 담길 검색조건의 개수 (기본 : 3) (3일 때 생략 가능)
				columns - 검색 컬럼의 type(select, select2, text, date, dateFromTo)
									, title, id, name, className, value(string), or selected(boolean) or checked(boolean)
				hiddenColumns - type hidden으로 함께 전송할 파라메터의 id, name, value (미사용 시 생략 가능)
@ example :
	ClassicSearchDT({
		appId : 'searchApp',
		formId : 'searchForm',
//		title : '검색',
//		fncName : 'searchBtn',
//		widthMax : 3,
		columns : [
			{	type : 'text',			title : '텍스트검색',		id : 'searchText',		name : 'searchText',	value : 'presetValue' },
			{	type : 'text',			title : '텍스트검색2',		id : 'searchText2',		name : 'searchText2',	className : 'numberOnly' },
			{	type : 'select',		title : '셀렉트검색',		id : 'searchSelect',	name : 'searchSelect',	className : 'wd_p70' },
			{	type : 'select2',		title : '셀렉트2검색',		id : 'searchSelect2',	name : 'searchSelect2', },
			{	type : 'select',		title : '옵션고정검색',		id : 'fixedOption',		name : 'fixedOption',
				option : {
					viewCol : 'cdNm',
					valueCol : 'cdId',
					datas : [
						{	cdNm : '옵션A',	cdId : 'optionA',	selected : true },
						{	cdNm : '옵션B',	cdId : 'optionB', },
					],
				},
			},
			{	type : 'radio',			title : '라디오검색',		id : 'searchRadio',		name : 'searchRadio',
				option : {
					viewCol : 'cdNm',
					valueCol : 'cdId',
					datas : [
						{	cdNm : '옵션A',	cdId : 'optionA',	checked : true },
						{	cdNm : '옵션B',	cdId : 'optionB', },
					],
				},
			},
			{	type : 'checkbox',		title : '체크박스검색',		id : 'searchCheck',		name : 'searchCheck',
				option : {
					viewCol : 'cdNm',
					valueCol : 'cdId',
					datas : [
						{	cdNm : '옵션A',	cdId : 'optionA',	checked : true },
						{	cdNm : '옵션B',	cdId : 'optionB',	checked : true },
						{	cdNm : '옵션C',	cdId : 'optionC', },
					],
				},
			},
			{	type : 'date',			title : '일자검색',		id : 'searchDate',		name : 'searchDate',	value : '2022-12-25' },
			{	type : 'dateFromTo',	title : '일자범위검색',		from : {	title : '시작일',		id : 'searchStrDate',	name : 'searchStrDate',	value : '2022-11-25' },
																to	 : {	title : '종료일',		id : 'searchEndDate',	name : 'searchEndDate',	value : '2022-12-25' },
			},
		],
//		hiddenColumns : [
//			{	id : 'searchKeyId',		name : 'searchKeyId',	value : ''	},
//		],
	});
@ history  : 2022-11-25 (최초작성)
****************************************
*/
function ClassicSearchDT(params){

	const	fncName = params.fncName === undefined ? "searchBtn" : params.fncName;

	const	columns = params.columns,
			columnsLength = columns.length;

	const	widthMax = params.widthMax === undefined ? 3 : params.widthMax;

	$(`#${params.appId}`).empty();
	$(`#${params.appId}`).append(`

		<div class="box box-solid">
			${( () => {
					let title = '';
					if( params.title ){
						title += `
							<div class="box-header with-border">
								<h3 class="box-title">${params.title}</h3>
								<div class="box-tools pull-right">
									<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
								</div>
							</div>
						`;
					};
					return title;
				}
			)()}
			<div class="box-body">
				<form id="${params.formId}" method="post" action="">
					${(	() => {
							let hiddenCol = '';
							if( params.hiddenColumns !== undefined ){
								for( let hiddenColumnObj of params.hiddenColumns ){
									hiddenCol += `<input type="hidden" id="${hiddenColumnObj.id}" name="${hiddenColumnObj.name}" value="${hiddenColumnObj.value}">`
								}
							}
							return hiddenCol;
						}
					)()}

					<table class="table table-bordered tbl_row tbl_fixed">
						<caption>검색 조건</caption>
						<colgroup>
							${(	() => {
									let col = '';
									let colMax = columnsLength > (widthMax - 1) ? widthMax : columnsLength,
										colWidth = colMax < 3 ? 12 : 8;
									for( let i = 0; i < colMax; i++ ){
										col += `
											<col style="width: ${colWidth}%">
											<col style="width: auto">
										`
									}
									return col;
								}
							)()}
						</colgroup>
						<tbody>
							${(	() => {
									let tbody = '';
									let td_index = 0;

									let trMax = columnsLength > widthMax ? Math.ceil(columnsLength / widthMax) : 1;
									for( let trLoop = 1; trLoop <= trMax; trLoop++ ){

										tbody += `<tr>`;

										let tdMax = trLoop * widthMax;
										tdMax = tdMax > columnsLength ? columnsLength : tdMax;
										for( ; td_index < tdMax; td_index++ ){

											let columnObj = columns[td_index];

											if( columnObj.type === 'text' ){
												tbody += `
													<th scope="row">${columnObj.title}</th>
													<td class="td_input">
														<input type="text" id="${columnObj.id}" name="${columnObj.name}" class="form-control input-sm ${columnObj.className}" placeholder="${columnObj.title}" value="${columnObj.value ?? ''}">
													</td>
												`;
											};
											if( columnObj.type === 'select' || columnObj.type === 'select2' ){
												let clazz = columnObj.type === 'select2' ? `select2 ${columnObj.className}` : `form-control input-sm ${columnObj.className}`;
												tbody += `
													<th scope="row">${columnObj.title}</th>
													<td class="td_input">
														<select class="${clazz}" id="${columnObj.id}" name="${columnObj.name}">
												`;
												if( columnObj.type === 'select2' ){
													tbody += `
															<option value="">전체</option>
														`;
												}
												if( columnObj.option !== undefined ){
													let option = columnObj.option;
													let datas = option.datas ?? [];
													for( let data of datas ){
														tbody += `
															<option value="${data[option.valueCol]}" ${data.selected && 'selected'} >${data[option.viewCol]}</option>
														`;
													}
												};
												tbody += `</select>
													</td>
												`;
											};
											if( columnObj.type === 'radio' ){
												tbody += `
													<th scope="row">${columnObj.title}</th>
													<td class="td_input" id="${columnObj.id}">
												`;
												if( columnObj.option !== undefined ){
													let option = columnObj.option;
													let datas = option.datas ?? [];
													for( let i = 0; i < datas.length; i++ ){
														let data = datas[i];
														tbody += `
															<p class="ad_input_row">
																<input type="radio" class="radio" id="${columnObj.id}${i}" name="${columnObj.name}" value="${data[option.valueCol]}" ${i === 0 ? 'checked' : ''}>
																<label for="${columnObj.id}${i}" class="radio_label" ${data.checked && 'checked'} >${data[option.viewCol]}</label>
															</p>
														`;
													}
												};
												tbody += `
													</td>
												`;
											};
											if( columnObj.type === 'checkbox' ){
												tbody += `
													<th scope="row">${columnObj.title}</th>
													<td class="td_input" id="${columnObj.id}">
												`;
												if( columnObj.option !== undefined ){
													let option = columnObj.option;
													let datas = option.datas ?? [];
													for( let i = 0; i < datas.length; i++ ){
														let data = datas[i];
														tbody += `
															<p class="ad_input_row">
																<input type="checkbox" class="check" id="${columnObj.id}${i}" name="${columnObj.name}" value="${data[option.valueCol]}">
																<label for="${columnObj.id}${i}" class="check_label" ${data.checked && 'checked'} >${data[option.viewCol]}</label>
															</p>
														`;
													}
												};
												tbody += `
													</td>
												`;
											};
											if( columnObj.type === 'date' ){
												tbody += `
													<th scope="row">${columnObj.title}</th>
													<td class="td_input">
														<div class="dp_inline wd_200 va_m">
															<div class="input-group date">
																<div class="input-group-addon" id="${columnObj.id}Fa">
																	<i class="fa fa-calendar"></i>
																</div>
																<input type="text" placeholder="${columnObj.title}" class="form-control pull-right input-sm btDtpicker"
																		name="${columnObj.name}" id="${columnObj.id}" value="${columnObj.value ?? ''}" readonly>
															</div>
														</div>
													</td>
												`;
											};
											if( columnObj.type === 'dateFromTo' ){
												let divWidth = widthMax > 3 ? 120 : 150;
												tbody += `
													<th scope="row">${columnObj.title}</th>
													<td class="td_input">
														<div class="dp_inline wd_${divWidth} va_m">
															<div class="input-group date">
																<div class="input-group-addon" id="${columnObj.from.id}Fa">
																	<i class="fa fa-calendar"></i>
																</div>
																<input type="text" placeholder="${columnObj.from.title}" class="form-control pull-right input-sm btDtpicker"
																		name="${columnObj.from.name}" id="${columnObj.from.id}" value="${columnObj.from.value ?? ''}" readonly>
															</div>
														</div>
														~
														<div class="dp_inline wd_${divWidth} va_m">
															<div class="input-group date">
																<div class="input-group-addon" id="${columnObj.to.id}Fa">
																	<i class="fa fa-calendar"></i>
																</div>
																<input type="text" placeholder="${columnObj.to.title}" class="form-control pull-right input-sm btDtpicker"
																		name="${columnObj.to.name}" id="${columnObj.to.id}" value="${columnObj.to.value ?? ''}" readonly>
															</div>
														</div>
													</td>
												`;
											};
										};

										tbody += `</tr>`;
									}

									return tbody;
								}
							)()}
						</tbody>
					</table>
				</form>
			</div>
			<div class="box-footer ta_r">
				<button type="button" class="btn btn-sm btn-outline-danger" onclick="fnFormReset('${params.formId}');"><i class="fa fa-refresh mg_r5"></i>초기화</button>
				<button type="button" class="btn btn-sm btn-primary" onclick="(${fncName})();"><i class="fa fa-search mg_r5"></i>검색</button>
			</div>
		</div>
	`);
};
/**
* DataTables 커스텀 버튼만 생성 시
* @param _customBtnArr		: 기본 버튼 좌측에 추가할 버튼 배열
* @example
	$('#dataTableIdNm').dataTable({
		buttons: fn_DTbtnCustomCreate(
				, [
					{btnClass : 'btn btn-sm btn-outline-success',	icon : 'fa-download',	text : '업로드 양식 다운로드',	fnc : fnDownExcelSample},
					{btnClass : 'btn btn-sm btn-outline-success',	icon : 'fa-upload',		text : '엑셀 업로드',			fnc : fnExcelUpload}
				]
		),
	});
*/
fn_DTbtnCustomCreate = function(_customBtnArr){

	var _rtnArr = [];
	if( _customBtnArr !== undefined && _customBtnArr.length > 0 ){
		_rtnArr = _customBtnArr.map( item => ({
			className: `${item.btnClass}`,
			text: `<i class="fa ${item.icon} mg_r5"></i>${item.text}`,
			action: item.fnc
		}));
	}

	return _rtnArr;
};