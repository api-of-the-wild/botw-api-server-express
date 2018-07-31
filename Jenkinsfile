#!groovy

pipeline {
  agent {
    docker {
      image 'keymux/docker-ubuntu-nvm-yarn:0.2.0'
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