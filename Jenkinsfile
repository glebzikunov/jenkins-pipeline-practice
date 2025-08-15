pipeline {
  agent any 
  parameters {
    string(
      name: 'STRING_PARAMETER',
      defaultValue: 'String passed from Jenkins',
      description: 'A sample string parameter'
    )
    choice(
      name: 'CHOICE',
      choices: ['1', '2', '3'],
      description: 'Some choices'
    )
  }
  environment {
    VERSION = '1.0'
    STRING_FROM_JENKINS = "${params.STRING_PARAMETER}"
    // STRING_CREDENTIAL = credentials('secretString')
  }
  stages {
    stage("Installing dependencies") {
      steps {
        echo "Installing dependencies for version ${VERSION}"
        sh """
        #!/bin/bash
          curl -sL https:rpm.nodesource.com/setup_20.x | sudo bash -
          sudo yum install -y nodejs
          node -v
          npm install
        """
      }
    }

    stage("Running tests") {
      steps {
        echo "Running test using string parameter: ${STRING_FROM_JENKINS}"
        sh """
          npm run chrome.mocha
        """
      }
    }
  }

  post {
    always {
      allure([
        includeProperties: false,
        jdk: '',
        reportBuildPolicy: 'ALWAYS',
        results: [[path: 'allure-results']]
      ])

      archiveArtifacts artifacts: 'allure-report/data/test-cases/**', fingerprint: true
    }
  }
}
