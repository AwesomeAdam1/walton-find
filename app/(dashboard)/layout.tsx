import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
    
      <div className="min-h-screen">
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default DashboardLayout