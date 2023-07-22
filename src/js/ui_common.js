$(function () {

  function tblBtn(cellValue, options, rowdata, action) {
    var html, txt = "";
    switch (cellValue) {
      case "edit":
        txt = "edit";
        break;
      case "del":
        txt = "del";
        break;
      case "dtl":
        txt = "dtl";
        break;
      case "down":
        txt = "down";
        break;
      case "file":
        txt = "file";
        break;
      default:
        txt = "none";
    }
    html = '<button type="button" class="axi btn_' + txt + '"></button>';
    return html;
  }

  // calendar
  $.datetimepicker.setLocale('kr');
  $('#datetimepicker').datetimepicker();

  $('#date_timepicker_start').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
      this.setOptions({
        maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
      })
    },
    timepicker: false
  });

  $('#date_timepicker_end').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
      this.setOptions({
        minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
      })
    },
    timepicker: false
  });

  // pop
  var popBtn = $('[openpop]');
  popBtn.on('click', function () {
    var target = $(this).attr('openpop');
    $('#' + target).show();
  })
  var closePop = $('.btn_pop_close');
  closePop.on('click', function () {
    $(this).parents('.pop_overlay').hide();
  })

  $('.con_list .more').on('click', function () {
    $(this).toggleClass('on');
    $(this).parent('p').nextAll('ul').slideToggle('fast');
  })

  // toggle button
  $('.btn_toggle').on('click', function (e) {
    e.preventDefault();
    var cur = $(this).attr('datavalue');
    if ($(this).attr('disabled') == 'disabled') return false;
    if (cur == 'on') {
      $(this).attr('datavalue', 'off');
    } else {
      $(this).attr('datavalue', 'on');
    }
  })
  $('input[type="range"]').on('change',function(){
    rangeEvt($(this));
  })
  //addOPT
  $('[data-checkEvt]').on('change',function(e){
    const getTarget = e.target.dataset.checkevt,
          target = $("#" + getTarget);
    ($(this).prop('checked')) ? target.show() : target.hide();
  })

  // tab
  $('[data-tab="lst"]').children('li:first a').addClass('on');
  $('[data-tab="cont"]').hide();
  $('[data-tab="container"]').find('[data-tab="cont"]:first').show();
  $('[data-tab="lst"]').on('click','a',function(e){
    e.preventDefault();
    const target = $(this).attr('href');
    $(this).closest('[data-tab="tab"]').next('[data-tab="container"]').children('[data-tab="cont"]').hide();
    $(this).closest('[data-tab="tab"]').find('a').removeClass('on');
    $(this).addClass('on');
    $(target).show();
    // jqgridInit();
  })

  const select_custom = $('.select_custom');
  select_custom.on('click','.optionItem',function(e){    
    handleSelect(e.target);
  });
  select_custom.on('click','.label',function(){
    ($(this).parent().hasClass('active')) ? $(this).parent().removeClass('active') : $(this).parent().addClass('active')
  })
  $('select').on('change',function(){
    $(this).css('color','inherit');
  });
})
function rangeEvt(el){
  var rel = el.prop('id');
  var target = $(`[for=${rel}]`).find('span');
  var value = el.val();
  target.text(`${value}`);
}
function jqgridInit(){
  $('.jq-grid').each(function(){
    var grids=$(this);
    grids.setGridWidth($(this).closest('.tbl_wrap').width() - 4);
  });  
}
const handleSelect = function (item) {
  const result = $(item).closest('.select_custom').find('.label');
  const resultVal = item.dataset.value; 
  result.html($(item).innerHtml).attr('data-value',resultVal);
  result.parent().removeClass('active');
  console.log(resultVal);
}