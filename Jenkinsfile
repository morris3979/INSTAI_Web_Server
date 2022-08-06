pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="667855185961"
        AWS_DEFAULT_REGION="us-east1"
	    CLUSTER_NAME="CHANGE_ME"
	    SERVICE_NAME="CHANGE_ME"
	    TASK_DEFINITION_NAME="CHANGE_ME"
	    DESIRED_COUNT="CHANGE_ME"
        IMAGE_REPO_NAME="ecr-carview-v2"
        IMAGE_TAG="${latest}"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
	    registryCredential = "CHANGE_ME"
    }

    stages {

    // Tests
    stage('Unit Tests') {
      steps{
        script {
          sh 'npm install'
	  sh 'npm test -- --watchAll=false'
        }
      }
    }

    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
        }
      }
    }

    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{
         script {
			docker.withRegistry("https://" + REPOSITORY_URI, "ecr:${AWS_DEFAULT_REGION}:" + registryCredential) {
                    	dockerImage.push()
                	}
         }
        }
      }

    stage('Deploy') {
     steps{
            withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
                script {
			sh './script.sh'
                }
            }
        }
      }

    }
}