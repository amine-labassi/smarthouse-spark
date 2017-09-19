pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        parallel(
          "build": {
            sh 'mvn clean install'
            
          },
          "Test": {
            sh 'mvn test'
            
          }
        )
      }
    }
  }
}