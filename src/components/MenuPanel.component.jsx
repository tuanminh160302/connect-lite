import { ReactComponent as LogoSVG } from '../assets/logo.svg'
import { ReactComponent as BackSVG } from '../assets/back.svg'
import { ReactComponent as DashboardSVG } from '../assets/dashboard.svg'
import { ReactComponent as PeopleSVG } from '../assets/people.svg'
import { ReactComponent as ProjectsSVG } from '../assets/project.svg'
import { ReactComponent as SkillsSVG } from '../assets/skills.svg'
import { ReactComponent as AdminSVG } from '../assets/admin.svg'
import OptionInModal from './OptionInModal.component'
import { useLocation, useNavigate } from 'react-router'
import { UserContext } from '../lib/context'
import { useContext } from 'react'

const MenuPanel = () => {

    const { user, userData } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const divStyle = "w-full h-fit py-4 px-8 flex flex-row items-center cursor-pointer hover:bg-black transition ease-in-out duration-300 mt-2"
    const SVGStyle = "h-4 w-4 cursor-pointer fill-white"
    const textStyle = "text-xs font-medium text-white ml-2"
    const sections = ["Profile", "People", "Projects", "Skills", "Admin"]
    // const sections = ["Dashboard", "People", "Projects", "Skills", "Admin"]
    const sectionsSVG = [DashboardSVG, PeopleSVG, ProjectsSVG, SkillsSVG, AdminSVG]

    return (
        <div className="w-fit bg-bg_navy h-screen sticky top-0 shadow-rightShadow z-[45] flex flex-col">
            <div className="h-fit w-full flex flex-row items-center py-3 px-8 border-b-2 border-b-white">
                <LogoSVG className="h-8 w-8 cursor-pointer" />
                <a className={`header-actions text-white ml-4 mr-4 w-fit`} href="/">Connect</a>
            </div>
            {
                userData &&
                <>
                    {
                        sections.map((section, index) => {
                            const url = '/' + section.toLowerCase()
                            return (
                                <div key={index}>
                                    <OptionInModal
                                        divStyle={divStyle}
                                        SVG={sectionsSVG[index]}
                                        description={section}
                                        SVGStyle={SVGStyle}
                                        textStyle={textStyle}
                                        onClick={section !== "Profile" ? () => { navigate(url) } : () => { navigate(`/people/${userData.username}`) }} />
                                </div>
                            )
                        })
                    }
                </>
            }
            <div className='absolute w-full h-fit bottom-5 flex flex-row items-center justify-between px-6'>

                <BackSVG className="fill-white h-8 w-8 cursor-pointer" />
            </div>
        </div>
    )
}

export default MenuPanel;