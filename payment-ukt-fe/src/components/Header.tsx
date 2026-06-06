


const Header = () => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Payment', path: '/payment' },
    { name: 'Bill', path: '/bill' },
  ];

  return (
    <header className="sticky top-0 h-16 bg-blue-500 text-white p-2 flex flex-row space-x-4 items-center justify-between">
      <h3 className="text-xl font-semibold">Payment UKT</h3>
      <nav>
        <ul className="flex space-x-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header