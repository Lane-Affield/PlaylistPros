 
function SongController(){
    const ClosingTime=  () => {
        fetch("http://127.0.0.1:5000/closing_time")
    }
    return(
        
    <form>
        <input type="text" />
        <button>
            Ban song 
        </button>
        <button>
            PLay Next
        </button>
        <button onClick={ClosingTime}>
            CLOSING TIME
        </button>
    </form>
    );

}

export default SongController;