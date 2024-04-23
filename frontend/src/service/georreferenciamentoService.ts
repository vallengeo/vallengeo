import api from './api'

export const uploadShapeFile = async (file: File[]) => {
    const formData = new FormData()
    file.forEach((f: File) => {
      const blob = new Blob([f], { type: f.type })
      formData.append('file', blob, f.name)
    })
  
    return api.post('/georreferenciamento/obter-geometria', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }