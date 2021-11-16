pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        nodejs('node-16.13.0') {
          sh 'npm install'
          sh 'npm run build'
        }

      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts 'build/**'
      }
    }

  }
}