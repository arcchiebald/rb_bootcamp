import Input from '../components/Input'
import UploadField from '../components/UploadField'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSlider from '../components/HeroSlider'


const Dashboard = () => {
    return (
        <div className="flex flex-col gap-6 items-center">
            <HeroSlider />
            <Input label="Email" type="password" placeholder="Enter your email" error={1} helperText="Please enter a valid email address." />
            <UploadField />
            <UploadField /> {/* FOR TESTING PURPOSES */}
            <UploadField />
            <UploadField />
            <Button variant="outline" disabled={0}>Submit</Button>
        </div>
    )
}

export default Dashboard