import "../../Styling/glasseffect.css"

function CreateSession(){
    return(
        <div>
            <form>
                <label>Session Name</label>
                <input type="text"></input>
                <label>Ban Songs</label>
                <input type= "text"></input>
                <label>Start With</label>
                <input type= "text"></input>
                <input type="submit"></input>
                <button>existing session</button>
            </form>
        </div>
    );
}
export default CreateSession;