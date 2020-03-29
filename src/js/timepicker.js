const timepicker = (id) => {
    if (!document.getElementById(id)) return false;
    $('.only-time').datepicker({
        dateFormat: ' ',
        timepicker: true,
        classes: 'only-timepicker'
    });
}

export default timepicker;