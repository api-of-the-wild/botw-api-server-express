#!groovy

pipeline {
  agent none
  
  stages {
    stage('Build') {
      docker.image('node:8.10').inside() {
        sh './scripts/build/build.sh'
      }
    }
    parallel (
      UnitTests: {
        stage('Unit Tests') {
          docker.image('node:8.10').inside() {
            sh '.scripts/test/index.sh'
          }
        }
      },
      AlphaIntegration: {
        stage('Alpha Integration Tests') {
          // docker.image('node:8.10').inside() {
          //   sh '.scripts/test/lint.sh'
          // }
          echo 'Alpha integration not implemented'
        }
      },
    )

    // stage('Integration tests') {
    //   agent {
    //     docker { image 'tiangolo/docker-with-compose' }
    //   }
    //   steps {
    //     sh 'scripts/docker/dockerRunTest.sh'
    //   }
    // }
  }
}