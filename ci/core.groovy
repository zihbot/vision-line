node {
  checkout scm

  stage('Build') {
    dir('core') {
      sh 'docker build --pull --rm -f "Dockerfile" -t core:latest "."'
    }
  }

  stage('Cleanup') {
    sh 'docker ps -f name=core:latest -q | xargs --no-run-if-empty docker container stop'
    sh 'docker container ls -a -fname=core:latest -q | xargs -r docker container rm'
  }

  stage('Deploy') {
    sh 'docker run -d --name core -v "functions/":"/functions" -p 80:80 core:latest'
  }
}