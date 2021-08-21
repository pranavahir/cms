import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';
// import {gql,useMutation} from '@apollo/client'
const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file){
      url
    }
  }
`;
export default function App(){
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
  }
  return(
    <div>
  <Mutation mutation={uploadFileMutation}>
    {mutate => (
      <Dropzone onDrop={([file]) => mutate({ variables: { file } })} onChange={handleFileChange}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
      
    )}
  </Mutation>
  <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange}/>
        </div>
  </div>
  )
}