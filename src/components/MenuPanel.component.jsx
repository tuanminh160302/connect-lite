import { ReactComponent as LogoSVG } from '../assets/logo.svg'
import { ReactComponent as BackSVG } from '../assets/back.svg'
import { ReactComponent as DashboardSVG } from '../assets/dashboard.svg'
import { ReactComponent as PeopleSVG } from '../assets/people.svg'
import { ReactComponent as ProjectSVG } from '../assets/project.svg'
import { ReactComponent as SkillsSVG } from '../assets/skills.svg'
import OptionInModal from './OptionInModal.component'
import { useLocation, useNavigate } from 'react-router'

const MenuPanel = () => {

    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="w-fit bg-bg_navy h-screen absolute top-0 left-0 shadow-rightShadow z-[45] flex flex-col">
            <div className="h-fit w-full flex flex-row items-center py-3 px-8 md:py-5 md:px-10 border-b-2 border-b-white">
                <LogoSVG className="h-12 w-12 cursor-pointer" />
                <a className={`header-actions text-white ml-4 mr-4 w-fit`} href="/">Connect</a>
            </div>
            <OptionInModal
                divStyle="w-full h-fit py-3 px-8 md:py-5 md:px-10 flex flex-row items-center cursor-pointer hover:bg-black transition ease-in-out duration-300"
                SVG={DashboardSVG}
                description="Dashboard"
                SVGStyle="h-6 w-6 cursor-pointer fill-white"
                textStyle="text-sm font-medium text-white ml-4" 
                onClick={() => {navigate('/dashboard')}}/>
            <OptionInModal
                divStyle="w-full h-fit py-3 px-8 md:py-5 md:px-10 flex flex-row items-center cursor-pointer hover:bg-black transition ease-in-out duration-300"
                SVG={PeopleSVG}
                description="People"
                SVGStyle="h-6 w-6 cursor-pointer fill-white"
                textStyle="text-sm font-medium text-white ml-4" 
                onClick={() => {navigate('/people')}}/>
            <OptionInModal
                divStyle="w-full h-fit py-3 px-8 md:py-5 md:px-10 flex flex-row items-center cursor-pointer hover:bg-black transition ease-in-out duration-300"
                SVG={ProjectSVG}
                description="Projects"
                SVGStyle="h-6 w-6 cursor-pointer fill-white"
                textStyle="text-sm font-medium text-white ml-4" 
                onClick={() => {navigate('/projects')}}/>
            <OptionInModal
                divStyle="w-full h-fit py-3 px-8 md:py-5 md:px-10 flex flex-row items-center cursor-pointer hover:bg-black transition ease-in-out duration-300"
                SVG={SkillsSVG}
                description="Skills"
                SVGStyle="h-6 w-6 cursor-pointer fill-white"
                textStyle="text-sm font-medium text-white ml-4" 
                onClick={() => {navigate('/skills')}}/>
            <div className='absolute w-full h-fit bottom-5 flex flex-row items-center justify-between px-6'>
                
                <BackSVG className="fill-white h-14 w-14 cursor-pointer" />
            </div>
        </div>
    )
}

export default MenuPanel;