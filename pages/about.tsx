import Layout from '../components/layout'
import Container from '../components/container'
import Head from 'next/head'
import Header from '../components/header'
import Image from 'next/image'

type Props = {}

const About = (props: Props) => {
  
  return (
    <Layout>
      <Container>
      <Header />
            <Head>
            <title>
                The Title
            </title>
            </Head>
            <div className="md:max-w-4xl mx-auto text-xl text-gray-800 mt-12">
				<div className="w-full flex sm:justify-between justify-center align-middle flex-wrap-reverse sm:flex-nowrap mb-8">					
					<div className="my-auto">
						<h1 className="text-2xl md:text-4xl pb-2">
                        👋 Hi, my name is Nils.
						</h1>
                        <p className="py-1">
                            Software and Information Technology are my passion. This is my personal blog about hobby projects.
                        </p>                        
					</div>	
                   		
					<div className="pl-8 w-40 flex-shrink-0 my-auto">
                        <Image src="/assets/about/nils.jpg" alt="Portrait of Nils" width="800px" height="800px" className="rounded-full w-full" />
					</div>	
				</div>
                <div className="break-words">
                    <p className="py-1">
                        I have studied computer science and business information mangement, holding a Ph.D. in Information Systems. 
                        You can learn more about my research on <a href=">https://www.researchgate.net/profile/Nils-SiegfriedResearchGate" className="no-underline shadow-link">ResearchGate</a>.
                        </p>
                        <p className="py-1">
                            Currently I work for <a href="https://ing.de" className="no-underline shadow-link">ING</a> as a software engineer and technical product owner. 
                            You can learn more about my professional experience on <a href="https://linkedin.com/nilssiegfried" className="no-underline shadow-link">LinkedIn</a>.                      
                        </p>
                        <p className="py-1">
                            If you would like to get in touch, please feel free to <a href="#" className="no-underline shadow-link">write me an email</a>.      
                        </p>
                        <p className="py-1">
                            Most of the code from the projects presented on this blog can be found on <a href="https://github.com/nsieg" className="no-underline shadow-link">Github</a>.
                        </p>
                        </div>
			</div>
      </Container>
    </Layout>
  )
}

export default About