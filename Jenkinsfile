pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npx playwright test --headed=false'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: '**/test-results/**/*.json', allowEmptyArchive: true
      junit '**/test-results/**/*.xml'
    }
  }
}
