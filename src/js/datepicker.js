const datepicker = (id, time = false) => {
    if (!document.getElementById(id)) return false;

    var nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    console.log(nextDay);


    var dp = $('#' + id).datepicker({
        language: 'ru',
        minDate: nextDay,
        dateFormat: 'd M yyyy',
        timepicker: time,
        onlyTimepicker: time,
        minHours: 0,
        maxHours: 21,
        position: 'bottom right',
        autoclose: true
    });

}
export default datepicker;