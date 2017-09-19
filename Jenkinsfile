pipeline {
  agent {
    docker {
      image 'maven:3.5.0-jdk-8'
    }
    
  }
  stages {
    stage('error') {
      steps {
        echo 'Hello'
      }
    }
  }
}