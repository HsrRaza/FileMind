/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

const ImageToPdf = async() => {

    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

    const imageUrl = file ? URL.createObjectURL(file) : '';

    const handleSubmit = () => {
        // Handle form submission logic here

        if(!file){
            alert('Please select a file before submitting.');
            return;
        }

     
    const formDate = new FormData();
    formDate.append('image', file as Blob);


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