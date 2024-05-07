import { useState } from "react";

function AnalyticsInfo() {
    const [analyticsInfo, setAnalyticsInfo] = useState("");
    const InfoPull = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:5000/session_info");
          console.log(response.data)
          setAnalyticsInfo(response.data);
        } catch (error) {
          console.error("Error fetching session data:", error);
          // Handle errors appropriately, like displaying an error message
        }
      };

    return (
        <div className="container text-center">
            <div className="row mb-4 d-flex justify-content-between">
                <div className="col-md-5 glass"> 
                    <h2>Most Listened to Artist</h2>
                    <h3>{analyticsInfo.most_listened_to_artist}</h3>
                </div>
                <div className="col-md-5 glass"> 
                    <h2>Most Listened to Song</h2>
                    <h3>{analyticsInfo.most_listened_to_track}</h3>
                </div>
            </div>
            <div className="row mt-4 d-flex justify-content-between"> 
                <div className="col-md-5 glass"> 
                    <h2>Number of Tracks Played</h2>
                    <h3>{analyticsInfo.num_songs}</h3>
                </div>
                <div className="col-md-5 glass"> 
                    <h2>Average Length in mS</h2>
                    <h3>{analyticsInfo.avg_song_length}</h3>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsInfo