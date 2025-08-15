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
      choices: ['chrome', 'mozilla'],
      description: 'Some browser choices'
    )
  }
  environment {
    VERSION = '1.0'
    STRING_FROM_JENKINS = "${params.STRING_PARAMETER}"
    // STRING_CREDENTIAL = credentials('secretString')
  }
  stages {
    stage('Setup') {
      steps {
        bat 'npm ci'
      }
    }
    
    stage('Testing') {
      steps {
        script {
          def stageName = "Testing on ${params.CHOICE}"
          echo stageName

          if (params.CHOICE == 'chrome') {
            bat 'npm run chrome.mocha'
          } else {
            bat 'npm run mozilla.mocha'
          }
        }
      }
    }
    
    stage('Generating report') {
      steps {
        bat 'npm run allure:generate'
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
