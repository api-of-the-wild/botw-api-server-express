pipeline {
  agent any
  stages {
    stage('Unit') {
      steps {
        checkout scm
        sh 'npm install'
        sh 'npm run test:unit'
      }
    }
  }
}