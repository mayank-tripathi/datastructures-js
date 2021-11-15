pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        nodejs('node-16.13.0') {
          sh 'npm install'
          sh 'npm run build'
        }
        archiveArtifacts 'build/**'
        cleanWs(cleanWhenSuccess: true, cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true, disableDeferredWipeout: true)
      }
    }
  }
}
