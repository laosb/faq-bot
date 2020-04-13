export default {
  group: {
    // 杭電助手答疑群
    [REDACTED]: [
      [
        /创新学分/, // Regex to match (non-admin)
        [':cx', '：创新'], // Manually trigger (admin-only)
        '本群群文件「创新、实践学分」文件夹中有各类关于创新学分的内容可以参考。', // Reply template.
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
    ] as GroupReplyRule[],
  },
}
