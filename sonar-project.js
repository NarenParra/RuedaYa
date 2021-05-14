const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      'sonar.projectKey': "prueba",
      'sonar.projectVersion': '1.0.0',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': '**/*.test.ts,**/*.test.tsx',
      'sonar.exlusions':'src/tests',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.login': "01935bbc9344f8a59201624046000db6285f8af1",
      'sonar.javascript.file.suffixes': '.tsx,.ts',
      'sonar.lang.patterns.ts': '*/.ts,*/.tsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'reports/report.xml',
    },
  },
  () => {}
);