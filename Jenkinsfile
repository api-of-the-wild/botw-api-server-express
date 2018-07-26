#!groovy

pipeline {
  agent any

  tools {nodejs 'node-8.10.0'}

  stages {
    stage('Unit') {
      steps {
        checkout scm
        sh 'node -v'
        sh 'npm -v'
        sh 'npm install'
        sh 'npm run test:unit'
      }
    }
  }
}