const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_SERVER_URL,
    options: {
      'sonar.projectKey': process.env.SONAR_PROJECT_KEY,
      'sonar.projectVersion': '1.0.0',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': '**/*.test.ts,**/*.test.tsx',
      'sonar.exlusions':'src/tests',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.login': process.env.SONAR_LOGIN,
      'sonar.javascript.file.suffixes': '.tsx,.ts',
      'sonar.lang.patterns.ts': '*/.ts,*/.tsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'reports/report.xml',
    },
  },
  () => {}
);