// only support format yyyy/mm/dd
function isValidDate(dateString, format)
{
	if (format == null || format == 'undefined') {
		format = 'yyyy/mm/dd';
	}
	if (format == 'yyyy/mm/dd') {
		var temp = dateString.split('/');
		var d = new Date(temp[0] + '/' + temp[1] + '/' + temp[2]);
		return (d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0]));
	}
	return false;
}
function str_pad(width, string, padding) { 
  return (width <= string.length) ? string : str_pad(width, padding + string, padding);
}

(function($){
	$(document).ready(function() {
		fn_dateTime('#from_date', '#from_trigger');
		fn_dateTime('#to_date', '#to_trigger');
		
		var today = new Date();						
		var tomorow = new Date(today.getTime()+(1*24*60*60*1000));
			
		$("#from_date").datepicker("option", "minDate", today);
		$("#to_date").datepicker("option", "minDate", tomorow);
		
		setDateOption = function() {			
			invalidFromDate = ($("#from_date").val() == '' || isValidDate($("#from_date").val())==false);
			invalidToDate = ($("#to_date").val() == '' || isValidDate($("#to_date").val())==false);
			
			if (invalidFromDate && invalidToDate) { 				
				$("#from_date").datepicker("option", "minDate", today);		
				$("#to_date").datepicker("option", "minDate", tomorow);
				$("#to_date").datepicker("option", "maxDate", null);
			} else if (invalidToDate) {
				var toMinDate = new Date(new Date($('#from_date').datepicker('getDate')).getTime()+(1*24*60*60*1000));
				$("#to_date").datepicker("option", "minDate", toMinDate);
				$("#to_date").datepicker("option", "maxDate", null);
			} else if (invalidFromDate) {	
				var fromMaxDate = new Date(new Date($('#to_date').datepicker('getDate')).getTime()-(1*24*60*60*1000));			
				$("#from_date").datepicker("option", "minDate", today);
			}
		}
		
		$("#from_date").keyup(function(){	
			setDateOption();
		});
		$("#to_date").keyup(function(){
			setDateOption();
		});	
	});
    
    /* Function get common calendar */
    function fn_dateTime(selector, trigger) {
        var currentToday  = new Date();
        $(selector).datepicker({
            dayNames: ['(日)', '(月)', '(火)','(水)','(木)', '(金)', '(土)'],
            dayNamesMin: ['日', '月', '火','水','木', '金', '土'],
            monthNames: ['1月','2月','3月','4月','5月','6月',
                '7月','8月','9月','10月','11月','12月' ],
            monthNamesShort: ['1月','2月','3月','4月','5月','6月',
                '7月','8月','9月','10月','11月','12月' ],
            dateFormat: 'yy/mm/ddDD',
            lang: 'ja',
            numberOfMonths: 2,
            showOtherMonths: true,
            selectOtherMonths: false,
           showMonthAfterYear: true,
            yearSuffix: '年',
            minDate: 0,
            maxDate:365,
            gotoCurrent: true,

            beforeShowDay: function(date) {
                var result;
                var dd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                var hName = ktHolidayName(dd);
                if(hName != "") {
                    result = [true, "holiday", hName];
                } else {
                    switch (date.getDay()) {
                        case 0: //
                            result = [true, "sunday"];
                            break;
                        case 6: //
                            result = [true, "saturday" ];
                            break;
                        default:
                            result = [true];
                            break;
                    }
                }
                return result;
            }, // end beforeShowDay

            onSelect: function(dateText, inst) {
                if (selector=='#to_date' && $('#from_date').val()=='') {
                    var date1 = $('#to_date').datepicker('getDate');
                    date1.setDate(date1.getDate() - 1);
                    $('#from_date').datepicker('setDate', date1);
                }
                if (selector=='#from_date' && $('#to_date').val()=='') {
                    var date2 = $('#from_date').datepicker('getDate');
                    date2.setDate(date2.getDate() + 1);
                    $('#to_date').datepicker('setDate', date2);
                }

				var fromMaxDate = new Date(new Date($('#to_date').datepicker('getDate')).getTime()-(1*24*60*60*1000));
				var toMinDate = new Date(new Date($('#from_date').datepicker('getDate')).getTime()+(1*24*60*60*1000));
                $('#to_date').datepicker("option", "minDate", toMinDate);

                var from = new Date($('#from_date').datepicker('getDate'));
                var to = new Date($('#to_date').datepicker('getDate'));
                var timeDiff = Math.abs(to.getTime() - from.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
											
				if ($('#day_stay').length > 0) {
					$('#day_stay').val(diffDays);
					$('#day_stay_text').val(diffDays + ' 泊');
				}	
				if ($('#in_Day').length > 0) {				
					$('#in_Day').val(from.getDate());
				}
				if ($('#in_Month').length > 0) {				
					$('#in_Month').val(from.getFullYear() + '/' + (from.getMonth() + 1));
				}
                if ($('#out_Day').length > 0) {	
					$('#out_Day').val(to.getDate());
				}
				if ($('#out_Month').length > 0) {	
					$('#out_Month').val(to.getFullYear() + '/' + (to.getMonth() + 1));
				}				
				
            }, // end onSelect
            onClose: function () {                
                
            } 
        }); // end datepicker

        $(trigger).click(function() {
            $(selector).datepicker('show');
        });
    }
})($);



