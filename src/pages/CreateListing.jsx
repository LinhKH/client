import React from 'react';

const CreateListing = () => {
  return (
    <div className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input className='border p-3 rounded-lg' type="text" placeholder='Name' maxLength={62} minLength={10} id='name' name='name' required />
          <textarea className='border p-3 rounded-lg' name="description" id="description" placeholder='Description' required />
          <input className='border p-3 rounded-lg' type="text" placeholder='Address' id='address' name='address' required />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input className='w-5' type="checkbox" id='sale' name='sale' required />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2">
              <input className='w-5' type="checkbox" id='rent' name='rent' required />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input className='w-5' type="checkbox" id='parking' name='parking' required />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input className='w-5' type="checkbox" id='furnished' name='furnished' required />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input className='w-5' type="checkbox" id='offer' name='offer' required />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id='bedrooms' min={1} max={10} required />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id='bathrooms' min={1} max={10} required />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id='regularprice' required />
              <div className="flex flex-col gap-2">
                <p>Regular price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input className='p-3 border border-gray-300 rounded-lg' type="number" id='discountprice' required />
              <div className="flex flex-col gap-2">
                <p>Discounted price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6) </span></p>
          <div className='flex gap-4'>
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-3 border border-green-700 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className='p-3 bg-stone-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </div>
  )
}

export default CreateListing
