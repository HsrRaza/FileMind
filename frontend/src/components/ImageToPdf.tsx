/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios';

const ImageToPdf = () => {

    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }


    const handleSubmit = async() => {
        // Handle form submission logic here

        if (!file) {
            alert('Please select a file before submitting.');
            return;
        }

        const formDate = new FormData();
        formDate.append('image', file );

      try{
        const response = await axios.post('http://localhost:3000/data', formDate, );
         console.log(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }

      };


    return (
        <div>

            <input type="file" accept='image/*' onChange={handleChange}
                className='border gap-2'
            />
            {
                file && (
                    <p>
                        selected file: {file.name} ({file.size})
                    </p>
                )
            }


            <div>
                <button onClick={handleSubmit}>submit</button>
            </div>
        </div>
    )
}

export default ImageToPdf