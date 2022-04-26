import Layout from "../components/layout";
import Container from "../components/container";
import Head from "next/head";
import Header from "../components/header";

type Props = {};

const About = (props: Props) => {
  return (
    <Layout>
      <Container>
        <Header />
        <Head>
          <title>The Title</title>
        </Head>
        <div className="md:max-w-4xl mx-auto text-xl text-gray-800 mt-12 sm:mb-8">
          <div className="w-full flex sm:justify-between justify-center align-middle flex-wrap-reverse sm:flex-nowrap sm:mb-8">
            <div className="my-auto">
              <h1 className="text-2xl md:text-4xl pb-2 sm:text-left text-center">
                👋 Hi, my name is Nils.
              </h1>
              <p className="py-1">
                This is my personal blog about hobby projects. I am interested
                in Information Technology and like to experiment with software.
              </p>
            </div>

            <div className="pl-8 w-40 flex-shrink-0 my-auto">
              <img
                src="/assets/about/nils.jpg"
                alt="Portrait of Nils"
                width="800px"
                height="800px"
                className="rounded-lg w-full"
              />
            </div>
          </div>
          <div className="break-words">
            <p className="py-1">
              I have studied Computer Science and Business Information
              Mangement, holding a Ph.D. in Information Systems. You can learn
              more about my research on{" "}
              <a
                href="https://www.researchgate.net/profile/Nils-Siegfried"
                className="no-underline shadow-link"
              >
                ResearchGate
              </a>
              .
            </p>
            <p className="py-1">
              Currently I work for{" "}
              <a href="https://ing.de" className="no-underline shadow-link">
                ING
              </a>{" "}
              as a Software Engineer and Technical Product Owner. You can learn
              more about my professional experience on{" "}
              <a
                href="https://linkedin.com/nilssiegfried"
                className="no-underline shadow-link"
              >
                LinkedIn
              </a>
              .
            </p>
            <p className="py-1">
              If you would like to get in touch, please feel free to{" "}
              <a
                href="mailto:nils@nilssiegfried.de"
                className="no-underline shadow-link"
              >
                write me an email
              </a>
              .
            </p>
            <p className="py-1">
              The code for this blog and some of the presented projects can be
              found on{" "}
              <a
                href="https://github.com/nsieg"
                className="no-underline shadow-link"
              >
                Github
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default About;
