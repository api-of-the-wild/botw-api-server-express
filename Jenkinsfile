#!groovy

pipeline {
  agent any
  
  stages {
    stage('Build') {
      agent { docker 'node:8.10' }
      steps {
        sh './scripts/build/build.sh'
      }
    }
    stage('Local Tests') {
      parallel (
        stage('Unit Tests') {
          agent { docker 'node:8.10' }
          environment {
            STAGE = 'test'
          }
          steps {
            echo '${env.STAGE}'
            sh '.scripts/test/index.sh'
          }
        },
        stage('Alpha Integration Tests') {
          // docker.image('node:8.10').inside() {
          //   sh '.scripts/test/lint.sh'
          // }
          steps {
            echo 'Alpha integration not implemented'
          }
        },
      )
    }

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