#!groovy

pipeline {
  agent any
  
  tools {
    nodejs 'node-8.10.0'
  }

  stages {
    stage('Build') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'yarn -v'
        sh 'yarn install'
      }
    }
    
    stage('Lint') {
      steps {
        sh 'yarn test:lint'
      }
    }

    stage('Unit') {
      steps {
        sh 'yarn run test:unit'
      }
    }
  }
}