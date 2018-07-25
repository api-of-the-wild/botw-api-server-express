def nodeHome = tool name: "node-8.10.0", type: "jenkins.plugins.nodejs.tools.NodeJSInstallation"
env.PATH = "${nodeHome}/bin:${env.PATH}"

pipeline {
  agent any
  stages {
    stage("Unit") {
      steps {
        checkout scm
        sh "npm install"
        sh "npm run test:unit"
      }
    }
  }
}