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
      parallel {
        stage('Unit Tests') {
          agent { docker 'node:8.10' }
          environment {
            STAGE = 'test'
          }
          steps {
            echo "${env.STAGE}"
            sh './scripts/test/index.sh'
          }
        }
        stage('Alpha Integration Tests') {
          agent {
            docker {
              image 'tmaier/docker-compose'
              args '-u root -v /var/run/docker.sock:/var/run/docker.sock --network host'
            }
          }
          steps {
            sh 'apk update && apk add bash'
            sh 'ls -l /bin/bash'
            sh './scripts/docker/dockerRunTest.sh'
          }
        }
      }
    }
  }
}