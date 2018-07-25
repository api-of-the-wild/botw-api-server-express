pipeline {
  agent any
  stages {
    stage('Unit') {
      steps {
        echo 'We\'re doing it!'
        checkout scm
        sh 'yarn install'
        sh 'yarn test:unit'
      }
    }
  }
}