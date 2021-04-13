import hduhelpQaGroupWhitelist from './hduhelpQaGroupWhitelist'
export default {
  cqHttpEndpoint: 'https://[REDACTED]',
  logGroup: [REDACTED], // FAQ Bot Log
  groupInviterWhitelist: [
    [REDACTED], // laosb
  ],
  hduRealnameVerifyGroups: [
    // 杭電真實身分認證
    [REDACTED], // 答疑群
    [REDACTED], // Lemon Tree
    [REDACTED], // 干锅群
    [REDACTED], // Salmon
    [REDACTED], // Apple 用戶群
  ],
  autoMaintainGroups: {
    [REDACTED]: 2985, // group id: maintain at
  },
  groupPurgeWhitelist: {
    [REDACTED]: hduhelpQaGroupWhitelist,
  },
  waitTimeBetweenGroupKicksMs: 500,
}
