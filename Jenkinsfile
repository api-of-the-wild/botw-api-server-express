pipeline {
  agent any
  stages {
    stage("Unit") {
      steps {
        checkout scm
        echo "We're doing it!"
        sh "npm install"
        sh "npm run test:unit"
      }
    }
  }
}