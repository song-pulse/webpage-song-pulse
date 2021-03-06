import React from "react"
import { Link } from "gatsby"
import Bubble from "../bubble"
import RecordingShort from "../recording/recordingShort"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios"
import AddRecording from "../recording/addRecording"


const Participant = (props) => {
  let data = props.data;
  return (
    <Bubble>
      <Box style={{display: "flex", justifyContent: "space-between", marginBottom:"1em"}}>
        <Link to={"/participants/" + data.id}>{data.name}</Link>
        <Box/>
        <Button onClick={() => deleteParticipant(data.id)} color="secondary" variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
      </Box>
      {data.recordings.map(rec => <RecordingShort key={rec.id} data={rec}/>)}
      <br/>
      <AddRecording part_id={data.id} refresh={props.refresh}/>
    </Bubble>)
}

const deleteParticipant = (id) => {
  axios.delete(process.env.GATSBY_API_URL+"participants/"+id)
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)});
}

export default Participant