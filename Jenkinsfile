#!groovy

pipeline {
  agent {
    docker {
      image 'node:8'
      args '-p 3001:3001'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install yarn'
        sh 'yarn install'
        sh 'node -v'
        sh 'npm -v'
        sh 'yarn --version'
      }
    }
    
    stage('Internal tests') {
      steps {
        parallel(
          lint: {
            sh 'yarn test:lint'
          },
          unit: {
            sh 'yarn test:unit'
          }
        )
      }
    }

    // TODO: install docker-compose on Jenkins server
    // stage('Alpha tests') {
    //   steps {
    //     sh 'yarn docker:test'
    //   }
    // }
  }
}