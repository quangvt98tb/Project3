export default function getDay() {
    var d = new Date()
    var hour = d.getHours()
    var minute = d.getMinutes()
    var second = d.getSeconds()
    var date = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    return (hour+':'+minute+':'+second+' '+date+'-'+month+'-'+year)
}

