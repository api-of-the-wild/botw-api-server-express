pipeline {
  agent any
  stages {
    stage('Unit') {
      steps {
        echo 'We\'re doing it!'
        checkout scm
        sh 'node -v'
        sh 'yarn install'
        sh 'yarn test:unit'
      }
    }
  }
}