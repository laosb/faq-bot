import { GroupReplyRule } from '../_types'

const QaGroupReplyRules: GroupReplyRule[] = [
  [
    /(?=.*创新学分)(?=.*(怎么|哪里|如何))^.*$/i, // Regex to match (non-admin)
    [':cx', '：创新'], // Manually trigger (admin-only)
    '本群群文件「创新、实践学分」文件夹中有各类关于创新学分的内容可以参考。', // Reply template.
  ],
  [
    /(?=.*(请假|离校|出校))(?=.*(怎么|哪里|如何|不|没|有|啊|生成|码|能|该|出现))^.*$/i, // Regex to match (non-admin)
    [':qj', '：qj'], // Manually trigger (admin-only)
    '请假相关流程及常见问题请参考此链接的FAQ，常见问题均可找到答案：\n\n https://kb.hduhelp.com/pages/viewpage.action?pageId=1343504', // Reply template.
  ],
  [
    /(?=.*弗雷德)(?=.*(快递))(?=.*(请假))^.*$/i, // Regex to match (non-admin)
    [':fld', '：fld'], // Manually trigger (admin-only)
    '按照目前学校安排，去弗雷德取快递需要请假', // Reply template.
  ],
  [
    /(?=.*创新学fsiurjgjodrijgofijgoisjgoisjsijfsoidf分)^.*$/i, // Regex to match (non-admin)
    [':ios', '：ios'], // Manually trigger (admin-only)
    '返校系统目前仅对iOS11及以上版本系统保证兼容，较低版本无法保证兼容性，请升级系统或尝试使用安卓设备', // Reply template.
  ],
  [
    /(?=.*VPN)(?=.*(申请|怎么|连))^.*$/i,
    [':VPN', '：VPN'],
    '本科生VPN账号申请: http://pwd.hdu.edu.cn/vpn.aspx \n 研究生VPN说明: http://nic.hdu.edu.cn/2018/1220/c515a90123/page.htm \n 如果仅访问学术网站、图书馆网站，可以使用webVPN： https://pubvpn.hdu.edu.cn/ \n easyconnect使用方法具体可见群文件',
  ],
  [
    /(?=.*钉钉)(?=.*(组织|加入|手机|号码|修改|绑定|学生))(?=.*(不|没|再次|第二次|错|重新|失败|提示|显示|无法))^.*$/i,
    [':dd', '：dd'],
    '对于本科新生：在杭电助手微信公众号菜单「生活」-「新生号码」完成手机号留存。\n\n' +
      '换绑手机号请在 「钉钉-设置-我的信息-电话」 修改\n\n' +
      '如果手机号上报错误，或者上报了手机号却没有加入组织，请扫描下方二维码修正手机号\n[CQ:image,file=https://static2.hduhelp.com/A7B1712991B64CB60EBBC29CD2657E84.jpg]\n如果提示不能重新申请，请将学号及错误截图私发给 [CQ:at,qq=923231246] 并等待回复',
  ],
  [
    /自动(审核|通过)/i,
    [':aa', '：审', '：審'],
    '假期自动审核严格按照规定执行，在另行通知前都会按规定自动审批。最常见无法自动批假的情况为7天内「2小时以内」的请假外出有超时或未归情况，或「2小时以上(当天返回)」请假有未归记录。\n详细信息： https://kb.hduhelp.com/pages/viewpage.action?pageId=1343504#id-学生请假及出入校说明-自动审批',
  ],
  [
    /考生号/i,
    [':ksh', '：考生號', '：考生号'],
    '考生号是全国统一的高考考生编号，一般是 14 位，其中前两位是年份代码（20），请检查高考相关文件。\n' +
      '对于浙江省考生，考生号即准考证号。\n' +
      '新生可以在杭电招生页面查询自己的考生号。\n' +
      'http://zhaosheng.hdu.edu.cn/list.php?cid=114 \n' +
      '若尝试所有相关编号均无果可以延后一天再试。',
  ],
]

const testRules: GroupReplyRule[] = [
  [
    /基本测试/,
    [':admin_only', '：管理员'],
    "基本的测试案例。非管理员关键字匹配「基本测试」，管理员匹配[:admin_only', '：管理员']",
  ],
  [
    /(这|那)个东西/,
    [':thisthat', '：这个那个'],
    "非管理员正则匹配 /(这|那)个东西/，管理员匹配[':thisthat', '：这个那个']",
  ],
]

export default {
  group: {
    [REDACTED]: QaGroupReplyRules, // 杭電助手答疑群
    [REDACTED]: [...testRules, ...QaGroupReplyRules], // Lemon Tree
    [REDACTED]: [...testRules, ...QaGroupReplyRules], // Salmon
  },
}
