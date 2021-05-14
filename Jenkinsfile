pipeline{
		agent any
		
		triggers {
        pollSCM('@hourly')
		}
	
		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}
		
		stages{
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/prueba']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GITHUB_NarenParra', url: 'https://github.com/NarenParra/RuedaYa.git']]])
				}
			}
			stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'					
				}
            }
            stage('test '){
                steps {
                    sh 'npm run test:cov'					
				}
            }
			
		}
		post {
			failure {
				mail(to: 'naren21p@gmail.com',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}	
}