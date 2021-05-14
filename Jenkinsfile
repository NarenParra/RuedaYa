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
			 stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('SonarScanner') {
                        // sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.com.Ceiba:RuedaYa.naren.parra.prueba -Dsonar.projectName=co.com.Ceiba:RuedaYa.naren.parra.prueba -Dproject.settings=./sonar-project.properties"
                        // sh "${sonar-scanner.bat}/bin/sonar-scanner -Dsonar.projectKey=prueba -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=d3ca178fe2966514f4f6ab53eb28b1d525e0ec72 -Dproject.settings=./sonar-project.properties"
                         sh "${sonar-scanner.bat} -Dsonar.projectKey=prueba -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=d3ca178fe2966514f4f6ab53eb28b1d525e0ec72 -Dproject.settings=./sonar-project.properties"
                        // sh "sonar-scanner.bat -Dsonar.projectKey=prueba -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=d3ca178fe2966514f4f6ab53eb28b1d525e0ec72 -Dproject.settings=./sonar-project.properties"
                      
					  }
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