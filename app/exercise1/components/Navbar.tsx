'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './Navbar.module.scss'

interface NavLink {
  href: string
  label: string
  section: string
}

const navLinks: NavLink[] = [
  { href: '/exercise1?section=home', label: 'Home', section: 'home' },
  { href: '/exercise1?section=blog', label: 'Blog', section: 'blog' },
  { href: '/exercise1?section=about', label: 'About', section: 'about' },
]

export const Navbar = () => {
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section') || 'home'

  // Disclaimer
  // This is a demo project and for demo purposes I'm using *Approach 1* to avoid creating separate page.tsx files and folders, but in production you should use *Approach 2*.

  // - Approach 1: Using query parameters (current implementation)
  // This approach uses ?section=home, ?section=blog, etc.
  // Benefits: Simple, works with existing page structure and is for demo purposes

  // - Approach 2 (the usual and recommended approach): Using separate route segments
  // Would use routes like /exercise1/home, /exercise1/blog, /exercise1/about
  // Implementation would be:
  // const navLinks = [
  //   { href: '/exercise1/home', label: 'Home' },
  //   { href: '/exercise1/blog', label: 'Blog' },
  //   { href: '/exercise1/about', label: 'About' },
  // ]
  // const isActive = pathname === link.href
  // This requires creating separate page.tsx files in folders: /exercise1/home/, /exercise1/blog/, /exercise1/about/

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <ul className={styles.navbar__list}>
          {navLinks.map((link) => {
            const isActive = currentSection === link.section

            return (
              <li key={link.href} className={styles.navbar__item}>
                <Link
                  href={link.href}
                  className={`${styles.navbar__link} ${
                    isActive ? styles['navbar__link--active'] : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  scroll={false}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
