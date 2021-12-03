import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex justify-between md:mb-20 mb-10 mt-8">
   
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
      <Link href="/">
        <a className="hover:underline">nils siegfried</a>
      </Link>
    </h2>
    <nav className="">   
    <ul>
    <li className="inline-block text-2xl md:text-3xl tracking-tight md:tracking-tighter leading-tight px-2">
      <Link href="/">
        <a className="hover:underline">posts</a>
      </Link>
    </li>
      <li className="inline-block text-2xl md:text-3xl tracking-tight md:tracking-tighter leading-tight pl-2">
      <Link href="/about">
        <a className="hover:underline">about</a>
      </Link>
    </li>
</ul>
    </nav>
    </div>
  )
}

export default Header