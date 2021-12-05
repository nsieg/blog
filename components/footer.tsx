import Container from './container'

const Footer = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <nav className="py-10 flex justify-center">
          <span className="text-xl tracking-tight leading-tight">{"© " + new Date().getFullYear() + " by"}</span>
          <span className="text-xl font-bold tracking-tight mx-1 leading-tight">nils siegfried</span>
          <span className="text-xl tracking-tight leading-tight mr-2">- all rights reserved</span>
          <span className="text-xl mx-2 leading-tight">impressum</span>
          <span className="text-xl mx-2 leading-tight">contact</span>
        </nav>        
      </Container>
    </footer>
  )
}

export default Footer
