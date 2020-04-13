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
  },
}
