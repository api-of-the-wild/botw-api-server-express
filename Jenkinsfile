#!groovy

pipeline {
  agent {
    docker {
      image 'node:7-alpine'
    }
  }

  stages {
    stage('Unit') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'yarn -v'
        sh 'yarn install'
        sh 'yarn run test:unit'
      }
    }
    stage('Lint') {
      steps {
        sh 'yarn test:lint'
      }
    }
  }
}