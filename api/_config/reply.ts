import { GroupReplyRule } from '../_types'

const QaGroupReplyRules: GroupReplyRule[] = [
  [
    /(?=.*创新学分)(?=.*(怎么|哪里|如何))^.*$/i, // Regex to match (non-admin)
    [':cx', '：创新'], // Manually trigger (admin-only)
    '本群群文件「创新、实践学分」文件夹中有各类关于创新学分的内容可以参考。' // Reply template.
  ],
  [
    /(?=.*(请假|离校|出校))(?=.*(怎么|哪里|如何|不|没|有|啊|生成|码|能|该|出现))^.*$/i, // Regex to match (non-admin)
    [':qj', '：qj'], // Manually trigger (admin-only)
    '请假相关流程及常见问题请参考此链接的FAQ，常见问题均可找到答案：\n\n https://kb.hduhelp.com/pages/viewpage.action?pageId=1343504' // Reply template.
  ],
  [
    /(?=.*弗雷德)(?=.*(快递))(?=.*(请假))^.*$/i, // Regex to match (non-admin)
    [':fld', '：fld'], // Manually trigger (admin-only)
    '按照目前学校安排，去弗雷德取快递需要请假' // Reply template.
  ],
  [
    /(?=.*创新学fsiurjgjodrijgofijgoisjgoisjsijfsoidf分)^.*$/i, // Regex to match (non-admin)
    [':ios', '：ios'], // Manually trigger (admin-only)
    '返校系统目前仅对iOS11及以上版本系统保证兼容，较低版本无法保证兼容性，请升级系统或尝试使用安卓设备' // Reply template.
  ],
  [
    /(?=.*VPN)(?=.*(申请|怎么|连))^.*$/i,
    [':VPN', '：VPN'],
    '本科生VPN账号申请: http://pwd.hdu.edu.cn/vpn.aspx \n 研究生VPN说明: http://nic.hdu.edu.cn/2018/1220/c515a90123/page.htm \n 如果仅访问学术网站、图书馆网站，可以使用webVPN： https://pubvpn.hdu.edu.cn/ \n easyconnect使用方法具体可见群文件'
  ],
  [
    /(?=.*钉钉)(?=.*(组织|加入|手机|号码|修改|绑定|学生))(?=.*(不|没|再次|第二次|错|重新|失败|提示|显示|无法))^.*$/i,
    [':dd', '：dd'],
    '换绑手机号请在 「钉钉-设置-我的信息-电话」 修改\n\n' +
    '如果钉钉手机号绑定错误，或是需要加入钉钉组织，请扫描下方二维码填写手机号\n[CQ:image,file=https://static2.hduhelp.com/A7B1712991B64CB60EBBC29CD2657E84.jpg]\n如果提示不能重新申请，请将学号及错误截图私发给 [CQ:at,qq=923231246] 并等待回复'
  ],
  [
    /自动(审核|通过)/i,
    [':aa', '：审', '：審'],
    '假期自动审核严格按照规定执行，在另行通知前都会按规定自动审批。最常见无法自动批假的情况为2天内「当天出入（23:00前）」的请假外出有超时或未归情况。\n详细信息： https://kb.hduhelp.com/pages/viewpage.action?pageId=1343504#id-学生请假及出入校说明-自动审批'
  ],
  [
    /考生号/i,
    [':ksh', '：考生號', '：考生号'],
    '考生号是全国统一的高考考生编号，一般是 14 位，其中前两位是年份代码（20），请检查高考相关文件。\n' +
    '对于浙江省考生，考生号即准考证号。\n' +
    '新生可以在杭电招生页面查询自己的考生号。\n' +
    'http://zhaosheng.hdu.edu.cn/list.php?cid=114 \n' +
    '若尝试所有相关编号均无果可以延后一天再试。'
  ],
  [
    /(?=.*密码)(?=.*(忘|重置|))/i,
    [':pwd', '：密碼', '：密码'],
    '杭电助手的系统本身没有密码，而使用杭电统一认证登录来验证你的身份。\n' +
    '若需要重置统一认证登录的密码，请按 https://cas.hdu.edu.cn/cas/pwd 上的提示按步骤操作。\n' +
    '当发生学号变更（如升学情况），需要重新绑定微信学号时，请先在 https://one.hdu.edu.cn/tp_wp/wp/accountbind 解除老学号统一登录与微信的绑定，再在杭电助手微信公众号平台上进行绑定操作。' +
    '若需要重置一卡通系统密码，请按一卡通系统上的提示重置，如不能重置请联系学校后勤部门处置。\n' +
    '对于图书馆相关系统密码，请参见 https://mp.weixin.qq.com/s/WnnORWvctemn5w688XnGUQ 。\n' +
    '后勤大厅一卡通热水圈存机的密码默认为学号后六位。\n' +
    '对于阳光长跑的密码，请常见 http://hdu.sunnysport.org.cn。'
  ],
  // [
  //   /(?=.*招新)/i,
  //   [':zszx', '：招新', '：招新',':招新'],
  //   '杭电助手招新啦！ \n' +
  //     '杭电助手致力于服务全校师生，如果你们对我们正在做的项目，例如疫情防控、自助报道、健康打卡、特殊退改选等感兴趣，欢迎加入我们。\n' +
  //     '招新群群号：858541229 \n' +
  //     '[CQ:image,file=https://static2.hduhelp.com/zhaoxin.JPG] \n' +
  //     '扫码或点击链接报名哦 https://type.hduhelp.com',
  // ],
  [
    /(易班|上课啦).*(吗|\?|？)/i,
    [':yb', '：易班'],
    '本群为杭电助手答疑群，杭电助手不负责易班以及上课啦的问题，我们无法提供相关解答。\n' +
    '请前往杭电易班答疑群（654618144）尝试获得解答。'
  ],
  [
    /(助手).*(阳光长跑).*(暂停|关了|查询|怎么|哪里|如何|了|体联|？|\?)/i,
    [':sunrun', '：阳光长跑'],
    '出于一些原因，杭电助手阳光长跑服务已经暂停，具体原因请见: \n' +
    'https://salmon.hduhelp.com/_static/sunrunSunset.html \n\n' +
    '若要查询阳光长跑情况，请登录\n' +
    'http://hdu.sunnysport.org.cn'
  ],
  [
    /(助手).*(登录失败).*(怎么｜为什么|了|？|\?)/i,
    [':sf'],
    '关于钉钉自动登录失败相关问题，我们没有方法准确复现该问题。经过排查问题应该与钉钉小程序相关。\n' +
    '可以尝试以下方案:\n' +
    '1. 使用杭电助手微信公众号-更多-出入校申请\n' +
    '2. 在登录转跳时，不要点击任何按钮\n' +
    '3. 更换更好的网络环境\n' +
    '4. 清除钉钉缓存\n' +
    '5. 尝试旧版登录\n' +
    '6. 更新钉钉到最新版本'
  ]
]

