import { Link } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Building, Home, Users } from "lucide-react"
import {
  PageContainer,
  HeroSection,
  HeroText,
  RoleSection,
  RoleCard,
  IconWrapper,
} from "./styledComponents"
// OR import "./home.css" for CSS version

export default function HomePage() {
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")

  return (
    <PageContainer>
      <HeroSection>
        <div className="container px-4 md:px-6">
          <HeroText>
            <h1>Welcome to HostelScore</h1>
            <p>Find, rate, and book the best hostels for your next adventure.</p>
            {!token ?( <div className="actions">
              <Link to="/login"><Button>Login</Button></Link>
              <Link to="/register"><Button variant="outline">Register</Button></Link>
            </div>) : (
              <div className="actions">
              <Link to="/hostels"><Button>Hostels</Button></Link>
            </div>
            )}
          </HeroText>
        </div>
      </HeroSection>

      <RoleSection>
        <div className="container px-4 md:px-6">
          <div className="roles">
            <RoleCard>
              <IconWrapper><Users /></IconWrapper>
              <h3>For Customers</h3>
              <p>Find and rate hostels based on your experience. Discover the perfect place for your stay.</p>
            </RoleCard>
            <RoleCard>
              <IconWrapper><Building /></IconWrapper>
              <h3>For Hostel Owners</h3>
              <p>Register your hostel and manage your property. Get insights on customer ratings and preferences.</p>
            </RoleCard>
            <RoleCard>
              <IconWrapper><Home /></IconWrapper>
              <h3>For Admins</h3>
              <p>Manage the platform, view statistics, and ensure quality service for all users.</p>
            </RoleCard>
          </div>
        </div>
      </RoleSection>
    </PageContainer>
  )
}
