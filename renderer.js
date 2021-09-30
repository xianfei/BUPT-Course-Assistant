// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.jQuery = require("./jquery.js");
const { ipcRenderer, remote } = require('electron')
const { FindInPage } = require('electron-find')
let findInPage = new FindInPage(remote.getCurrentWebContents(), {
    offsetTop: 50,
    offsetRight: 10
})
const jw = require('./jwxt.js')



var currentTab = 'grades'
var agent = null;

function DateToStr(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    dateTime = year + "-" + month + "-" + day;
    return dateTime;

}

var kcbDate = DateToStr(new Date());
var kcbWeekOffset = 0;

const digitChar = ['', ...'一二三四五六七八九']
const posChar = ['', ...'十百千万   亿']
const placeholder = '零'

function toChineseNumeral(digits) {
    let revDigits = digits.split('').reverse()
    let result = ''
    for (let pos = 0; pos < revDigits.length; pos++) {
        const digit = Number(revDigits[pos])
        if (digit) { result = posChar[pos] + result }
        if (digit !== 1 || pos !== 1) { result = digitChar[digit] + result }
        if (!digit && pos && result && !result.startsWith(placeholder)) { result = placeholder + result }
    }
    return result
}

function switchNews(ele) {
    if (ele.innerText == '切换到校内新闻') {
        ele.innerText = '切换到通知公告'
        document.getElementById('xxmh').contentWindow.location.href = 'https://webapp.bupt.edu.cn/extensions/wap/news/list.html'
    } else {
        ele.innerText = '切换到校内新闻'
        document.getElementById('xxmh').contentWindow.location.href = 'https://webapp.bupt.edu.cn/extensions/wap/news/list.html?type=tzgg'
    }
}

function changeKcbWeb(offset) {
    showLoading('正在加载');
    var sid = localStorage.getItem('sid');
    if (sid == null) return;
    var jwpwd = localStorage.getItem('jwpwd');
    kcbWeekOffset += offset;
    var dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 7 * kcbWeekOffset);
    kcbDate = DateToStr(new Date(dateTime));
    if (kcbWeekOffset < 0) {
        $('#currentweek').text(toChineseNumeral('' + (-kcbWeekOffset)) + '周前')
    } else if (kcbWeekOffset > 0) {
        $('#currentweek').text(toChineseNumeral('' + (kcbWeekOffset)) + '周后')
    } else {
        $('#currentweek').text('当前周')
    }
    try {
        var mytodo2 = {
            callback: (kb) => {
                console.log(kb)
                $('#class_table').html(kb)
                showSuccess('切换周数成功');
            }, type: 'kcb', date: kcbDate
        }
        jw.loginJwxt(sid, jwpwd, agent, mytodo2,showError)
    } catch (err) {
        showError(err)
    }
}

//$('#left').load('')

$('.sidebar-item').each((i, e) => {
    e.onclick = () => { changeTab(e) };
})

function changeTab(ele) {
    $('.sidebar-item').each((i, e) => {
        if (e == ele) {
            $(e).addClass('selected');
            $('#' + e.getAttribute('id') + 'tab').show()
            currentTab = ele.getAttribute('id');
        }
        else {
            $(e).removeClass('selected');
            $('#' + e.getAttribute('id') + 'tab').hide()
        }
    })
}



var xxmhOnload = () => {
    document.getElementById('xxmh').contentWindow.needload = ''
    $("#xxmh").contents().find('body').css('background', '#ffffff00')
    $("#xxmh").contents().find('.wrapper-img')[0].remove()
    $("#xxmh").contents().find('body').css('font-family', '"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif')
    $("#xxmh").contents().find('.decro-line')[0].remove()
    $("#xxmh").contents().find('.time-title').css({ 'height': '60px' })
    $("#xxmh").contents().find('.time-title span').css({ 'background': 'none', 'margin': '10px', 'margin-top': '20px' })
    $("#xxmh").contents().find('.news-wrapper .info').css('padding-left', '15px')
    $("#xxmh").contents().find('ul h3').css('padding-left', '15px')
    $("#xxmh").contents().find('.news-wrapper li').css({ 'margin-bottom': '0px', 'background': '#ffffff88' })
    $("#xxmh").contents().find('li h3 a p').each((i, e) => {
        if (!e.onclick) return;
        e.parentNode.parentNode.parentNode.setAttribute('test', e.getAttribute('onclick').split("'")[1]);
        e.parentNode.parentNode.parentNode.setAttribute('onclick', "needload=this.getAttribute('test')");
        e.onclick = false;
        e.removeAttribute('onclick');
    })
    $("#xxmh").contents().find('.brief-info a').each((i, e) => { e.remove(); })
    $(document.getElementById('xxmh').contentWindow).scroll(function (event) {
        scrolled = true;
    });
}


var scrolled = false;

var title = '北邮课程小助手 内测版';

function showLoading(str) {
    $('#titlebar').html('<span><div><i class="gg-spinner-two"></i></div><div>' + str + '</div></span>')
}

function showError(str) {
    $('#titlebar').html('<span><div><i class="gg-smile-sad"></i></div><div>' + str + '</div></span>')
}

function showSuccess(str) {
    $('#titlebar').html('<span><div><i class="gg-smile-mouth-open"></i></div><div>' + str + '</div></span>')
    setTimeout(() => {
        $('#titlebar').fadeOut(200, () => {
            $('#titlebar').html(title);
            $('#titlebar').fadeIn(100);
        })
    }, 2000)
}



