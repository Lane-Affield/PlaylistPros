import logo from './Frame.png'

function Logo(){
    return(
        <div>
            <img src={logo} alt='Logo'style={{ width: '100vh', height: '100vh' }} draggable="false"></img>
        </div>
    )
}

export default Logo;