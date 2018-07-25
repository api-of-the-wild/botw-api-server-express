pipeline {
  agent any
  stages {
    stage('Unit') {
      steps {
        checkout scm
<<<<<<< HEAD
        def nodeHome = tool name: 'node-8.10.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}/bin:${env.PATH}"
        sh 'npm install'
        sh "npm run test:unit"
=======
        echo 'We\'re doing it!'
        sh 'npm install'
        sh 'npm run test:unit'
>>>>>>> 3b4cb596f4acb3f37e29821a0e4d81ba90ede1bb
      }
    }
  }
}