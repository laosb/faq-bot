import { GroupReplyRule } from '../_types'

export default {
  group: {
    // 杭電助手答疑群
    [REDACTED]: [
      [
        /创新学分/, // Regex to match (non-admin)
        [':cx', '：创新'], // Manually trigger (admin-only)
        '本群群文件「创新、实践学分」文件夹中有各类关于创新学分的内容可以参考。', // Reply template.
      ],
      [
        /(?=.*VPN)(?=.*(申请|怎么|连))^.*$/i,
        [':VPN', '：VPN'],
        "本科生VPN账号申请: http://pwd.hdu.edu.cn/vpn.aspx \n 研究生VPN说明: http://nic.hdu.edu.cn/2018/1220/c515a90123/page.htm \n 如果仅访问学术网站、图书馆网站，可以使用webVPN： https://pubvpn.hdu.edu.cn/ \n easyconnect使用方法具体可见群文件"
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
    ] as GroupReplyRule[],
  },
}