setInterval(() => {
    if (!scrolled) return;
    scrolled = false;
    $("#xxmh").contents().find('body').css('background', '#ffffff00')
    $("#xxmh").contents().find('.time-title').css({ 'height': '60px' })
    $("#xxmh").contents().find('.time-title span').css({ 'background': 'none', 'margin': '10px', 'margin-top': '20px' })
    $("#xxmh").contents().find('.news-wrapper .info').css('padding-left', '15px')
    $("#xxmh").contents().find('ul h3').css('padding-left', '15px')
    $("#xxmh").contents().find('.news-wrapper li').css({ 'margin-bottom': '0px', 'background': '#ffffff88' })
    $("#xxmh").contents().find('li h3 a p').each((i, e) => {
        if (!e.onclick) return;
        e.parentNode.parentNode.parentNode.setAttribute('test', e.getAttribute('onclick').split("'")[1]);
        e.parentNode.parentNode.parentNode.setAttribute('onclick', "needload=this.getAttribute('test')");
        e.onclick = false;
        e.removeAttribute('onclick');
    })
    $("#xxmh").contents().find('.brief-info a').each((i, e) => { e.remove(); })
}, 200)

setInterval(() => {
    if (currentTab != 'news') return;
    if (!document.getElementById('xxmh').contentWindow.needload) return;
    if (document.getElementById('xxmh').contentWindow.needload == '') return;
    $('#detail').load('https://webapp.bupt.edu.cn/' + document.getElementById('xxmh').contentWindow.needload + ' .container ul');
    // $("#detail").attr("src", 'https://webapp.bupt.edu.cn/'+document.getElementById('xxmh').contentWindow.needload);
    document.getElementById('xxmh').contentWindow.needload = '';
    // $('#detail').on('load',  () => {
    //     $("#detail").contents().find('.wrapper-img')[0].remove();
    //     $("#detail").contents().find('.time-title')[0].remove();
    //     $("#detail").contents().find('body').css('font-family', '"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif')
    // })

}, 100)

window.onresize = () => {
    $('#xxmh').css('height', '' + (remote.getCurrentWindow().getBounds().height - 40) + 'px')
    $('#detail').css('height', '' + (remote.getCurrentWindow().getBounds().height - 35) + 'px')
    $('#right').css('height', '' + (remote.getCurrentWindow().getBounds().height - 40) + 'px')
    $('#gradescon').css('height', '' + (remote.getCurrentWindow().getBounds().height - 40) + 'px')
    $('#gradescon').css('width', '' + (remote.getCurrentWindow().getBounds().width - 78) + 'px')
    $('#classtablecon').css('height', '' + (remote.getCurrentWindow().getBounds().height - 40) + 'px')
    $('#classtablecon').css('width', '' + (remote.getCurrentWindow().getBounds().width - 82) + 'px')
    $('#class_table').css('width', '' + (remote.getCurrentWindow().getBounds().width - 82) + 'px')
    $('.titlebar').css('width', '' + (remote.getCurrentWindow().getBounds().width - 70) + 'px')
    $('.mdui-textfield-input').css('color',$('body').css('color'))
    $('.mdui-textfield-label').css('color',$('body').css('color'))

}
window.onresize();

window.onload = async function () {
    if (localStorage.getItem('kb') != null) $('#class_table').html(localStorage.getItem('kb'));
    var sid = localStorage.getItem('sid');
    if (sid == null) showError('您还未设置用户信息');
    var jwpwd = localStorage.getItem('jwpwd');
    var webvpwd = localStorage.getItem('webvpwd');
    $('#sid').val(sid)
    $('#jwpwd').val(jwpwd)
    $('#webvpwd').val(webvpwd)

    showLoading('正在加载新数据');
    try {
        agent = await jw.getAgentWithVpn(sid, webvpwd,showError)
        console.log(agent)
        var ok1 = false, ok2 = false;
        var mytodo = {
            callback: (grades) => {
                console.log(grades);
                grades.forEach(e => {
                    $('#showgrades').append(
                        //`<div class="flex-item" style="background:${'#' + (190 + Math.floor(Math.random() * (2 << 5))).toString(16) + (190 + Math.floor(Math.random() * (2 << 5))).toString(16) + (190 + Math.floor(Math.random() * (2 << 5))).toString(16) + (123 + Math.floor(Math.random() * (2 << 6))).toString(16)};">
                        `<div class="flex-item">
            <span class="cname">${e.cname}</span>
            <span class="score">${e.score}</span>
            <div class="cdesc">${e.xueqi}&nbsp;&nbsp;学分:${e.xuefen}&nbsp;&nbsp;绩点:${e.jidian}</div>
        </div>`
                    )
                    ok1 = true;
                    if (ok1 && ok2) showSuccess('加载成功');
                })
            }, type: 'cj'
        }
        jw.loginJwxt(sid, jwpwd, agent, mytodo,showError)

        var mytodo2 = {
            callback: (kb) => {
                console.log(kb)
                $('#class_table').html(kb)
                localStorage.setItem('kb', kb);
                ok2 = true;
                if (ok1 && ok2) showSuccess('加载成功');
            }, type: 'kcb', date: kcbDate
        }
        jw.loginJwxt(sid, jwpwd, agent, mytodo2,showError)
    } catch (err) {
        showError(err)
    }
}

function saveUser() {
    localStorage.setItem('sid', $('#sid').val());
    localStorage.setItem('jwpwd', $('#jwpwd').val());
    localStorage.setItem('webvpwd', $('#webvpwd').val());
    window.onload();
}