const testRules: GroupReplyRule[] = [
  [
    /基本测试/,
    [':admin_only', '：管理员'],
    '基本的测试案例。非管理员关键字匹配「基本测试」，管理员匹配[:admin_only\', \'：管理员\']'
  ],
  [
    /(这|那)个东西/,
    [':thisthat', '：这个那个'],
    '非管理员正则匹配 /(这|那)个东西/，管理员匹配[\':thisthat\', \'：这个那个\']'
  ],
  [
    /(助手).*(登录失败).*(怎么｜为什么|了|？|\?)/i,
    [':sf'],
    '关于钉钉自动登录失败相关问题，我们没有方法准确复现该问题。经过排查问题应该与钉钉小程序相关。\n' +
    '可以尝试以下方案:\n' +
    '1. 使用杭电助手微信公众号-更多-出入校申请\n' +
    '2. 在登录转跳时，不要点击任何按钮\n' +
    '3. 更换更好的网络环境\n' +
    '4. 清除钉钉缓存\n' +
    '5. 尝试旧版登录\n' +
    '6. 更新钉钉到最新版本'
  ]
]

export default {
  group: {
    [REDACTED]: QaGroupReplyRules, // 杭電助手答疑群
    [REDACTED]: [...testRules, ...QaGroupReplyRules], // Lemon Tree
    [REDACTED]: [...testRules, ...QaGroupReplyRules] // Salmon
  }
}
