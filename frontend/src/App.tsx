import { useState } from "react"


const App = () => {


  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      const imageUrl = URL.createObjectURL(e.target.files![0])
      setPreviewUrl(imageUrl)
    }


    // console.log(imageUrl)

  }

  const handleRemove = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />

      {
        file &&(
          <p>
            selected file: {file.name} ({file.size})
          </p>
        )
      }

<button onClick={handleRemove}>remove</button>
      <div>

        {
          previewUrl && (
            <img src={previewUrl} alt="preview" style={{ maxWidth: "300px" }} />
          )
        }
      </div>
    </div>
  )
}

export default App