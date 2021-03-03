var superagent = require('superagent')
var cheerio = require('cheerio')

var webVPN_ID = ''
var webVPN_Pwd = ''

var jwID = webVPN_ID;
var jwPwd = ''

var webVpnToken = '';

async function getWebVPNToken_(myagent,error) {
    vpnLoginPostData = {
        auth_type: 'local',
        username: webVPN_ID,  // '这里填写学号
        sms_code: '',
        password: webVPN_Pwd,  // 这里填写密码
    }
    headers = {
        'Origin': 'http://webvpn.bupt.edu.cn',
        'Referer': 'http://webvpn.bupt.edu.cn/login',
        'Host': 'webvpn.bupt.edu.cn',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15'
    }
    return await new Promise(function (resolve) {
        myagent.post('http://webvpn.bupt.edu.cn/do-login?local_login=true').set(headers).send(vpnLoginPostData).then(
            function (res) {
                if (res.text.indexOf('用户名密码错误') !== -1) throw new Error('WebVPN用户名密码错误')
                // console.log(res.text)
                resolve(res.text)
            }
        ).catch(err=>{error(err)})
    }).catch(err=>{error(err)})
}

exports.getAgent = function () {
    return superagent.agent();
}

exports.getAgentWithVpn = async function (webid, webpwd,error) {
    webVPN_ID = webid;
    webVPN_Pwd = webpwd;
    var agent = superagent.agent();
    await getWebVPNToken(agent,error);
    return agent;
}

exports.loginJwxt = function (sid, jwpwd, agent, todo,error) {
    jwPwd = jwpwd;
    jwID = sid;
    loginJwxt(agent, todo,error)
}

async function getWebVPNToken(myagent,error, tryNum = 0) {
    var result = await getWebVPNToken_(myagent,error);
    if(result.indexOf('快速跳转')!=-1){
        return;
    }

}

function loginJwxt(myagent, todo,error) {
    var jwxt = "http://webvpn.bupt.edu.cn/https/77726476706e69737468656265737421fae0469069327d406a468ca88d1b203b/jsxsd/xk/LoginToXk"
    // Buffer.from('Hello').toString('base64')
    jwLoginPostData = {
        'userAccount': jwID,  // '这里填写学号
        'userPassword': '',  // 这里填写密码
        'encoded': Buffer.from(jwID).toString('base64') + '%%%'
            + Buffer.from(jwPwd).toString('base64')
    }
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15',
    }
    myagent.set(headers).post(jwxt).send(jwLoginPostData).then(function (res) {
        if (res.text.indexOf('密码提示为') !== -1) {
            throw new Error('教务系统密码错误');
        } else {
            dosth(myagent, todo);
        }
    }).catch(err => {error(err);})
}

function dosth(myagent, todo) {
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Connection': 'keep-alive',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15',
    }

    if (todo.type == 'cj') {
        var url = 'https://webvpn.bupt.edu.cn/https/77726476706e69737468656265737421fae0469069327d406a468ca88d1b203b/jsxsd/kscj/cjcx_list'

        var lastCid = '';

        myagent.get(url).set(headers).then(function (res) {
            var $ = cheerio.load(res.text);
            var result = [];
            $('table tr').each(function (i, element) {
                var grade = {};
                const tds = $(element).find('td')
                if ($(tds[2]).text() === lastCid) return;
                lastCid = $(tds[2]).text()
                grade.xueqi = $(tds[1]).text();
                grade.cname = $(tds[3]).text() + $(tds[4]).text();
                grade.score = $(tds[5]).text().trim()
                grade.desc = $(tds[6]).text()
                grade.xuefen = $(tds[7]).text()
                grade.jidian = $(tds[9]).text()
                result.push(grade);
            })
            todo.callback(result);
        })
    } else if (todo.type == 'kcb') {
        var url = 'https://webvpn.bupt.edu.cn/https/77726476706e69737468656265737421fae0469069327d406a468ca88d1b203b/jsxsd/framework/main_index_loadkb.jsp'

        myagent.post(url).set(headers).send({ rq: todo.date }).then(function (res) {
            var $ = cheerio.load(res.text);
            var kcb = [];
            $('table tbody tr').each((i, e) => {
                var row = []
                $(e).find('td').each((ii, ee) => {
                    var text = $(ee).html();
                    if (text.indexOf('课程名称') !== -1) {
                        try {
                            row.push('<span class="classname">' + text.match(/课程名称：(\S*)<br/)[1] + '</span><br>' + text.match(/上课地点：(\S*)<br/)[1]);
                        } catch (e) {
                            row.push('<span class="classname">' + text.match(/课程名称：(\S*)<br/)[1] + '</span><br>' + text.match(/上课地点：(\S*)"/)[1]);
                        }
                        return;
                    }
                    row.push(text.replaceAll('\t', '').replaceAll('\n', ''))
                })
                kcb.push(row)
            })
            // 处理第一列
            for (let i = 0; i < kcb.length; i++) {
                kcb[i][0] = '<span class="largeNum">' + kcb[i][0].split('<br>')[0] + '</span> ' + kcb[i][0].split('<br>')[2]
            }
            // 处理连堂
            console.log(kcb);
            if (kcb.length > 0)
                for (let i = 1; i < kcb[0].length; i++) {
                    var j = 1;
                    var target = 0;
                    while (j < kcb.length)
                        if (kcb[j][i] == kcb[target][i] && kcb[j][i] != '') {
                            delete kcb[j][i];
                            j++;
                            if(j==kcb.length){
                                if ((j - target) > 1) kcb[target][i] = '<td class="multiclass" rowspan="' + (j - target) + '">' + kcb[target][i] + '</td>';
                                target = j;
                                j++;
                            }
                        } else {
                            if ((j - target) > 1) kcb[target][i] = '<td class="multiclass" rowspan="' + (j - target) + '">' + kcb[target][i] + '</td>';
                            target = j;
                            j++;
                        }
                }
            //console.log(kcb)
            // 将数组格式化为html代码
            var result = '<thead>' + $('table thead').html() + '</thead><tbody>'
            for (let i = 0; i < kcb.length; i++) {
                result += '<tr>'
                for (let j = 0; j < kcb[i].length; j++) {
                    if (kcb[i][j] === undefined) continue;
                    else if (kcb[i][j].indexOf('<td') == 0) result += kcb[i][j]
                    else result += '<td>' + kcb[i][j] + '</td>'
                }
                result += '</tr>'
            }
            result += '</tbody>'
            todo.callback(result);
        })
    }
}