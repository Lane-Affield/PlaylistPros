import NavBar from "../components/Home/NavBar";
import Logo from "../components/Logo/Logo";

function HomePage(){
    return(
        <div>
            <NavBar />
            <div style={{alignItems:"center"}}>
            <Logo />
            </div>
        </div>
    );

}
export default HomePage;