node {
  checkout scm

  stage('Build') {
    dir('core') {
      sh 'docker build --pull --rm -f "Dockerfile" -t core:latest "."'
    }
  }

  stage('Cleanup') {
    sh 'docker ps -f name=core -q | xargs --no-run-if-empty docker container stop'
    sh 'docker container ls -a -fname=core -q | xargs --no-run-if-empty docker container rm'
  }

  stage('Deploy') {
    sh 'docker run -d --name core -v $(pwd)"/functions":"/functions" -p 80:80 core:latest'
  }
}