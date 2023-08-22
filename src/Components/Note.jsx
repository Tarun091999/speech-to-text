import { IconButton } from "@mui/material";
import { Mic } from "@mui/icons-material";
import '@fontsource/roboto/400.css';
import "regenerator-runtime/runtime";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";
import React, { useState } from "react";
import {Button} from "@mui/material";
import { CopyAll } from "@mui/icons-material";
import ReactLoading from 'react-loading';

export default function Note() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [search, setSearch] = useState(false);
  const[loading, setLoading]= useState(false);
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

function stopListening(){
    SpeechRecognition.stopListening();
    setLoading(false);
    setSearch(true);
}

function startListening()
{
    SpeechRecognition.startListening()
    setLoading(true);
    setSearch(false);
}
async function requestResponse()
{
    let data = window.document.getElementById("speech-text").innerText;
    console.log(data);
    if (data !="")
    {
        await navigator.clipboard.writeText(data);
        toast.success(' Text Copied !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });   
    }
    
}
  return (
    <>
      <div className="note-container">
        <div className="note-container-header">
          <h2>Write Your Note</h2>
        </div>
        <div className="speech-note">
          <p className="speech-text" id ="speech-text">{transcript}</p>
          <div className="microphone-button">
            <IconButton
              variant="contained"
              size="large"
              onMouseDown={()=>{startListening()}}
              onMouseUp={()=>{stopListening()}}
            >
              <Mic color="secondary" fontSize="medium" />
            </IconButton>
            
          </div> 
          <div className="loading-div">

          
          {
            loading && <ReactLoading type={"bubbles"} color={"purple"} height={'20%'} width={'20%'} className="loader" />
          }
          </div>

          {
           search && <Button variant="contained" color="secondary" endIcon={<CopyAll/>}  onClick={()=>{requestResponse()}}> Coppy Text </Button>
          }    
        </div>
        <ToastContainer />
      </div>
      
    </>
  );
}
