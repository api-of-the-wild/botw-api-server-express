#!groovy

pipeline {
  agent any

  tools {nodejs 'node-8.10.0'}

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