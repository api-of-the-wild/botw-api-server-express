#!groovy

pipeline {
  agent {
    docker { image "kwhitejr/docker-ubuntu-node8.10:latest"}
  }

  stages {
    stage('Prepare') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'yarn --version'
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