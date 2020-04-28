import { GroupReplyRule } from '../_types'

export default {
  group: {
    // 杭電助手答疑群
    [REDACTED]: [
      [
        /(?=.*创新学分)(?=.*(怎么|哪里|如何))^.*$/i, // Regex to match (non-admin)
        [':cx', '：创新'], // Manually trigger (admin-only)
        '本群群文件「创新、实践学分」文件夹中有各类关于创新学分的内容可以参考。', // Reply template.
      ],
      [
        /(?=.*创新学fsiurjgjodrijgofijgoisjgoisjsijfsoidf分)^.*$/i, // Regex to match (non-admin)
        [':ios', '：ios'], // Manually trigger (admin-only)
        '返校系统目前仅对iOS11及以上版本系统保证兼容，较低版本无法保证兼容性，请升级系统或尝试使用安卓设备', // Reply template.
      ],
      [
        /(?=.*VPN)(?=.*(申请|怎么|连))^.*$/i,
        [':VPN', '：VPN'],
        "本科生VPN账号申请: http://pwd.hdu.edu.cn/vpn.aspx \n 研究生VPN说明: http://nic.hdu.edu.cn/2018/1220/c515a90123/page.htm \n 如果仅访问学术网站、图书馆网站，可以使用webVPN： https://pubvpn.hdu.edu.cn/ \n easyconnect使用方法具体可见群文件"
      ],
      [
        /(?=.*钉钉)(?=.*(组织|加入|手机|号码|修改|绑定|学生))(?=.*(不|没|再次|第二次|错|重新|失败|提示|显示))^.*$/i,
        [':dd', '：dd'],
        "无法加入钉钉组织或手机号错误？扫描下方二维码填报手机号\n[CQ:image,file=https://static2.hduhelp.com/A7B1712991B64CB60EBBC29CD2657E84.jpg]\n如果提示不能重新申请，请将学号及错误截图私发给 [CQ:at,qq=707425690] 并等待回复",
      ],
      [
        /(?=.*(回校方式|返校|交通|回校))(?=.*(错|修改|不对|重新|删除|撤回|临时))^.*$/i,
        [':hx', '：hx'],
        "回校交通方式将于近两日开放重新填报，请耐心等待",
      ],
    ] as GroupReplyRule[],
    [REDACTED]: [
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
      [
        /(?=.*VPN)(?=.*(申请|怎么|连))^.*$/i,
        [':VPN', '：VPN'],
        "本科生VPN账号申请: http://pwd.hdu.edu.cn/vpn.aspx \n 研究生VPN说明: http://nic.hdu.edu.cn/2018/1220/c515a90123/page.htm \n 如果仅访问学术网站、图书馆网站，可以使用webVPN： https://pubvpn.hdu.edu.cn/ \n easyconnect使用方法具体可见群文件",
      ],
      [
        /(?=.*钉钉)(?=.*组织|加入|手机|号码|修改|绑定|学生)(?=.*(不|没|再次|第二次|错|重新|失败|提示|显示))^.*$/i,
        [':dd', '：dd'],
        "无法加入钉钉组织或手机号错误？扫描下方二维码填报手机号\n[CQ:image,file=https://static2.hduhelp.com/A7B1712991B64CB60EBBC29CD2657E84.jpg]\n如果提示不能重新申请，请将学号及错误截图私发给 [CQ:at,qq=707425690] 并等待回复",
      ],
    ] as GroupReplyRule[],
  },
}
