import { useNavigate } from "react-router-dom";

function NavBar(){
    let navigate = useNavigate();
    const routeChangeHome = () => {
        let path = "/home"
        navigate(path)
    }
    const routeChangeSessions = () => {
        let path = "/session"
        navigate(path)
    }
    const routeChangeAnalytics = () => {
        let path = "/analytics"
        navigate(path)
    }
    const routeChangeAbout = () => {
        let path = "/about"
        navigate(path)
    }
    const routeChangeSettings = () => {
        let path = "/settings"
        navigate(path)
    }
    return(
        <>
        <h1>Playlist Pros</h1>
        <nav className="navbar navbar-expand-lg" style={{padding:'20px'}}>
            <div className="container-fluid">
                <h2 onClick={routeChangeHome} style={{cursor:"pointer"}}>Home</h2>
                <h2 onClick={routeChangeSessions} style={{cursor:"pointer"}}>Sessions</h2>
                <h2 onClick={routeChangeAnalytics} style={{cursor:"pointer"}}>Analytics</h2>
                <h2 onClick={routeChangeAbout} style={{cursor:"pointer"}}>About</h2>
                <h2 onClick={routeChangeSettings} style={{cursor:"pointer"}}>Settings</h2>


            </div>
        </nav>
        </>
    );
}

export default NavBar;