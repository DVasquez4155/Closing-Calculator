$('#save').click(function() {
    var reportDone = true;
    var e = document.calculator;
    for (i = 0; i < e.length; i++) {
        if($(e[i]).attr('required') == "required") {
            if (e[i].value == "") {
                reportDone = false;
                break;
            }
        }
    }
    if (!reportDone) {
        $('#notComplete').modal('show');
        return;
    }
    addValue('closeReport',currentSales)
    window.location.href = 'index.html';
})
const us = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
const percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
})
var values = getValues('closeReport')
$(document.calculator).on('change', function(e){
    loadShift(this)
})
$('#exitBarButton').on('click', function () {
    loadShift(document.calculator)
})
loadShift(document.calculator)
var currentSales;
function loadShift(calc) {
    var bar = document.bar;
    currentBarSales = new barSales({
        liquor : bar.liquor.value,
        beerBtl : bar.beerBtl.value,
        beerKeg : bar.beerKeg.value,
        wineCorked : bar.wineCorked.value,
        wineGlass : bar.wineGlass.value
    });
    currentSales = new sales({
        name :  calc.name.value,
        station:  calc.station.value,
        date:  calc.date.value,
        shift:  calc.shift.value,
        tipCharge:  calc.tipCharge.value,
        chargeTip:  calc.chargeTip.value,
        otherSales:  calc.otherSales.value,
        cashTips:  calc.cashTips.value,
        bar:  currentBarSales
    })
    calculator(currentSales, calc)
}
function calculator(currentShift,form) {
    form.chargePercent.value = percent.format(currentShift.chargePercent());
    form.cashPercent.value = percent.format(currentShift.cashPercent());
    form.totalSales.value = us.format(currentShift.totalSales());
    form.totalTips.value = us.format(currentShift.totalTips());
    form.totalPercent.value = percent.format(currentShift.totalPercent());
    form.barSales.value = us.format(currentShift.bar.barSales());
    form.barTips.value = us.format(currentShift.barTips());
    form.busserTips.value = us.format(currentShift.busserTips());
    form.totalTipsPaid.value = us.format(currentShift.totalTipsPaid());
    form.netTips.value = us.format(currentShift.netTips());
}

$('#return').on('click', function(e) {
    window.location.href = 'index.html';
})

var report = document.calculator;
var bar = document.bar;
var hash = parseInt(location.hash.substring(1));
function fill(shiftNumber){
    var shift = values[shiftNumber];
    report.name.value = shift.name;
    report.station.value = shift.station;
    report.date.value = shift.date;
    report.shift.value = shift.shift;
    report.tipCharge.value = shift.tipCharge;
    report.chargeTip.value = shift.chargeTip;
    report.otherSales.value = shift.otherSales;
    report.cashTips.value = shift.cashTips;
    var reportedBarSales =  new barSales(shift.bar)
    bar.liquor.value = reportedBarSales.liquor;
    bar.beerBtl.value = reportedBarSales.beerBtl;
    bar.beerKeg.value = reportedBarSales.beerKeg;
    bar.wineCorked.value = reportedBarSales.wineCorked;
    bar.wineGlass.value = reportedBarSales.wineGlass;
    loadShift(report)
}
window.onload = function(){
    if (!isNaN(hash)) {
        disableForm(report);
        disableForm(document.bar);
        $('#save').attr('style', 'visibility: hidden;')
        fill(hash)
    }
};
function disableForm(form) {
    for (i = 0; i < form.length; i++) {
        if ($(form[i]).attr('type') != 'button') {
            $(form[i]).attr('disabled', true)
        }
    }
}