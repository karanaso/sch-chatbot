import { Link }  from "react-router-dom"
import './AppBar.css'

export function AppBar() {


  return (
    <div className="AppBar border-b w-full">
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/chat"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Chat
          </Link>
          <Link
            to="/image"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Image
          </Link>
          <Link
            to="/explain"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Explain
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          
        </div>
      </div>
    </div>
  )
}
