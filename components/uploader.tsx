'use client'

import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { upload } from '@vercel/blob/client'
import ProgressBar from './progress-bar'
import '@/components/styles.css'

type Props = {
  folder: string;
}

export default function Uploader({ folder }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageName, setImageName] = useState('')

  function reset() {
    setIsUploading(false)
    setFile(null)
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsUploading(true)
  
    if (file) {
      let uploadedBlob
  
      try {
        const blob = await upload(`${folder}/${file.name}`, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          onUploadProgress: (progressEvent) => {
            setProgress(progressEvent.percentage)
          },
        })
        uploadedBlob = blob // ✅ store blob here for use later
  
        toast(
          (t: { id: string }) => (
            <div className="relative">
              <div className="p-2">
                <p className="font-semibold text-gray-900">File uploaded!</p>
                <p className="mt-1 text-sm text-gray-500">
                  Your file has been uploaded to{' '}
                  <a
                    className="font-medium text-gray-900 underline"
                    href={blob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {blob.url}
                  </a>
                </p>
              </div>
            </div>
          ),
          { duration: Number.POSITIVE_INFINITY }
        )
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          throw error
        }
        setIsUploading(false)
        return
      }
  
      // ✅ Use imageName from useState and uploadedBlob
      await fetch('/api/log-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: imageName,
          url: uploadedBlob.url,
        }),
      })
  
      reset()
    }
  }

  function handleFileChange(file: File) {
    toast.dismiss()
    if (file.size === 0) {
      toast.error('File is empty')
      return
    }
    if (file.size / 1024 / 1024 > 50) {
      toast.error('File size too big (max 50MB)')
      return
    }

    setFile(file)
    setPreview(URL.createObjectURL(file))
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="space-y-1 mb-2">
          <h2 className="text-lg font-semibold">Upload a file</h2>
        </div>
        <label
          htmlFor="file-upload"
          className="group relative flex h-96 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
          style={{ height: '100px' }}
        >  
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              const file = e.dataTransfer?.files?.[0]
              if (file) {
                handleFileChange(file)
              }
            }}
          />
          <div
            className={`${
              dragActive ? 'border-2 border-black' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              preview
                ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                : 'bg-white opacity-100 hover:bg-gray-50'
            }`}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-6 w-6 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Upload icon</title>
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
            <span className="sr-only">Photo upload</span>
          </div>
          {preview && file?.type.startsWith('image') ? (
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 rounded-md object-cover"
            />
          ) : file ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xs text-gray-600">{file.name}</p>
            </div>
          ) : null}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="file-upload"
            name="file"
            type="file"
            className="sr-only"
            onChange={(event) => {
              const file = event.currentTarget?.files?.[0]
              if (file) {
                handleFileChange(file)
              }
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
  {isUploading && <ProgressBar value={progress} />}

  <div className="flex gap-2">
    <button
      type="reset"
      onClick={reset}
      disabled={isUploading || !file}
      className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 flex h-8 flex-1 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
    >
      Reset
    </button>

    <button
      type="submit"
      disabled={isUploading || !file}
      className="border-black bg-black text-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 flex h-8 flex-1 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
    >
      Upload
    </button>
    
  </div>
</div>
    </form>
  )
}
