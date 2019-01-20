#!groovy

pipeline {
  agent none
  
  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:8'
          args '-p 3001:3001'
        }
      }
      steps {
        sh 'npm install yarn'
        sh 'yarn install'
        sh 'node -v'
        sh 'npm -v'
        sh 'yarn --version'
      }
    }
    
    stage('Internal tests') {
      agent {
        docker {
          image 'node:8'
          args '-p 3001:3001'
        }
      }
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

    stage('Alpha tests') {
      agent {
        docker { image 'tiangolo/docker-with-compose' }
      }
      steps {
        sh 'yarn docker:test'
      }
    }
  }
}