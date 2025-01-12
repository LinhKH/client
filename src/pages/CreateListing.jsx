import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(files)
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset
        formData.append('folder', 'mern-estate');

        const uploadPromise = axios.post('https://api.cloudinary.com/v1_1/vision-viet-nam/image/upload', formData); // Replace with your Cloudinary cloud name
        promises.push(uploadPromise);
      }

      try {
        const responses = await Promise.all(promises);
        const imageUrls = responses.map(response => response.data.secure_url);
        // console.log('Uploaded images:', imageUrls);
        setFormData({ ...formData, imageUrls });
        setUploading(false);

      } catch (error) {
        console.error('Error uploading images:', error);
        setImageUploadError('Error uploading images. Please try again.', error);
        setUploading(false);
      }
    } else {
      console.error('Please select between 1 and 6 images.');
      setImageUploadError('Please select between 1 and 6 images.');
      setUploading(false);
    }
  };

  const deleteImage = (e,index) => {
    e.preventDefault();
    const updatedImageUrls = formData.imageUrls.filter((url, i) => i !== index);
    setFormData({ ...formData, imageUrls: updatedImageUrls });
  };

  const handleChangeInput = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id });
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }

  };

  const handleSubmitForn = async (e) => {
    e.preventDefault();
  
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const response = await axios.post(`/api/listing`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };
  
  return (
    <div className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a listing</h1>
      <form onSubmit={handleSubmitForn} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input onChange={handleChangeInput} className='border p-3 rounded-lg' type="text" placeholder='Name' maxLength={62} minLength={10} id='name' name='name' required />
          <textarea onChange={handleChangeInput} className='border p-3 rounded-lg' name="description" id="description" placeholder='Description' required />
          <input onChange={handleChangeInput} className='border p-3 rounded-lg' type="text" placeholder='Address' id='address' name='address' required />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input onChange={handleChangeInput} checked={formData.type === 'sale'} className='w-5' type="checkbox" id='sale' name='sale' />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2">
              <input onChange={handleChangeInput} checked={formData.type === 'rent'} className='w-5' type="checkbox" id='rent' name='rent' />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input onChange={handleChangeInput} checked={formData.parking} className='w-5' type="checkbox" id='parking' name='parking' />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input onChange={handleChangeInput} checked={formData.furnished} className='w-5' type="checkbox" id='furnished' name='furnished' />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input onChange={handleChangeInput} checked={formData.offer} className='w-5' type="checkbox" id='offer' name='offer' />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input onChange={handleChangeInput} value={formData.bedrooms} className='p-3 border border-gray-300 rounded-lg' type="number" id='bedrooms' min={1} max={10} required />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChangeInput} value={formData.bathrooms} className='p-3 border border-gray-300 rounded-lg' type="number" id='bathrooms' min={1} max={10} required />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChangeInput} value={formData.regularPrice} className='p-3 border border-gray-300 rounded-lg' type="number" id='regularPrice' required />
              <div className="flex flex-col gap-2">
                <p>Regular price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            { formData.offer && (
              <div className="flex items-center gap-2">
                <input onChange={handleChangeInput} value={formData.discountPrice} className='p-3 border border-gray-300 rounded-lg' type="number" id='discountPrice' required />
                <div className="flex flex-col gap-2">
                  <p>Discounted price</p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
            )}

          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6) </span></p>
          <div className='flex gap-4'>
            <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button type='button' onClick={handleImageSubmit} className='p-3 border border-green-700 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && (
              formData.imageUrls.map((url, index) => (
                <div className='flex justify-between items-center gap-2'>
                  <img key={index} src={url} alt={`Image ${index + 1}`} className='w-20 h-20 object-contain rounded-lg' />
                  <button onClick={(e) => deleteImage(e,index)} className='p-3 text-red-700 rounded-lg hover:opacity-95'>DELETE</button>
                </div>
              ))
            )
          }
          <button disabled={loading || uploading} type='submit' className='p-3 bg-stone-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </div>
  )
}

export default CreateListing
