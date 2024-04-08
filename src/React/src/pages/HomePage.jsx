import NavBar from "../components/Home/NavBar";
import Logo from "../components/Logo/Logo";

function HomePage(){
    return(
        <div className="container text-center">
            <NavBar />
            <div className="row">
                    <Logo />
            </div>
        </div>
    );

}
export default HomePage;