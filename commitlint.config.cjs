// commitlint.config.js

/**
 * CommitLint 配置文件
 * 该配置遵循 Conventional Commits 规范，适用于企业级提交校验标准
 */

module.exports = {
  // 使用社区通用规范
  extends: ['@commitlint/config-conventional'],

  // 自定义规则
  rules: {
    // 1. type 类型必须在以下列表中，保证语义清晰
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能 feature
        'fix',      // 修复 bug
        'docs',     // 文档变更
        'style',    // 代码格式（不影响功能，如空格、缩进）
        'refactor', // 代码重构（不包括修复和功能）
        'perf',     // 性能优化
        'test',     // 添加或修改测试
        'build',    // 构建工具变更（webpack、vite、npm scripts 等）
        'ci',       // CI 配置变更（GitHub Actions、GitLab CI 等）
        'chore',    // 其他日常事务（构建过程辅助脚本、依赖升级等）
        'revert'    // 回滚提交
      ]
    ],

    // 2. type 必须小写（例如 "Feat" 会报错）
    'type-case': [2, 'always', 'lower-case'],

    // 3. scope（作用域）必须小写，保持统一（如 "auth", "api"）
    'scope-case': [2, 'always', 'lower-case'],

    // 4. subject（简短描述）不能为空
    'subject-empty': [2, 'never'],

    // 5. subject 不允许以句号结尾（如 "fix: update foo." 会报错）
    'subject-full-stop': [2, 'never', ['.']],

    // 6. subject 必须是句首大写（Sentence case）或全部小写（可按需修改）
    'subject-case': [2, 'always', 'sentence-case'],

    // 7. header（type + scope + subject）总长度不超过 72 字符
    'header-max-length': [2, 'always', 72],

    // 8. body 每行不能超过 72 字符，便于终端阅读和 changelog 显示
    'body-max-line-length': [2, 'always', 72],

    // 9. footer 每行不能超过 72 字符（如 BREAKING CHANGE、issue refs）
    'footer-max-line-length': [2, 'always', 72],

    // 10. footer 前必须有一个空行（与 body 分隔）
    'footer-leading-blank': [2, 'always'],
  }
};
